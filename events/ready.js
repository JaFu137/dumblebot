const { prefix } = require('../config.js');
module.exports = bot => {
    console.log( `${bot.user.username} is werking!`);
    bot.user.setActivity('Careless Whisper by George Michael', { type: 'PLAYING' })
};

module.exports.help = {
    name: "ready",
    type: "ready"
}
