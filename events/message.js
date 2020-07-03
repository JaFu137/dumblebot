const { prefix } = require('../config.js');

module.exports = (bot, message) => {

    if(message.channel.dm == "dm") return;
    if(message.author.bot) return;  // Dont respond to bots and dm

    // Check for prefix, define args and commands
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd;

    if(/^\d+$/.test(args[0])) {
        // if message starts with a number
        cmd = args[1].toLocaleLowerCase();
        args.splice(1,1);
    }else{
        cmd =  args.shift().toLowerCase();
    }

    let command;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    // Run commands
    if(bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    }else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }
    try {
        command.run(bot, message, args);
    } catch (e) {
        return;
    }
}

module.exports.help = {
    name: "message",
    type: "message"
}