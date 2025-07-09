const makeCompositionImage = require('./makeCompositionImage.cjs')

async function frameMessage(
    author_username,
    author_avatar_url,
    author_display_name = undefined,
    title = 'Untitled',
    content,
    date = '??/??/????',
    frame_color = '#1f1f1f',
    primary_background_color = '#ffffff',
    background_color = '#e1e1e1',
    text_color = '#000000',
    output_width = 1024,
) {
    /**
     * Creates a museum-like framed view of a message
     * @async
     *
     * @param {string} author_username - a short ID for the message
     * @param {string} author_avatar_url - a URL to a 1x1 image
     * @param {string} author_display_name - a short author name for the piece
     * @param {string} title - a short title for the piece
     * @param {string} content - the content of the message
     * @param {string} date - a date for the piece
     * @param {string} frame_color - HEX for the post's frame
     * @param {string} primary_background_color - HEX for the post and piece plaque's background
     * @param {string} background_color - HEX for the background
     * @param {string} text_color - HEX to be used for text throughout the composition
     * @param {number} output_width - px width for the resulting image (advancedopt)
     *
     * @returns PNG buffer
     */

    author_display_name =
        author_display_name.toUpperCase() ?? author_username.toUpperCase()

    const composition_tree = {
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
                                                                        src: `${author_avatar_url}`,
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
                                                            children: `${author_username}`,
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
                                                children: `${content}`,
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
                                    children: `${author_display_name}`,
                                },
                            },
                            {
                                type: 'p',
                                props: {
                                    style: {
                                        fontSize: '18px',
                                        margin: 0,
                                    },
                                    children: `'${title}'`,
                                },
                            },
                            {
                                type: 'p',
                                props: {
                                    style: {
                                        fontSize: '18px',
                                        margin: 0,
                                    },
                                    children: `${date}`,
                                },
                            },
                        ],
                    },
                },
            ],
        },
    }

    return makeCompositionImage(composition_tree, output_width)
}
