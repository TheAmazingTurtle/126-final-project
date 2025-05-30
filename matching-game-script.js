const tileValues = [];
const isTileActive = [];
const maxFaceUpCard = 2;

const basePoint = 50;
const comboPointBonus = 10;

let numRows = 10;
let numCols = 10;
let totalTiles = numRows * numCols;

let numVarieties = 10;

let difficulty = "EASY";
let score = 0;
let numOfTilesFlipped = 0;
let numMatchedTiles = 0;
let secondsElapse = 0;

let combo = 0;


let resizeTimer;

document.addEventListener("DOMContentLoaded", initializePage);

window.addEventListener("load", adjustTileMatrix);
window.addEventListener("resize", adjustTileMatrix);

function initializePage(){
    if (currentUserID !== null){
      MG_loadGameState();
    }
    generateRandomTileValues();
    updateClock();
    setInterval(updateClock, 1000);

    refreshStats();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // pick a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];  // swap elements
  }

  return array;
}

function generateRandomTileValues() {
    tileValues.length = 0;
    isTileActive.length = 0;  

    const totalTiles = numRows * numCols;
    const pairs = Math.floor(totalTiles / 2);

    for (let i = 0; i < pairs; i++) {
        const value = Math.floor(Math.random() * numVarieties) + 1;
        tileValues.push(value, value);
    }

    shuffleArray(tileValues);

    const boolBuffer = [];
    for (let i = 0; i < numCols; i++) {
        boolBuffer.push(true);
    }

    for (let i = 0; i < numRows; i++) {
        isTileActive.push(boolBuffer.slice());
    }

    generateTileMatrix();
}

function generateTileMatrix() {
    const matrixContainer = document.getElementById("game1-matrix-container");
    const tileContainer = document.getElementById("game1-tile-matrix");
    const tileContainerWidth = matrixContainer.offsetWidth;
    const tileContainerHeight = matrixContainer.offsetHeight;

    const imageSrc = "assets/images/tile.png";
    const tileSize = (tileContainerHeight / numRows) * 0.8;
    const tileContainerSize = tileContainerHeight / numRows;

    tileContainer.innerHTML = "";

    let tileValueTracker = 0;
    for (let row = 0; row < numRows; row++) {
        const tileRow = document.createElement("tr");

        for (let col = 0; col < numCols; col++) {
            const tileCell = document.createElement("td");
            
            tileRow.appendChild(tileCell);

            const tileDiv = document.createElement("div");
            const tileInnerDiv = document.createElement("div");
           
            tileDiv.classList.add("tile");
            tileInnerDiv.classList.add("tile-inner");

            tileDiv.id = tileValueTracker;    

            const tileFrontDiv = document.createElement("div");
            tileFrontDiv.classList.add("tile-front");

            const imgFront = document.createElement("img");
            imgFront.src = imageSrc;
            imgFront.alt = `Tile ${row * numCols + col + 1} Front`;

            tileFrontDiv.appendChild(imgFront);

            const tileBackDiv = document.createElement("div");
            tileBackDiv.classList.add("tile-back");

            const imgBack = document.createElement("img");
            imgBack.src = "assets/tile-entity/" + tileValues[tileValueTracker] + ".png";
            imgBack.alt = `Tile ${row * numCols + col + 1} Back`;

            tileBackDiv.appendChild(imgBack);

            tileInnerDiv.appendChild(tileFrontDiv);
            tileInnerDiv.appendChild(tileBackDiv);

            tileDiv.appendChild(tileInnerDiv);
            tileCell.appendChild(tileDiv);
            tileRow.appendChild(tileCell);

            tileValueTracker++;
        }

        tileContainer.appendChild(tileRow);
    }

    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', () => {
            if (tile.classList.contains('flipped') || countFaceUpTiles() >= maxFaceUpCard) {
                return;
            }

            tile.classList.add('flipped');
            numOfTilesFlipped++;
            refreshStats();

            if (countFaceUpTiles() === maxFaceUpCard) {
                setTimeout(manageFlipEvent, 500);
            }
        });
    });

    adjustTileMatrix();
}

