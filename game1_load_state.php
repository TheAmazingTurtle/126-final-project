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
                      FROM matching_game 
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

    $_SESSION['MG_game_ID'] = $row['MG_game_ID'];
    $_SESSION['MG_score'] = $row['MG_score'];
    $_SESSION['tiles_turned_down'] = $row['tiles_turned_down'];
    $_SESSION['full_tile_state'] = $row['full_tile_state'];
    $_SESSION['time_elapsed'] = $row['time_elapsed'];
    $_SESSION['difficulty'] = $row['difficulty'];

    echo json_encode([
        "success"=> true,
        "MG_score"=> $row['MG_score'],
        "tiles_turned_count" => $row['tiles_turned_count'],
        "full_tile_state" => $row['full_tile_state'],
        "time_elapsed" => $row['time_elapsed'],
        "difficulty" => $row['difficulty']
    ]);
} else {
    echo json_encode(["success"=> false,"message"=>"No saved game found."]);
}

$conn-> close();
?>



