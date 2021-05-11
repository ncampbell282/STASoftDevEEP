 /* 
  * MouseTracker
  * Created by Christian Lampher 
  * 05/04/2021
  * 
  * This JavaScript file tracks the movement of the user's mouse, making note of 
  * the number of events (times the computer has detected the mouse movement)
  * as well as the X and Y coordinates of the mouse on the web page. The also 
  * returns either true or false under the "mouseDetect" function depending on 
  * whether the mouse is unmoved (undefined or 0).
  */

 //Constants
 const loginForm = document.getElementById("login-form");

 // Mouse Tracker 
 var xval; // X Value
 var yval; // X Value
 var mouseCounter = 0;
 var mousePrev = 0;

 window.addEventListener('mousemove', function(e) // Listener to fire when mouse movement detected
     {
         mouseCounter += 1; // Counts every time a mouse event fires
         xval = e.x; // Sets the mouse X value
         yval = e.y; // Sets the mouse Y value
     });

 function mouseDetect() // Use this function to check if the mouse is moved, returns boolean 
 {
     if (mouseCounter !== 0 && mouseCounter !== null && mouseCounter !== undefined) // If the mouse has moved from it's point at page start
     {
         return true;
     } else {
         return false;
     }
 };

 /* 
  * Nolan Campbell
  * Captcha Verify
  * This script will verify that mouse movement is detected, and allow the user to attempt to login to Tyler SIS
  */

 //Captcha Verify 

 //Counter for login attempts
 var loginAttempts = 0;

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
     //If attempts is less than five, to not validate
     if (loginAttempts < 5) {
         sendValidation();
     } else if (loginAttempts >= 5) { //If attempts >= 5, then verify and lock user out if verification failed
         if (mouseDetect() == true) {
             sendValidation();
         } else {
             lockout();
         }
     }

     loginAttempts++;

     return false; //Return needed for form on login-page.html
 }

 function sendValidation() {
     //Get username and password
     var username = getUsername();
     var password = getPassword();

     //Send password to PHP file using AJAX/xmlhttp to interface with database, and returns if login successful
     var xmlhttp = new XMLHttpRequest();

     //Get the response from the verifylogin.php
     xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) { //Verify that a response has been properly received
             //Print response text to screen
             //document.getElementById("is-login").innerHTML = this.responseText;

             //If the login credentials were valid, tell the user
             if (this.response == true) {
                 document.getElementById("is-login").innerHTML = "Login successful";
             } else { //Else tell teh user login failed
                 document.getElementById("is-login").innerHTML = "Login failed";
             }
         }
     };

     //xmlhttp.open("POST", "verifylogin.php?name=" + username + "&pass=" + password, true);
     xmlhttp.open("POST", "http://localhost:3000/MouseTracker+Captcha%20Verify%20Project%20Files/MouseTracker%20and%20Captcha%20Verification/public_html/verifylogin.php", true);

     xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     xmlhttp.send("name=" + username + "&pass=" + password);
 }

 //Function to lock user out
 function lockout() {
     //Tell the user he is locked out for 1 minute
     document.getElementById("is-login").innerHTML = "Locked out for one minute";
     //Hide the submit button to "Lock out" the user
     document.getElementById("login-form-submit").hidden = true;
     //Start a timer for one minute, the function unhides the submit button when timer is up
     setTimeout(unHideButton, 60000);
 }

 //Function to allow user to submit login attempt once time is up
 function unHideButton() {
     document.getElementById("login-form-submit").hidden = false;
     document.getElementById("is-login").innerHTML = "You can now login";
     console.log("One minute has passed");
 }