const { prefix } = require('../config.js');
module.exports = bot => {
    console.log( `${bot.user.username} is werking!`);
    bot.user.setActivity(`Dumbling and Dooring!`);
};

module.exports.help = {
    name: "ready",
    type: "ready"
}