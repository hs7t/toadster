const path = require('node:path')
const fs = require('node:fs')
const { Resvg } = require('@resvg/resvg-js')

module.exports = async function makePostScreenshot(
    username,
    pfp_url,
    post_content,
    img_width = 1024,
) {
    /**
     *    Makes a 'post screenshot'
     *    @async
     *    @param {string} username - a short identification string
     *    @param {string} pfp_url - a URL to a square-sized image
     *    @param {string} post_content - the content of the post
     *    @param {number} img_width - the width for the resulting image
     *
     *    @return {Promise<Buffer>} an image buffer
     *
     *    @example makePostScreenshot(
     *        "mikey",
     *        "awesome.website/image.png",
     *        "I bet on losing dogs",
     *        1024
     *    )
     */
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
                                style: {
                                    borderRadius: 1000,
                                },
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

    return await pngBuffer
}
