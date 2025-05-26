<?php
ini_set('display_errors', 1); // Don't show errors to frontend
ini_set('log_errors', 1);     // Log them to PHP error log
error_reporting(E_ALL);

session_start();
require_once'DBConnector.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_ID'])){
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit;
    
}

$user_ID = $_SESSION['user_ID'];

$data = json_decode(file_get_contents('php://input'), true);

if (!$data){
    echo json_encode(['success'=> false, 'message' => 'No data received!']);
    exit;
}

$score = $data['MG_score'] ?? 0;
$tiles_turned = $data['tiles_turned_count'] ?? 0;
$tile_placement = $data['tile_placement'] ?? '[]';
$time_elapsed = $data['time_elapsed'] ?? 0;
$difficulty = $data['difficulty'] ?? 'Easy';


    $stmt = $conn->prepare("SELECT MG_game_ID FROM matching_game WHERE user_ID=?");
    
    if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit;
    }

    $stmt->bind_param('i', $user_ID);
    $stmt->execute();
    $stmt->store_result();
    
   
    if ($stmt->num_rows > 0){
        $stmt-> close();
        $update_stmt = $conn->prepare(
            "UPDATE matching_game
                SET MG_score = ?,
                    tiles_turned_count = ?,
                    tile_placement = ?,
                    time_elapsed = ?,
                    difficulty = ?
              WHERE user_ID = ?");
        // $update_stmt-> execute([$score, $tiles_turned, $tile_placement, $time_elapsed, $difficulty, $user_ID]);
    
    if (!$update_stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
        exit;
    }
        $update_stmt->bind_param('iisisi', $score, $tiles_turned, $tile_placement, $time_elapsed, $difficulty, $user_ID);
        $executed = $update_stmt->execute();
        $update_stmt->close();

        if ($executed) {
        echo json_encode(['success' => true, 'message' => 'Progress rewritten!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Update failed: ' . $conn->error]);
        }
        

    } else{
        $stmt-> close();
        $insert_stmt = $conn->prepare(
            "INSERT INTO matching_game
                    (user_ID,
                    MG_score,
                    tiles_turned_count,
                    tile_placement,
                    time_elapsed,
                    difficulty)
             VALUES(?,?,?,?,?,?)");
       if (!$insert_stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
        exit;
    }
    $insert_stmt->bind_param('iiisis', $user_ID, $score, $tiles_turned, $tile_placement, $time_elapsed, $difficulty);
    $executed = $insert_stmt->execute();
    $insert_stmt->close();

    if ($executed) {
        echo json_encode(['success' => true, 'message' => 'Game saved!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Insert failed: ' . $conn->error]);
    }
}

exit();
?>



