const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = '770683252326531102';
const guildId = '729746050902130748';

module.exports = (client) => {
    client.handleCommands = async (commandFiles, path) => {
        client.commandArray = [];
        
        for (const file of commandFiles) {            
            const command = require(`${path}/${file}`);

            // Create new command item in the Collection
            // with the name as the key and the exported module as the value
            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                client.logger.log('Refreshing bot commands...');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: client.commandArray },
                );

                client.logger.log('Successfully reloaded bot commands.');
            } catch (error) {
                client.logger.logError(error);
            }
        })();
    };
}