export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = document.getElementById('boom');
        this.spriteWidth = 100;
        this.spriteHeigth = 90;
        this.sizeModifier = Math.random() * 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.heigth = this.spriteHeigth * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.heigth * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = 7;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.punchAudio = new Audio('punch.ogg');
        this.punchAudio.volume = 0.1;
        
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeigth, this.x, this.y, this.width, this.heigth);
    }
    update(deltaTime) {
        this.x -= this.game.speed;
        if(this.frameX === 0) this.punchAudio.play();
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;
        }else{
            this.frameTimer+=deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}


