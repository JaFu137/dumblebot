module.exports.run = async (bot, message, args) => {

    message.channel.send({embed: { 
        color: 16777215, 
        image:  {
            url: "https://media1.tenor.com/images/31b7344a138dac565a1c31fe4a1dce78/tenor.gif?itemid=16237480"
        }
    }});
}

module.exports.help = {
    name: "honk",
    aliases: [],
    hidden: true
}