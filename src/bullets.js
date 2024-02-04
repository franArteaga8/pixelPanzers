class Bullets {
    constructor (x, y, parent, enemies, obstacles, bullets) {
        this.x = x
        this.y = y
        this.parent = parent
        this.enemies = enemies
        this.obstacles = obstacles
        this.bullets = bullets
        this.speed = 5
        this.width = 5
        this.height = 5
        this.sprite

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
    }

    despawnBullets () {

    }
}