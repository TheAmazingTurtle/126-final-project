<?php
ini_set('display_errors', 0); // Don't show errors to frontend
ini_set('log_errors', 1);     // Log them to PHP error log
error_reporting(E_ALL);


header('Content-Type: application/json'); 

session_start();
include 'DBConnector.php';

if (!isset($_SESSION['user_ID'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}


$user_ID = $_SESSION['user_ID'];

$retrieve_user_sql = "SELECT * 
                      FROM code_breaker 
                      WHERE user_ID =?
                      ORDER BY last_time_accessed DESC LIMIT 1";

$stmt = $conn->prepare($retrieve_user_sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'DB prepare failed: ' . $conn->error]);
    exit();
}
$stmt->bind_param("i", $user_ID);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows>0){
    $row = $result->fetch_assoc();

    $_SESSION['CB_game_ID'] = $row['CB_game_ID'];
    $_SESSION['CB_score'] = $row['CB_score'];
    $_SESSION['correct_values'] = $row['correct_values'];
    $_SESSION['current_incomplete_guess'] = $row['current_incomplete_guess'];
    $_SESSION['array_attempts'] = $row['array_attempts'];
    $_SESSION['difficulty'] = $row['difficulty'];

    echo json_encode([
        "success"=> true,
        "CB_score"=> $row['CB_score'],
        "correct_values" => $row['correct_values'],
        "current_incomplete_guess" => $row['current_incomplete_guess'],
        "array_attempts" => $row['array_attempts'],
        "difficulty" => $row['difficulty']
    ]);
} else {
    echo json_encode(["success"=> false,"message"=>"No saved game found."]);
}
$conn-> close();
?>



