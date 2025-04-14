<?php
include 'db.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Support for method override via _method from FormData
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['_method'])) {
    $method = strtoupper($_GET['_method']);
} else {
    $method = $_SERVER['REQUEST_METHOD'];
}

switch ($method) {
    case 'GET':
        $page = $_GET['page'] ?? 1;
        $limit = 10;
        $offset = ($page - 1) * $limit;

        $totalQuery = $conn->query("SELECT COUNT(*) AS total FROM students");
        $total = $totalQuery->fetch_assoc()['total'];

        $result = $conn->query("SELECT * FROM students LIMIT $offset, $limit");
        $students = [];
        while ($row = $result->fetch_assoc()) {
            $students[] = $row;
        }

        echo json_encode(["data" => $students, "total" => $total]);
        break;

    case 'POST':
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $filePath = '';

        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $fileName = time() . "_" . basename($_FILES['file']['name']);
            $targetPath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
                $filePath = $fileName;
            }
        }

        $stmt = $conn->prepare("INSERT INTO students (name, email, file_path) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $filePath);
        $stmt->execute();

        echo json_encode(["status" => "success"]);
        break;

    case 'PUT':
        $id = $_POST['id'] ?? null;
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $filePath = '';

        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $fileName = time() . "_" . basename($_FILES['file']['name']);
            $targetPath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
                $filePath = $fileName;
            }
        }

        if ($id) {
            if ($filePath) {
                $stmt = $conn->prepare("UPDATE students SET name=?, email=?, file_path=? WHERE id=?");
                $stmt->bind_param("sssi", $name, $email, $filePath, $id);
            } else {
                $stmt = $conn->prepare("UPDATE students SET name=?, email=? WHERE id=?");
                $stmt->bind_param("ssi", $name, $email, $id);
            }
            $stmt->execute();
            echo json_encode(["status" => "updated"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Missing ID"]);
        }
        break;

        case 'DELETE':
            parse_str(file_get_contents("php://input"), $data);
            $id = $data['id'] ?? '';
        
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing ID"]);
                exit;
            }
        
            $stmt = $conn->prepare("DELETE FROM students WHERE id=?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
        
            echo json_encode(["status" => "deleted"]);
            break;
        

    default:
        echo json_encode(["status" => "error", "message" => "Invalid request method"]);
        break;
}
?>
