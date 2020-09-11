var elem = document.querySelector(".collapsible.popout");
M.Collapsible.init(elem, {
  accordion: false
});

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $(".username").text(data.username);
    $(".userEmail").text(data.email);
    $(".userPassword").text(data.password);
    $(".userIceName").text("Name: " + data.iceName);
    var a = data.icePhone;
    var b = [a.slice(0, 0), "(", a.slice(0)].join("");
    var c = [b.slice(0, 4), ")", b.slice(4)].join("");
    var phone = [c.slice(0, 8), "-", c.slice(8)].join("");
    $(".userIcePhone").text("Number: " + phone);
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
      alert("Password Updated");
      window.location.reload();
    });
  });

  $(".contact-button").on("click", function (event) {
    $.get("/api/user_data/").then(function (data) {
      event.preventDefault();
      $.ajax({
        url: "/api/user_data/:iceName",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          iceName: $("#contactUpdateName")[0].value,
          icePhone: $("#contactUpdateNumber")[0].value,
        }),
        dataType: "json",
        error: function (data) {
          console.log(data);
        }
      });
      alert("Emergency Contact Updated");
      window.location.reload();
    });
  });
});