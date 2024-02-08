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
            mainTank.x + mainTank.width / 2 + 50,
            mainTank.y + mainTank.height / 2 + 10,
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
  music.currentTime = 0

  music.play();
  music.volume = 0.35;
  music.loop = true;
  startDiv.classList.add("hidden");

  playerStats.textContent = `${playerName.value}.Lifes: [${mainTank.health}]`;
  enemyStats.textContent = `enemy.Lifes: [${enemyTank.health}]`;

  obstacle.spawnObstacle();
  obstacles.push(obstacle);

  /*  let timer Id = setInterval(mainTankMovement, 24); */

  /* function mainTankMovement() {
    mainTank.move();
    gameOver();
  } */

  let totalInter = setInterval(mainMove, 24);
  function mainMove() {
    mainTank.move();
    enemyTank.move();
    obstacle.move();

    gameOver();
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
        obstacles,
        bullets,
        -1
      );
      newBullet.spawnBullets();
      bullets.push(newBullet);
      newBullet.timerId = setInterval(newBullet.move, 24);
    }
  }, 450);

  /*  function enemyTankMovement() {
    enemyTank.move();
    gameOver();
  } */

  /*  let enemyTimer Id = setInterval(enemyTankMovement, 24); */

  function gameOver() {
    
    if (mainTank.isDead === true || enemyTank.isDead === true) {
      gameStarted = false;
     
      clearInterval(totalInter);
      /*  clearInterval(timer Id);
      clearInterval(enemyTimer Id);*/
      clearInterval(intervalDir);
      music.pause();
      bullets.forEach((bullet) => clearInterval(bullet.timerId));

      const balas = [...document.getElementsByClassName("bullets")];
      balas.forEach((bala) => {
        canvas.removeChild(bala);
      });

      bullets = [];
      obstacle.despawnObstacle()

      const obstArr = [...document.getElementsByClassName("obstacle")];
     
      obstArr.forEach((obs) => {
      
        canvas.removeChild(obs);
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

  obstacle = new Obstacle(canvasWidth / 2 - 10, canvasHeight / 2 - 30, canvas);

  obstacle.spawnObstacle();
  obstacles.push(obstacle);

  startDiv.classList.remove("hidden");
  resetDiv.classList.remove("resetDivVisibility");
}
