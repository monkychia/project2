var db = require("../models");
const nodemailer = require('nodemailer');

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

        // console.log('----- i am in post', res);

        // nodemailer.createTestAccount((err, account) => {
        //   let transporter = nodemailer.createTransport({
        //       host: 'smtp.gmail.com',
        //       port: 587,
        //       secure: false, 
        //       auth: {
        //         user: "projecttwo22@gmail.com", // sender's credentials
        //         pass: "pr0ject2!"// sender's password
        //       }
        //   });

        //   // setup email data with unicode symbols
        //   let mailOptions = {
        //       from: '"test <projecttwo22@gmail.com>', // sender address
        //       to: 'learnafew@gmail.com', // list of receivers
        //       subject: 'Hello ✔', 
        //       text: 'Hello world?', // plain text body
        //       html: '<b>Hello world?</b>' // html body
        //   };

        //   // send mail with defined transport object
        //   transporter.sendMail(mailOptions, (error, info) => {
        //       if (error) {
        //           return console.log(error);
        //       }
        //       console.log('Message sent: %s', info.messageId);
        //       console.log(info);
        //       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        //   });
        // });

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
      description: req.body.description,
      additionalInfo: req.body.additionalInfo
    })
      .then(function (results) {

        let body = `<div>Hello Manager,</div>
                    <div><p>We received a new event request with the followings:</p><hr/>
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
              to: 'learnafew@gmail.com', // list of receivers
              subject: `Hello ✔`, 
              text: `Hello world?`, // plain text body
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
};
