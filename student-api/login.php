<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($row = $result->fetch_assoc()) {
    if ($row["password"] === $password) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "wrong_password"]);
    }
} else {
    echo json_encode(["status" => "not_found"]);
}
?>
