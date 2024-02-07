let canvas = document.getElementById("canvas");
let startButton = document.getElementById("startButton");
let startDiv = document.getElementById("startDiv");

let canvasWidth = canvas.offsetWidth;
let canvasHeight = canvas.offsetHeight;
let playerStats = document.getElementById("playerStats");
let enemyStats = document.getElementById("enemyStats");
let crono = document.getElementById("crono");
let playerName = document.getElementById("name");
let playerEnemy = document.getElementById("enemyStats");
let resetDiv = document.getElementById("resetDiv");
let finalMessage = document.getElementById("finalMessage");
let resetButton = document.getElementById("resetButton");

let bullets = [];
let friends = [];
let enemies = [];
let obstacles = [];
let gameStarted = false;

window.addEventListener("keydown", (e) => {
  if (gameStarted) {
    switch (e.key) {
      case "w":
        mainTank.direction = -1;
        break;
      case "s":
        mainTank.direction = 1;
        break;
      case " ":
        if (enemyTank.isDead === false) {
          let newBullet = new Bullet(
            mainTank.x + mainTank.width / 2,
            mainTank.y + mainTank.height / 2 - 7.5,
            canvas,
            enemies,
            obstacles,
            bullets,
            1
          );
          newBullet.spawnBullets();
          bullets.push(newBullet);
          newBullet.timerId = setInterval(newBullet.move, 24);
        }

        break;
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (gameStarted) {
    if (e.key === "w" || e.key === "s") {
      mainTank.direction = 0;
    }
  }
});

let mainTank = new Tank(
  canvasWidth / 10,
  (canvasHeight - 100) / 2,
  canvas,
  "player"
);

mainTank.spawnPlayer();
friends.push(mainTank);

let enemyTank = new Tank(
  canvasWidth - canvasWidth / 10 - 100,
  (canvasHeight - 100) / 2,
  canvas,
  "enemy"
);
enemyTank.spawnPlayer();
enemies.push(enemyTank);

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

let music

function startGame() {
  gameStarted = true;
  music = new Audio("./assets/sounds/soundtrack.mp3");
  music.currentTime = 0
  music.play();
  music.volume = 0.5
  music.loop = true
  startDiv.classList.add("hidden");

  playerStats.textContent = `${playerName.value}: ${mainTank.health}`;
  enemyStats.textContent = `Enemy: ${enemyTank.health}`;

  let timerId = setInterval(mainTankMovement, 24);

  function mainTankMovement() {
    mainTank.move();
    gameOver();
  }

  let intervalDir = setInterval(() => {
    enemyTank.direction = enemyTank.enemyDirRNG();
    if (enemyTank.direction === 0) {
      let newBullet = new Bullet(
        enemyTank.x,
        enemyTank.y + mainTank.height / 2 - 7.5,
        canvas,
        friends,
        obstacles,
        bullets,
        -1
      );
      newBullet.spawnBullets();
      bullets.push(newBullet);
      newBullet.timerId = setInterval(newBullet.move, 24);
    }
  }, 450);

  function enemyTankMovement() {
    enemyTank.move();
    gameOver();
  }

  let enemyTimerId = setInterval(enemyTankMovement, 24);

  function gameOver() {
    if (mainTank.isDead === true || enemyTank.isDead === true) {
      gameStarted = false;

      clearInterval(timerId);
      clearInterval(enemyTimerId);
      clearInterval(intervalDir);
      music.pause();
      bullets.forEach((bullet) => clearInterval(bullet.timerId));

      const balas = [...document.getElementsByClassName("bullets")];
      balas.forEach((bala) => {
        canvas.removeChild(bala);
      });
      bullets = [];
    }

   

    if (mainTank.isDead) {
      let loserSound = new Audio("./assets/sounds/musicaDerrota.mp3");
      loserSound.play();
      resetDiv.classList.add("resetDivVisibility");
      finalMessage.innerText = `You lose!!!`;
      finalMessage.style.color = "red";
    } else if (enemyTank.isDead) {
      let winnerSound = new Audio("./assets/sounds/musicaVictoria.wav");
      winnerSound.play();
      resetDiv.classList.add("resetDivVisibility");
      finalMessage.innerText = `${playerName.value}, you win!!!`;
      finalMessage.style.color = "green";
    }
  }
}

function resetGame() {
  if (friends.length !== 0) {
    canvas.removeChild(document.getElementById("player"));
  } else if (enemies.length !== 0) {
    canvas.removeChild(document.getElementById("enemy"));
  }

  bullets = [];
  friends = [];
  enemies = [];
  obstacles = [];
  playerName.value = "";
  playerStats.textContent = `Our next Hero?`;
  enemyStats.textContent = `Your enemy awaits..`;
  music.pause();

  mainTank = new Tank(
    canvasWidth / 10,
    (canvasHeight - 100) / 2,
    canvas,
    "player"
  );
  mainTank.spawnPlayer();
  friends.push(mainTank);

  enemyTank = new Tank(
    canvasWidth - canvasWidth / 10 - 100,
    (canvasHeight - 100) / 2,
    canvas,
    "enemy"
  );

  enemyTank.spawnPlayer();
  enemies.push(enemyTank);
  startDiv.classList.remove("hidden");
  resetDiv.classList.remove("resetDivVisibility");
}
