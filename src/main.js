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
        case "W":
          mainTank.direction = -1;
          break;
      case "s":
        mainTank.direction = 1;
        break;
        case "S":
          mainTank.direction = 1;
          break;
      case " ":
        if (enemyTank.isDead === false) {
          let newBullet = new Bullet(
            mainTank.x + mainTank.width / 2 + 50,
            mainTank.y + mainTank.height / 2 + 10,
            canvas,
            enemies,
            obstacle,
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
    if (e.key === "w" || e.key === "s" ||e.key === "W" || e.key === "S") {
      mainTank.direction = 0;
    }
  }
});

let mainTank = new Tank(
  canvasWidth / 10,
  (canvasHeight - 100) / 2,
  canvas,
  "player",
  "classTank"
);

mainTank.spawnPlayer();
friends.push(mainTank);

let enemyTank = new Tank(
  canvasWidth - canvasWidth / 10 - 100,
  (canvasHeight - 100) / 2,
  canvas,
  "enemy",
  "classTank"
);
enemyTank.spawnPlayer();
enemies.push(enemyTank);

let obstacle = new Obstacle(
  canvasWidth / 2 - 10,
  canvasHeight / 2 - 30,
  canvas
);

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

let music;

function startGame() {
  gameStarted = true;

  music = new Audio("assets/sounds/soundtrack.mp3");
  music.currentTime = 0;

  music.play();
  music.volume = 0.35;
  music.loop = true;
  startDiv.classList.add("hidden");

  playerStats.textContent = `${playerName.value}.Lifes: [${mainTank.health}]`;
  enemyStats.textContent = `enemy.Lifes: [${enemyTank.health}]`;

  obstacle.spawnObstacle();
  obstacles.push(obstacle);

  let totalInter = setInterval(mainMove, 24);
  function mainMove() {
    mainTank.move();
    enemyTank.move();
    obstacle.move();
    gameOver();
  }

  let damageTakenTimer

  function damageTaken(tank){

    if (!tank.classList.contains("damageTakenClass")){
      tank.classList.add("damageTakenClass");
    }
     damageTakenTimer = setTimeout(function(){
      tank.classList.remove("damageTakenClass")
    }, 400)
}

  let intervalDir = setInterval(() => {
    obstacle.direction = obstacle.obstacleDirRNG();
    enemyTank.direction = enemyTank.enemyDirRNG();
    if (enemyTank.direction === 0) {
      let newBullet = new Bullet(
        enemyTank.x - 23,
        enemyTank.y + mainTank.height / 2 + 7,
        canvas,
        friends,
        obstacle,
        bullets,
        -1
      );
      newBullet.spawnBullets();
      bullets.push(newBullet);
      newBullet.timerId = setInterval(newBullet.move, 24);
    }
  }, 450);

  function gameOver() {
    if (mainTank.isDead === true || enemyTank.isDead === true) {
      gameStarted = false;

      clearInterval(totalInter);
      clearInterval(intervalDir);
      clearTimeout(damageTakenTimer)
      music.pause();

      bullets.forEach((bullet) => clearInterval(bullet.timerId));

      const newBulletArr = [...document.getElementsByClassName("bullets")];
      newBulletArr.forEach((bullet) => {
        canvas.removeChild(bullet);
      });

      bullets = [];

      const obstArr = [...document.getElementsByClassName("obstacle")];

      obstArr.forEach((obst) => {
        obst.remove();
      });

      obstacles = [];
    }

    if (mainTank.isDead) {
      let loserSound = new Audio("assets/sounds/musicaDerrota.mp3");
      loserSound.play();
      resetDiv.classList.add("resetDivVisibility");
      finalMessage.innerText = `You lose!!!`;
      finalMessage.style.color = "red";
    } else if (enemyTank.isDead) {
      let winnerSound = new Audio("assets/sounds/musicaVictoria.wav");
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
  if (obstacles.length !== 0) {
    canvas.removeChild(document.getElementById("obstacle"));
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
