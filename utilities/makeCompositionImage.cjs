const path = require('node:path')
const fs = require('node:fs')
const { Resvg } = require('@resvg/resvg-js')
const { Buffer } = require('node:buffer')

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

    // Screw node.js who said that
    const __dirname = path.dirname(__filename)

    const satoriFonts = {
        medium: fs.readFileSync(
            path.resolve(
                path.join(
                    __dirname,
                    '..',
                    'assets',
                    'fonts',
                    'national_park',
                    'medium.otf',
                ),
            ),
        ),
        regular: fs.readFileSync(
            path.resolve(
                path.join(
                    __dirname,
                    '..',
                    'assets',
                    'fonts',
                    'national_park',
                    'regular.otf',
                ),
            ),
        ),
    }

    if (satori_options == undefined) {
        satori_options = {
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
    }
    if (resvg_options == undefined) {
        resvg_options = resvg_options ?? {
            font: {
                loadSystemFonts: false,
                fontFiles: [
                    path.join(
                        __dirname,
                        '..',
                        'assets',
                        'fonts',
                        'national_park',
                        'medium.woff2',
                    ),
                    path.join(
                        __dirname,
                        '..',
                        'assets',
                        'fonts',
                        'national_park',
                        'regular.woff2',
                    ),
                ],
                fitTo: {
                    mode: 'original',
                },
            },
        }
    }

    const satoriSvg = await generateSatoriSvg(composition_tree, satori_options)

    const resvg = new Resvg(satoriSvg, resvg_options)
    const pngData = resvg.render()
    const pngBuffer = Buffer.from(pngData.asPng())
    console.log(pngBuffer)

    return await pngBuffer
}
