import { Sitting, Running, Jumping, Falling } from "./playerState.js";
import { CollisionAnimation } from "./collisionAnimation.js";

//width: 415, height: 415 for player
export class Player {
    constructor(game) {
        this.game = game;
        this.sizeModifier = 1.5;
        this.width = 1845 / (16 * this.sizeModifier);
        this.height = 139 / this.sizeModifier;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.maxSpeed = 15;
        this.jumpingCapacity = 23;
        this.vy = 0;
        this.weight = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 5;
        this.maxFrame = 15;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);
        //horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight') || input.includes('swipe right')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft') || input.includes('swipe left')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement
        // if(input.includes('ArrowUp') && this.onGround()) this.vy -= 20;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else this.frameTimer += deltaTime;

    }
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width * this.sizeModifier, 0, this.width * this.sizeModifier, this.height * this.sizeModifier, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height;
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    checkCollision() {
        this.game.pathogens.forEach(pathogen => {
            if (
                pathogen.x < this.x + this.width &&
                pathogen.x + pathogen.width > this.x &&
                pathogen.y < this.y + this.height &&
                pathogen.y + pathogen.height > this.y
            ) {
                pathogen.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, pathogen.x + pathogen.width * 0.5, pathogen.y + pathogen.height * 0.5));;
                this.game.score++;
            } else {

            }0
        });
    }
    restart() {
        this.width = 1845 / (16 * this.sizeModifier);
        this.height = 139 / this.sizeModifier;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.currentState = this.states[0];
        this.currentState.enter();
    }
}