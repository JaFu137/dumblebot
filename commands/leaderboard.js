const Discord = require("discord.js");
const mongoose = require("mongoose");


const points = require("../models/points_model.js");

module.exports.run = async (bot, message, args) => {

    const res = points.find({
        House : "Hufflepuff"
    })

    console.log(res)

    let Houses = await points.aggregate([
        { $match : {}},
        { $group: {
            _id: "$House",
            total: {
                $sum: '$Points'
            }
        }},
        { $project: {House: '$_id', _id: 0, Points: '$total'}},
        {$sort: {Points: -1}}
    ])
    
    Houses.forEach((item) => {
        console.log(item);

        points.find({
            'House': item.House
        }).sort([
            ['Points', 'descending']
        ]).exec((err, result) =>{
            if(err) console.log(err);
    
            var page = Math.ceil(result.length / 10);
            let embed = new Discord.MessageEmbed();
            embed.setTitle(`${item.House}, ${item.Points}`);
    
            let pg = parseInt(args[0]);
            if(pg != Math.floor(pg)) pg = 1;
            if(!pg) pg = 1;
            let end = pg*10;
            let start = (pg*10) - 10;
    
            if(result.length === 0) {
                embed.addField("Error");
            }else if(result.length <= start) {
                embed.addField("Error");
            }else if(result.length <= end) {
                embed.setFooter(`Page ${pg} of ${page}`);
                for(i = start; i< result.length; i++) {
                    embed.addField(`${i+1}. ${result[i].Name}`, `${result[i].Points.toLocaleString()}`);
                }
            }else {
                embed.setFooter(`Page ${pg} of ${page}`);
                for(i = start; i< end; i++) {
                    embed.addField(`${i+1}. ${result[i].Name}`, `${result[i].Points.toLocaleString()}`);
                }
            }
            
            message.channel.send(embed);
    
        })

    })
}

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb"]
}