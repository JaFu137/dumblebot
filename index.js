const Discord = require("discord.js");
const { prefix, token } = require("./botconfig.json");
const bot = new Discord.Client({ disableEveryone: true});
const fs = require("fs");

bot.commands = new Discord.Collection();
bot.aliases =  new Discord.Collection();

// Read commands folder
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Couldnt fine any commands!");
        return;
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

bot.on("ready", async () => {
    console.log( `${bot.user.username} is online!`);
    bot.user.setActivity(`Dumbling and Dooring!`);
})

bot.on("message", async message => {

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

})

bot.login(token);