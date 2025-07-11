const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bzz')
        .setDescription('says "ribbit" back!'),
    async execute(interaction) {
        await interaction.reply('ribbit!')
    },
}
