require('dotenv').config()
const TOKEN = process.env.TOKEN || (console.error("TOKEN not set.") && process.exit(1))

const {Client, Intents, Collection} = require('discord.js')
const bot = new Client({intents: [Intents.FLAGS.GUILDS]});
const botCommands = require('./commands')

bot.commands = new Collection()

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key])
})

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}.`);
});

bot.on('message', msg => {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('There seems to have been a problem');
    }
})

bot.on('exit', () => {
    console.log('Exited.');
});

bot.login(TOKEN)
    .then((status) => {
        console.log('Logged.')
    })
    .catch((error) => {
        console.warn('Login error:')
        console.error(error)
    })
