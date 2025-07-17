const { token } = require('./identity.json')
const path = require('node:path')
const { Collection, Events, MessageFlags } = require('discord.js')
const client = require('./clients/discord.js')
const handleCommand = require('./utilities/handleCommand.js')

const readCommands = require('./utilities/readCommands.js')

const commands = readCommands(path.join(__dirname, 'commands'))
client.commands = new Collection(commands.map((cmd) => [cmd.data.name, cmd]))

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(token)

client.on(Events.InteractionCreate, async (interaction) => {
    handleCommand(interaction)
})
