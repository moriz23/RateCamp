var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")

//Index - show all campgrounds
router.get("/", function(req, res){
  //Get all campgrounds from db
  Campground.find({}, function(err, allcampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allcampgrounds});
    }
  });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//Create - add new campgrounds to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: desc, author:author}
  //Create a new campground and save to db
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
        //redirect back to campgorunds page
        console.log(newlyCreated);
        res.redirect("/campgrounds");
    }
  });
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
  //find campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground);
      //render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
}); 

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  //is user logged in
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});
    
 

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  //find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  //redirect to show page
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
})

module.exports = router;