function manageFlipEvent() {
    const flippedTiles = [...document.querySelectorAll('.flipped')];

    if (flippedTiles.length !== 2) return;

    const [tile1, tile2] = flippedTiles;
    const tile1Id = tile1.id;
    const tile2Id = tile2.id;

    console.log(tile1Id, tile2Id);

    if (tileValues[tile1Id] === tileValues[tile2Id]) {
        // Match

        const row1 = Math.floor(tile1Id / numCols);
        const col1 = tile1Id % numCols;
        const row2 = Math.floor(tile2Id / numCols);
        const col2 = tile2Id % numCols;

        console.log(row1, col1, row2, col2);
        console.log(isTileActive[row1][col1], isTileActive[row2][col2]);


        isTileActive[row1][col1] = false;
        isTileActive[row2][col2] = false;

        console.log(isTileActive);

        tile1.style.visibility = 'hidden';
        tile2.style.visibility = 'hidden';

        numMatchedTiles += 2;
        score += basePoint + comboPointBonus*combo;
        combo++;
        refreshStats();

        if (numMatchedTiles == totalTiles){
            endGame();
        }
    }
    else {
        combo = 0;
    }

    resetAllFaceUpTiles();
}

function countFaceUpTiles() {
    return document.querySelectorAll('.tile.flipped').length;
}

function resetAllFaceUpTiles() {
    document.querySelectorAll('.tile.flipped').forEach(tile => {
        tile.classList.remove('flipped');
    });
}

function endGame(){
    document.getElementById('game1-end-card').style.display = 'flex';
    document.getElementById('tiles-flipped-end-card').innerHTML = numOfTilesFlipped;
    document.getElementById('elapsed-time-end-card').innerHTML = getTextFormTimeElapse();
    document.getElementById('score-end-card').innerHTML = score;
    document.getElementById('difficulty-end-card').innerHTML = difficulty;
}

function adjustTileMatrix() {
    const matrixContainer = document.getElementById("game1-matrix-container");
    const tileContainer = document.getElementById("game1-tile-matrix");
    const tileContainerWidth = matrixContainer.offsetWidth;
    const tileContainerHeight = matrixContainer.offsetHeight;

    const tileSize = (tileContainerHeight / numRows) * 0.8;
    const tileContainerSize = tileContainerHeight / numRows;

    tileContainer.style.width = tileContainerWidth + "px";
    tileContainer.style.height = tileContainerHeight + "px";

    document.querySelectorAll('#game1-tile-matrix td').forEach(tileCell => {
        tileCell.style.width = tileContainerSize + "px";
        tileCell.style.height = tileContainerSize + "px";
    });

    document.querySelectorAll('#game1-tile-matrix img').forEach(img => {
        img.style.width = tileSize + "px";
        img.style.height = tileSize + "px";
        img.style.margin = tileContainerSize * 0.1 + "px";
    }); 


    document.querySelectorAll('.tile').forEach(tile => {
        tile.style.width = tileSize + "px";
        tile.style.height = tileSize + "px";
    });
}

function refreshStats() {
    document.getElementById("difficulty-value").innerText = difficulty;
    document.getElementById("score-value").innerText = score;
    document.getElementById("tiles-turned-value").innerText = numOfTilesFlipped;
}

function updateClock() {
    document.getElementById('game1-time').innerHTML = getTextFormTimeElapse();

    secondsElapse++;
}

function getTextFormTimeElapse(){
    const minutes = Math.floor(secondsElapse / 60);
    const seconds = secondsElapse%60

    const secondsText = (seconds < 10 ? "0" : "") + seconds.toString();
    
    return `${minutes}:${secondsText}`;
}

function buildFullTileState(){
    const fullTileState = [];

    for (let i = 0; i < totalTiles ; i++){
        const tile = document.getElementById(i);
        const row = Math.floor(i/numCols);
        const col = i % numCols;

        fullTileState.push({
          tileID: i,
          value: tileValues[i],
          flipped: tile.classList.contains('flipped'),
          active: isTileActive[row][col]

        });
    }
    return fullTileState;
}

