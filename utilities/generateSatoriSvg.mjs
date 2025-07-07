import satori from 'satori'

export default async function generateSatoriSvg(dom_tree, options) {
    return await satori(dom_tree, options)
}
