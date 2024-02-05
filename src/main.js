let canvas = document.getElementById('canvas')

let canvasWidth = canvas.offsetWidth
let canvasHeight = canvas.offsetHeight

let bullets = []
let friends = []
let enemies = []
let obstacles = []


let mainTank = new Tank (canvasWidth / 10, (canvasHeight - 100) / 2, canvas, 'player')
mainTank.spawnPlayer()
friends.push(mainTank)

let enemyTank = new Tank (canvasWidth - (canvasWidth / 10) - 100, (canvasHeight - 100) / 2, canvas, 'enemy')
enemyTank.spawnPlayer()
enemies.push(enemyTank)




window.addEventListener('keydown', (e) => {
    switch(e.key){
      case 'w':
        mainTank.direction = -1
        break
      case 's':
        mainTank.direction = 1
        break
      case ' ': 
        let newBullet = new Bullet (mainTank.x + mainTank.width / 2 , mainTank.y + mainTank.height / 2 - 7.5, canvas, enemies, obstacles, bullets, 1)
        newBullet.spawnBullets()
        bullets.push(newBullet)
        newBullet.timerId = setInterval(newBullet.move, 24)
        break

    }
  })
  
  window.addEventListener('keyup', (e) => {
    if(e.key === 'w' || e.key === 's'){
      mainTank.direction = 0
    }
  })

  let timerId = setInterval(mainTankMovement, 24)


  function mainTankMovement(){
    mainTank.move()
   
  }


  let intervalDir = setInterval(() => {
    enemyTank.direction = enemyTank.enemyDirRNG()
    if (enemyTank.direction === 0) {

      let newBullet = new Bullet (enemyTank.x , enemyTank.y + mainTank.height / 2 - 7.5, canvas, friends, obstacles, bullets, -1)
      newBullet.spawnBullets()
      bullets.push(newBullet)
      newBullet.timerId = setInterval(newBullet.move, 24)
    }
    
    console.log(enemyTank.direction)
  }, 450);


  function enemyTankMovement(){
    enemyTank.move()
  }

  let enemyTimerId = setInterval(enemyTankMovement, 24)


  
  