function retrieveFullTileState(fullTileState){
  isTileActive.length = 0;
  tileValues.length = 0;

  for (let row = 0; row < numRows; row++){
    isTileActive.push([]);
    for (let col = 0; col < numCols; col++){
      isTileActive[row].push(true);
      tileValues.push(-1);
    }
  }


  fullTileState.forEach(tile => {
    const row = Math.floor(tile.tileID / numCols);
    const col = tile.tileID % numCols;

    tileValues[tile.tileID] = tile.value;
    isTileActive[row][col] = tile.active;
  });

  generateTileMatrix();

  for(let i = 0; i < totalTiles; i++){
    const row = Math.floor(i / numCols);
    const col = i % numCols;
    const tileElement = document.getElementById(i.toString());
    if(tileElement){
      if(isTileActive[row][col]){
        tileElement.style.visibility = 'visible';
      } else {
        tileElement.style.visibility = 'hidden';
      }
    }
  }

  fullTileState.forEach(tile => {
    const row = Math.floor(tile.tileID / numCols);
    const col = tile.tileID % numCols;

    // Flip only if tile is active and marked flipped in saved state
    if (tile.flipped && isTileActive[row][col]) {
      const flippedTile = document.getElementById(tile.tileID.toString());
      if (flippedTile) flippedTile.classList.add("flipped");
    }
  });
}

function MG_saveGameState(){
    console.log("Current User ID: ", currentUserID); // Add 
    console.log("Saving game state...");
    console.log("Game is being tracked.");
    if (typeof currentUserID === 'undefined' || currentUserID === null) {
        console.error("Error: currentUserID is not set. Cannot save game state.");
        return;
    }


    console.log("Game is being tracked.");
    console.log("Current User ID:", currentUserID);
    console.log("Score:", score);
    console.log("Full Tile States:", buildFullTileState());

    const MG_gameState = {
        user_ID: currentUserID,
        MG_score: score,
        tiles_turned_count: numOfTilesFlipped,
        full_tile_state: JSON.stringify(buildFullTileState()),
        time_elapsed: secondsElapse,
        last_time_accessed: new Date().toISOString(),
        difficulty: difficulty,
    };

    console.log("Game state to save:", MG_gameState);


    fetch("game1_save_state.php", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(MG_gameState)
    })
     .then(response => {
        console.log("Fetch response status:", response.status);  
        return response.json();
    })
    .then(data => {
        console.log("Game saved successfully: ", data);
        return data; // resolve with data
    })
    .catch(error => {
        console.error("Error saving game:", error);
        throw error; // re-throw to reject promise
    });
}

function MG_loadGameState() {
  console.log("MG_loadGameState: Starting to load game state...");

  return fetch("game1_load_state.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_ID: currentUserID })
  })
  .then(response => {
    console.log("MG_loadGameState: Received response from server.");
    return response.json();
  })
  .then(data => {
    console.log("MG_loadGameState: Parsed JSON data:", data);
    
    if (!data.success) {
      console.error("MG_loadGameState: Failed to load game state:", data.message);

    }

    // Restore variables
    score = data.MG_score;
    numOfTilesFlipped = data.tiles_turned_count;
    secondsElapse = data.time_elapsed;
    difficulty = data.difficulty;
    
    console.log("MG_loadGameState: Restored variables:", {
      score,
      numOfTilesFlipped,
      secondsElapse,
      difficulty
    });

    console.log("MG_loadGameState: Called generateTileMatrix()");

    const fullTileState = JSON.parse(data.full_tile_state);
    console.log("MG_loadGameState: Parsed fullTileState:", fullTileState);

    retrieveFullTileState(fullTileState);
    console.log("MG_loadGameState: Called retrieveFullTileState()");

    refreshStats();
    console.log("MG_loadGameState: Called refreshStats()");

    console.log("MG_loadGameState: Finished loading game state successfully.");
    return true;
  })
  .catch(error => {
    console.error("MG_loadGameState: Error loading game:", error);
  });
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();

      const href = link.href;
      console.log("Clicked link href:", href);

      try {
        await MG_saveGameState();
        console.log("Save complete, navigating now...");
      } catch (e) {
        console.log("Save failed, navigating anyway...");
      }

      window.location.href = href;
    });
  });