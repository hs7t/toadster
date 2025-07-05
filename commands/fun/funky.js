const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('funky')
        .setDescription('mAkEs tExT fUnKy!')
        .addStringOption((option) =>
            option
                .setName('input')
                .setDescription('tHe TeXt To FuNk Up')
                .setRequired(true),
        ),
    async execute(interaction) {
        const input = await interaction.options.getString('input')

        let i = 0
        let output = ''
        for (const character of input) {
            if (!/^[a-zA-Z]$/.test(character)) {
                output += character
                
                i = 0
                continue
            } else if (i % 2 === 0) {
                output += character.toLowerCase()
            } else {
                output += character.toUpperCase()
            }
            i++
        }

        await interaction.reply(output)
    },
}
