let players = [];
let timerInterval;
let timer = { minutes: 0, seconds: 0 };

function addPlayer() {
    const playerName = document.getElementById('player-name').value;
    if (playerName) {
        players.push({ name: playerName, chips: 1000 });
        updatePlayerList();
        document.getElementById('player-name').value = '';
    }
}

function updatePlayerList() {
    const playerList = document.getElementById('players');
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${player.name} - Fichas: ${player.chips}`;
        playerList.appendChild(listItem);
    });
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
    timer = { minutes: 0, seconds: 0 };
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = `${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
}
