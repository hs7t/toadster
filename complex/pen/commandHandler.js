const createModal = import('./modal.js')
const {
    ActionRowBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js')

const Sentiment = require('sentiment')

export async function handleCommand(interaction) {
    var letter = {}

    modal = await createModal()
    await interaction.showModal(modal)

    const sentiment = new Sentiment()
    letter.rating = sentiment.analyze(letter.content)
}
