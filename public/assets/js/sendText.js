//Geolocation stuff
const successCallback = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  // const apiKey = "AIzaSyBos6JoNIqsI5Qz1VH0TsonjPQw4fp4zb0";
  // const location = "https://www.google.com/maps/embed/v1/search?key=" + apiKey + "&q=" + lat +"," + long + "&zoom=17&maptype=satellite";
  // $("#embedMap").html(`<iframe width="600" height="450" frameborder="0" style="border:0" src=' ${location} '"allowfullscreen"</iframe>`);
  const textLocationURL = "http://maps.google.com/?q=" + lat + "," + long;

  //Settings for Quick Easy SMS API
  //First emergency contact
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://quick-easy-sms.p.rapidapi.com/send",
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "quick-easy-sms.p.rapidapi.com",
      "x-rapidapi-key": "488cc413bcmsh911fc91c6567527p14c007jsn8fd4a3210f09",
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "callbackURL": "https://example.com/abcd",
      "message": "User has shared their location on Alertify. Click here to find their current location: " + textLocationURL,
      "toNumber": "19714041043"
    }
  };
  //Second emergency contact
  const settings2 = {
    "async": true,
    "crossDomain": true,
    "url": "https://quick-easy-sms.p.rapidapi.com/send",
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "quick-easy-sms.p.rapidapi.com",
      "x-rapidapi-key": "488cc413bcmsh911fc91c6567527p14c007jsn8fd4a3210f09",
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "callbackURL": "https://example.com/abcd",
      "message": "User has shared their location on Alertify, click here to find their current location: " + textLocationURL,
      "toNumber": "15418487164"
    }
  };
  //Third emergency contact
  const settings3 = {
    "async": true,
    "crossDomain": true,
    "url": "https://quick-easy-sms.p.rapidapi.com/send",
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "quick-easy-sms.p.rapidapi.com",
      "x-rapidapi-key": "488cc413bcmsh911fc91c6567527p14c007jsn8fd4a3210f09",
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "callbackURL": "https://example.com/abcd",
      "message": "User has shared their location on Alertify, click here to find their current location: " + textLocationURL,
      "toNumber": "1XXXXXXXXXX"
    }
  };
  //Function to make AJAX calls that send text message
  function sendText() {
    //Nesting AJAX calls because Quick Easy SMS does not allow users to send the same message to multiple numbers at the same time
    $.ajax(settings).done(function(response) {
      console.log(response);
      $.ajax(settings2).done(function(response) {
        console.log(response);
        $.ajax(settings3).done(function(response) {
          console.log(response);
        });
      });
    });
  }

  //Start sending messages to User's emergency contacts every minute until "I'm Okay" button is pressed
  function continuousText() {
    sendText();
    setTimeout(function() {
      continuousText();
    }, 60000);
  }

  //Hitting the "Alertify" button will call our continuousText function
  $("#tracking").on("click", function() {
    continuousText();
  });
};

const errorCallback = (error) => {
  console.error(error);
};
//we will come back to watchId later when "I'm ok" button is created
// const watchId =
navigator.geolocation.watchPosition(successCallback, errorCallback);
//if button is pressed to be safe
//navigator.geolocation.clearWatch(watchId);



