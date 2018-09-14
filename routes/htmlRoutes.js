var db = require("../models");
//var path = require("path");

module.exports = function (app) {

  // Load Index page
  app.get("/", function (req, res) {
    db.FoodList.findAll({}).then(function (dbFoodList) {
      res.render("index", {
        foodList: dbFoodList
      });
    });
  });

  //Load Create Page
  app.get("/create", function (req, res) {
    db.FoodList.findAll({}).then(function (dbFoodList) {
      res.render("create", {
        foodList: dbFoodList
      });
    });
  });

  //Load Update Page
  app.get("/update", function (req, res) {
    db.FoodList.findAll({}).then(function (dbFoodList) {
      res.render("update", {
        foodList: dbFoodList
      });
    });
  });

  //Load View Page
  app.get("/view", function (req, res) {
    db.FoodList.findAll({}).then(function (dbFoodList) {
      res.render("view", {
        foodList: dbFoodList
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
