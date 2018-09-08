var db = require("../models");
//var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.FoodList.findAll({}).then(function(dbFoodList) {
      res.render("create", {
        msg: "Welcome!",
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
       }).then(function(dbFoodList) {
      res.render("index", {
        foodList: dbFoodList
      });
    });
  });

  //Create an item
  app.post("/api/foodList", function(req, res){
    db.FoodList.create({
      itemName: req.body.itemName,
      costPer:req.body.costPer,
      category: req.body.category,
      vegan: req.body.vegan,
      glutenFree: req.body.glutenFree
    }).then(function(results){
      res.render("create", {
        foodList: results
      });
    });
  });

  //Update an item
  app.put("/api/foodList/:id", function(req, res){
    db.FoodList.update({
      where: {
        id : req.params.id
      }
    }).then(function(results){
      res.render("update", {
        foodList: results
      });
    });
  });

  //Delete an item
  app.delete("/api/foodList/:id", function(req, res){
    db.FoodList.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results){
      res.render("index", {
        foodList: results
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
