const fs = require("fs");
const points = require("../points.json");

module.exports.run = async (bot, message, args) => {
    
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
        if(!points[house]) {
            points[house] = {

            }
        }
        points_ = points[house];

        //return message.channel.send(`${user.username}`);
        if(!points_[user.id]) {
            //Innit new user in database
            points_[user.id] = {
                name: user.tag,
                points: mult*change               
            }
        
            fs.writeFile("./points.json", JSON.stringify(points), (err) => {
                if(err) console.log(err);
            });
        }else {
            points_[user.id].points += mult*change
            
            fs.writeFile("./points.json", JSON.stringify(points), (err) => {
                if(err) console.log(err);
            })
        }
        message.channel.send(`${user.tag} has ${points_[user.id].points} points for ${house}.`)
    })
    
}

module.exports.help = {
    name: "points",
    aliases: ["pts"]
}