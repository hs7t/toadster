const { SlashCommandBuilder, MessageAttachment } = require('discord.js')
const frameMessage = require('../../utilities/frameMessage.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('museum')
        .setDescription('puts a message in a museum')
        .addStringOption((option) =>
            option
                .setName('message-url')
                .setDescription('the URL for a message to display')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('title')
                .setDescription('a short name for the masterwork')
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName('author')
                .setDescription("the artist's name")
                .setRequired(false),
        ),

    async execute(interaction) {
        const today = new Date()
        workingMessage = {
            url: interaction.options.getString('message-url'),
        }

        workingMessage.url_parts = workingMessage.url
            .trim()
            .replace('https://discord.com/channels/', '')
            .split('/')
        workingMessage.channel_id = workingMessage.url_parts[1]
        workingMessage.id = workingMessage.url_parts[2]
        workingMessage.channel = await interaction.client.channels.fetch(
            workingMessage.channel_id,
        )
        workingMessage.obj = await workingMessage.channel.messages.fetch(
            workingMessage.id,
        )

        piece = {
            title: interaction.options.getString('input') ?? 'Untitled',
            date: `${today.getDate}/${today.getMonth}/${today.getFullYear}`,
            message: {
                content: workingMessage.obj.content,
            },
            author: {
                username: workingMessage.obj.author.username,
                display_name:
                    workingMessage.obj.member.nickname ??
                    workingMessage.obj.author.displayName,
                avatar_url: workingMessage.obj.author.avatarURL('png') ?? '',
            },
        }

        const pngBuffer = frameMessage(
            piece.author.username,
            piece.author.avatar_url,
            piece.author.display_name,
            piece.title,
            piece.message.content,
            piece.date,
        )
        const attachment = new MessageAttachment()
        console.log(workingMessage)
        console.log(piece)
        // console.log(interaction)
        await interaction.reply({ embeds: [] })
    },
}
