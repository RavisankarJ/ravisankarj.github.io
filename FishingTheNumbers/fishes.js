import { FloatingMessage, FloatingPoint } from "./floatingPoints.js";
import {OneOperand, After, Before, InBetween } from "./levels.js";

export class Fish{
    constructor(game, fishDetails = {
        
        colorFish : document.getElementById('fish_swim_left'),
        
        colorFishRight : document.getElementById('fish_swim_right'),
        
        textColor : 'yellow'
    } ){
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 10;
        this.maxFrameX = 3;
        this.maxFrameY = 2;
        this.frameTimer=0;
        this.frameInterval = 5000 / this.fps;
        this.markedForDeletion = false;
        this.y = Math.random() * this.game.background.fishSwimHeight.min+this.game.background.fishSwimHeight.max;
        // this.y = this.game.background.fishSwimHeight;
        this.radius = 45;
        this.speed = Math.random() * 1+1;
        this.distance;
        this.counted = false;
        this.inHook = false;
        this.textColor = fishDetails.textColor;
        this.value = this.game.fishValues[Math.round(Math.random() * (this.game.fishValues.length-1))];
        this.colorFish = fishDetails.colorFish;
        this.desaturatedFish = document.getElementById('fish_swim_left_desaturated');
        this.colorFishRight = fishDetails.colorFishRight;
        this.desaturatedFishRight = document.getElementById('fish_swim_right_desaturated');
        this.selected = false;
        this.mousePointDistance;
        this.direction = {left:1, right:-1}
        this.movingDirection = Math.random() < 0.5 ? this.direction.left : this.direction.right;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
        this.swingValue = Math.floor(Math.random() * 5 + 1);
        this.width = 498;
        this.height = 327;
        switch(this.movingDirection){
            case this.direction.left: this.image = this.colorFish; break;
            case this.direction.right: this.image = this.colorFishRight; break;
            default: this.image = this.colorFish;
        }
        if(this.movingDirection==this.direction.left)this.x = this.game.canvas.width + 10;
        else if(this.movingDirection == this.direction.right) this.x = 0 - 10;
    }
    update(deltaTime) {
        const dx = this.x - this.game.hook.x;
        const dy = this.y - this.game.hook.y;
        
        if(!this.inHook){
            this.x -= (this.speed*this.movingDirection);
            this.angle += this.va;
            this.y += this.swingValue * Math.sin(this.angle);
        }
            
        this.distance = Math.sqrt(dx * dx + dy * dy);
        
        
        if(this.movingDirection == this.direction.left)
            if(this.x<0-this.radius*2) this.markedForDeletion = true;
        if(this.movingDirection == this.direction.right)
            if(this.x>this.game.width+this.radius*2) this.markedForDeletion = true;
        
        if(this.selected)
        if (this.distance < this.radius + this.game.hook.radius) {
            if(!this.counted){
                this.counted = true;
                if(this.game.levels[this.game.currentLevel] instanceof OneOperand){
                    this.handleFishes();
                    // this.catchBubble();
                }
            }
        }
        //changing frames
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
            this.game.ctx.font = "bold 28px Pacifico";
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
        this.game.correctSound.play();
        this.game.shells += this.value;
        // var shellDivider;
        // if(this.value<=10) shellDivider = 2;
        // else if (this.value>10 && this.value<=100) shellDivider = 10;
        // else if (this.value>100) shellDivider = 100;
        for(var i = 1; i<=this.value; i++)
            this.game.floatingPoints.push(new FloatingPoint(this.game, this, i));
        if(this.game.levels[this.game.currentLevel] instanceof After ||
            this.game.levels[this.game.currentLevel] instanceof Before ||
            this.game.levels[this.game.currentLevel] instanceof InBetween)
        this.game.levels[this.game.currentLevel].changeQuestion();
        this.game.hook.fishes.splice(0, this.game.hook.fishes.length);
        Fish.resetFishes(this.game);
        if(!(this.game.winningScore>this.game.score)) {
            // console.log('you win');
            this.game.gameOver = true;
        }
        
    }
    handleFishes(){
        if(this.game.levels[this.game.currentLevel].checkCorrectness(this)){
            this.handleCorrectMatch();
            this.catchFish();
        } 
        else {
            switch(this.movingDirection){
                case this.direction.left: this.image = this.desaturatedFish; break;
                case this.direction.right: this.image = this.desaturatedFishRight; break;
                default: this.image = this.desaturatedFish;
            }
            this.game.wrongSound.play();
            this.textColor = '#ffa600';
            this.game.hook.health--;
            this.game.floatingPoints.push(new FloatingMessage('-10',this.x, this.y, 10, 80));
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
            switch(fish.movingDirection){
                case fish.direction.left: fish.image = fish.colorFish; break;
                case fish.direction.right: fish.image = fish.colorFishRight; break;
                default: fish.image = fish.colorFish;
            }
            fish.textColor = 'yellow';
            fish.selected = false;
        });
        for(var i = game.hook.fishes.length; i<game.boxNumbers.length; i++){
            game.boxNumbers[i] = '?';
        }
    }
}