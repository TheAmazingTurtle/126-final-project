const tileValues = [];

let numRows = 6;
let numCols = 6;
let numVarieties = 6;

let resizeTimer;

document.addEventListener("DOMContentLoaded", generateRandomTileValues);

window.addEventListener("load", generateTileMatrix);
window.addEventListener("resize", generateTileMatrix);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // pick a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];  // swap elements
  }

  return array;
}

function generateRandomTileValues() {
    const totalTiles = numRows * numCols;
    const pairs = Math.floor(totalTiles / 2);

    for (let i = 0; i < pairs; i++) {
        const value = Math.floor(Math.random() * numVarieties) + 1;
        tileValues.push(value, value);
    }

    while (tileValues.length < totalTiles) {
        tileValues.push(null);
    }

    return shuffleArray(tileValues);
}

function generateTileMatrix() {
    const matrixContainer = document.getElementById("game1-matrix-container");
    const tileContainer = document.getElementById("game1-tile-matrix");
    const tileContainerWidth = matrixContainer.offsetWidth;
    const tileContainerHeight = matrixContainer.offsetHeight;

    const imageSrc = "assets/images/tile.png";
    const tileSize = tileContainerHeight / numRows;

    tileContainer.innerHTML = "";

    for (let row = 0; row < numRows; row++) {
        const tileRow = document.createElement("tr");

        for (let col = 0; col < numCols; col++) {
            const tileCell = document.createElement("td");

            const tileDiv = document.createElement("div");
            const tileInnerDiv = document.createElement("div");
           
            tileDiv.classList.add("tile");
            tileInnerDiv.classList.add("tile-inner");    

            const tileFrontDiv = document.createElement("div");
            tileFrontDiv.classList.add("tile-front");

            const imgFront = document.createElement("img");
            imgFront.src = imageSrc;
            imgFront.alt = `Tile ${row * numCols + col + 1} Front`;
            imgFront.style.width = tileSize + "px";
            imgFront.style.height = tileSize + "px";

            tileFrontDiv.appendChild(imgFront);

            const tileBackDiv = document.createElement("div");
            tileBackDiv.classList.add("tile-back");

            const imgBack = document.createElement("img");
            imgBack.src = "assets/tile-entity/0.png";
            imgBack.alt = `Tile ${row * numCols + col + 1} Back`;
            imgBack.style.width = tileSize + "px";
            imgBack.style.height = tileSize + "px";

            tileBackDiv.appendChild(imgBack);

            tileInnerDiv.appendChild(tileFrontDiv);
            tileInnerDiv.appendChild(tileBackDiv);

            tileDiv.appendChild(tileInnerDiv);
            tileCell.appendChild(tileDiv);
            tileRow.appendChild(tileCell);
        }

        tileContainer.appendChild(tileRow);
    }

    document.querySelectorAll('.tile').forEach(card => {
        card.style.width = tileSize + "px";
        card.style.height = tileSize + "px";

        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// DEAL WITH THIS SHIT

const tiles = document.querySelectorAll(".tile");
let firstTile = null;
let secondTile = null;
let lockBoard = false;

tiles.forEach(tile => {
tile.addEventListener("click", () => {
    if (lockBoard || tile === firstTile || tile.classList.contains("matched")) return;

    tile.classList.add("flipped");

    if (!firstTile) {
    firstTile = tile;
    return;
    }

    secondTile = tile;
    lockBoard = true;

    const isMatch = firstTile.dataset.value === secondTile.dataset.value;

    if (isMatch) {
        firstTile.classList.add("matched");
        secondTile.classList.add("matched");
        resetTurn();
    } else {
        setTimeout(() => {
            firstTile.classList.remove("flipped");
            secondTile.classList.remove("flipped");
            resetTurn();
        }, 1000); // wait before unflipping
    }
});
});

function resetTurn() {
    [firstTile, secondTile] = [null, null];
    lockBoard = false;
}
