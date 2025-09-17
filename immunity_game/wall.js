export class Wall {
    constructor(game, x, height, timer) {
        this.game = game;
        this.image = document.getElementById('wall');
        this.width = 198 / 4;
        this.height = height;
        this.x = x;
        this.y = 0;
        this.markedForDeletion = false;
        this.wallTimer = timer;
        this.blockedPathogens = [];
    }
    update(deltaTime) {
        if (this.wallTimer > 0) {
            this.wallTimer -= deltaTime;
            this.checkCollision();
        }
        else {
            this.releasePathogens();
            this.markedForDeletion = true;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x + this.game.player.width / 2, 0, this.width, this.height);
    }
    checkCollision() {
        this.game.pathogens.forEach(pathogen => {
            if (
                pathogen.x < this.x + this.width &&
                pathogen.x + pathogen.width > this.x &&
                pathogen.y < this.y + this.height &&
                pathogen.y + pathogen.height > this.y
            ) {
                pathogen.speedX = 0;
                this.blockedPathogens.push(pathogen);
            }
        });
    }
    releasePathogens() {
        this.blockedPathogens.forEach(pathogen => {
            pathogen.speedX = Math.random() * this.game.speed + 0.5;
        });
    }
}