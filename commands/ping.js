module.exports.run = async (bot, message, args) => {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms`);

}

module.exports.help = {
    name: "ping",
    aliases: ["p"],
    hidden: true,
    description: "Send ping to test bot."
}