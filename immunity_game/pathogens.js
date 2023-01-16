class Pathogen {
    constructor(game) {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.speedX = (Math.random())* this.game.speed;
        this.speedY = 0;
        this.sizeModifier = Math.random()*0.2+0.5;
        // console.log(this.sizeModifier);
    }
    update(deltaTime) {
        //movement
        this.x -= this.speedX;
        this.y -= this.speedY;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //check if off screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context) {
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width/this.sizeModifier, 0, this.width/this.sizeModifier, this.height/this.sizeModifier, this.x, this.y, this.width, this.height);
    }
}
//width: 244, height: 100 for bac
//width: 96.5, height: 90 for bacteria
//width: 77, height: 103 for virus
export class Bacteria extends Pathogen {
    constructor(game) {
        super(game);
        this.width = 96.5 * this.sizeModifier;
        this.height = 90 * this.sizeModifier;
        this.maxFrame = 3
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height - this.height);
        this.image = document.getElementById('bacteria');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
        // console.log('width ' + this.width + ' height '+ this.height);
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }

}

export class Virus extends Pathogen {
    constructor(game) {
        super(game);
        this.width = 77 * this.sizeModifier;
        this.height = 103 * this.sizeModifier;
        this.maxFrame = 3
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height - this.height);
        this.image = document.getElementById('virus');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class Bacteria2 extends Pathogen {
    constructor(game) {
        super(game);
        this.width = 244 * this.sizeModifier;
        this.height = 100 * this.sizeModifier;
        this.maxFrame = 3
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height - this.height);
        this.image = document.getElementById('bac');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}