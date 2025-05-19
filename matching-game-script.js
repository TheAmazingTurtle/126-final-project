document.addEventListener("DOMContentLoaded", generateTileMatrix(6,6));

function generateTileMatrix(rows, cols) {
    const tileContainer = document.getElementById("game1-tile-matrix");
    const tileContainerWidth = tileContainer.offsetWidth;
    const tileContainerHeight = tileContainer.offsetHeight;

    const imageSrc = "assets/images/tile.png";
    const tileSize = tileContainerHeight / rows * 0.8;

    for (let row = 0; row < rows; row++) {
        const tileRow = document.createElement("tr");

        for (let col = 0; col < cols; col++) {
            const tileCell = document.createElement("td");

            tileCell.classList.add("tile");

            const img = document.createElement("img");
            img.src = imageSrc;
            img.alt = `Tile ${row * cols + col + 1}`;
            img.style.width = tileSize + "px";
            img.style.height = tileSize + "px";

            tileCell.appendChild(img);
            tileRow.appendChild(tileCell);
        }

        tileContainer.appendChild(tileRow);
    }
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
