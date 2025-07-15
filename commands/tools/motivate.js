const { SlashCommandBuilder } = require('discord.js')
const getRandomItem = require('../../utilities/getRandomIndex.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('motivate')
        .setDescription('creates a motivational image!'),
    async execute(interaction) {
        await interaction.reply('ribbit!')
    },
}
