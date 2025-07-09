const path = require('node:path')
const fs = require('node:fs')
const { Resvg } = require('@resvg/resvg-js')

module.exports = async function makeCompositionImage(
    composition_tree,
    img_width = 1024,
    resvg_options = undefined,
    satori_options = undefined,
) {
    /**
     * Generates an image from a DOM tree
     * @async
     *
     * @param {object} composition_tree - a React-like HTML tree
     * @param {number} img_width - px width for the resulting image
     * @param {object} resvg_options - options for the reSVG library (advancedopt)
     * @param {object} satori_options - options for the satori library (advancedopt)
     */

    // Hackily import generateSatoriSvg ES module
    const generateSatoriSvg = await import('./generateSatoriSvg.mjs').then(
        (m) => m.default,
    )

    if ((satori_options = undefined)) {
        const satoriFonts = {
            medium: fs.readFileSync(
                path.resolve('../assets/fonts/national_park/medium.otf'),
            ),
            regular: fs.readFileSync(
                path.resolve('../assets/fonts/national_park/regular.otf'),
            ),
        }
    }

    satori_options = satori_options ?? {
        width: img_width,
        embedFont: true,
        fonts: [
            {
                name: 'National Park',
                data: satoriFonts.regular,
                weight: 400,
            },
            {
                name: 'National Park',
                data: satoriFonts.medium,
                weight: 500,
            },
        ],
    }

    resvg_options = resvg_options ?? {
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

    const satoriSvg = await generateSatoriSvg(composition_tree, satori_options)

    const resvg = new Resvg(satoriSvg, resvg_options)
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    return await pngBuffer
}
