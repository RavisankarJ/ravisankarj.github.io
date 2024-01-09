class WaterObjects {
    constructor(game, moveable, modifySize, maxFrame) {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 3;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.modifySize = modifySize;
        this.markedForDeletion = false;
        this.modifySize ? this.sizeModifier = Math.random() * 0.3 + 0.5 : this.sizeModifier = 1;
        
        this.maxFrame = maxFrame;
        this.moveable = moveable;
    }
    update(deltaTime) {
        if(this.moveable){
            this.x -= this.speedX;
            this.y -= this.speedY;
        }
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //check if off screen
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
            this.game.player.health -= this.impactPoint;
            this.game.floatingPoints.push(new FloatingMessage('-' + this.impactPoint, this.x, this.y, 20, 50));
            // this.game.player.sizeModifier += this.impactPoint / 100;
        }
    }
    draw(context) {
        // context.save();
        // context.shadowOffsetX = 2;
        // context.shadowOffsetY = 2;
        // context.shadowColor = 'black';
        // context.shadowBlur = 1;
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        // context.drawImage(this.shadow, this.frameX * this.width / this.sizeModifier, 0, this.width / this.sizeModifier, this.height / this.sizeModifier, this.x+1, this.y+1, this.width+2, this.height+2);
        context.drawImage(this.image, this.frameX * this.width / this.sizeModifier, 0, this.width / this.sizeModifier, this.height / this.sizeModifier, this.x, this.y, this.width, this.height);
        // context.restore();
    }
}

export class Plant1 extends WaterObjects {
    constructor(game) {
        super(game, false, false, 2);
        this.width = 260 * this.sizeModifier;
        this.height = 81 * this.sizeModifier;
        this.x = this.game.width - 200;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('plant1');
    }
    update(deltaTime) {
        super.update(deltaTime);
        
    }

}