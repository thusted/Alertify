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
    "message": "User has initiated tracking on Alertify.",
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
    "message": "User has initiated tracking on Alertify.",
    "toNumber": "19714041043"
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
    "message": "User has initiated tracking on Alertify.",
    "toNumber": "19714041043"
  }
};

//Nesting AJAX calls because Quick Easy SMS does not allow users to send the same message to multiple numbers at the same time
$("#tracking").on("click", function() {
  $.ajax(settings).done(function(response) {
    console.log(response);
    $.ajax(settings2).done(function(response) {
      console.log(response);
      $.ajax(settings3).done(function(response) {
        console.log(response);
      });
    });
  });
});