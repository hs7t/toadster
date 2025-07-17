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

        const query = await interaction.options.getString('term')

        var embeds = {
            merriamWebsterDictionary: new EmbedBuilder()
                .setFooter({ text: 'from Merriam Webster' })
                .setColor('#db2b2b')
                .setTimestamp(),
            urbanDictionary: new EmbedBuilder()
                .setFooter({ text: 'from Urban Dictionary' })
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
        }

        // i know this is bad code but it's the only reliable check apparently
        if (responses.merriamWebsterDictionary.meta) {
            embeds.merriamWebsterDictionary.addFields(
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
                embeds.merriamWebsterDictionary.addFields({
                    name: 'example:',
                    value:
                        cleanMerriam(
                            responses.merriamWebsterDictionary[0].suppl
                                .examples[0].t,
                        ) ?? '',
                })
            }
        }

        // console.log(responses.merriamWebsterDictionary)
        await interaction.editReply({
            embeds: Object.values(embeds),
        })
    },
}
