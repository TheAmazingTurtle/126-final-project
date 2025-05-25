document.addEventListener("DOMContentLoaded", initializePage);

function initializePage(){
    document.querySelectorAll('#leaderboard-table-container table').forEach(table =>{
        table.classList.add('inactive-board');
    });
}

function selectBoard(boardNum) {
    const radio = document.getElementById(`game${boardNum}-radio`);
    if (radio) {
        radio.checked = true;
    }
}

function loadLeaderboard(url, elementId) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => {
      console.error(`Error loading leaderboard from ${url}:`, error);
    });
}

loadLeaderboard('leaderboard_game1.php', 'leaderboard-game1-body');
loadLeaderboard('leaderboard_game2.php', 'leaderboard-game2-body');