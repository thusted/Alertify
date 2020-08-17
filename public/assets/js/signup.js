$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email");
  var passwordInput = $("input#password");
  var firstName = $("input#first_name");
  var lastName = $("input#last_name");
  var username = $("input#username");
  var icename1 = $("input#icename1");
  var icename2 = $("input#icename2");
  var icename3 = $("input#icename3");
  var icephone1 = $("input#icephone1");
  var icephone2 = $("input#icephone2");
  var icephone3 = $("input#icephone3");

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, username, email, password, icename1, icephone1, icename2, icephone2, icename3, icephone3) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      icename1: icename1,
      icephone1: icephone1,
      icename2: icename2,
      icephone2: icephone2,
      icename3: icename3,
      icephone3: icephone3
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      username: username.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val(),
      icename1: icename1.val().trim(),
      icephone1: icephone1.val().trim(),
      icename2: icename2.val().trim(),
      icephone2: icephone2.val().trim(),
      icename3: icename3.val().trim(),
      icephone3: icephone3.val().trim(),
    };

    console.log(userData);

    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.username,
      userData.email,
      userData.password,
      userData.icename1,
      userData.icephone1,
      userData.icename2,
      userData.icephone2,
      userData.icename3,
      userData.icephone3
    );

    firstName.val("");
    lastName.val("");
    username.val("");
    emailInput.val("");
    passwordInput.val("");
    icename1.val("");
    icephone1.val("");
    icename2.val("");
    icephone2.val("");
    icename3.val("");
    icephone3.val("");
  });
});
