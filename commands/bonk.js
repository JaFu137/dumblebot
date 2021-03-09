module.exports.run = async (bot, message, args) => {

    if(message.member.roles.cache.some(role => role.name ===  "Horny Police")){
        if(!message.mentions.users.size) {
            return
        }
        else{
            var users = message.mentions.users;
            users.forEach((user) => {
                if (message.guild.member(user.id).voice.channel){
                    message.guild.member(user.id).voice.setChannel("818941684082933780")
                }
                message.channel.send(`${user.username}`);
                message.channel.send({embed: { 
                    color: 16777215, 
                    image:  {
                    url: "https://media1.tenor.com/images/44eb591472a380a74d729a462d6185ba/tenor.gif?itemid=18281389"
                    }
                }});
            })
        }
    }
}



module.exports.help = {
    name: "bonk",
    aliases: [],
    hidden: true
}
