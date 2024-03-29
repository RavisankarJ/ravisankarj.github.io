export class CollisionAnimation {
    constructor(game, bubble) {
        this.game = game;
        this.image = CollisionAnimation.popimage.img;
        this.spriteWidth = 512;
        this.spriteHeight = 512;
        // this.sizeModifier = Math.random() * 0.5;
        this.width = bubble.height;
        this.height = bubble.height;
        this.x = (bubble.x + bubble.width * 0.5) - this.width * 0.5;
        this.y = (bubble.y + bubble.height * 0.5) - this.height * 0.5;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 3;
        this.maxFrameY = 2;
        this.markedForDeletion = false;
        this.fps = 7;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = bubble.speed;
        this.bubbleSound = new Audio('assets/bubblesSound.wav');
        this.bubbleSound.play();
        // this.punchAudio = new Audio('punch.ogg');
        // this.punchAudio.volume = 0.1;
        
    }
    static popimage = {
        img : document.getElementById('bubblePop')
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



