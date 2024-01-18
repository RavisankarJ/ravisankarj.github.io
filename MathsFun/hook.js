import { CollisionAnimation } from "./CollisionAnimation.js";
export class Hook{
    constructor(game){
        this.game = game;
        this.width = 41;
        this.height = 89;
        this.x = 300;
        this.y = 200;
        // this.playerLeft = document.getElementById('fish_swim_left');
        // this.playerLeftOpen = document.getElementById('openFishLeft');
        // this.playerRight = document.getElementById('fish_swim_right');
        // this.playerRightOpen = document.getElementById('openFishRight');
        this.fishImage = document.getElementById('fish');
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.fps = 10;
        this.maxFrameX = 0;
        this.maxFrameY = 0;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.radius = 50;
        this.angle = 0;
        this.fishes = [];
        this.image = document.getElementById('hook');
        this.health = 10;
        this.boat = {x:450, y:144}
        this.distanceToFish;
        this.distanceToBoat;
        this.hookHasFish = false;
        this.isGoingToFish = false;
    }
    update(mouse, deltaTime) {
        if(this.health<=0) this.game.gameOver = true;
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const Pdx = this.x - this.boat.x;
        const Pdy = this.y - this.boat.y;
        
        if(!this.hookHasFish && this.isGoingToFish){
            if (mouse.x != this.x) {
                this.x -= dx / 10;
            }
            if (mouse.y != this.y) {
                this.y -= dy / 10;
            }
        }
        if(this.hookHasFish && !this.isGoingToFish){
            if (this.boat.x != this.x) {
                this.x -= Pdx / 15;
            }
            if (this.boat.y != this.y) {
                this.y -= Pdy / 15;
            }
        }
        // this.angle = Math.atan2(dy, dx);
        this.distanceToFish = Math.sqrt(dx*dx+dy*dy);
        if(this.distanceToFish<this.radius) {
            this.hookHasFish = true;
            this.isGoingToFish = false;
        }
        this.distanceToBoat = Math.sqrt(Pdx*Pdx+Pdy*Pdy);
        if(this.distanceToBoat<this.radius && this.fishes.length>0){
            if(this.fishes.length>0)
            this.fishes.forEach(bub => {
                this.game.collisions.push(new CollisionAnimation(this.game, bub));
                bub.markedForDeletion = true;   
            });
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
        this.fishes = this.fishes.filter(fish => !fish.markedForDeletion);
    }
    draw() {
        this.game.ctx.save();
        // this.game.ctx.translate(this.x, this.y);
        // this.game.ctx.rotate(this.angle);
        if(this.fishes){
            for(let i=0; i<this.fishes.length; i++){
            this.fishes[i].x = this.x+this.radius*(i+1);
            this.fishes[i].y = this.y+this.radius*(i+1);
            this.game.ctx.drawImage(this.fishImage, this.x, this.y, 502/4, 326/4);
            
            this.game.ctx.fillStyle = '#ffffff';
            this.game.ctx.font = "bold 32px Arial Black";
            this.game.ctx.textAlign = 'center';
            this.game.ctx.textBaseline = 'middle';
            this.game.ctx.fillText(this.fishes[i].value,0-75-(i*70), 5);
            // this.game.ctx.stroke();
            }
        }
        
        this.game.ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, 410, 890, this.x, this.y, this.width/2, this.height/2);
        this.game.ctx.restore();
        if (this.distanceToFish>this.radius/2) {
            this.game.ctx.save();
            this.game.ctx.lineWidth = 3;
            this.game.ctx.beginPath();
            this.game.ctx.moveTo(this.boat.x, this.boat.y);
            this.game.ctx.lineTo(this.x, this.y);
            this.game.ctx.stroke();
            this.game.ctx.restore();
        }
    }
    restart(){
        this.health = 10;
        this.fishes = [];
    }
}