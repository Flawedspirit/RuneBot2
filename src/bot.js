const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

require('dotenv').config();

const commands = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const events = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));

(async() => {
    for(file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(events, '../events');
    client.handleCommands(commands, '../commands');
    client.login(process.env.TOKEN);
})();
