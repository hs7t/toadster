export function createModal() {
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
