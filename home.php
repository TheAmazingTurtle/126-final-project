<?php
session_start();

$isLoggedIn = isset($_SESSION['user_name']);
$user_name = ($isLoggedIn) ? $_SESSION['user_name'] : 'Guest';
$message = $_GET['message'] ?? '';
$error = $_GET['error'] ?? '';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>GITLOG GOURMET</title>
</head>
<body class="home-page" data-message="<?php echo htmlspecialchars($message);?>" data-error="<?php echo htmlspecialchars($error);?>">
    <div id="aspect-ratio-wrapper">
    
        <div id="game-container">
            <header>
                <img id="game-logo" src="assets/images/game-logo.png">
                </a>
                <nav>
                    <a href="leaderboard.php"  class="game-link" data-target="leaderboard.php" >
                        <img src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-trophy-icon-png-image_5069231.jpg" alt="Leaderboard">
                    </a>
                    <a href="about.html">
                        <img src="assets/images/question-mark.png" alt="Tutorial">
                    </a>
                </nav>
            </header>


            <main>
                <img src="assets/images/GITLOG New Title.png" id="title-card">

                

                <div id="game-route-container">

                    <a href="leaderboard.php" class="game-link" data-target="leaderboard.php">
                        <img id="leaderboard-house" src="assets/images/leaderboard-house.png" alt="Leaderboard House">
                    </a>

                    <a href="game1.php" class="game-link" data-target="game1.php" data-protected="true">
                        <img id="game1-house" src="assets/images/Shadow Checkout Resto.png">
                    </a>

                    <a href="game2.php" class="game-link" data-target="game2.php" data-protected="true">
                        <img id="game2-house" src="assets/images/Shadow Forks Up.png">
                    </a>

                </div>
            </main>
        

            <hr id="horizontal-line">

            <footer>
                <p> @2025 Gitlog Gourmet Web App ~ The GITLOG. All rights reserved.</p>
            </footer>
        </div>

        <div id="blackBackground"></div>
        <div id="whiteFadeIn"></div>
        <div id="home_leaderboard_transition"></div>
        
    <div id="popup-overlay">
     <div id="popup">
        <div class="close-button">×</div>
        <form id="signup-form" action="sign_up.php" method="post">
            <label for="user_name"> Create username: </label> 
            <input type="text" name="user_name" required><br>
            
            <div class = "input-password">
            <label for="signup-password"> Create 4-digit pin: </label> 
            <input id="signup-password" type="password" name="password" pattern="\d{4}" maxlength="4" inputmode="numeric" title="Nominate 4-digit password." required><br><br>
            <img src="assets/images/eyes-open.png" id="signup-eye-icon">
            </div>
            <button type="submit">Create Account</button>
            
            <p>
                Already have an account?
                <a href="#"onclick="showLogin()">Login</a>
            </p>
        </form>

        <form id="login-form" action="login.php" method="post">
            <label for="user_name"> Enter username: </label> 
            <input type="text" name="user_name" required><br>
            
            <div class = "input-password">
            <label for="login-password"> Enter 4-digit pin: </label> 
            <input id="login-password" type="password" name="password" pattern="\d{4}" maxlength="4" inputmode="numeric" title="Nominate 4-digit password." required><br><br>
            <img src="assets/images/eyes-open.png" id="login-eye-icon">
            </div>
            <button type="submit">Log In</button>
            
            <p>
                Don't have an account?
                <a href="#" onclick="showSignUp()">Sign up here!</a>
            </p>
        </form>
        </div>
    </div>
    <script src="home-script.js" defer></script>

</body>
</html>
