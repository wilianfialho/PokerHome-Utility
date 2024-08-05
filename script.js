let players = JSON.parse(localStorage.getItem('players')) || [];
let timerInterval;
let timer = { minutes: 0, seconds: 0 };

document.addEventListener('DOMContentLoaded', () => {
    updatePlayerList();
    updateTimerDisplay();
    updateStatistics();
    setInitialTheme();
});

function addPlayer() {
    const playerName = document.getElementById('player-name').value;
    if (playerName) {
        players.push({ name: playerName, chips: 1000 });
        updatePlayerList();
        savePlayers();
        document.getElementById('player-name').value = '';
    }
}

function updatePlayerList() {
    const playerList = document.getElementById('players');
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${player.name} - Fichas: ${player.chips} 
            <button onclick="removePlayer(${index})">Remover</button>`;
        playerList.appendChild(listItem);
    });
    updateStatistics();
}

function removePlayer(index) {
    players.splice(index, 1);
    updatePlayerList();
    savePlayers();
}

function adjustChips() {
    const playerChips = parseInt(document.getElementById('player-chips').value, 10);
    if (!isNaN(playerChips)) {
        players.forEach(player => player.chips = playerChips);
        updatePlayerList();
        savePlayers();
    }
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer.seconds++;
        if (timer.seconds == 60) {
            timer.minutes++;
            timer.seconds = 0;
        }
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    addRoundHistory();
    timer = { minutes: 0, seconds: 0 };
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = `${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
}

function addRoundHistory() {
    const roundHistory = document.getElementById('rounds');
    const roundItem = document.createElement('li');
    roundItem.innerText = `Rodada: ${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
    roundHistory.appendChild(roundItem);
}

function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.className);
}

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
}

function updateStatistics() {
    const statsContent = document.getElementById('statistics-content');
    const totalChips = players.reduce((sum, player) => sum + player.chips, 0);
    statsContent.innerHTML = `Total de Fichas: ${totalChips}`;
}
