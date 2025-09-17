export class CollisionAnimation {
    constructor(game, fish) {
        this.game = game;
        this.image = document.getElementById('bubblePop');
        this.spriteWidth = 512;
        this.spriteHeight = 512;
        // this.sizeModifier = Math.random() * 0.5;
        this.width = fish.height;
        this.height = fish.height;
        this.x = (fish.x + fish.width * 0.5) - this.width * 0.5;
        this.y = (fish.y + fish.height * 0.5) - this.height * 0.5;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 3;
        this.maxFrameY = 2;
        this.markedForDeletion = false;
        this.fps = 7;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = fish.speed;
        // this.punchAudio = new Audio('punch.ogg');
        // this.punchAudio.volume = 0.1;
        
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width/2, this.height/2);
    }
    update(deltaTime) {
        this.y -= this.speed;
        // if(this.frameX === 0) this.punchAudio.play();
        if (this.frameTimer > this.frameInterval) {
            if(this.frameX<this.maxFrameX)this.frameX++;
            else {
                this.frameX = 0;
                if(this.frameY < this.maxFrameY) this.frameY++;
                else this.frameY = 0;
            }
            this.frameTimer = 0;
        }else{
            this.frameTimer+=deltaTime;
        }
        if (this.frameY >= this.maxFrameY) this.markedForDeletion = true;
    }
}



