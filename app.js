var express             = require("express");
var app                 = express();
var bodyParser          = require("body-parser");
var mongoose            = require("mongoose");

mongoose.connect("mongodb://localhost/sbpickup");
app.use(bodyParser.urlencoded({extended: true}));

var parks = [
    {name: "twin creeks" },    
    {name: "random1" },   
    {name: "random 2" },   
    {name: "random3" }    
];
    
// ================================
// PARKS ROUTES
// ================================

//INDEX Displays All Parks
app.get("/parks", function(req, res){
    res.render("parks.ejs",{parks: parks});
});

app.get("/parks/new", function(req, res){
    res.render("new.ejs");
});

app.post("/parks", function(req, res){
  var park = req.body.park;
  
  parks.push(park);
  res.redirect("/parks");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running!");
});