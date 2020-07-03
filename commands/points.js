const mongoose = require("mongoose");
const points = require("../models/points_model.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply("You have no power here!");
    }
    if(!message.mentions.users.size) {
        return message.channel.send("Who are these points for bruv?");
    } else {
        var users = message.mentions.users;
    }

    let mult; 
    let change = 0;
    if(args[1] === "from") {
        mult =  -1;
    }else { 
        mult = 1;
    }
    if(/^\d+$/.test(args[0])) {
        change = parseInt(args[0]);    
    }

    users.forEach((user) => {

        let member = message.guild.member(user)
        /// Check the house group
        if(member.roles.cache.some(r => r.name === "Gryffindor")){
            var house = "Gryffindor";
        }else if(member.roles.cache.some(r => r.name === "Ravenclaw")){
            var house = "Ravenclaw";
        }else if(member.roles.cache.some(r => r.name === "Hufflepuff")){
            var house = "Hufflepuff";
        }else if(member.roles.cache.some(r => r.name === "Slytherin")){
            var house = "Slytherin";
        }else {
            return message.channel.send(`${member.user.username} needs to face the sorting hat`);
        }

        points.findOne({
            'Id': user.id
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                const newUser = new points({
                    Id: user.id, 
                    Name: user.tag,
                    Points: mult*change,
                    House: house,
                })
                newUser.save().catch(err => console.log(err));
                return message.channel.send(`${user.tag} has ${mult*change} points for ${house}.`);
            }else {
                data.Points += mult*change;
                data.save().catch(err => console.log(err));
                return message.channel.send(`${user.tag} has ${data.Points} points for ${house}.`);
            }
        })

    })
    
}


module.exports.help = {
    name: "points",
    aliases: ["pts"]
}