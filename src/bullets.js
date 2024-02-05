class Bullet {
    constructor (x, y, parent, enemies, obstacles, bullets) {
        this.x = x
        this.y = y
        this.parent = parent
        this.enemies = enemies
        this.obstacles = obstacles
        this.bullets = bullets
        this.speed = 35
        this.width = 15
        this.height = 15
        this.sprite
        this.move = this.move.bind(this)
        this.timerId

    }

    spawnBullets () {
        let newBullet = document.createElement('div')
        newBullet.classList.add('bullets')
        newBullet.style.top = this.y + 'px'
        newBullet.style.left = this.x + 'px'
        this.parent.appendChild(newBullet)
        this.sprite = newBullet
    }

    move() {
        this.x += this.speed
        this.sprite.style.left = this.x + 'px'
        this.checkCollision()
       
    }

    despawnBullets () {
        this.parent.removeChild(this.sprite)
        clearInterval(this.timerId)
        this.bullets = this.bullets.splice(this.bullets.indexOf(this.sprite), 1)

    }

    checkCollision () {
        if (this.x >= this.parent.offsetWidth + this.width + 30) 
        {
            this.despawnBullets()
        }
        
        this.enemies.forEach(enemy => {

            if  (this.x < enemy.x + enemy.width &&
                (this.x + this.width) > enemy.x &&
                this.y < enemy.y + enemy.height &&
                (this.y + this.height) > enemy.y)
                {
                    this.despawnBullets()
                    enemy.despawnPlayer()
                 
                    this.enemies = this.enemies.splice(this.enemies.indexOf(enemy.sprite), 1)
                    
            }
            
        });
     
    }
}