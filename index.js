const { token } = require('./identity.json')
const path = require('node:path')
const { Collection, Events, MessageFlags } = require('discord.js')
const client = require('./clients/discord.js')

const readCommands = require('./utilities/readCommands.js')

const commands = readCommands(path.join(__dirname, 'commands'))
client.commands = new Collection(commands.map((cmd) => [cmd.data.name, cmd]))

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(token)

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return
    console.log(
        `received an interaction from ${interaction.user.username} at ${interaction.member.guild.name}`,
    )

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error(
            `no command matching ${interaction.commandName} was found!`,
        )
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "oh no! there was an error :'(",
                flags: MessageFlags.Ephemeral,
            })
        } else {
            await interaction.reply({
                content: "ouch! there was an error :'(",
                flags: MessageFlags.Ephemeral,
            })
        }
    }
})
