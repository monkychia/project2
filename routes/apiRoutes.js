var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/example/", function(req, res) {
    db.Example.findAll({})
    .then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.get("/api/example/category/:category", function(req, res){
    db.Example.findAll({
      where: {
        category: req.params.category
      }
    })
    .then(function(dbExample) {
      res.json(dbExample)
    });
  });

  // Create a new example
  app.post("/api/example", function(req, res) {
    db.Example.create({
      itemName: req.body.itemName,
      costPer:req.body.costPer,
      category: req.body.category,
      vegan: req.body.vegan,
      glutenFree: req.body.glutenFree
    })
    .then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/example/:id", function(req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbExample) {
      res.json(dbExample);
    });
  });

//*********************************************************************
  //Get all foodList
  app.get("/api/foodList/", function(req, res) {
    db.FoodList.findAll({})
    .then(function(results){
      res.json(results);
    });
  });

  //Create new foodList
  app.post("/api/foodList", function(req, res){
    db.FoodList.create({
      itemName: req.body.itemName,
      costPer:req.body.costPer,
      category: req.body.category,
      vegan: req.body.vegan,
      glutenFree: req.body.glutenFree
    })
    .then(function(results){
      res.json(results);
    });
  });

  //Delete an item from the foodList
  app.delete("api/foodList/:id", function(req, res){
    db.FoodList.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(results){
      res.json(results);
    });
  });

  //Update an item from the foodList
  app.put("api/foodList/:id", function(req, res){
    db.FoodList.update({
      itemName: req.body.itemName
    },{
      where : {
        id: req.params.id
      }
    })
    .then(function(results){
      res.json(results);
    });
  });
};
