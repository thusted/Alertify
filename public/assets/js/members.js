$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    if (data.username === null) {
      $(".username").text(data.email.substring(0, data.email.lastIndexOf("@")));
    } else {
      $(".username").text(data.username);
    }
    $(".userEmail").text(data.email);
    $(".userPassword").text(data.password);
    console.log("password", data.password)
  });
});

$(".submit-button").on("click", function (event) {
  $.get("/api/user_data").then(function (data) {
    event.preventDefault();
    $.patch("/api/login", {
      email: data.email,
      password: $("#passwordUpdateCurrent")[0].value,
      newPassword: $("#passwordUpdateNew")[0].value
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var elem = document.querySelector(".collapsible.popout");
  M.Collapsible.init(elem, {
    accordion: false
  });
});