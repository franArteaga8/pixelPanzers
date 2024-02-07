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
    window.addEventListener("keydown", (e) => {
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
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "w" || e.key === "s") {
        mainTank.direction = 0;
      }
    });
  }

  checkCollision() {}

  start() {
    let music = new Audio("./assets/sounds/soundtrack.mp3");
    music.play();
    startDiv.classList.add("hidden");
    playerStats.textContent = `${playerName.value}: ${mainTank.health}`;
    enemyStats.textContent = `Enemy: ${enemyTank.health}`;

    this.player.spawnPlayer();
    friends.push(this.player);
    this.enemy.spawnPlayer();
    enemies.push(this.enemy);

    this.gameTimer = setInterval(() => {
      this.player.move();
      this.enemy.move();
      if (this.player.bullets.length > 0) this.player.moveBullets();
      if (this.enemy.bullets.length > 0) this.enemy.moveBullets();
      this.checkCollision();
    }, 200);
    
  }
  gameOver() {
    if (mainTank.isDead === true || enemyTank.isDead === true) {
      clearInterval(timerId);
      clearInterval(intervalDir);
      clearInterval(enemyTimerId);
      music.pause()
    }
    
    if (mainTank.isDead) {
      let loserSound = new Audio('./assets/sounds/musicaDerrota.mp3')
      loserSound.play() 
      resetDiv.classList.add("resetDivVisibility");
      finalMessage.innerText = `You lose!!!`;
      finalMessage.style.color = "red";
      
    } else if (enemyTank.isDead) {
      let winnerSound = new Audio('./assets/sounds/musicaVictoria.wav')
      winnerSound.play() 
      resetDiv.classList.add("resetDivVisibility");
      finalMessage.innerText = `${playerName.value}, you win!!!`;
      finalMessage.style.color = "green";
    }
    window.removeEventListener("keydown", (e) => {
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
    });
  }
}

