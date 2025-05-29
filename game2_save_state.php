<?php
header('Content-Type: application/json');
ini_set('display_errors', 0); // Don't show errors to frontend
ini_set('log_errors', 1);     // Log them to PHP error log
error_reporting(E_ALL);

// if (__FILE__ === realpath($_SERVER['SCRIPT_FILENAME'])) {
//     header('HTTP/1.0 403 Forbidden');
//     exit('This file cannot be accessed directly.');
// }

session_start();
require_once'DBConnector.php';


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

$score = $data['CB_score'] ?? 0;
$correct_values = $data['correct_values'] ?? '[]';
$current_incomplete_guess = $data['current_incomplete_guess'] ?? '[]';
$array_attempts = $data['array_attempts'] ?? '[]';
$difficulty = $data['difficulty'] ?? 'Easy';


    $stmt = $conn->prepare("SELECT CB_game_ID FROM code_breaker WHERE user_ID=?");
    
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
            "UPDATE code_breaker
                SET CB_score = ?,
                    correct_values = ?,
                    current_incomplete_guess = ?,
                    array_attempts = ?,
                    difficulty = ?
              WHERE user_ID = ?");
    
    if (!$update_stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
        exit;
    }
        $update_stmt->bind_param('issssi', $score, $correct_values, $current_incomplete_guess, $array_attempts, $difficulty, $user_ID);
        $executed = $update_stmt->execute();
        $update_stmt->close();

        if ($executed) {
            $current_CB_high_score = $conn->query("SELECT CB_highest_score FROM user WHERE user_ID = $user_ID");
            if($current_CB_high_score){
                $row = $current_CB_high_score->fetch_assoc();
                $new_highest = $row['CB_highest_score']?? 0;
                if($score > $new_highest){
                    $update_CB_high_score = $conn->prepare("UPDATE user SET CB_highest_score = ? WHERE user_ID = ?");
                    if($update_CB_high_score){
                        $update_CB_high_score->bind_param('ii', $score, $user_ID);
                        $update_CB_high_score->execute();
                        $update_CB_high_score->close();
                    }
                }
            } 
            
          

            echo json_encode(['success' => true, 'message' => 'Progress rewritten!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Update failed: ' . $conn->error]);
        }
        
    } else{
        $stmt-> close();
        $insert_stmt = $conn->prepare(
            "INSERT INTO code_breaker
                    (user_ID,
                    CB_score,
                    correct_values,
                    current_incomplete_guess,
                    array_attempts,
                    difficulty)
             VALUES(?,?,?,?,?,?)");
       if (!$insert_stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
        exit;
    }
   
    $insert_stmt->bind_param('iissss', $user_ID, $score, $correct_values, $current_incomplete_guess, $array_attempts, $difficulty);
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



