class Game {
  constructor() {
    this.player = new Tank(
      canvasWidth / 10,
      (canvasHeight - 100) / 2,
      canvas,
      "player"
    );
    this.enemy = new Tank(
      canvasWidth - canvasWidth / 10 - 100,
      (canvasHeight - 100) / 2,
      canvas,
      "enemy"
    );
    this.gameTimer = null;
  }


  bindKeys() {
    window.addEventListener("keyup", listenerKeyUp);
    window.addEventListener("keydown", listenerKeyDown);    
  }

  removeBindKeys() {
    window.removeEventListener("keyup", listenerKeyUp)
    window.removeEventListener("keydown", listenerKeyDown)
  }


  checkCollision() {}

  start() {
    let music = new Audio("./assets/sounds/soundtrack.mp3");
    music.play();
    startDiv.classList.add("hidden");
    playerStats.textContent = `${playerName.value}: ${mainTank.health}`;
    enemyStats.textContent = `Enemy: ${enemyTank.health}`;

    this.player.spawnPlayer();
    this.player.setAttribute('id', 'player')
    friends.push(this.player);
    this.enemy.spawnPlayer();
    this.enemy.setAttribute('id', 'enemy')
    enemies.push(this.enemy);

    this.gameTimer = setInterval(() => {
      this.player.move();
      this.enemy.move();
      if (this.player.bullets.length > 0) {        
        this.player.moveBullets()
        this.player.bullets.checkCollision()
      };
      if (this.enemy.bullets.length > 0) {
        this.enemy.moveBullets()
        this.enemy.bullets.checkCollision()
      };
      this.checkCollision();
      this.gameOver();
    }, 200);
  }


  gameOver() {
    if (mainTank.isDead === true || enemyTank.isDead === true) {
      this.removeBindKeys();
      clearInterval(this.gameTimer);
      music.pause();
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

  resetGame() {
    if (friends.length !== 0) {
      canvas.removeChild(document.getElementById("player"));
    } else if (enemies.length !== 0) {
      canvas.removeChild(document.getElementById("enemy"));
    }
    bullets = []; 
    friends = [];
    enemies = [];
    obstacles = [];
    playerName.value = " ";
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
}



function listenerKeyDown(e){

 

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
      }
      break;
  }

}
function listenerKeyUp(e){
 

  if (e.key === "w" || e.key === "s") {
    mainTank.direction = 0;
  }
}
