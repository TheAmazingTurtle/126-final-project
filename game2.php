<?php
session_start();
require_once 'DBConnector.php';

if (!isset($_SESSION['user_ID'])) {
    header("Location: login.php"); // Redirect if not logged in
    exit();
}

$_SESSION['difficulty'] = 'Easy';
$_SESSION['current_page'] = 'Game2';


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>GITLOG GOURMET</title>
</head>
<body class="game2-page">
    <div id="aspect-ratio-wrapper">
        <div id="game-container">
            <div id="game2-end-card">
                <h2 id="game2-result">Game Over</h2>
                <div class="end-card-stats">
                    <p><strong>Number of Attempts:</strong> <span id="attempts-end-card">0</span></p>
                    <p><strong>Difficulty:</strong> <span id="difficulty-end-card">Easy</span></p>
                </div>
                <div class="end-card-buttons">
                    <a href="home.php" class="button-link">
                        <img src="https://cdn-icons-png.flaticon.com/512/61/61972.png" alt="Home Button">
                    </a>
                    <a href="game2.php" class="button-link" onclick="playAgain()">
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
                        <img src="assets/images/homeIcon.png" alt="Home">
                    </a>
                    <a href="leaderboard.html">
                        <img src="assets/images/trophyIcon.png" alt="Leaderboard">
                    </a>
                </nav>
            </header>
            <main>
                <div class="game2-content">
                <!-- Left part of the page for the game 2 - code breaker -->
                    <div id="game2-top">

                        <div id="game2-left">
                            <div id="guessed-order">
                                <div id="fruit-guess">

                                </div>
                                <div id="main-guess">
                                    
                                </div>
                                <div id="drink-guess">
                                    
                                </div>
                                <div id="dessert-guess">
                                    
                                </div>
                            </div>

                            <div id="correct-order">

                                <div id="fruit-correct">
                                    <img src="assets/images/tile.png">
                                </div>

                                <div id="main-correct">
                                    <img src="assets/images/tile.png">
                                </div>

                                <div id="drink-correct">
                                    <img src="assets/images/tile.png">
                                </div>

                                <div id="dessert-correct">
                                    <img src="assets/images/tile.png">
                                </div>
                            </div>


                            <div id="game2-status">
                                <h3> CURRENT STATUS </h3>
                                <div id="status">
                                    <p id="correct-guess-prompt">Correct Guess: 0</p>
                                    <p id="correct-row-prompt">Correct Col: 0</p>
                                </div>
                            </div>

                            <div class="tutorial-dialogue" id="game2-tutorial-container">
                            </div>

                        </div>

                        <div id="game2-cabinet">
                            <form id="guess-form">
                                <table>
                                    <tbody>
                                        <tr id="fruit-row">
                                            <td>
                                                <input type="radio" name="fruit-choice" value="0">
                                                <img src="assets/cabinet/fruit-0.png" id="fruit-0" class="fruit">
                                            </td>
                                            <td>
                                                <input type="radio" name="fruit-choice" value="1">
                                                <img src="assets/cabinet/fruit-1.png" id="fruit-1" class="fruit">
                                            </td>
                                            <td>
                                                <input type="radio" name="fruit-choice" value="2">
                                                <img src="assets/cabinet/fruit-2.png" id="fruit-2" class="fruit">
                                            </td>
                                            <td>
                                                <input type="radio" name="fruit-choice" value="3">
                                                <img src="assets/cabinet/fruit-3.png" id="fruit-3" class="fruit">
                                            </td>
                                        </tr>

                                        <tr id="main-row">
                                            <td>
                                                <input type="radio" name="main-choice" value="0">
                                                <img src="assets/cabinet/main-0.png" id="main-0" class="main">
                                            </td>
                                            <td>
                                                <input type="radio" name="main-choice" value="1">
                                                <img src="assets/cabinet/main-1.png" id="main-1" class="main">
                                            </td>
                                            <td>
                                                <input type="radio" name="main-choice" value="2">
                                                <img src="assets/cabinet/main-2.png" id="main-2" class="main">
                                            </td>
                                            <td>
                                                <input type="radio" name="main-choice" value="3">
                                                <img src="assets/cabinet/main-3.png" id="main-3" class="main">
                                            </td>
                                        </tr>

                                        <tr id="drink-row">
                                            <td>
                                                <input type="radio" name="drink-choice" value="0">
                                                <img src="assets/cabinet/drink-0.png" id="drink-0" class="drink">
                                            </td>
                                            <td>
                                                <input type="radio" name="drink-choice" value="1">
                                                <img src="assets/cabinet/drink-1.png" id="drink-1" class="drink">
                                            </td>
                                            <td>
                                                <input type="radio" name="drink-choice" value="2">
                                                <img src="assets/cabinet/drink-2.png" id="drink-2" class="drink">
                                            </td>
                                            <td>
                                                <input type="radio" name="drink-choice" value="3">
                                                <img src="assets/cabinet/drink-3.png" id="drink-3" class="drink">
                                            </td>
                                        </tr>

                                        <tr id="dessert-row">
                                            <td>
                                                <input type="radio" name="dessert-choice" value="0">
                                                <img src="assets/cabinet/dessert-0.png" id="dessert-0" class="dessert">
                                            </td>
                                            <td>
                                                <input type="radio" name="dessert-choice" value="1">
                                                <img src="assets/cabinet/dessert-1.png" id="dessert-1" class="dessert">
                                            </td>
                                            <td>
                                                <input type="radio" name="dessert-choice" value="2">
                                                <img src="assets/cabinet/dessert-2.png" id="dessert-2" class="dessert">
                                            </td>
                                            <td>
                                                <input type="radio" name="dessert-choice" value="3">
                                                <img src="assets/cabinet/dessert-3.png" id="dessert-3" class="dessert">
                                            </td>
                                        </tr>

                                        <tr id="game2-button-row">
                                            <td id="game2-button-container" colspan="5">

                                                <button id="game2-reset-button" type="reset">
                                                    <img id="resetGame2" src="assets/images/reset.png">
                                                </button>

                                                <button id="game2-submit-button" type="button">
                                                    <img id="submitGame2" src="assets/images/submit.png">
                                                </button>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>

                        
                    <div id="game2-bottom">
                        <div id="game2-attempt-title"> 
                            <h4> Attempts:  </h4>
                        </div>
                        <div id="game2-attempt-container"></div>
                        <div id="game2-stat">
                            <div>
                                <h4 id="game2-difficulty">GUESSES LEFT: </h4>
                                <h4 id="game2-tiles-turned">SCORE: </h4>
                            </div>
                        </div>
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
    
    <script src="code-breaker-game-script.js"></script>
    <script src="universal-style-script.js"></script>
</body>
</html>
