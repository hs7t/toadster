const makeCompositionImage = require('./makeCompositionImage.cjs')
const makeCompositionImage = require('node:path')

const __dirname = path.dirname(__filename)
var assets = {
    freedom: {
        path: '../assets/images/inspiration/freedom.jpg',
        buffer: fs.readFileSync(
            path.resolve(
                path.join(
                    __dirname,
                    '..',
                    'assets',
                    'images',
                    'inspiration',
                    'freedom.jpg',
                ),
            ),
        ),
    },
    landscape: {
        path: '../assets/images/inspiration/landscape.jpg',
        buffer: fs.readFileSync(
            path.resolve(
                path.join(
                    __dirname,
                    '..',
                    'assets',
                    'images',
                    'inspiration',
                    'landscape.jpg',
                ),
            ),
        ),
    },
    einstein: {
        path: '../assets/images/inspiration/einstein.jpg',
        buffer: fs.readFileSync(
            path.resolve(
                path.join(
                    __dirname,
                    '..',
                    'assets',
                    'images',
                    'inspiration',
                    'einstein.jpg',
                ),
            ),
        ),
    },
    business: {
        path: '../assets/images/inspiration/business.jpg',
        buffer: fs.readFileSync(
            path.resolve(
                path.join(
                    __dirname,
                    '..',
                    'assets',
                    'images',
                    'inspiration',
                    'business.jpg',
                ),
            ),
        ),
    },
}
var layoutTrees = {
    inspo: {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                width: '683px',
                height: '1024px',
                padding: '90px 50px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                background: `url(${assets.business.path}) lightgray 50% / cover no-repeat`,
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: {
                            width: '574px',
                            height: '700px',
                            flexShrink: '0',

                            overflow: 'hidden',
                            color: '#FFFFFF',
                            textAlign: 'center',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontFamily: 'Inter Display',
                            fontSize: '64px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: 'normal',
                            textTransform: 'uppercase',
                        },
                        children: ['REPLACE_THIS_QUOTE'],
                    },
                },
            ],
        },
    },
    einstein: {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                width: '2000px',
                alignItems: 'center',
                background: '#050505',
            },
            children: [
                {
                    type: 'img',
                    props: {
                        style: {
                            minWidth: '634.056px',
                            minHeight: '1024px',
                            flexShrink: '0',
                            alignSelf: 'stretch',
                            aspectRatio: '634.06/1024.00',
                        },
                        src: assets.einstein.path,
                    },
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            padding: '0px 132px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            flex: '1 0 0',
                        },
                        children: [
                            {
                                type: 'p',
                                style: {
                                    alignSelf: stretch,
                                    color: '#FFF',
                                    textAlign: 'center',
                                    fontFamily: 'Jacques Francois',
                                    fontSize: '64px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                },
                                children: ['REPLACE_THIS_QUOTE'],
                            },
                            {
                                type: 'p',
                                style: {
                                    alignSelf: stretch,
                                    color: '#FBFF00',
                                    textAlign: 'center',
                                    fontFamily: 'Jacques Francois',
                                    fontSize: '64px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                },
                                children: ['REPLACE_THIS_AUTHOR'],
                            },
                        ],
                    },
                },
            ],
        },
    },
    freedom: {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                width: '1133px',
                height: '1024px',
                padding: '102px 90px',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                gap: '10px',
                background: `url(${assets.freedom.path}) lightgray 50% / cover no-repeat`,
            },
            children: [
                {
                    type: 'p',
                    props: {
                        style: {
                            width: '566px',
                            flexShrink: '0',
                            alignSelf: 'stretch',
                            overflow: 'hidden',
                            color: '#000',
                            textAlign: 'right',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontFamily: 'Italianno',
                            fontSize: '72px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: 'normal',
                        },
                        children: 'REPLACE_THIS_QUOTE',
                    },
                },
            ],
        },
    },
}

async function makeMotivationImage() {}
