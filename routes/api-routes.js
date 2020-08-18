// Requiring our models and passport as we've configured it
var db = require("../models");
const axios = require('axios');
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error



  app.post('/api/text', function (req, res) {
    const {toNumber, message} = req.body;

    var request = require("request");

    var options = {
      method: 'POST',
      url: 'https://quick-easy-sms.p.rapidapi.com/send',
      headers: {
        "x-rapidapi-host":"quick-easy-sms.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        'content-type': 'application/x-www-form-urlencoded',
        useQueryString: true
      },
      form: {message: message, toNumber: toNumber}
    };


    request(options, function (error, response, body) {
      if (error){
        console.error('error sending text is: ', error);
        res.status(500).end('error is: ', error.message)
      }
      console.log('text successfully send')
      res.json('Successfully Send the message!')
    });
});

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.put("/api/user_data", passport.authenticate("local"), async function (req, res) {
    console.log(req.body);
    console.log(req.user.id);
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });

    await user.changePassword(req.body.newPassword);
    res.status(200).send("Password updated");
  });

  // PUT route for updating contacts. We can get the updated contact data from req.body
  app.put("/api/user_data/:iceName", async function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    await user.changeContact(req.body.iceName,req.body.icePhone,req.user.id);
    res.status(200).send("Contact updated");
  });

  // PUT route for updating contacts. We can get the updated contact data from req.body
  app.put("/api/user_data/:iceName", async function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    await user.changeContact(req.body.iceName,req.body.icePhone,req.user.id);
    res.status(200).send("Contact updated");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      iceName: req.body.iceName,
      icePhone: req.body.icePhone,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        username: req.user.username,
        iceName: req.user.iceName,
        icePhone: req.user.icePhone,
        id: req.user.id
      });
    }
  });

  // route for text api


};