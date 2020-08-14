const { prefix } = require('../config.js');
module.exports = bot => {
    console.log( `${bot.user.username} is werking!`);
    bot.user.setActivity(`a tribute to Ainsley`);
};

module.exports.help = {
    name: "ready",
    type: "ready"
}