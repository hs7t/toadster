const { SlashCommandBuilder, Embed } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const secrets = require('../../secrets.json')

async function getWolframShortAnswer(query) {
    const url = `http://api.wolframalpha.com/v1/result?appid=${secrets.wolframalpha.shortanswers.key}&i=${encodeURIComponent(query)}&units=metric&timeout=10`

    const response = await fetch(url)

    if (!response.ok) {
        console.error(
            'API response status:',
            response.status,
            await response.text(),
        )
        throw new Error('oh no! error in response')
    }

    return await response.text()
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('answer')
        .setDescription(
            'gives you a short answer to a query using Wolfram Alpha!',
        )
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription(
                    'a query, like "distance from Bogotá to Lisboa"',
                )
                .setRequired(true),
        ),

    async execute(interaction) {
        await interaction.deferReply()

        const query = await interaction.options.getString('query')

        let answer = undefined
        try {
            answer = await getWolframShortAnswer(query)
        } catch (error) {
            console.error(
                'something went wrong in getWolframShortAnswer:',
                error,
            )
            return
        }

        const responseEmbed = new EmbedBuilder()
            .setTitle(answer)
            .setDescription(`result for "${query}"`)
            .setFooter({
                text: 'from Wolfram Alpha',
                iconURL:
                    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/d8cb2fff044f8938b4562652a3fa5d1a103ccddf_spikey.png',
            })
            .setColor('#f56200')
            .setTimestamp()

        await interaction.editReply({ embeds: [responseEmbed] })
    },
}
