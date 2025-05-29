const numGuessOptions = 5;
const numGuessTypes = 4;
let maxAttempts = 5;

const correctValues = [];
const attempts = []

let attemptNum = 1;
let difficulty = "Easy";
let totalScore = 0;
let currentIncompleteGuess = {
    fruit: null,
    main: null,
    drink: null,
    dessert: null
};

document.addEventListener("DOMContentLoaded", initializeGame);

document.getElementById("game2-reset-button").addEventListener("click", resetGuess);
document.getElementById("game2-submit-button").addEventListener("click", evaluateGuess);

function initializeGame() {
    createAttemptObjects();
    assignOnClickEventToImg();
    generateOrderToGuess();
}

function createAttemptObjects(){
    const attemptContainer = document.getElementById("game2-attempt-container");

    for (let i = 1; i <= maxAttempts; i++){
        const attemptContent = document.createElement("div");
        attemptContent.id = `attempt-${i}`;

            const attemptImageContainer = document.createElement("div");
            attemptImageContainer.classList.add("attempt-image-container");

            const fruitImgContainer = document.createElement("div");
            fruitImgContainer.id = `fruit-attempt-${i}`;

            const mainImgContainer = document.createElement("div");
            mainImgContainer.id = `main-attempt-${i}`;

            const drinkImgContainer = document.createElement("div");
            drinkImgContainer.id = `drink-attempt-${i}`;

            const dessertImgContainer = document.createElement("div");
            dessertImgContainer.id = `dessert-attempt-${i}`;

            attemptImageContainer.appendChild(fruitImgContainer);
            attemptImageContainer.appendChild(mainImgContainer);
            attemptImageContainer.appendChild(drinkImgContainer);
            attemptImageContainer.appendChild(dessertImgContainer);

        attemptContent.appendChild(attemptImageContainer);

            const attemptHint = document.createElement("div");
            attemptHint.id = `attempt-${i}-hint`;
            attemptHint.classList.add("attempt-hints");

        attemptContent.appendChild(attemptHint);
        
        attemptContainer.appendChild(attemptContent);
    }
}

function assignOnClickEventToImg(){
    document.querySelectorAll('#game2-cabinet table img').forEach(choice => {
        choice.addEventListener('click', function () {
            const radio = choice.closest("td").querySelector("input[type='radio']");

            if (radio) {
                radio.checked = true;
            }

            radio.checked = true;
            const value = radio.value;

            let divGuessContainer;
            const img = document.createElement("img");
            img.src = choice.src;
            img.alt = choice.alt;

            if (choice.classList.contains("fruit")) {
                divGuessContainer = document.getElementById("fruit-guess");
                currentIncompleteGuess.fruit = value;
            }
            
            else if (choice.classList.contains("main")) {
                divGuessContainer = document.getElementById("main-guess");
                currentIncompleteGuess.main = value;
            }

            else if (choice.classList.contains("drink")) {
                divGuessContainer = document.getElementById("drink-guess");
                currentIncompleteGuess.drink = value;
            }

            else if (choice.classList.contains("dessert")) {
                divGuessContainer = document.getElementById("dessert-guess");
                currentIncompleteGuess.dessert = value;
            }

            else {
                console.error("Unknown class for choice:", choice.classList);
                return;
            }

            divGuessContainer.innerHTML = "";
            divGuessContainer.appendChild(img);
        });
    });
}

function generateOrderToGuess(){
    const fruitValue = Math.floor(Math.random() * numGuessOptions).toString();
    const mainValue = Math.floor(Math.random() * numGuessOptions).toString();
    const drinkValue = Math.floor(Math.random() * numGuessOptions).toString();
    const dessertValue = Math.floor(Math.random() * numGuessOptions).toString();

    correctValues.push(fruitValue);
    correctValues.push(mainValue);
    correctValues.push(drinkValue);
    correctValues.push(dessertValue);
}

function resetGuess() {
    document.getElementById("fruit-guess").innerHTML = "";
    document.getElementById("main-guess").innerHTML = "";
    document.getElementById("drink-guess").innerHTML = "";
    document.getElementById("dessert-guess").innerHTML = "";

    currentIncompleteGuess = {
        fruit: null,
        main: null,
        drink: null,
        dessert: null
    };
}

