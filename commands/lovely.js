module.exports.run = async (bot, message, args) => {

    message.channel.send({embed: { 
        color: 16777215, 
        image:  {
            url: "https://media1.tenor.com/images/c6e276977d0536664e46d9205539b6f5/tenor.gif?itemid=16370131"
        }
    }});
}

module.exports.help = {
    name: "lovely",
    aliases: [],
    hidden: true
}