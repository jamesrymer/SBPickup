var mongoose = require("mongoose");

var gameSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Game", gameSchema);