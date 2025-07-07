const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('info about this server'),
    async execute(interaction) {
        await interaction.reply(
            `this server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members! and I'm in it!`,
        )
    },
}
