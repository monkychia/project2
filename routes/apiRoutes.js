var db = require("../models");

module.exports = function(app) {

  //Get all FoodList
  app.get("/api/foodList/", function(req, res) {
    db.FoodList.findAll({})
    .then(function(results){
      res.json(results);
    });
  });

  //Create new FoodList
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

  //Delete an item from the FoodList
  app.delete("/api/foodList/:id", function(req, res){
    db.FoodList.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(results){
      res.json(results);
    });
  });

  //Update an item from the FoodList
  app.put("/api/foodList/:id", function(req, res){
    db.FoodList.update({
      itemName: req.body.itemName,
      costPer: req.body.costPer,
      category: req.body.category
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
