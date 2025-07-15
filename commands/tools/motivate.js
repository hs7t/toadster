const {
    SlashCommandBuilder,
    AttachmentBuilder,
    EmbedBuilder,
} = require('discord.js')
const getRandomItem = require('../../utilities/getRandomIndex.js')
const makeMotivationImage = require('../../utilities/makeMotivationImage.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('motivate')
        .setDescription('creates a motivational image!')
        .addStringOption((option) =>
            option
                .setName('quote')
                .setDescription('the motivational quote')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('author')
                .setDescription("the quote's author")
                .setRequired(false),
        ),

    async execute(interaction) {
        await interaction.deferReply()

        quote = {
            content: interaction.options.getString('quote'),
            author: interaction.options.getString('author') ?? undefined,
        }
        const pngBuffer = await makeMotivationImage(quote.content, quote.author)
        const responseAttachment = new AttachmentBuilder(pngBuffer).setName(
            'motivation_image.png',
        )

        const responseEmbed = new EmbedBuilder().setImage(
            'attachment://motivation_image.png',
        )

        await interaction.editReply({
            embeds: [responseEmbed],
            files: [responseAttachment],
        })
    },
}
