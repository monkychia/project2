var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.FoodList.findAll({}).then(function(dbFoodlist) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbFoodList
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.FoodList.findOne({ where: { id: req.params.id } }).then(function(dbFoodList) {
      res.render("example", {
        example: dbFoodList
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
