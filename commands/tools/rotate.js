const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rotate')
        .setDescription('rotates all letters in text by an amount!')
        .addNumberOption((option) =>
            option
                .setName('rotation-amount')
                .setDescription('how much to rotate')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('text')
                .setDescription('the text whose letters to rotate')
                .setRequired(true),
        ),

    async execute(interaction) {
        const rotations = await interaction.options.getNumber('rotation-amount')
        const text = await interaction.options.getString('text')

        await interaction.reply({
            content: '```\n' + rotate(rotations, text) + '\n```',
            allowedMentions: {
                parse: [],
            },
        })
    },
}

function rotate(n, text) {
    return text.replace(/[a-zA-Z]/g, (char) => {
        const base = char <= 'Z' ? 65 : 97
        return String.fromCharCode(
            ((char.charCodeAt(0) - base + n + 26) % 26) + base,
        )
    })
}
