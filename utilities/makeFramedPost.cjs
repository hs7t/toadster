const path = require('node:path')
const fs = require('node:fs')
const { Resvg } = require('@resvg/resvg-js')

module.exports = async function makeFramedPost(
    username,
    pfp_url,
    post_content,
    post_title = 'Untitled',
    post_author = undefined,
    post_date = '01/01/1000',
    img_width = 1024,
    frame_color = '#1f1f1f',
    primary_background_color = '#ffffff',
    background_color = '#e1e1e1',
    text_color = '#000000',
) {
    /**
     *    Makes a 'post screenshot'
     *    @async
     *    @param {string} username - a short identification string
     *    @param {string} pfp_url - a URL to a square-sized image
     *    @param {string} post_content - the content of the post
     *    @param {string} post_title - a title to be shown
     *    @param {string} date - an XX/ZZ/YYYY string
     *
     *    @param {number} img_width - the width for the resulting image
     *
     *    @return {Promise<Buffer>} an image buffer
     *
     *    @example makePostScreenshot(
     *        "mikey",
     *        "awesome.website/image.png",
     *        "I bet on losing dogs",
     *        "01/12/2025",
     *        1024
     *    )
     */

    post_author = post_author.toUpperCase() ?? username.toUpperCase()

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
                gap: '1rem',
                background_color: `${background_color}`,
                padding: '3rem',
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            padding: '2rem',
                            backgroundColor: `${frame_color}`,
                            boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.55)',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '3rem',
                                        backgroundColor: `${primary_background_color}`,
                                        color: `${text_color}`,
                                        border: `3pt solid rgb(235, 235, 235)`,
                                        boxShadow: `0px 0px 10px 0px rgba(153, 153, 153, 0.25) inset`,
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
                                                        type: 'div',
                                                        props: {
                                                            style: {
                                                                display: 'flex',
                                                                width: 60,
                                                                height: 60,
                                                                borderRadius:
                                                                    '100%',
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
                                                            ],
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
                            },
                        ],
                    },
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            width: '40%',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: primary_background_color,
                            gap: '0.4rem',
                            padding: '1rem',
                            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
                        },
                        children: [
                            {
                                type: 'p',
                                props: {
                                    style: {
                                        fontSize: '24px',
                                        margin: 0,
                                    },
                                    children: `${post_author}`,
                                },
                            },
                            {
                                type: 'p',
                                props: {
                                    style: {
                                        fontSize: '18px',
                                        margin: 0,
                                    },
                                    children: `'${post_title}'`,
                                },
                            },
                            {
                                type: 'p',
                                props: {
                                    style: {
                                        fontSize: '18px',
                                        margin: 0,
                                    },
                                    children: `${post_date}`,
                                },
                            },
                        ],
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
