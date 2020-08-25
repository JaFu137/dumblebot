const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true});
const fs = require("fs");
const config = require('./config.js');

bot.commands = new Discord.Collection();
bot.aliases =  new Discord.Collection();
bot.mongoose = require(`./utils/mongoose`)

// Read Commands
fs.readdir("./commands/", async (err, files) => {
    if(err) console.log(err);
    files.forEach(file =>{
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = props.help.name;
        console.log(`${cmdName} loaded!`);
        bot.commands.set(cmdName, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name)
        });
    })
});

// Read Events
fs.readdir('./events/', (err, files) => {
    if(err) console.log(err);
    files.forEach(file => {
        if(!file.endsWith('.js')) return;
        let evt = require(`./events/${file}`);
        let evtName = evt.help.name;
        let evtType = evt.help.type
        console.log(`${evtName} loaded!`);
        bot.on(evtType, evt.bind(null, bot));
    });
});

bot.mongoose.init();
bot.login(config.token);
