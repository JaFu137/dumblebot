const mongoose = require('mongoose');
const { mongoPass } = require('../config.js');

module.exports = {
    init: () => {
        const dbOptions = { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(mongoPass, dbOptions);
        mongoose.set('useFindAndModify', false);

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });
        mongoose.connection.on('err', err => {
            console.log(`Error connecting to MongoDB: \n ${err.stack}`);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });
    }
};