import { CollisionAnimation } from "./CollisionAnimation.js";

export class Bubble{
    constructor(game){
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.markedForDeletion = false;
        this.x = Math.random() * (this.game.canvas.width-45)+45;
        this.y = this.game.canvas.height + 10;
        this.radius = 45;
        this.speed = Math.random() * 1+1;
        this.distance;
        this.counted = false;
        this.inFish = false;
        this.color = 'blue';
        this.value = Math.round(Math.random() * 10);
        this.image = document.getElementById('bubble');
        this.width = 322;
        this.height = 322;
    }
    update() {
        const dx = this.x - this.game.player.x;
        const dy = this.y - this.game.player.y;
        if(!this.inFish){
            this.y -= this.speed;
            this.color = 'blue';
        }
            else{
                // this.x = this.game.player.x-this.game.player.radius*2+this.game.canvas.getBoundingClientRect().width*0.1;
                // this.y = this.game.player.y;
                this.color = 'pink';
            }
        this.distance = Math.sqrt(dx * dx + dy * dy);        
        if(this.y<0-this.radius*2) this.markedForDeletion = true;
        if (this.distance < this.radius + this.game.player.radius) {
            if(!this.counted){
                this.counted = true;
                if(this.game.player.bubbles.length<2){
                    if(this.game.player.bubbles.length==1){
                        if(this.game.player.bubbles[0].value + this.value==10)
                            {
                                console.log("won the game");
                                this.game.player.bubbles.push(this);
                                this.inFish = true;
                                this.handleCorrectMatch();
                        }
                    }else{
                    
                        this.game.player.bubbles.push(this);
                        this.inFish = true;
                    }
                }
                else{
                    this.game.score++;
                    this.markedForDeletion = true;
                }
            }
        }
        // console.log(this.game.player.bubbles);
    }
    draw() {
        if(!this.inFish)
        {
            // this.game.ctx.fillStyle = this.color;
            // this.game.ctx.beginPath();
            // this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // this.game.ctx.fill();
            // this.game.ctx.closePath();
            // this.game.ctx.stroke();
            // this.game.ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width / 3, this.height / 3);
            this.game.ctx.drawImage(this.image, this.x-50, this.y-50, this.radius*2.2, this.radius*2.2);
            // this.game.ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width / 3, this.height / 3);
            this.game.ctx.fillStyle = 'yellow';
            this.game.ctx.font = "bold 32px serif";
            this.game.ctx.textAlign = 'center';
            this.game.ctx.textBaseline = 'middle';
            this.game.ctx.fillText(this.value,this.x, this.y);
        }
    }
    handleCorrectMatch(){
        this.game.score++;
        this.game.player.bubbles.forEach(bubble =>{
            this.game.collisions.push(new CollisionAnimation(this.game, bubble));
            bubble.markedForDeletion= true;
            console.log('deleted this bubble '+ bubble);
        });
        this.game.player.bubbles.splice(0, this.game.player.bubbles.length);
    }
}