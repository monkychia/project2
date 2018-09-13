var db = require("../models");
const nodemailer = require('nodemailer');

module.exports = function (app) {

  //Get all FoodList
  app.get("/api/foodlist/", function (req, res) {
    db.FoodList.findAll({})
      .then(function (results) {
        res.json(results);
      });
  });

  //Create new FoodList
  app.post("/api/foodlist", function (req, res) {
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
  app.delete("/api/foodlist/:id", function (req, res) {
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
  app.put("/api/foodlist/:id", function (req, res) {
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
  app.get("/api/eventlist/", function (req, res) {
    db.EventList.findAll({})
      .then(function (results) {

        res.json(results);
      });
  });

  //Create new EventList
  app.post("/api/eventlist", function (req, res) {
    db.EventList.create({
      eventName: req.body.eventName,
      contactName: req.body.contactName,
      eventDate: req.body.eventDate,
      description: req.body.description,
      additionalInfo: req.body.additionalInfo
    })
      .then(function (results) {

        let body = `<div>Hello Manager,</div>
                    <div><p>We received a new event request with the followings.  Please click <a href="https://cater-app.herokuapp.com/">here</a> to approve.</p><hr/>
                      <div>
                        <p>Event Name: ${req.body.eventName}</p>
                        <p>Contact Person: ${req.body.contactName}</p>
                        <p>Event Date: ${req.body.eventDate}</p>
                        <p>Description: ${req.body.description}</p>
                        <p>Orders: ${req.body.additioanlInfo}</p>
                      </div>
                    </div>`;

        nodemailer.createTestAccount((err, account) => {
          let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false, 
              auth: {
                user: "projecttwo22@gmail.com", // sender's credentials
                pass: "pr0ject2!"// sender's password
              }
          });

          // setup email data with unicode symbols
          let mailOptions = {
              from: '"CaterApp Admin <projecttwo22@gmail.com>', // sender address
              to: 'learnafew@gmail.com, danny.danh.nguyen@gmail.com, seancooper.exe@gmail.com, reenam2017@gmail.com', // list of receivers
              subject: `New Event Approval`, 
              html: body // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          });
        });

        res.json(results);
      });
  });

  //Delete an item from the EventList
  app.delete("/api/eventlist/:id", function (req, res) {
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
  app.put("/api/eventlist/:id", function (req, res) {
    db.EventList.update({
      eventName: req.body.eventName,
      contactName: req.body.contactName,
      eventDate: req.body.eventDate,
      description: req.body.description,
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

  //Get FoodObject with Restrictions
  app.get("/api/foodObject/", function (req, res) {
    console.log(req.query);
    db.FoodList.findAll({
      where: {
        category: req.query.category,
        vegan: req.query.vegan,
        glutenFree: req.query.glutenFree
      }
    })
      .then(function (results) {
        res.json(results);
      });
  });
  
};
