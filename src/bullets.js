class Bullet {
    constructor (x, y, parent, enemies, obstacles, bullets) {
        this.x = x
        this.y = y
        this.parent = parent
        this.enemies = enemies
        this.obstacles = obstacles
        this.bullets = bullets
        this.speed = 15
        this.width = 15
        this.height = 15
        this.sprite
        this.move = this.move.bind(this)
        this.timerId

    }

    spawnBullets () {
        let newBullet = document.createElement('div')
        newBullet.classList.add('bullet')
        newBullet.style.top = this.y + 'px'
        newBullet.style.left = this.x + 'px'
        this.parent.appendChild(newBullet)
        this.sprite = newBullet

    }

    move() {
        this.x += this.speed
        this.sprite.style.left = this.x + 'px'
        console.log(this.x)
        console.log(canvasWidth)
    }

    despawnBullets () {
        this.parent.removeChild(this.sprite)
        clearInterval(this.timerId)
        this.bullets = this.bullets.filter(bullet => {
        return bullet !== this.sprite
    })

    }

    checkCollision () {
        if (this.x > this.parent.style.width)
        {
            this.despawnBullets()
        }
    }
}