const mongoose = require("mongoose");
const Discord = require("discord.js");
const points = require("../models/points_model.js");
const { DiscordAPIError } = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS') && !args[3]) {
        return message.reply("You have no power here!");
    }    
    if(!message.mentions.users.size) {
        message.reply("Who are these points for bruv?");
        const filter = m => m.author.id === message.author.id;
        const collector = new Discord.MessageCollector(message.channel, filter, { max: 1});
        //console.log(collector);
        collector.on('collect', m => {
            //console.log(m);
            if(m.mentions.users.size != 0){
                collector.stop();
                var users = m.mentions.users;
                return changePoints(users, message, args);

            }
        })

    } else {
        var users = message.mentions.users;
        return changePoints(users, message, args);
    }
    
}


module.exports.help = {
    name: "points",
    aliases: ["point", "pts", "pt"],
    hidden: false,
    usage: "d! # points [to/from] @user. Leave # blank to check points.",
    description: "Gives or take points to the user. The word points can be replaced with any of aliases."
}

async function getUsers(message){

    if(!message.mentions.users.size) {
            
        message.reply("Who are these points for bruv?");
        const filter = m => m.author.id === message.author.id;
        const collector = new Discord.MessageCollector(message.channel, filter, { max: 1});
        //console.log(collector);
        collector.on('collect', m => {
            console.log(m);
            if(m.mentions.users.size != 0){
                collector.stop();
                return m.mentions.users;

            }
        })

    } else {
        return message.mentions.users;
    }
}

async function changePoints(users, message, args){

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

        if(message.author.id === user.id && change > 0 && mult > 0){
            message.channel.send(`Oi, ${message.author.username}, stop trying to give yourself points you degenerate!! Shame!!`);
            message.channel.send({embed: { 
                color: 16777215, 
                image:  {
                    url: "https://media.giphy.com/media/vX9WcCiWwUF7G/giphy.gif"
                }
            }});
            return;
        }
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

        var name =  member.nickname;
        if(!name){
            name = user.tag;
        }

        points.findOne({
            'Id': user.id
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                const newUser = new points({
                    Id: user.id, 
                    Name: name,
                    Points: mult*change,
                    House: house,
                })
                newUser.save().catch(err => console.log(err));
                return message.channel.send(`${name} has ${mult*change} points for ${house}.`);
            }else {
                data.Points += mult*change;
                data.save().catch(err => console.log(err));
                return message.channel.send(`${name} has ${data.Points} points for ${house}.`);
            }
        })

    })
}
