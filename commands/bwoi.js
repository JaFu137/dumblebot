module.exports.run = async (bot, message, args) => {

    message.channel.send({embed: { 
        color: 16777215, 
        image:  {
            url: "https://media1.tenor.com/images/67139c56b727742c67cf83571686e1e3/tenor.gif?itemid=5739091"
        }
    }});
}

module.exports.help = {
    name: "bwoi",
    aliases: [],
    hidden: true
}