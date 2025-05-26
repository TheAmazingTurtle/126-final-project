<?php
session_start();
require_once 'DBConnector.php';

if (!isset($_SESSION['user_ID'])) {
    header("Location: login.php"); // Redirect if not logged in
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>GITLOG GOURMET</title>
</head>
<body class="game1-page">
    <div id="aspect-ratio-wrapper">
        <div id="game-container">
            <div id="game1-end-card">
                <h2>Game Over</h2>
                <div class="end-card-stats">
                    <p><strong>Tiles Flipped:</strong> <span id="tiles-flipped-end-card">0</span></p>
                    <p><strong>Time Elapsed:</strong> <span id="elapsed-time-end-card">00:00</span></p>
                    <p><strong>Score:</strong> <span id="score-end-card">0</span></p>
                    <p><strong>Difficulty:</strong> <span id="difficulty-end-card">Easy</span></p>
                </div>
                <div class="end-card-buttons">
                    <a href="home.php" class="button-link">
                        <img src="https://cdn-icons-png.flaticon.com/512/61/61972.png" alt="Home Button">
                    </a>
                    <a href="game1.html" class="button-link" onclick="playAgain()">
                        <img src="" alt="Restart Button">
                    </a>
                    <a href="leaderboard.html" class="button-link">
                        <img src="" alt="Trophy Button">
                    </a>
                </div>
            </div>

            <header>
                <img id="game-logo" src="assets/images/game-logo.png">
                
                <nav>

                    <a href="home.php">
                        <img src="https://cdn-icons-png.flaticon.com/512/61/61972.png" alt="Home">
                    </a>
                    <a href="leaderboard.html" class="game-link" data-target="leaderboard.html">
                        <img src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-trophy-icon-png-image_5069231.jpg" alt="Leaderboard">
                    </a>
                </nav>
            </header>
            <main>
                <div class="game1-content">
                    <div id="game1-left">
                            <div id="game1-time-container">
                                <h3>TIME ELAPSE:</h3>
                                <p id="game1-time">0:00</p>
                            </div>
                            <img id="timerGlassHour" src="assets/images/hourglass.png">
                            <img id="powerUpJar" src="https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=612x612&w=0&k=20&c=390e76zN_TJ7HZHJpnI7jNl7UBpO3UP7hpR2meE1Qd4=">
                    </div>
                    <div id="game1-center">
                        <div id="game1-matrix-container">
                            <table id="game1-tile-matrix"></table>
                        </div>

                        <div id="game1-stat-container">
                            <div>
                                <h4>DIFFICULTY:</h4>
                                <h4 id="difficulty-value"></h4>
                            </div>
                            <div>
                                <h4>SCORE:</h4>
                                <h4 id="score-value"></h4>
                            </div>
                            <div>
                                <h4>TILES TURNED: </h4>
                                <h4 id="tiles-turned-value"></h4>
                            </div>
                        </div>
                    </div>
                        
                    <div id="game1-right">
                        <div id="game1-dialogue-container" >
                            <h2>TUTORIAL DIALOGUE</h2>
                            <p id="game1Tutorial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ullam, iusto deserunt facilis veniam recusandae mollitia architecto! Quam natus ipsa sapiente vel atque, quos modi fuga quae, nobis, hic tenetur?</p>
                        </div>

                        <img id="game1-mascot" src="https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=612x612&w=0&k=20&c=390e76zN_TJ7HZHJpnI7jNl7UBpO3UP7hpR2meE1Qd4=">
                    </div>
                </div>
            </main>

            <hr id="horizontal-line">
            
            <footer>
                <p> @2025 Gitlog Gourmet Web App ~ The GITLOG. All rights reserved.</p>
            </footer>
        </div>

        <div id="blackBackground"></div>
        <div id="whiteFadeIn_game"></div>
    </div>
    <script>
        const currentUserID = <?php echo json_encode($_SESSION['user_ID']?? null); ?>;
        console.log("Current User ID:", currentUserID);
    </script>
    <script src="matching-game-script.js"></script>
</body>
</html>
