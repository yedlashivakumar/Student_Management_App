<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$host = '127.0.0.1'; // Use 'localhost' or '127.0.0.1'
$port = '3307';      // Specify MySQL port
$user = 'root';
$pass = '';
$dbname = 'student_db';

// Create connection with port specified
$conn = new mysqli($host, $user, $pass, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
