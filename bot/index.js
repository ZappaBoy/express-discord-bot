require('dotenv').config()
const TOKEN = process.env.TOKEN || (console.error("TOKEN not set.") && process.exit(1))
const {Client, Intents, Collection} = require('discord.js')
const bot = new Client({intents: [Intents.FLAGS.GUILDS]});
const commands = require('./commands')

/*
    Replace with a string pattern or a char to identify a command.
    Example:
        1) commandTriggerPattern = 'zappabot ' // Note the space at the end.
            // Message 'zappabot help' trigger help command.
        2) commandTriggerPattern = '!'
            // Message '!help' trigger help command.
*/
const commandTriggerPattern = 'zappabot '

bot.commands = new Collection()

Object.keys(commands).map(key => {
    bot.commands.set(commands[key].name, commands[key])
})

bot.on('ready', () => {
    console.log(`Bot is ready and logged in as ${bot.user.tag}.`);
});

bot.on('message', msg => {
    if (!msg.content.startsWith(commandTriggerPattern)) {
        return
    }
    const message = msg.content.substring(commandTriggerPattern.length);
    const args = message.split(/ +/);
    const command = args.shift().toLowerCase();
    if (!bot.commands.has(command)) return;

    console.info(`Called command: ${command}`);
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
