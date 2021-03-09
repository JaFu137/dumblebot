const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    if(args[0]){
        let command = args[0];
        if(bot.commands.has(command)){
            console.log(bot.commands)
            command = bot.commands.get(command);
            sendhelp(bot, message,command, embed);
        }
    }

    if(!args[0]){
        bot.commands.forEach(element => {
            if(!element.help.hidden){
                sendhelp(bot, message, element, embed);
            }
        });
    }
    message.channel.send(embed);

}

function sendhelp(bot, message, command, embed){         
    embed.setAuthor(bot.user.username);
    embed.addField(`Name: ${command.help.name} \nAliases: `, `${command.help.aliases}`);
    embed.addField(`Usage: `, `${command.help.usage}`);
    embed.addField(`Description: `, `${command.help.description}`);
}

module.exports.help = {
    name: "help",
    aliases: ["h"],
    hidden: true
}
