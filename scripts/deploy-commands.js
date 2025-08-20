const { REST, Routes } = require('discord.js')
const readCommands = require('../utilities/readCommands.js')
const { clientId, token } = require('../identity.json')
const path = require('node:path')

const commandsFolderPath = path.join(__dirname, '..', 'commands')
const commands = readCommands(commandsFolderPath).map((cmd) =>
    cmd.data.toJSON(),
)

const rest = new REST().setToken(token)

;(async () => {
    try {
        console.log(`deploying ${commands.length} slash commands...`)

        const data = await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        })

        console.log(`successfully deployed ${data.length} slash commands!`)
    } catch (error) {
        console.error(error)
    }
})()
