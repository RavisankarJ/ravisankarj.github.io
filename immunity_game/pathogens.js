import { FloatingMessage } from "./floatingPoints.js";

class Pathogen {
    constructor(game) {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.speedX = (Math.random()) * this.game.speed + 0.5;
        this.speedY = 0;
        this.sizeModifier = Math.random() * 0.3 + 0.5;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
        this.swingValue = Math.floor(Math.random() * 10 + 1);
        this.x = this.game.width;
        this.maxFrame = 3;
    }
    update(deltaTime) {
        //wall blocks pathogens
        // if (this.game.walls.length > 0)
        //     this.game.walls.forEach(wall => {

        //     });
        // else {
            //movement
            this.x -= this.speedX;
            this.y -= this.speedY;
        // }
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
//width: 244, height: 100 for bac
//width: 96.5, height: 90 for bacteria
//width: 77, height: 103 for virus
export class Bacteria extends Pathogen {
    constructor(game) {
        super(game);
        this.width = 77 * this.sizeModifier;
        this.height = 103 * this.sizeModifier;
        this.y = Math.random() * (this.game.height - this.height);
        this.image = document.getElementById('bacteria');
        this.shadow = document.getElementById('bacteriaShadow');
        this.impactPoint = Math.floor((this.width / 50) + 0.5) * 5;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += this.swingValue * Math.sin(this.angle);
    }

}

export class Virus extends Pathogen {
    constructor(game) {
        super(game);
        this.width = 96.5 * this.sizeModifier;
        this.height = 90 * this.sizeModifier;
        this.y = Math.random() * (this.game.height - this.height);
        this.image = document.getElementById('virus');
        this.shadow = document.getElementById('virusShadow');
        this.impactPoint = Math.floor((this.width / 50) + 0.5) * 10;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += this.swingValue * Math.sin(this.angle);
    }
}

export class Fungi extends Pathogen {
    constructor(game) {
        super(game);
        this.width = 244 * this.sizeModifier;
        this.height = 100 * this.sizeModifier;
        this.y = Math.random() * (this.game.height - this.height);
        this.image = document.getElementById('fungi');
        this.shadow = document.getElementById('fungiShadow');
        this.impactPoint = Math.floor((this.width / 50) + 0.5) * 3;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += this.swingValue * Math.sin(this.angle);
    }
}