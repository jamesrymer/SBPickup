var mongoose = require("mongoose");

var parkSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   games: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Game"
      }
   ]
});

module.exports = mongoose.model("Park", parkSchema);