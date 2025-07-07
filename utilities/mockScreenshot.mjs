const path = require('node:path')
const fs = require('node:fs')
import satori from 'satori'
const { Resvg } = require('@resvg/resvg-js')

async function main() {
    let username = 'blank'
    let pfp_url = 'https://www.bestimages.website.gov.url/wow.png'
    let post_content = 'Hello, world!'

    const fonts = {
        medium: fs.readFileSync(
            path.resolve('../assets/fonts/national_park/medium.otf'),
        ),
        regular: fs.readFileSync(
            path.resolve('../assets/fonts/national_park/regular.otf'),
        ),
    }

    const satoriOptions = {
        width: 800,
        height: 400,
        embedFont: true,
        fonts: [
            {
                name: 'National Park',
                data: fonts.regular,
                weight: 400,
            },
            {
                name: 'National Park',
                data: fonts.medium,
                weight: 500,
            },
        ],
    }

    const post_tree = {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                flexDirection: 'column',
                padding: '3rem',
                backgroundColor: 'black',
                color: 'white',
                width: '100%',
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '1rem',
                        },
                        children: [
                            {
                                type: 'img',
                                props: {
                                    src: `${pfp_url}`,
                                    width: 60,
                                    height: 60,
                                },
                            },
                            {
                                type: 'p',
                                props: {
                                    style: {
                                        fontSize: 34,
                                        fontWeight: 500,
                                    },
                                    children: `${username}`,
                                },
                            },
                        ],
                    },
                },
                {
                    type: 'p',
                    props: {
                        style: {
                            fontSize: 40,
                            width: '100%',
                        },
                        children: `${post_content}`,
                    },
                },
            ],
        },
    }

    const postSvg = await satori(post_tree, satoriOptions)

    const resvgOptions = {
        font: {
            loadSystemFonts: false,
            fontFiles: [
                '../assets/fonts/national_park/medium.woff2',
                '../assets/fonts/national_park/regular.woff2',
            ],
        },
    }

    const resvg = new Resvg(postSvg, resvgOptions)
    const resvgJS = new resvg.Resvg(postSvg, resvgOptions)
    const pngData = resvgJS.render(postSvg, resvgJS) // Output PNG data, Uint8Array
    fs.writeFile('./temp_output.png', pngData, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('File written successfully!')
        }
    })
}
main()
