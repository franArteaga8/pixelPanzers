class Tank {
    constructor (x, y) {
        this.width = 100
        this.height = 100
        this.x = x / 10
        this.y = (y - this.height) / 2
        this.parent = canvas
        this.speed = 10
        this.direction = 0
        this.sprite

    }

    insertPlayer(){
        let newPlayer = document.createElement('div')
        newPlayer.setAttribute('id', 'player')

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

