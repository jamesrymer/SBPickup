var mongoose = require("mongoose");

// Creates the park schema
var parkSchema = new mongoose.Schema({
    name: String
});


module.exports = mongoose.model("Park", parkSchema);
