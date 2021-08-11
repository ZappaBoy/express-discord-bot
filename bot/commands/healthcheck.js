module.exports = {
    name: 'healthcheck',
    description: 'Check status!',
    execute(msg, args) {
        msg.reply('Alive');
        msg.channel.send('Alive')
    },
}
