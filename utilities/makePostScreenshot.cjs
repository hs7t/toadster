const path = require('node:path')
const fs = require('node:fs')
const { Resvg } = require('@resvg/resvg-js')

module.exports = async function makePostScreenshot(
    username,
    pfp_url,
    post_content,
    img_width,
) {
    const generateSatoriSvg = await import('./generateSatoriSvg.mjs').then(
        (m) => m.default,
    )

    const fonts = {
        medium: fs.readFileSync(
            path.resolve('../assets/fonts/national_park/medium.otf'),
        ),
        regular: fs.readFileSync(
            path.resolve('../assets/fonts/national_park/regular.otf'),
        ),
    }

    const satoriOptions = {
        width: img_width,
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

    const postTree = {
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

    const resvgOptions = {
        font: {
            loadSystemFonts: false,
            fontFiles: [
                '../assets/fonts/national_park/medium.woff2',
                '../assets/fonts/national_park/regular.woff2',
            ],
            fitTo: {
                mode: 'original',
            },
        },
    }

    const postSvg = await generateSatoriSvg(postTree, satoriOptions)

    const resvg = new Resvg(postSvg, resvgOptions)
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    fs.writeFile('./temp_output.png', pngBuffer, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('File written successfully!')
        }
    })
}
