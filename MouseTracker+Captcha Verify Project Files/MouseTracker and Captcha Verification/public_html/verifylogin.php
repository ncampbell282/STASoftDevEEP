<?php
//Allows met to make the http request on the same origin. Reduce strictness on what traffic can go to this site.
header('Access-Control-Allow-Origin: *');

//Set parameters
$name = "";
$pass = "";

//First check if parameters are given, if they are, set them
if(isset($_POST["name"]) && isset($_POST["pass"])) {
 $name = $_POST["name"];
 $pass = $_POST["pass"];
}

//Connect to database with the following parameters
$mysqli = new mysqli("localhost:3306", "root", "password","sisusers");
//Check connection
if($mysqli->connect_error) {
  exit('Could not connect');
}

//Create query to run on the database
$sql = "SELECT username, password FROM sisusrnameandpassword WHERE username = '".$name."' AND password = '".$pass."'";
//$sql = "SELECT username, password FROM sisusrnameandpassword WHERE username = 'nolan.campbell461' AND password = 'best6713'";

//Send query to database, and store result in $result
$result = $mysqli->query($sql);

//Check if result has results
if ($result->num_rows > 0) {
  // output data of each row in results
  while($row = $result->fetch_assoc()) {
    echo "username: " . $row["username"]. " - Password: " . $row["password"]. " " . "<br>";
  }
} else {
  echo "Invalid login";
}
?>