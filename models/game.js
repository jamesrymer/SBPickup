var mongoose = require("mongoose");

// Creates the park schema
var gameSchema = new mongoose.Schema({
    name: String,
    
});


module.exports = mongoose.model("Game", gameSchema);
