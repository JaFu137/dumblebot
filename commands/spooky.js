module.exports.run = async (bot, message, args) => {

    message.channel.send({embed: { 
        color: 16777215, 
        image:  {
            url: "https://media1.tenor.com/images/dc8a0b321d1e812cdfd1bf436fde5480/tenor.gif?itemid=6469638"
        }
    }});
}

module.exports.help = {
    name: "spooky",
    aliases: [],
    hidden: true
}