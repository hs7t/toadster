const fs = require('node:fs')
const path = require('node:path')

function readCommands(commandsFolderPath) {
    const commands = []

    const commandFolders = fs.readdirSync(commandsFolderPath)

    for (const folder of commandFolders) {
        const commandsPath = path.join(commandsFolderPath, folder)
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith('.js'))

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file)
            const command = require(filePath)
            if ('data' in command && 'execute' in command) {
                commands.push(command)
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
                )
            }
        }
    }

    return commands
}

module.exports = readCommands
