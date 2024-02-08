class Obstacle{
    constructor(x, y, parent){
        this.x = x
        this.y = y
        this.parent = parent
        this.width = 20
        this.height = 100
        this.speed = 15
        this.direction = 0
        this.sprite
    }
    spawnObstacle(){
        let newObstacle = document.createElement('div')     
        newObstacle.classList.add('obstacle')
        newObstacle.style.left = this.x + 'px'
        newObstacle.style.top = this.y + 'px'
        this.parent.appendChild(newObstacle)
        this.sprite = newObstacle
    }
    move(){
        let nextY = this.y + this.speed * this.direction
        if(nextY >= 0 && nextY <= canvasHeight - this.height){
          this.y += this.speed * this.direction
          this.sprite.style.top = this.y + 'px'
        }

    }
    obstacleDirRNG () {
        return Math.floor(Math.random() * 3 - 1 )
    } 

    despawnObstacle(){
        this.parent.removeChild(this.sprite)            
        
    }


}