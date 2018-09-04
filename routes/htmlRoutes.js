var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.FoodLists.findAll({}).then(function(dbFoodList) {
      //console.log("data: ", JSON.parse(dbFoodList));
      res.render("index", {
        msg: "Welcome!",
        //examples: dbExample
        example: dbFoodList
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.FoodLists.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbFoodList) {
      res.render("FoodLists", {
        //example: dbExample
        example: dbFoodList
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
