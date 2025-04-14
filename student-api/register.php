<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data["username"]);
$password = trim($data["password"]);

if (empty($username) || empty($password)) {
    echo json_encode(["status" => "invalid_input"]);
    exit();
}

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "exists"]);
    exit(); // 🔴 Prevent further execution
}

$insert = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
if ($conn->query($insert)) {
    echo json_encode(["status" => "registered"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
