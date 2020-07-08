module.exports.run = async (bot, message, args) => {

    message.channel.send({embed: { 
        color: 16777215, 
        image:  {
            url: "https://media1.tenor.com/images/c87015f87c3fc68efa72d95f7f1c6ccd/tenor.gif?itemid=7329859"
        }
    }});
}

module.exports.help = {
    name: "spicy",
    aliases: [],
    hidden: true
}