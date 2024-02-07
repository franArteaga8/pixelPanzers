class Game {
  constructor () {
    this.player = new Tank()
    this.enemy = new Tank()

    this.gameTimer = null
  }

  bindKeys () {
    // key events
  }

  checkCollision() {
    //comprobar colisiones bala player vs enemy
    //comprobar colisiones bala enemy vs player
  }
  
  start() {
    this.gameTimer = setInterval(() => {
      this.player.move()
      this.enemy.move()
      if (this.player.bullets.length > 0) this.player.moveBullets()
      if (this.enemy.bullets.length > 0) this.enemy.moveBullets()
      this.checkCollision()
    }, 200)
  }
}
 