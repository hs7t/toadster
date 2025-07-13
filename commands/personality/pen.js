const { SlashCommandBuilder } = require('discord.js')
const handleCommand = require('../../complex/pen/commandHandler.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pen')
        .setDescription('lets you pen a letter!'),
    async execute(interaction) {
        handleCommand(interaction)
    },
}
