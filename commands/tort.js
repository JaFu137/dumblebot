const cheerio = require('cheerio');
const request = require('request');

module.exports.run = async (bot, message, args) => {

    let bool = Math.round(Math.random());
    let i = Math.round(Math.random()*10);
    let j = Math.round(Math.random()*10);
    
    if(bool===0){
        var type = "https://www.google.com/search?q=cute%20baby%20animals&tbm=isch&safe=active&safe=active&tbs=itp:animated";
    }else{
        var type = "https://www.dogpile.com/serp?qc=images&q=cursed+images+nsfw&page=" + j + "&sc=SWWu7c8nkUFJ20";
    };


    var option = {
        url: type,
        method: "GET",
        headers:{
            "Accept":"text/html",
            "User-Agent":"Chrome"
        }
    };
    request(option, function(error, response, responsebody) {
    
        if (error){
            return;
        }

        var urls = [];

        const $ = cheerio.load(responsebody);

        $("img").each((index, image)=>{
            urls = urls.concat($(image).attr('src'));
        });
        ///var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr('href'));
        if(!urls.length){
            return console.log("No image found");
        }
        const url = urls[Math.floor(Math.random()*urls.length)];

        message.channel.send({
            files: [{
                attachment: url,
                name: 'SPOILER_NAME.JPG'
            }]
        })
    });

}

module.exports.help = {
    name: "tort",
    aliases: ["t", "trickortreat"],
    hidden: true
}
