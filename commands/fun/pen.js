const { SlashCommandBuilder } = require('discord.js')
const {
    ActionRowBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js')

const Sentiment = require('sentiment')

function createModal() {
    const modal = new ModalBuilder()
        .setCustomId('letterContent')
        .setTitle('Letter to toadster')

    const letterContentInput = new TextInputBuilder()
        .setCustomId('letterContentInput')
        .setLabel('Write a letter...')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Dearest toad,')
        .setMinLength(100)
        .setRequired(true)

    const actionRowA = new ActionRowBuilder().addComponents(letterContentInput)

    modal.addComponents(actionRowA)

    return modal
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pen')
        .setDescription('lets you pen a letter!'),
    async execute(interaction) {
        var letter = {}

        modal = await createModal()
        await interaction.showModal(modal)

        const filter = (i) =>
            i.customId === 'letterContent' && i.user.id === interaction.user.id

        try {
            const submitted = await interaction.awaitModalSubmit({
                filter,
                time: 60_000_000,
            })

            letter.content =
                submitted.fields.getTextInputValue('letterContentInput')

            await submitted.followUp({
                content: 'i got your letter!',
                ephemeral: true,
            })
        } catch (err) {
            console.error('submission failed:', err)
            await interaction.followUp({
                content: "oh no! you didn't write a letter in time.",
                ephemeral: true,
            })
        }

        const sentiment = new Sentiment()
        letter.rating = sentiment.analyze(letter.content)
    },
}
