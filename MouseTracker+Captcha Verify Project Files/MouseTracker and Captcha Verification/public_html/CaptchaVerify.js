/* 
 * Nolan Campbell
 * This script will verify that mouse movement is detected, and allow the user to attempt to login to Tyler SIS
 */

//Global variables
//Counter for login attempts
var loginAttempts = 0;

//Get if mouse movement is detected or not
function isVerified() {
    return false;
}

//Get entered username
function getUsername() {
    //return username = loginForm.username.value;
    return document.getElementById("txtUserName").innerHTML;
}

//get entered password
function getPassword() {
    //return password = loginForm.password.value;
    return document.getElementById("txtPassword").innerHTML;

}

//Attempt to login
function attemptLogin() {
    //document.getElementById("is-login").innerHTML = "sucess";
    //document.getElementById("is-login").innerHTML = getPassword();
    //print(getPassword());
    //print(getUsername());
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    document.getElementById("is-login").innerHTML = username + " " + password;
    /* if (loginAttempts < 5) {
         sendValidation();
     } else if (loginAttemps >= 5) {
         if (isVerified()) {
             sendValidation();
         } else {
             lockout();
         }
     }*/

    //loginAttempts++;
    //document.getElementById("demo").innerHTML = loginAttempts;
    return false;
}

function sendValidation() {
    //Get username and password
    var username = getUsername();
    var password = getPassword();

    //Send password to PHP file using AJAX/xmlhttp to interface with database, and return if login successful
    //If PHP file returns false match, increment attempt count by one, when attempt count equals 5, start running verify method
    var xmlhttp = new XMLHttpRequest();

    //Get the response from the verifylogin.php
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("is-login").innerHTML = this.responseText;
            //document.getElementById("demo").innerHTML = "response received"
        }
    };

    //xmlhttp.open("POST", "verifylogin.php?name=" + username + "&pass=" + password, true);
    xmlhttp.open("POST", "http://localhost:3000/MouseTracker%20and%20Captcha%20Verification/public_html/verifylogin.php", true);

    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("name=" + username + "&pass=" + password);
}

//Function to lock user out
function lockout() {
    document.getElementById("is-login").innerHTML = "Locked out";
}