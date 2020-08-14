const Discord = require("discord.js");
const mongoose = require("mongoose");


const points = require("../models/points_model.js");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Leaderboard`);

    const array = await lb_array();
    let num;

    if(!args[0]){
        num = 3;
    }else if(args[0].toLocaleLowerCase() === "all"){
        num = 100;
    }else{
        num = parseInt(args[0]);
    }

    for (var i=0; i<4; i++){
        var str = "";
        var end = num;
        if(array[i].people.length <= end) {
            end = array[i].people.length;
        }
        for (var j=0; j<end; j++){
            str = str.concat(`${array[i].people[j].Name}:   ${array[i].people[j].Points} \n`);
        }
        embed.addField(`${array[i].House}:  ${array[i].Total}`, str);
    }

    message.channel.send(embed);
}

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb"],
    hidden: false,
    usage: "d! leaderboard",
    description: "Show the points leaderboard."
}

async function lb_array() {
    var array = [];
    const Houses = await getHouseorder();
    //console.log(Houses);

    for(var i = 0; i < 4; i++){
        //console.log(Houses[i].House);
        array.push({
            House: Houses[i].House,
            Total: Houses[i].Points,
            people: []
        })
        const data = await getUserOrder(Houses[i].House);
        array[i].people = array[i].people.concat(data)
        //console.log(data);
    }
    return array;
}

async function getHouseorder(){
    let Houses = await points.aggregate([
        { $match : {}},
        { $group: {
            _id: "$House",
            total: {
                $sum: '$Points'
            }
        }},
        { $project: {House: '$_id', _id: 0, Points: '$total'}},
        {$sort: {Points: -1}}, 
    ])
    return Houses
}

async function getUserOrder(house){
    const result = await points.aggregate([
        {$match : { 'House' : house}},
        {$sort: {Points: -1}}
    ])
    return result;
}