<?php
$servername = "localhost";
$username = "client";
$database = "vant_words";

// Create connection
$conn = mysqli_connect($servername,$username, "", $database);

// Check connection
if (mysqli_connect_error()) {
  die("Connection failed: " . $conn->connect_error);
}
?>