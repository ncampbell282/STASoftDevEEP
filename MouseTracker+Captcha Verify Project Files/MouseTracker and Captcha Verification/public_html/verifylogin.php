<?php
//Connect to database with the following parameters
$mysqli = new mysqli("localhost:3306", "root", "password","sisusers");
//Check connection
if($mysqli->connect_error) {
  exit('Could not connect');
}

//Create query to run on the database
$sql = "SELECT username, password FROM sisusrnameandpassword WHERE username = 'nolan.campbell461' AND password = 'best6713'";

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