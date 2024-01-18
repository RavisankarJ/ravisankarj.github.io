
import { TwoOperands, ThreeOperands, OneOperand } from "./levels.js";

export class Fish{
    constructor(game){
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 10;
        this.maxFrameX = 3;
        this.maxFrameY = 2;
        this.frameTimer=0;
        this.frameInterval = 5000 / this.fps;
        this.markedForDeletion = false;
        this.y = Math.random() * (this.game.canvas.height-500)+450;
        this.x = this.game.canvas.width + 10;
        this.radius = 45;
        this.speed = Math.random() * 1+1;
        this.distance;
        this.counted = false;
        this.inHook = false;
        this.textColor = 'yellow';
        this.value = this.game.fishValues[Math.round(Math.random() * (this.game.fishValues.length-1))];
        this.colorFish = document.getElementById('fish_swim_left');
        this.desaturatedFish = document.getElementById('bubbleRed');

        this.selected = false;
        this.mousePointDistance;

        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
        this.swingValue = Math.floor(Math.random() * 5 + 1);
        this.width = 498;
        this.height = 327;
        this.image = this.colorFish;
    }
    update(deltaTime) {
        const dx = this.x - this.game.hook.x;
        const dy = this.y - this.game.hook.y;
        
        if(!this.inHook){
            this.x -= this.speed;
            this.angle += this.va;
            this.y += this.swingValue * Math.sin(this.angle);
        }
            
        this.distance = Math.sqrt(dx * dx + dy * dy);
        //changing frames
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        
        if(this.x<0-this.radius*2) this.markedForDeletion = true;
        if(this.selected)
        if (this.distance < this.radius + this.game.hook.radius) {
            if(!this.counted){
                this.counted = true;
                if(this.game.levels[this.game.currentLevel] instanceof OneOperand){
                    this.handleFishes();
                    // this.catchBubble();
                }
                if(this.game.levels[this.game.currentLevel] instanceof TwoOperands)
                    this.game.hook.fishes.length>0 ? this.handleFishes() : this.catchFish();
                if(this.game.levels[this.game.currentLevel] instanceof ThreeOperands)
                this.game.hook.fishes.length>1 ? this.handleFishes() : this.catchFish();
            }
        }
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrameX) this.frameX++;
            else {
                this.frameX = 0;
                if(this.frameY < this.maxFrameY) this.frameY++;
                else this.frameY = 0;
            }
        } else this.frameTimer += deltaTime;
        // console.log(this.game.hook.fishes);
    }
    draw() {
        if(!this.inHook)
        {
            // this.game.ctx.drawImage(this.image, this.x-50, this.y-50, this.radius*2.2, this.radius*2.2);
            this.game.ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x-70, this.y-45, this.width / 4, this.height / 4);
            
            this.game.ctx.save();
            this.game.ctx.fillStyle = this.textColor;
            this.game.ctx.font = "bold 26px Arial Black";
            this.game.ctx.textAlign = 'center';
            this.game.ctx.textBaseline = 'middle';
            this.game.ctx.fillText(this.value,this.x, this.y);
            this.game.ctx.restore();
        }
    }
    handleCorrectMatch(){
        this.game.score++;
        this.game.hook.fishes.push(this);
        this.inHook = true;
        this.game.fishSound.play();
        
        this.game.hook.fishes.splice(0, this.game.hook.fishes.length);
        Fish.resetFishes(this.game);
        if(!(this.game.winningScore>this.game.score)) {
            console.log('you win');
            this.game.gameOver = true;
        }
    }
    handleFishes(){
        if(this.game.levels[this.game.currentLevel].checkCorrectness(this)){
            this.handleCorrectMatch();
            this.catchFish();
        } 
        else {
            this.image = this.desaturatedFish;
            this.textColor = 'red';
            this.game.hook.health--;
        }
    }
    catchFish(){
        // console.log(this.game.hook.fishes);
        this.game.boxNumbers[this.game.hook.fishes.length] = this.value;
        this.game.hook.fishes.push(this);
        this.inHook = true;
    }
    static resetFishes(game){
        game.fishes.filter(fish => fish.counted & !fish.inFish).forEach(fish => {
            fish.counted = false;
            fish.image = fish.colorFish;
            fish.textColor = 'yellow';
            fish.selected = false;
        });
        for(var i = game.hook.fishes.length; i<game.boxNumbers.length; i++){
            game.boxNumbers[i] = '?';
        }
    }
}