module.exports.run = async (bot, message, args) => {

    message.channel.send({embed: { 
        color: 16777215, 
        image:  {
            url: "https://media1.tenor.com/images/787124df7b41cb4e168683d0f37eb674/tenor.gif?itemid=7933417"
        }
    }});
}

module.exports.help = {
    name: "delightful",
    aliases: [],
    hidden: true
}