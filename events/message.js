const { prefix } = require('../config.js');

keys = ["thank", "Thank"]

module.exports = (bot, message) => {

    if(message.channel.dm == "dm") return;
    if(message.author.bot) return;  // Dont respond to bots and dm

    keys.forEach(key => {if(message.content.includes(key)){
        let command = bot.commands.get("points");
        command.run(bot, message, [10, "to", message.mentions.user, true]);
        return;
    }});

    if(message.content.toLocaleLowerCase().includes("spicy")){
        let command = bot.commands.get("spicy");
        command.run(bot, message);
        return;
    }

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
    
    // Run commands
    if(bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    }else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }else {
        return message.channel.send("That's not a command fam. Use d! help for list of commands");
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