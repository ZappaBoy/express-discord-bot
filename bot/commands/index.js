module.exports = {
    Healthcheck: require('./healthcheck'),
    Help: help()
}

const helpPresentation = `This is a discord bot powered by express.\n`

function help() {
    return {
        name: 'help',
        description: 'Show help',
        execute(msg, args) {
            let helpMessage = ''
            for (const key of Object.getOwnPropertyNames(module.exports)) {
                let commandHelp = ''
                const command = module.exports[key]
                commandHelp += command.name.padEnd(20) + "--->\t\t" + command.description
                helpMessage += commandHelp + "\n"
            }
            helpMessage = '```' + helpPresentation + helpMessage + '```'
            msg.channel.send(helpMessage)
        },
    }
}
