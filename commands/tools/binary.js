const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('binary')
        .setDescription('turns text binary!')
        .addStringOption((option) =>
            option
                .setName('text')
                .setDescription('the text to turn into binary')
                .setRequired(true),
        ),
    async execute(interaction) {
        text = await interaction.options.getString('text')
        await interaction.reply({
            content: '```\n' + binary(text) + '\n```',
            allowedMentions: {
                parse: [],
            },
        })
    },
}

function binary(text) {
    output = ''

    for (const char of text) {
        output += char.charCodeAt(0).toString(2)
    }

    return output
}
