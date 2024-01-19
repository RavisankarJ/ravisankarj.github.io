export class WaterSplash {
    constructor(game, x, y) {
        this.game = game;
        this.image = document.getElementById('waterSplash');
        this.spriteWidth = 214;
        this.spriteHeight = 123;
        // this.sizeModifier = Math.random() * 0.5;
        this.width = fish.height;
        this.height = fish.height;
        this.x = x;
        this.y = 310;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 6;
        this.maxFrameY = 1;
        this.markedForDeletion = false;
        this.fps = 7;
        this.frameInterval = 500 / this.fps;
        this.frameTimer = 0;
        this.speed = fish.speed;
        // this.punchAudio = new Audio('punch.ogg');
        // this.punchAudio.volume = 0.1;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width/4, this.height/4);
    }
    update(deltaTime) {
        // this.y -= this.speed;
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
    static checkItHasWaterSplash(arr){
        var result = false;
        arr.forEach(obj => {
            result = (result) | (obj instanceof WaterSplash);
        });
        return result;
    }
}



