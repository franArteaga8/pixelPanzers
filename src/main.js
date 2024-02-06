let canvas = document.getElementById('canvas')
let startButton = document.getElementById('startButton')
let startDiv = document.getElementById('startDiv')

let canvasWidth = canvas.offsetWidth
let canvasHeight = canvas.offsetHeight
let playerStats = document.getElementById('playerStats')
let enemyStats = document.getElementById('enemyStats')
let crono = document.getElementById('crono')
let playerName = document.getElementById('name')
let playerEnemy = document.getElementById('enemyStats')
playerName.value = ''

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

startButton.addEventListener('click', startGame)


function startGame() {
startDiv.classList.add('hidden')


playerStats.textContent = `${playerName.value}: ${mainTank.health}`
enemyStats.textContent = `Enemy: ${enemyTank.health}`

window.addEventListener('keydown', (e) => {
    switch(e.key){
      case 'w':
        mainTank.direction = -1
        break
      case 's':
        mainTank.direction = 1
        break
      case ' ': 
      if (enemyTank.isDead === false)
      {
        let newBullet = new Bullet (mainTank.x + mainTank.width / 2 , mainTank.y + mainTank.height / 2 - 7.5, canvas, enemies, obstacles, bullets, 1)
        newBullet.spawnBullets()
        bullets.push(newBullet)
        newBullet.timerId = setInterval(newBullet.move, 24)
      }
        
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
    gameOver()
   
   
  }

 


  let intervalDir = setInterval(() => {
    enemyTank.direction = enemyTank.enemyDirRNG()
    if (enemyTank.direction === 0) {

      let newBullet = new Bullet (enemyTank.x , enemyTank.y + mainTank.height / 2 - 7.5, canvas, friends, obstacles, bullets, -1)
      newBullet.spawnBullets()
      bullets.push(newBullet)
      newBullet.timerId = setInterval(newBullet.move, 24)
    }
    
    
  }, 450);


  function enemyTankMovement(){
    enemyTank.move()
    gameOver()
  }

  let enemyTimerId = setInterval(enemyTankMovement, 24)


  function gameOver (){
    if (mainTank.isDead === true || enemyTank.isDead === true){
      clearInterval(timerId)
      clearInterval(intervalDir)
      clearInterval(enemyTimerId)
    }
    if(mainTank.isDead){
      canvas.textContent = `You lose!!!`
      canvas.style.color = 'red'
    }else if(enemyTank.isDead){
      canvas.textContent = `${playerName.value}, you win!!!`
      canvas.style.color = 'green'
    }
  }
}


  
  