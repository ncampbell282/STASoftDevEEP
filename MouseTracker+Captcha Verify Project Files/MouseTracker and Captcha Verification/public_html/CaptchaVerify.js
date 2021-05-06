/* 
 * Nolan Campbell
 * This script will verify that mouse movement is detected, and allow the user to attempt to login to Tyler SIS
 */

//Constants
const loginForm = document.getElementById("login-form");

//Global variables
//Counter for login attempts
var loginAttempts = 0;

//Get if mouse movement is detected or not
function isVerified() {
    return false;
}

//Get entered username
function getUsername() {
    return username = loginForm.username.value;
    //return document.getElementById("txtUserName").innerHTML;
}

//get entered password
function getPassword() {
    return password = loginForm.password.value;
    //return document.getElementById("txtPassword").innerHTML;

}

//Attempt to login
function attemptLogin() {
    if (loginAttempts < 5) {
        sendValidation();
    } else if (loginAttempts >= 5) {
        if (isVerified() == true) {
            sendValidation();
        } else {
            lockout();
        }
    }

    loginAttempts++;

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
    xmlhttp.open("POST", "http://localhost:3000/MouseTracker+Captcha%20Verify%20Project%20Files/MouseTracker%20and%20Captcha%20Verification/public_html/verifylogin.php", true);

    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("name=" + username + "&pass=" + password);
}

//Function to lock user out
function lockout() {
    document.getElementById("is-login").innerHTML = "Locked out for one minute";
    document.getElementById("login-form-submit").hidden = true;
    setTimeout(unHideButton(), 60000);
}

//Function to allow user to submit login attempt once time is up
function unHideButton() {
    document.getElementById("login-form-submit").hidden = false;
    document.getElementById("is-login").innerHTML = "You can now login";
}