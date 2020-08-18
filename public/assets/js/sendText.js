$(document).ready(function() {
  $.get("/api/user_data").then(function (data) {
    //Pulling username and icePhone from our database
    const username = data.username;
    const icePhone = data.icePhone;

    //Geolocation
    const successCallback = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const apiKey = "AIzaSyBos6JoNIqsI5Qz1VH0TsonjPQw4fp4zb0";
      const location = "https://www.google.com/maps/embed/v1/search?key=" + apiKey + "&q=" + lat +"," + long + "&zoom=17&maptype=satellite";
      $("#embedMap").html(`<iframe width="600" height="450" frameborder="0" style="border:0" src=' ${location} '"allowfullscreen"</iframe>`);
      const textLocationURL = "http://maps.google.com/?q=" + lat + "," + long;

      //Settings for Quick Easy SMS API
      const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://quick-easy-sms.p.rapidapi.com/send",
        "method": "POST",
        "headers": {
          "x-rapidapi-host": "quick-easy-sms.p.rapidapi.com",
          "x-rapidapi-key": "5c94c28007msh0615efba39b7f77p1b2c08jsn6e1b5041f5ae",
          "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
          "callbackURL": "https://example.com/abcd",
          "message": username + " has shared their location on Alertify. Click here to find their current location: " + textLocationURL,
          "toNumber": "1" + icePhone //User's emergency contact
        }
      };

      const settings2 = {
        "url": "/api/text",
        "method": "POST",
        "data": {
          "message": username + " has shared their location on Alertify. Click here to find their current location: " + textLocationURL,
          "toNumber": "1" + icePhone //User's emergency contact
        }
      }

      //Function to make AJAX calls that send text message
      function sendText() {
        $.ajax(settings2).done(function(response) {
          console.log(response);
        });
      }

      // // Start sending messages to User's emergency contacts every minute until "I'm Okay" button is pressed
      function continuousText() {
        sendText();
        // setTimeout(function() {
        //   continuousText();
        // }, 30000);
      }

      //Hitting the "Alertify" button will call our continuousText function
      $("#tracking").on("click", function() {
        continuousText();
        console.log("username is: " + username);
        console.log("ice number is: " + icePhone);
        alert("Your emergency contact has been Alertified.");
        //Redirect user to tracker.html to display their current location on a map
        window.location.replace("./tracker.html");
      });

      $("#ok").on("click", function() {
        clearTimeout(continuousText());
        console.log("You pressed me");
      });
    };

    //Geolocation Error Catch
    const errorCallback = (error) => {
      console.error(error);
    };

    //we will come back to watchId later when "I'm ok" button is created
    // const watchId =
    navigator.geolocation.watchPosition(successCallback, errorCallback);
    //if button is pressed to be safe
    //navigator.geolocation.clearWatch(watchId);
  });
});

