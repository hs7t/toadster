const { MessageFlags } = require('discord.js')

async function handleCommand(interaction) {
    if (!interaction.isChatInputCommand()) return

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
}

module.exports = handleCommand
