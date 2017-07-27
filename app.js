var express             = require("express");
var app                 = express();
var bodyParser          = require("body-parser");
var mongoose            = require("mongoose");

mongoose.connect("mongodb://localhost/sbpickup");
app.use(bodyParser.urlencoded({extended: true}));

var gameRoutes = require("./routes/games");
var parkRoutes = require("./routes/parks");

app.use(gameRoutes);
app.use(parkRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running!");
});


    
