$(document).ready(function() {
  $.get("/api/user_data").then(function (data) {
    //Pulling username and icePhone from our database
    const username = data.username;
    const icePhone = data.icePhone;

    //Geolocation
    const successCallback = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const apiKey = "AIzaSyBTHG7Q8WoPwWgU3X7vJfY9EM1vSLru-m8";
      const location = "https://www.google.com/maps/embed/v1/search?key=" + apiKey + "&q=" + lat +"," + long + "&zoom=17&maptype=satellite";
      $("#embedMap").html(`<iframe width="600" height="450" frameborder="0" style="border:0" src=' ${location} '"allowfullscreen"</iframe>`);
      const textLocationURL = "http://maps.google.com/?q=" + lat + "," + long;

      //Settings for Quick Easy SMS API
      const settings = {
        "url": "/api/text",
        "method": "POST",
        "data": {
          "message": username + " has shared their location on Alertify. Click here to find their current location: " + textLocationURL,
          "toNumber": "1" + icePhone //User's emergency contact
        }
      };

      //Function to make AJAX calls that send text message
      function sendText() {
        $.ajax(settings).done(function(response) {
          console.log(response);
        });
      }

      //Hitting the "Alertify" button will call our continuousText function
      $("#tracking").on("click", function() {
        sendText();
        console.log("username is: " + username);
        console.log("ice number is: " + icePhone);
        alert("Your emergency contact has been Alertified.");
        //Redirect user to tracker.html to display their current location on a map
        window.location.replace("./tracker.html");
      });

      $("#ok").on("click", function() {
        //Redirect user back to members page
        window.location.replace("./members.html");
      });
    };

    //Geolocation Error Catch
    const errorCallback = (error) => {
      console.error(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  });
});

