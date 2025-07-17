const { SlashCommandBuilder, Embed } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const secrets = require('../../secrets.json')

async function fetchUrlJson(url) {
    const response = await fetch(url)

    if (!response.ok) {
        console.log('failed')
        console.error(
            'response status:',
            response.status,
            await response.text(),
        )
        return undefined
    }

    const json = await response.json()

    return json
}

function cleanMerriam(text) {
    return text.replace(/\{[^}]+\}/g, '')
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('gives you definitions for a word!')
        .addStringOption((option) =>
            option
                .setName('term')
                .setDescription('a term to define')
                .setRequired(true),
        ),
    async execute(interaction) {
        await interaction.deferReply()

        const query = await interaction.options.getString('term').trim()

        var embeds = {
            merriamWebster: new EmbedBuilder()
                .setFooter({
                    text: 'from the Merriam-Webster Collegiate® Dictionary',
                    iconURL: 'https://www.merriam-webster.com/favicon.png',
                })
                .setColor('#db2b2b')
                .setTimestamp(),
            urbanDictionary: new EmbedBuilder()
                .setFooter({
                    text: 'from Urban Dictionary',
                    iconURL:
                        'https://www.urbandictionary.com/favicon-32x32.png',
                })
                .setColor('#eeff00')
                .setTimestamp(),
        }

        var sources = {
            urbanDictionary: `https://unofficialurbandictionaryapi.com/api/search?term=${encodeURIComponent(query)}&strict=true&`,
            merriamWebsterDictionary: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(query)}?key=${secrets.merriamwebster.dictionary.key}`,
        }

        const responses = {}
        for (const [key, url] of Object.entries(sources)) {
            try {
                responses[key] = await fetchUrlJson(url)
            } catch (error) {
                console.error(
                    `something went wrong whilst fetching from ${key}:`,
                    error,
                )
            }
        }

        if (responses.urbanDictionary != undefined) {
            embeds.urbanDictionary.addFields(
                {
                    name: `${responses.urbanDictionary.data[0].word ?? ''}:`,
                    value: responses.urbanDictionary.data[0].meaning ?? '',
                },
                {
                    name: 'example:',
                    value: responses.urbanDictionary.data[0].example ?? '',
                },
                {
                    name: `by ${responses.urbanDictionary.data[0].contributor ?? ''}`,
                    value: responses.urbanDictionary.data[0].date ?? '',
                },
            )
        } else {
            embeds.urbanDictionary.addFields({
                name: 'not found!',
                value: `it seems "${query}" isn't a term in this Dictionary`,
            })
        }

        // i know this is bad code but it's the only reliable check apparently
        if (responses.merriamWebsterDictionary.meta) {
            embeds.merriamWebster.addFields(
                {
                    name:
                        responses.merriamWebsterDictionary[0].hwi.hw.replace(
                            '*',
                            '',
                        ) ?? '',
                    value:
                        responses.merriamWebsterDictionary[0].hwi.hw.replace(
                            '*',
                            '·',
                        ) ?? '',
                },
                {
                    name: responses.merriamWebsterDictionary[0].fl,
                    value: cleanMerriam(
                        responses.merriamWebsterDictionary[0].shortdef[0],
                    ),
                },
            )

            if (
                responses.merriamWebsterDictionary[0]?.suppl?.examples?.[0]?.t
            ) {
                embeds.merriamWebster.addFields({
                    name: 'example:',
                    value:
                        cleanMerriam(
                            responses.merriamWebsterDictionary[0].suppl
                                .examples[0].t,
                        ) ?? '',
                })
            }
        } else {
            embeds.merriamWebster.addFields(
                {
                    name: 'not found!',
                    value: `it seems "${query}" isn't a term in the Collegiate® Dictionary.`,
                },
                {
                    name: 'similar entries:',
                    value: (() => {
                        entriesList = ''
                        i = 0
                        for (const word of responses.merriamWebsterDictionary) {
                            if (i <= 5) entriesList += `- ${word}\n`
                            i++
                        }
                        return entriesList
                    })(),
                },
            )
        }

        await interaction.editReply({
            embeds: Object.values(embeds),
        })
    },
}
