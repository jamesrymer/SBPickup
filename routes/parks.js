var express = require("express");
var router  = express.Router();
var Park = require("../models/park");

var parks = [
    {name: "twin creeks" },    
    {name: "random1" },   
    {name: "random 2" },   
    {name: "random3" }    
];

// ================================
// PARKS ROUTES
// ================================

// INDEX Displays All Parks
router.get("/parks", function(req, res){
    Park.find({}, function(err, allParks){
        if(err){
            console.log("err");
        } else {
             res.render("parks.ejs",{parks: allParks});
        }
    });
   
});

// NEW Displays form to make a new park
router.get("/parks/new", function(req, res){
    res.render("new.ejs");
});

// CREATE Creates a new dog from the new.ejs
// form and adds to the DB
router.post("/parks", function(req, res){
  var newPark = req.body.park;
  
  Park.create(newPark, function(err, createdPark){
      if(err){
          console.log(err);
      } else {
          console.log(createdPark);
          res.redirect("/parks");
      }
  });
  
});

module.exports = router;

