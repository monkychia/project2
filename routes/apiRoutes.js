var db = require("../models");

module.exports = function (app) {

  //Get all FoodList
  app.get("/api/foodList/", function (req, res) {
    db.FoodList.findAll({})
      .then(function (results) {
        res.json(results);
      });
  });

  //Create new FoodList
  app.post("/api/foodList", function (req, res) {
    db.FoodList.create({
      itemName: req.body.itemName,
      costPer: req.body.costPer,
      category: req.body.category,
      vegan: req.body.vegan,
      glutenFree: req.body.glutenFree
    })
      .then(function (results) {
        res.json(results);
      });
  });

  //Delete an item from the FoodList
  app.delete("/api/foodList/:id", function (req, res) {
    db.FoodList.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (results) {
        res.json(results);
      });
  });

  //Update an item from the FoodList
  app.put("/api/foodList/:id", function (req, res) {
    db.FoodList.update({
      itemName: req.body.itemName,
      costPer: req.body.costPer,
      category: req.body.category
    }, {
        where: {
          id: req.params.id
        }
      })
      .then(function (results) {
        res.json(results);
      });
  });
  
  //Get all EventList
  app.get("/api/eventList/", function (req, res) {
    db.EventList.findAll({})
      .then(function (results) {
        res.json(results);
      });
  });

  //Create new EventList
  app.post("/api/eventList", function (req, res) {
    db.EventList.create({
      eventName: req.body.eventName,
      contactName: req.body.contactName,
      eventDate: req.body.eventDate,
      descriptionInfo: req.body.descriptionInfo,
      additionalInfo: req.body.additionalInfo
    })
      .then(function (results) {
        res.json(results);
      });
  });

  //Delete an item from the EventList
  app.delete("/api/eventList/:id", function (req, res) {
    db.EventList.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (results) {
        res.json(results);
      });
  });

  //Update an item from the EventList
  app.put("/api/eventList/:id", function (req, res) {
    db.EventList.update({
      eventName: req.body.eventName,
      contactName: req.body.contactName,
      eventDate: req.body.eventDate,
      descriptionInfo: req.body.descriptionInfo,
      additionalInfo: req.body.additionalInfo
    }, {
        where: {
          id: req.params.id
        }
      })
      .then(function (results) {
        res.json(results);
      });
  });
};
