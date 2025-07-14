const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getRandomIndex = require('../../utilities/getRandomIndex.js')

const getRandomInteger = require('../../utilities/getRandomInteger.js')

const OMENS = [
    'definitely, yes!',
    'ribbit (it is likely)',
    'for sure',
    'no, chances are.',
    'sure as a rock!',
    'absolutely not.',
    'it is not impossible...',
    'hmm. ribbit.',
    "i don't think so...",
    'perhaps?',
]
const TITLES = ['clairvoyant', 'toadsterest', 'awesome', 'toad-machine']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('soothsay')
        .setDescription('says whether something will happen'),
    async execute(interaction) {
        responseEmbed = new EmbedBuilder()
            .addFields({
                name: `toadster, ${getRandomIndex(TITLES)}, thinks...`,
                value: getRandomIndex(OMENS),
            })
            .setColor('#d1dbff')

        await interaction.reply({ embeds: [responseEmbed] })
    },
}
