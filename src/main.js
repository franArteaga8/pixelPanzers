let canvas = document.getElementById('canvas')

let canvasWidth = canvas.offsetWidth
let canvasHeight = canvas.offsetHeight

let bullets = []
let enemies = []
let obstacles = []


let mainTank = new Tank (canvasWidth / 10, (canvasHeight - 100) / 2, canvas, 'player')
mainTank.spawnPlayer()

let enemyTank = new Tank (canvasWidth - (canvasWidth / 10) - 100, (canvasHeight - 100) / 2, canvas, 'enemy')
enemyTank.spawnPlayer()
enemies.push(enemyTank)




window.addEventListener('keydown', (e) => {
    switch(e.key){
      case 'w':
        mainTank.direction = -1
        console.log('w')
        break
      case 's':
        mainTank.direction = 1
        console.log('s')
        break
      case ' ': 
        let newBullet = new Bullet (mainTank.x + mainTank.width / 2 , mainTank.y + mainTank.height / 2 - 7.5, canvas, enemies, obstacles, bullets)
        newBullet.spawnBullets()
        bullets.push(newBullet)
        newBullet.timerId = setInterval(newBullet.move, 24)
        
        break

    }
  })
  
  window.addEventListener('keyup', (e) => {
    if(e.key === 'w' || e.key === 's'){
      mainTank.direction = 0
      // why not clearInterval here?
    }
  })

  let timerId = setInterval(mainTankMovement, 24)
  

  function mainTankMovement(){
    mainTank.move()
   
  }

  function enemyTankMovement(){
    enemyTank.move()
   
  }
  
  