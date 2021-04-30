/* 
 * Nolan Campbell
 * This script will verify that mouse movement is detected, and allow the user to attempt to login to Tyler SIS
 */
attemptCount = 0;

//Get if mouse movement is detected or not
function verify() {
    document.getElementById("demo").innerHTML = "Verified";
}

//Get entered username
function getUsername() {
    return document.getElementById("username").value;
}

//get entered password
function getPassword() {
    return document.getElementById("password").value;
}

//Attempt to login
function attemptLogin() {
    username = getUsername();
    password = getPassword();

    //Send password to database
    //If database returns false match, increment attempt count by one, when attempt count equals 5, start running verify method
}