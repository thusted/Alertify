    $(document).ready(function () {
        $("#submit").click(function () {
            var name = $("#nameInput").val();
            var email = $("#emailInput").val();
            var message = $("#msgInput").val();
            var isValid = true;
    
            //validate the first email address
            if (email == "") {
                $("#emailInput").text("this address is required");
                isValid = false;
            } else {
                $("#emailInput").next().text("");
            }
            //validate the second email address
            if (message == "") {
                $("#msgInput").text("this address is required");
                isValid = false;
            } else if (emailAddress1 !== emailAddress2) {
                $("#msgInput").text("the two emails have to be the same");
                isValid = false;
            } else {
                $("#msgInput").text("");
            }
            //validate the first Name
            if (name == "") {
                $("#nameInput").text("name is required");
                isValid = false;
            } else {
                $("#nameInput").text("");
            }
            //submit the form
            if (isValid) {
                $("#email_form").submit();
            }
        });
        //focus the cursor on the first email address
        $("#email").focus();
    });
