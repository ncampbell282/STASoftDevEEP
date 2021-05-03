<?php
$mysqli = new mysqli("jdbc:mysql://localhost:3306", "root", "password", "sisusers");
if($mysqli->connect_error) {
  exit('Could not connect');
}

$sql = "SELECT username, password, address, WHERE username = name AND password = pass";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $_GET['q']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($username, $password);
$stmt->fetch();
$stmt->close();
?>