var express             = require("express");
var app                 = express();
var bodyParser          = require("body-parser");
//var request             = require("request");


app.use(bodyParser.urlencoded({extended: true}));

app.get("/parks", function(req, res){
    res.render("parks.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running!");
});