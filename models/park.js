var mongoose = require("mongoose");

// Creates the park schema
var parkSchema = new mongoose.Schema({
    name: String,
    games: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Game"
      }
   ]
});


module.exports = mongoose.model("Park", parkSchema);