function evaluateGuess() {
    if (!isValidSubmit()){
        alert("Please complete your guess.");
        return;
    }

    const playerFruitGuessValue = document.querySelector('input[name="fruit-choice"]:checked').value;
    const playerMainGuessValue = document.querySelector('input[name="main-choice"]:checked').value;
    const playerDrinkGuessValue = document.querySelector('input[name="drink-choice"]:checked').value;
    const playerDessertGuessValue = document.querySelector('input[name="dessert-choice"]:checked').value;

    const playerGuessValues = [playerFruitGuessValue, playerMainGuessValue, playerDrinkGuessValue, playerDessertGuessValue];

    let correctGuess = 0;
    let correctRow = 0;

    const playerWrongGuess = [];
    const correctRowValues = new Set();

    for (let i = 0; i < numGuessTypes; i++){
        if (playerGuessValues[i] == correctValues[i]){
            correctGuess++;
        }
        else {
            playerWrongGuess.push(playerGuessValues[i]);
            correctRowValues.add(correctValues[i]);
        }
    }

    for (let i = 0; i < playerWrongGuess.length; i++){
        if (correctRowValues.has(playerWrongGuess[i])){
            correctRow++;
        }
    }


    // for background ~ open take out box
    // const openTakeOutBox = document.createElement('img'); 
    // openTakeOutBox.src = "assets/cabinet/Takeout box open back.png";
    document.querySelector(`#attempt-${attemptNum} .attempt-image-container`).style.backgroundImage = 'url("assets/images/Takeout box open back.png")';
    document.querySelector(`#attempt-${attemptNum} .attempt-image-container`).style.backgroundSize = 'cover';
    document.querySelector(`#attempt-${attemptNum} .attempt-image-container`).style.backgroundRepeat = 'no-repeat';


    const fruitAttemptImg = document.createElement('img');
    fruitAttemptImg.src = "assets/cabinet/fruit-" + playerFruitGuessValue + ".png";
    document.getElementById(`fruit-attempt-${attemptNum}`).appendChild(fruitAttemptImg);

    const mainAttemptImg = document.createElement('img');
    mainAttemptImg.src = "assets/cabinet/main-" + playerMainGuessValue + ".png";
    document.getElementById(`main-attempt-${attemptNum}`).appendChild(mainAttemptImg);

    const drinkAttemptImg = document.createElement('img');
    drinkAttemptImg.src = "assets/cabinet/drink-" + playerDrinkGuessValue + ".png";
    document.getElementById(`drink-attempt-${attemptNum}`).appendChild(drinkAttemptImg);

    const dessertAttemptImg = document.createElement('img');
    dessertAttemptImg.src = "assets/cabinet/dessert-" + playerDessertGuessValue + ".png";
    document.getElementById(`dessert-attempt-${attemptNum}`).appendChild(dessertAttemptImg);

    const correctGuessStatus = document.createElement('h3');
    correctGuessStatus.innerHTML = correctGuess.toString();
    correctGuessStatus.classList.add("attempt-hint-correct-guess");
    document.getElementById(`attempt-${attemptNum}-hint`).appendChild(correctGuessStatus);

    const correctRowStatus = document.createElement('h3');
    correctRowStatus.innerHTML = correctRow.toString();
    correctRowStatus.classList.add("attempt-hint-correct-row");
    document.getElementById(`attempt-${attemptNum}-hint`).appendChild(correctRowStatus);

    let guessesLeft = maxAttempts - attemptNum;
    let guessScore = correctGuess*10 + correctRow*5;
    
    totalScore += guessScore;
    attemptNum++;
   
    document.getElementById("correct-guess-prompt").innerHTML = `Correct Guess: ${correctGuess}`;
    document.getElementById("correct-row-prompt").innerHTML = `Correct Row: ${correctRow}`;
    document.getElementById('game2-guess-score').innerHTML = `GUESS SCORE: ${guessScore}`;
    document.getElementById('game2-guesses-left').textContent = `GUESSES LEFT: ${guessesLeft}`;
    document.getElementById('game2-total-score').textContent = `TOTAL SCORE: ${totalScore}`;
   
    storeAttempt(playerGuessValues, correctGuess, correctRow, guessScore);

    if (correctGuess == numGuessTypes ){
        endGame(true);
    }
    else if (attemptNum - 1 == maxAttempts){
        endGame(false);
    }
}

function isValidSubmit() {
    const form = document.getElementById("guess-form");
    const radioInputs = form.querySelectorAll('input[type="radio"]');
    const radioNames = new Set();


    radioInputs.forEach(radio => radioNames.add(radio.name));

    let guessComplete = true;
    radioNames.forEach(name => {
        const isChecked = form.querySelector(`input[name="${name}"]:checked`);
        if (!isChecked) {
            guessComplete = false;
        }
    });

    return guessComplete;
}

