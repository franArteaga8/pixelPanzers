let canvas = document.getElementById('canvas')

let mainTank = new Tank (0, 0, canvas)
mainTank.insertPlayer()



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
  