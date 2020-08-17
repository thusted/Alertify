var elem = document.querySelector('.collapsible.popout');
var instance = M.Collapsible.init(elem, {
  accordion: false
});

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    if (data.username === null) {
      $(".username").text(data.email.substring(0, data.email.lastIndexOf("@")));
    } else {
      $(".username").text(data.username);
    };
  });

  $.get("/api/login").then(function(data) {
    console.log(data);
    $(".username").text(data.username);
    $(".userEmail").text(data.email);
    $(".userPassword").text(data.password);
    $(".userContacts").text(`${data.iceName}:${data.icePhone}`);
  });

  $(".submit-button").on("click", function (event) {
    $.get("/api/user_data").then(function (data) {
      event.preventDefault();
      $.ajax({
        url: "/api/user_data",
        type: "PUT",
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          iceName: data.iceName,
          icePhone: data.icePhone,
          password: $("#passwordUpdateCurrent")[0].value,
          newPassword: $("#passwordUpdateNew")[0].value,
        }
      });
    });
  });

  $(".contact-button").on("click", function (event) {
    $.get("/api/user_data").then(function (data) {
      event.preventDefault();
      $.ajax({
        url: "/api/user_data",
        type: "PUT",
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          iceName: $("#contactUpdateName")[0].value,
          icePhone: $("#contactUpdateNumber")[0].value,
        }
      });
    });
});
  
});