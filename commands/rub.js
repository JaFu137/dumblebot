module.exports.run = async (bot, message, args) => {

    message.channel.send({embed: { 
        color: 16777215, 
        image:  {
            url: "https://media1.tenor.com/images/89a46a51951376ef56fa739f7d3a31f4/tenor.gif?itemid=15882345"
        }
    }});
}

module.exports.help = {
    name: "rub",
    aliases: [],
    hidden: true
}