function endGame(win){
    const result = (win ? "YOU WIN" : "YOU LOSE");

    const ids = [
        'fruit-correct',
        'main-correct',
        'drink-correct',
        'dessert-correct'
      ];

    ids.forEach(id => {
        const container = document.getElementById(id);
        const img = container.querySelector('img');
        if (img) {
          img.remove();
        }
     });

    document.getElementById('game2-end-card').style.display = 'flex';
    document.getElementById('game2-result').innerHTML = result;
    document.getElementById('attempts-end-card').innerHTML = attemptNum;
    document.getElementById('difficulty-end-card').innerHTML = difficulty;

    const fruitCorrectImg = document.createElement('img');
    fruitCorrectImg.src = "assets/cabinet/fruit-" + correctValues[0] + ".png";
    document.getElementById("fruit-correct").appendChild(fruitCorrectImg);

    const mainCorrectImg = document.createElement('img');
    mainCorrectImg.src = "assets/cabinet/main-" + correctValues[1] + ".png";
    document.getElementById("main-correct").appendChild(mainCorrectImg);

    const drinkCorrectImg = document.createElement('img');
    drinkCorrectImg.src = "assets/cabinet/drink-" + correctValues[2] + ".png";
    document.getElementById("drink-correct").appendChild(drinkCorrectImg);

    const dessertCorrectImg = document.createElement('img');
    dessertCorrectImg.src = "assets/cabinet/dessert-" + correctValues[3] + ".png";
    document.getElementById("dessert-correct").appendChild(dessertCorrectImg);

}

function storeAttempt(guessArray, correctGuessCount, correctRowCount, score){
    attempts.push({
        fruit: guessArray[0],
        main: guessArray[1],
        drink: guessArray[2],
        dessert : guessArray[3],
        correctGuessCount :correctGuessCount,
        correctRowCount: correctRowCount,
        score: score
    });
}

function CB_saveGameState(){
    console.log("Current User ID: ", currentUserID); // Add 
    console.log("Saving game state...");
    console.log("Game is being tracked.");
    if (typeof currentUserID === 'undefined' || currentUserID === null) {
        console.error("Error: currentUserID is not set. Cannot save game state.");
        return;
    }


    console.log("Game is being tracked.");
    console.log("Current User ID:", currentUserID);
    console.log("Score:", totalScore);
    console.log("Correct guess array", correctValues );
    console.log("Current incomplete guess array", currentIncompleteGuess );
    console.log("Attempts array", attempts);

    const CB_gameState = {
        user_ID: currentUserID,
        CB_score: totalScore,
        correct_values: JSON.stringify(correctValues),
        current_incomplete_guess : JSON.stringify(currentIncompleteGuess),
        array_attempts: JSON.stringify(attempts),
        last_time_accessed: new Date().toISOString(),
        difficulty: difficulty,
    };

    console.log("Game state to save:", CB_gameState);


    fetch("game2_save_state.php", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(CB_gameState)
    })
    .then(response=> {
        console.log("Fetch response status:", response.status);  
        return response.json()
    })
    .then(data=> {
        console.log("Game saved successfully: ", data);
    })

    .catch(error=>{
        console.error("Error saving game:", error);
    });
}

function CB_loadGameState() {
    maxAttempts - attempts.length;
    attemptNum = attempts.length + 1;
  
    console.log("CB_loadGameState: Starting to load game state...");
  isLoadingGame = true;
  return fetch("game2_load_state.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_ID: currentUserID })
  })
  .then(response => {
    console.log("CB_loadGameState: Received response from server.");
    return response.json();
  })
  .then(data => {
    console.log("CB_loadGameState: Parsed JSON data:", data);
    
    if (!data.success) {
      console.error("CB_loadGameState: Failed to load game state:", data.message);
      isLoadingGame = false;
      return false;
    }

    // Restore variables
    score = data.CB_score;
    
    difficulty = data.difficulty;
    
    console.log("CB_loadGameState: Restored variables:", {
      totalScore,
      correctValues,
      currentIncompleteGuess,
      attempts,
      difficulty
    });

    console.log("CB_loadGameState: Called generateTileMatrix()");

    const fullTileState = JSON.parse(data.full_tile_state);
    console.log("CB_loadGameState: Parsed fullTileState:", fullTileState);

    retrieveFullTileState(fullTileState);
    console.log("CB_loadGameState: Called retrieveFullTileState()");

    refreshStats();
    console.log("CB_loadGameState: Called refreshStats()");

    isLoadingGame = false;
    console.log("CB_loadGameState: Finished loading game state successfully.");
    return true;
  })
  .catch(error => {
    console.error("CB_loadGameState: Error loading game:", error);
    isLoadingGame = false;
    return false;
  });
}


document.addEventListener("keydown", (e) => {
  if (e.key === "s") {
    console.log("Manual save triggered with S key");
    CB_saveGameState();
  } else if (e.key==='l'){
    console.log("Manual load triggered with L key");
    CB_loadGameState();
  }
});



