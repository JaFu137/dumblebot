const mongoose = require("mongoose");

const dataShema = mongoose.Schema({
    Id: String, 
    Name: String,
    Points: Number,
    House: String, 
})

module.exports = mongoose.model("Data", dataShema);
