import { FloatingMessage } from "./floatingPoints.js";
export class CollisionAnimation {
    constructor(game, pathogen) {
        this.game = game;
        this.image = document.getElementById('boom');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        // this.sizeModifier = Math.random() * 0.5;
        this.width = pathogen.height;
        this.height = pathogen.height;
        this.x = (pathogen.x + pathogen.width * 0.5) - this.width * 0.5;
        this.y = (pathogen.y + pathogen.height * 0.5) - this.height * 0.5;
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
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
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
export class BlastAnimation extends CollisionAnimation{
    constructor(game, x, y, maxWidth, maxHeight){
        super(game, x, y);
        this.width = this.game.player.width;
        this.height = this.game.player.height;
        this.x = this.game.player.x;
        this.y = this.game.player.y;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
    }
    update(deltaTime){
        if(this.width < this.maxWidth){
            this.x -= ((this.width * 1.1) - this.width) /2;
            this.width *= 1.1;
        }
        if(this.height < this.maxHeight){
            this.y -= ((this.height * 1.1) - this.height) /2;
            this.height *= 1.1;
        }
        // if(this.width > this.maxWidth) this.width = this.maxWidth;
        // if(this.height > this.maxHeight) this.height = this.maxHeight;
        if(this.frameX === 0) this.punchAudio.play();
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;
        }else{
            this.frameTimer+=deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
        this.checkCollision();
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    checkCollision(){
        this.game.pathogens.forEach(pathogen => {
            if (
                pathogen.x < this.x + this.width &&
                pathogen.x + pathogen.width > this.x &&
                pathogen.y < this.y + this.height &&
                pathogen.y + pathogen.height > this.y
            ) {
                pathogen.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, pathogen));;
                this.game.floatingPoints.push(new FloatingMessage('+' + pathogen.impactPoint, pathogen.x, pathogen.y, 230, 80));
                this.game.score += pathogen.impactPoint;
            }
        });
    }
}


