$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/login").then(function(data) {
    console.log(data)
    $(".username").text(data.username);
    $(".userEmail").text(data.email);
    $(".userPassword").text(data.password);
    $(".member-name").text(data.email);
  });
});

//Commenting out code below until variables can be used because it is causing Travis tests to fail - Tiana

// document.addEventListener("DOMContentLoaded", function() {
//   var elem = document.querySelector(".collapsible.popout");
//   M.Collapsible.init(elem, {
//     accordion: false
//   });
// });

//commenting out like before because of same issue