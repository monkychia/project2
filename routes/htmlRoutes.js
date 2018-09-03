var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.FoodList.findAll({}).then(function(dbFoodList) {
      console.log("data: ", JSON.parse(dbFoodList));
      res.render("index", {
        msg: "Welcome!",
        //examples: dbExample
        foodList: dbFoodList
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/foodList/:id", function(req, res) {
    db.FoodList.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbFoodList) {
      res.render("foodList", {
        //example: dbExample
        foodList: dbFoodList
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
