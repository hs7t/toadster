const { SlashCommandBuilder } = require('discord.js')
const getRandomItem = require('../../utilities/getRandomIndex.js')

const {
    ActionRowBuilder,
    Events,
    EmbedBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js')

const Sentiment = require('sentiment')

const LETTER_CONTENT_INPUT_ID = 'letterContentInput'

const RESPONSES = {
    positive: [
        {
            title: `toadster loved your letter!`,
            subtitle: `especially the "%[highlight]" part!`,
        },
        {
            title: `toadster thought it was nice getting your letter!`,
        },
    ],
    neutral: [
        {
            title: `toadster received your letter!`,
            subtitle: `it said 'ribbit'.`,
        },
        {
            title: `toadster says 'wowie'!`,
        },
    ],
    negative: [
        {
            title: `toadster didn't quite understand your letter!`,
            subtitle: `its knowledge comprises mostly toadster matters, you see.`,
        },
        {
            title: `toadster got your letter!`,
            subtitle: `but toadsters are not very good at reading... try again?`,
        },
        {
            title: `oh no! toadster was in a rush and lost your letter...`,
            subtitle: `many apologies!`,
        },
    ],
}

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

        const responseEmbed = new EmbedBuilder()

        interaction
            .awaitModalSubmit({ filter, time: 120_000 })
            .then(async (submission) => {
                await submission.deferReply()
                letter.content = submission.fields.getTextInputValue(
                    LETTER_CONTENT_INPUT_ID,
                )
                const sentiment = new Sentiment()
                letter.rating = sentiment.analyze(letter.content)

                var selectedResponse = ''
                if (letter.rating.score > 0) {
                    selectedResponse = getRandomItem(RESPONSES.positive)
                } else if (letter.rating.score === 0) {
                    selectedResponse = getRandomItem(RESPONSES.neutral)
                } else if (letter.rating.score < 0) {
                    selectedResponse = getRandomItem(RESPONSES.negative)
                }

                responseEmbed
                    .setTitle(selectedResponse.title)
                    .addFields({
                        name: '\u200B',
                        value: selectedResponse.subtitle ?? '\u200B',
                    })
                    .setColor('#DCFFD1')

                submission.editReply({ embeds: [responseEmbed] })
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
