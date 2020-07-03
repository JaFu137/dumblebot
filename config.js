require('dotenv-flow').config();

module.exports = { 
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    mongoPass: process.env.MONGOPASS
};