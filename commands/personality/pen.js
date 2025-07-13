const { SlashCommandBuilder } = require('discord.js')

const {
    ActionRowBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js')

const Sentiment = require('sentiment')

const LETTER_CONTENT_INPUT_ID = 'letterContentInput'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pen')
        .setDescription('pen a letter to toadster!'),
    async execute(interaction) {
        var letter = {}
        const modal = createModal()

        await interaction.showModal(modal)

        const filter = (i) =>
            i.customId === 'letterContent' && i.user.id === interaction.user.id

        interaction
            .awaitModalSubmit({ filter, time: 120_000 })
            .then(async (submission) => {
                await submission.deferReply()
                letter.content = submission.fields.getTextInputValue(
                    LETTER_CONTENT_INPUT_ID,
                )
                const sentiment = new Sentiment()
                letter.rating = sentiment.analyze(letter.content)

                submission.followUp({
                    content: 'ribeep! letter received',
                    ephemeral: true,
                })
                print(letter.rating)
            })
            .catch((error) => {
                console.error(`something bad happened: ${error}`)
                interaction.followUp({
                    content: "oh no! you didn't send your letter in time.",
                    ephemeral: true,
                })
            })
    },
}

function createModal() {
    const modal = new ModalBuilder()
        .setCustomId('letterContent')
        .setTitle('Letter to toadster')

    const letterContentInput = new TextInputBuilder()
        .setCustomId(LETTER_CONTENT_INPUT_ID)
        .setLabel('Write a letter...')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Dearest toad,')
        .setMinLength(100)
        .setRequired(true)

    const actionRowA = new ActionRowBuilder().addComponents(letterContentInput)

    modal.addComponents(actionRowA)

    return modal
}
