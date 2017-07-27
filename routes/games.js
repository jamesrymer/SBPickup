var express = require("express");
var router  = express.Router();
var Park = require("../models/park")
var Game = require("../models/game");




router.get("/parks/games", function(req, res){
    Game.find({}, function(err, allGames){
        if(err){
            console.log(err);
        } else {
            res.render("games/index.ejs", {games: allGames});
        }
    });
});

router.get("/parks/:id/games/new", function(req, res){
      console.log(req.params.id);
    Park.findById(req.params.id, function(err, park){
        if(err){
          
            console.log(err);
        } else {
            console.log(park);
            res.render("games/new.ejs", {park: park});
        }
    });
    
});

router.post("/parks/:id/games", function(req, res){
    Park.findById(req.params.id, function(err, foundPark){
        if(err){
            console.log(err);
            res.redirect("/park/" + req.params.id);
        } else {
            Game.create(req.body.game, function(err, createdGame){
                if(err){
                    console.log(err);
                } else {
                    console.log(createdGame);
                    foundPark.games.push(createdGame);
                    foundPark.save();
                    res.redirect("/parks/" + req.params.id);
                }
            });
        }
    });
});


module.exports = router;