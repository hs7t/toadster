const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const getRandomItem = require('../../utilities/getRandomIndex.js')

const OBJECTS = [
    {
        id: 'golden_ball',
        title: 'golden ball',
        description: 'shiny and from the pond!',
        emoji: '🟡',
    },
    {
        id: 'computer_bit',
        title: 'computer bit',
        description: 'sourced from a fine overflow',
        emoji: '0️⃣',
    },
    {
        id: 'leaves',
        title: 'leaves',
        description: 'from trees',
        emoji: '🍂',
    },
    {
        id: 'lotus',
        title: 'lotus',
        description: 'not nice to hop in',
        emoji: '🪷',
    },
    {
        id: 'letter',
        title: 'letter',
        description: "unsure where it's from...",
        emoji: '✉️',
    },
    {
        id: 'stick',
        title: 'stick',
        description: 'can this build a stickman?',
        emoji: '/',
    },
    {
        id: 'bread',
        title: 'bread',
        description: 'do NOT feed toadster',
        emoji: '🍞',
    },
]
module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch')
        .setDescription('fetches an item for you'),
    async execute(interaction) {
        await interaction.reply('ribbit!')
    },
}
