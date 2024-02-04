let canvas = document.getElementById('canvas')

let canvasWidth = canvas.offsetWidth
let canvasHeight = canvas.offsetHeight

let mainTank = new Tank (canvasWidth / 10, (canvasHeight - 100) / 2, canvas, 'player')
mainTank.insertPlayer()

let enemyTank = new Tank (canvasWidth - (canvasWidth / 10) - 100, (canvasHeight - 100) / 2, canvas, 'enemy')
enemyTank.insertPlayer()

let bullets = []

let obstacles = []

window.addEventListener('keydown', (e) => {
    switch(e.key){
      case 'w':
        mainTank.direction = -1
        // why not timerId = setInterval here?
        console.log('w')
        break
      case 's':
        mainTank.direction = 1
        console.log('s')
        break
      case ' ': 
        let newBullet = new Bullet ((canvasWidth / 10) + mainTank.x, mainTank.y + mainTank.height / 2 - 7.5, canvas, obstacles, bullets)
        newBullet.spawnBullets()
        bullets.push(newBullet)
        newBullet.timerId = setInterval(newBullet.move, 100)
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
  
  