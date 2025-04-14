<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$currentPassword = $data["currentPassword"];
$newPassword = $data["newPassword"];

$sql = "SELECT * FROM users WHERE username='$username' AND password='$currentPassword'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $update = "UPDATE users SET password='$newPassword' WHERE username='$username'";
    if ($conn->query($update)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
} else {
    echo json_encode(["status" => "incorrect"]);
}
?>
