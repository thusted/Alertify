$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".username").text(data.username);
    $(".userEmail").text(data.email);
    $(".userPassword").text(data.password);
    $(".member-name").text(data.email);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elem = document.querySelector('.collapsible.popout');
  var instance = M.Collapsible.init(elem, {
  accordion: false
});
});
});