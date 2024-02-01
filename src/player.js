class Tank {
    constructor (x, y) {
        this.x = x
        this.y = y
        this.speed = speed
        this.direction = 0

    }

    move(){
        this.y += this.speed * this.direction

    }
    
}