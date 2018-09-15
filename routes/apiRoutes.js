var db = require("../models");
const nodemailer = require('nodemailer');
var env = process.env.NODE_ENV || "development";

module.exports = function (app) {

  function sendEmail(body) {
    let user_cred, pass_cred;

    if (env !== "development") {
      user_cred = process.env.USER_AUTH; // Heroku setup
      pass_cred = process.env.PASSW_AUTH;  // Heroku setup
    } else {
      user_cred = process.env.user_email; // development setup
      pass_cred = process.env.user_password; // development setup
    }

    // user: "projecttwo22@gmail.com", // sender's credentials
    // pass: "pr0ject2!"// sender's password
    
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, 
          auth: {
            user: user_cred, // sender's credentials
            pass: pass_cred// sender's password
            // user_cred = process.env.USER_AUTH;
            // pass_cred = process.env.PASSW_AUTH;
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
  }

  //Get all FoodList
  app.get("/api/foodlist/", function (req, res) {
    db.FoodList.findAll({})
      .then(function (results) {
        res.json(results);
      });
  });

  // Get 1 Foodlist by Foodlist ID
  app.get("/api/foodlist/:id", function (req, res) {
    db.FoodList.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(function (results) {
      res.json(results);
    });
  });

  app.get("/api/foodList/name/:itemName", function(req, res) {
    db.FoodList.findAll({
      where: {
        itemName: req.params.itemName
      }
    })
    .then(function (results) {
      res.json(results);
    });
  })

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

  app.get("/api/eventlist/:id", function(req, res) {
    db.EventList.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(function(results) {
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
      .then(function(results) {
        let message = `<div>Hello Manager,</div>
                    <div><p>We received a new event request with the followings.  Please click <a href="https://cater-app.herokuapp.com/">here</a> to approve.</p><hr/>
                      <div>
                        <p>Event Name: ${req.body.eventName}</p>
                        <p>Contact Person: ${req.body.contactName}</p>
                        <p>Event Date: ${req.body.eventDate}</p>
                        <p>Description: ${req.body.description}</p>
                        <p>Additional Information: ${req.body.additionalInfo}</p>
                      </div>
                    </div>`;
        sendEmail(message);

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
      .then(function(results) {
        res.json(results);
      });
  });

  //Update a Status from the EventList
  app.put("/api/eventlist/status/:id", function (req, res) {
    db.EventList.update({
      status: req.body.status
    }, {
        where: {
          id: req.params.id
        }
      })
      .then(function(results) {
        res.json(results);
      });
  });

  //Get FoodObject with Restrictions
  app.get("/api/foodObject/vegan", function(req, res) {
    db.FoodList.findAll({
      where: {
        category: req.query.category,
        vegan: req.query.vegan
        // $or: [{vegan: {$eq: req.query.vegan}},{glutenFree: {$eq: req.query.glutenFree}}] 
      }
    })
      .then(function(results) {
        res.json(results);
      });
  });

  app.get("/api/foodObject/glutenfree", function(req, res) {
    db.FoodList.findAll({
      where: {
        category: req.query.category,
        glutenFree: req.query.glutenFree
        // $or: [{vegan: {$eq: req.query.vegan}},{glutenFree: {$eq: req.query.glutenFree}}] 
      }
    })
      .then(function(results) {
        res.json(results);
      });
  });

  app.get("/api/foodObject/both", function(req, res) {
    db.FoodList.findAll({
      where: {
        category: req.query.category,
        vegan: req.query.vegan,
        glutenFree: req.query.glutenFree 
      }
    })
      .then(function(results) {
        res.json(results);
      });
  });

  app.get("/api/foodObject/none", function(req, res) {
    db.FoodList.findAll({
      where: {
        category: req.query.category
      }
    })
      .then(function(results) {
        res.json(results);
      });
  });


  //Get food row based on the food's name
  app.get("/api/foodObject/:name", function(req, res) {
    db.FoodList.findAll({
      where: {
        itemName: req.params.name
      }
    })
      .then(function(results) {
        res.json(results);
      });
  });
  
  // Get all events with corresponding orders
  app.get("/api/orderslist", function(req, res) {
    db.OrdersList.findAll({})
    .then(function(results) {
      res.json(results);
    });
  });

  // Get 1 event with it's orders
  app.get("/api/ordersList/:eventListId", function(req, res) {
    db.OrdersList.findAll({
      where: {
        eventListId: req.params.eventListId
      }
    })
    .then(function(results) {
      res.json(results);
    });
  });

  // Get 1 order
  app.get("/api/ordersList/order/:id", function(req, res) {
    db.OrdersList.findAll({
      where: {
        id: req.params.id,
      }
    })
    .then(function(results) {
      res.json(results);
    });
  });

  // Create new event with it's corresponding orders
  app.post("/api/ordersList", function(req, res) {
    db.OrdersList.create({
      eventListId: req.body.eventListId,
      foodListId: req.body.foodListId,
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      costPer: req.body.costPer,
      total: req.body.total
    })
    .then(function (results) {
      res.json(results);
    });
  });

  // Update order list
  app.put("/api/ordersList/:orderListId", function(req, res) {
    db.OrdersList.update({
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      total: req.body.total,
      costPer: req.body.costPer,
      foodListId: req.body.foodListId
    }, {
        where: {
          id: req.params.orderListId,
        }
      })
      .then(function (results) {
        res.json(results);
      });
  });
};
