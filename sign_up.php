<?php

include 'DBConnector.php';
$user_name = trim($_POST["user_name"]);
$password = (int)$_POST["password"];

$stmt = $conn->prepare("SELECT user_ID FROM user WHERE user_name = ?");
$stmt->bind_param("s", $user_name);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    header("Location: home.php?error= Username is already taken. Please enter a different user name or proceed to log in.");
    exit();
}
$stmt->close();

// $password_hash = password_hash($password, PASSWORD_DEFAULT);

$sign_up_stmt = $conn->prepare("INSERT INTO user
        (user_name, 
        password, 
        MG_highest_score, 
        rating_MG, 
        CB_highest_score, 
        rating_CB) 
        VALUES (?,?, '0', '0', '0', '0')");

$sign_up_stmt->bind_param("si",$user_name,$password);

if ($sign_up_stmt->execute()) {
    $msg = urlencode("Sign up successful! Hello, $user_name, you may now proceed to login!");
    header("Location: home.php?message=$msg");
    exit();
    
} else {
    die("Error creating user: " . $conn->error);
}

$sign_up_stmt->close();
$conn->close();
?>  

