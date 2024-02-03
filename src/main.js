let canvas = document.getElementById('canvas')

let canvasWidth = canvas.offsetWidth
let canvasHeight = canvas.offsetHeight

let mainTank = new Tank (canvasWidth / 10, (canvasHeight - 100) / 2, canvas, 'player')
mainTank.insertPlayer()



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
  
  