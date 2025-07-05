const { REST, Routes } = require("discord.js");
const readCommands = require("./utilities/readCommands.js");
const { clientId, guildId, token } = require("./identity.json");
const path = require("node:path");

const commandsFolderPath = path.join(__dirname, "commands");
const commands = readCommands(commandsFolderPath).map((cmd) =>
    cmd.data.toJSON(),
);

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`,
        );

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`,
        );
    } catch (error) {
        console.error(error);
    }
})();
