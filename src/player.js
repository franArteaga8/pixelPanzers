class Tank {
    constructor (x, y, parent, id) {
        this.width = 100
        this.height = 100
        this.x = x
        this.y = y
        this.parent = parent
        this.speed = 10
        this.direction = 0
        this.sprite
        this.id = id
        this.isDead = false
        this.health = 3
        this.bullets = []

    }

    spawnPlayer(){
        let newPlayer = document.createElement('div')
        newPlayer.setAttribute('id', this.id)

        newPlayer.style.left = this.x + 'px'
        newPlayer.style.top = this.y + 'px'

        this.parent.appendChild(newPlayer)
        this.sprite = newPlayer
    }

    move(){
        let nextY = this.y + this.speed * this.direction

        if(nextY >= 0 && nextY <= canvasHeight - this.height){
          this.y += this.speed * this.direction
          this.sprite.style.top = this.y + 'px'
        }

    }

    despawnPlayer(){
        
        this.parent.removeChild(this.sprite)
        /* this.sprite.classList.add('hidden') */
        this.isDead = true
        
        
    }


    enemyDirRNG () {
        return Math.floor(Math.random() * 3 - 1 )
    }

    
}

