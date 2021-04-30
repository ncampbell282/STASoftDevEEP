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

    //Get username and password
    var username = getUsername();
    var password = getPassword();

    //Set the data to send in request to PHP file
    var sendData = JSON.stringify({
        name: username,
        pass: password
    });

    //Send password to PHP file using AJAX/xmlhttp to interface with database, and return if login successful
    //If PHP file returns false match, increment attempt count by one, when attempt count equals 5, start running verify method
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };

    xmlhttp.open("POST", "verifyLogin.php?q=", true);
    xmlhttp.send(sendData);
}