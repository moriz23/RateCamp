var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest",
    image:"https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    
  },
  {
    name: "Desert Mesa",
    image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    
  },
  {
    name: "Canyon's Floor",
    image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    
  },
]
function seedDb(){
  //Remove Campground
  Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds!")
    //add few campgronds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        } else {
        console.log("added a campground");
        //create a comment
        Comment.create(
          {
            text: "This place is great, but I wish there was wifi",
            author: "Lebron James"
          }, function(err, comment){
              if(err){
                console.log(err);
            } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created a new comment");
            }
          });
        }
      });
    });
  }); 


}



module.exports = seedDb;