var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Park        = require("./models/park"),
    Game        = require("./models/game"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT 
app.use(require("express-session")({
    secret: "ndnfknekjnfknwknekwnfkewnfkwneknfkw",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.get("/", function(req, res){
    res.render("landing");
});

// ====================
// PARKS ROUTES
// ====================

//INDEX - show all parks
app.get("/parks", function(req, res){
    // Get all parks from DB
    Park.find({}, function(err, allParks){
       if(err){
           console.log(err);
       } else {
          res.render("parks/index",{parks:allParks});
       }
    });
});

//CREATE - add new park to DB
app.post("/parks", function(req, res){
    // get data from form and add to parks array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newPark = {name: name, image: image, description: desc};
    // Create a new park and save to DB
    Park.create(newPark, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to parks page
            res.redirect("/parks");
        }
    });
});

//NEW - show form to create new park
app.get("/parks/new", function(req, res){
   res.render("parks/new"); 
});

// SHOW - shows more info about one park
app.get("/parks/:id", function(req, res){
    //find the park with provided ID
    Park.findById(req.params.id).populate("games").exec(function(err, foundPark){
        if(err){
            console.log(err);
        } else {
          
            //render show template with that park
            res.render("parks/show", {park: foundPark});
        }
    });
});


// ====================
// games ROUTES
// ====================

//NEW - show form to create new game
app.get("/parks/:id/games/new", isLoggedIn, function(req, res){
    // find park by id
    Park.findById(req.params.id, function(err, foundPark){
        if(err){
            console.log(err);
        } else {
            console.log(foundPark);
             res.render("games/new", {park: foundPark});
        }
    });
});

//CREATE - add new game to DB
app.post("/parks/:id/games",isLoggedIn,function(req, res){
   //lookup park using ID
   Park.findById(req.params.id, function(err, foundGame){
       if(err){
           console.log(err);
           res.redirect("/parks");
       } else {
        Game.create(req.body.game, function(err, game){
           if(err){
               console.log(err);
           } else {
               foundGame.games.push(game);
               foundGame.save();
               res.redirect('/parks/' + foundGame._id);
           }
        });
       }
   });
   
});


//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/parks"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/parks",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/parks");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/parks");
}

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});