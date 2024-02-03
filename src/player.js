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

    }

    insertPlayer(){
        let newPlayer = document.createElement('div')
        newPlayer.setAttribute('id', this.id)

        /* this.width = document.getElementById('canvas').offsetWidth 
        this.height = document.getElementById('canvas').offsetHeight */



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
    
}

