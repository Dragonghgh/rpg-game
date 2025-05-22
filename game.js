// Game State
const player = {
  hp: 100,
  maxHp: 100,
  attack: 10,
  healAmount: 15,
};

const enemy = {
  hp: 50,
  maxHp: 50,
  attack: 5,
};

// DOM Updates
function updateGame() {
  // Update HP Text
  document.getElementById("playerHP").textContent = player.hp;
  document.getElementById("enemyHP").textContent = enemy.hp;

  // Update Health Bars
  document.getElementById("playerHealth").style.width = `${(player.hp / player.maxHp) * 100}%`;
  document.getElementById("enemyHealth").style.width = `${(enemy.hp / enemy.maxHp) * 100}%`;

  // Check for Win/Lose
  if (enemy.hp <= 0) {
    addLog("You won! 🎉");
    disableButtons();
  } else if (player.hp <= 0) {
    addLog("Game Over! 💀");
    disableButtons();
  }
}

// Player Actions
function attack() {
  const damage = Math.floor(Math.random() * 10) + 5; // 5-15 damage
  enemy.hp -= damage;
  addLog(`You attacked for ${damage} damage!`);
  enemyTurn();
  updateGame();
}

function heal() {
  player.hp = Math.min(player.hp + player.healAmount, player.maxHp);
  addLog(`You healed for ${player.healAmount} HP!`);
  enemyTurn();
  updateGame();
}

function specialAttack() {
  const damage = 20; // Fixed high damage
  enemy.hp -= damage;
  addLog(`You used a SPECIAL ATTACK for ${damage} damage!`);
  enemyTurn();
  updateGame();
}

// Enemy AI
function enemyTurn() {
  if (enemy.hp > 0) {
    const damage = Math.floor(Math.random() * 8) + 2; // 2-10 damage
    player.hp -= damage;
    addLog(`The monster hit you for ${damage} damage!`);
  }
}

// Helper Functions
function addLog(message) {
  const log = document.getElementById("log");
  log.innerHTML += `<p>${message}</p>`;
  log.scrollTop = log.scrollHeight; // Auto-scroll
}

function disableButtons() {
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(button => button.disabled = true);
}

// Initialize
updateGame();
