var db = require("../models");
//var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.FoodList.findAll({}).then(function(dbFoodList) {
      res.render("index", {
        msg: "Welcome!",
        foodList: dbFoodList
      });
    });
  });

  // Load foodlist page and pass in an foodlist by id
  app.get("/foodList/:id", function(req, res) {
    db.FoodList.findOne({
       where: {
          id: req.params.id
        }
       }).then(function(dbFoodList) {
      res.render("index", {
        foodList: dbFoodList
      });
    });
  });

  //Event route loads create.handlebars
  app.get("/eventLists/", function(req, res){
    db.EventList.findAll({}).then(function(results){
      res.render("create", {
        eventList: results
      });
    });
  });

  //Event routes loads update.handlebars
  app.get("/api/eventLists/:id", function(req, res){
    db.EventList.findOne({
      where: {
        id : req.params.id
      }
    }).then(function(results){
      res.render("update", {
        eventList: results
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
