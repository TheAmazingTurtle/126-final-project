<?php
session_start();
require 'DBConnector.php';

// If it's a GET request, return session info (for JavaScript fetch)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    echo json_encode([
        'isLoggedIn' => isset($_SESSION['user_ID']),
        'userName' => $_SESSION['user_name'] ?? null
    ]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $user_name = trim($_POST['user_name']);
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT user_ID FROM user WHERE user_name = ? AND password = ?");
        $stmt->bind_param("si", $user_name, $password);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows === 1) {
            $stmt->bind_result($user_ID);
            $stmt->fetch();
            $_SESSION['user_ID'] = $user_ID;
            $_SESSION['user_name'] = $user_name;

            echo json_encode(['success'=>true]);

            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
            exit();
        }
    }
?>