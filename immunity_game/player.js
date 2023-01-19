import { Sitting, Running, Jumping, Falling } from "./playerState.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingPoint, FloatingMessage } from "./floatingPoints.js";


//width: 415, height: 415 for player
export class Player {
    constructor(game) {
        this.game = game;
        this.sizeModifier = 1.5;    //higher the value smaller the player
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
        this.health = 100;
    }
    update(input, deltaTime) {
        this.width = 1845 / (16 * this.sizeModifier);
        this.height = 139 / this.sizeModifier;
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
                this.game.floatingPoints.push(new FloatingMessage('+'+pathogen.impactPoint, pathogen.x, pathogen.y, 230, 80));
                this.game.score+=pathogen.impactPoint;
            }
        });
        this.game.healthyFoods.forEach(healthyFood => {
            if (
                healthyFood.x < this.x + this.width &&
                healthyFood.x + healthyFood.width > this.x &&
                healthyFood.y < this.y + this.height &&
                healthyFood.y + healthyFood.height > this.y
            ) {
                healthyFood.markedForDeletion = true;
                for (var nutrient in healthyFood.nutrients) {
                    var nutrientButton = null;
                    switch (nutrient) {
                        case 'vitaminC': nutrientButton = this.game.nutrientButtons[0];
                            break;
                        case 'vitaminE': nutrientButton = this.game.nutrientButtons[1];
                            break;
                        case 'vitaminB6': nutrientButton = this.game.nutrientButtons[2];
                            break;
                        case 'zinc': nutrientButton = this.game.nutrientButtons[3];
                            break;
                    }
                    for (var i = 1; healthyFood.nutrients[nutrient] > 0; i++) {
                        this.game.floatingPoints.push(new FloatingPoint(healthyFood, nutrientButton, i));
                        nutrientButton.points++;
                        healthyFood.nutrients[nutrient]--;
                    }
                }
                // this.game.floatingPoints.push(new FloatingPoint(healthyFood, healthyFood.x, healthyFood.y));
                // healthyFood.nutrient.points++;
            }
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
        this.health = 100;
        this.currentState = this.states[0];
        this.currentState.enter();
    }
}