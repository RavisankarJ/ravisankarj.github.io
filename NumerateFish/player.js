export class Player{
    constructor(game){
        this.game = game;
        this.width = 498;
        this.height = 327;
        this.x = this.game.width;
        this.y = this.game.height/2;
        this.playerLeft = document.getElementById('fish_swim_left');
        this.playerLeftOpen = document.getElementById('openFishLeft');
        this.playerRight = document.getElementById('fish_swim_right');
        this.playerRightOpen = document.getElementById('openFishRight');
        this.bubbleImage = document.getElementById('bubble');
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.fps = 10;
        this.maxFrameX = 3;
        this.maxFrameY = 2;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.radius = 50;
        this.angle = 0;
        this.bubbles = [];
        this.image = this.playerLeft;
        this.health = 10;
    }
    update(mouse, deltaTime) {
        if(this.health<=0) this.game.gameOver = true;
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx / 10;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 10;
        }
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.angle = Math.atan2(dy, dx);
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrameX) this.frameX++;
            else {
                this.frameX = 0;
                if(this.frameY < this.maxFrameY) this.frameY++;
                else this.frameY = 0;
            }
        } else this.frameTimer += deltaTime;
        if (this.x >= this.game.input.mouse.x){
            if(this.bubbles.length>0) this.image = this.playerLeftOpen;
            else this.image = this.playerLeft;
        }else {
            if(this.bubbles.length>0) this.image = this.playerRightOpen;
            else this.image = this.playerRight;
        }
    }
    draw() {
        // this.game.ctx.fillStyle = 'blue';
        // this.game.ctx.beginPath();
        // this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // this.game.ctx.fill();
        // this.game.ctx.closePath();
        // this.game.ctx.fillRect(this.x, this.y, this.radius, 10);
        
        this.game.ctx.save();
        this.game.ctx.translate(this.x, this.y);
        this.game.ctx.rotate(this.angle);
        if(this.bubbles){
            for(let i=0; i<this.bubbles.length; i++){
            // this.bubbles[0].x = this.x-this.radius*2-this.game.canvas.getBoundingClientRect().width*0.1+Math.cos(this.angle)*this.radius;
            //     this.bubbles[0].y = this.y+Math.sin(this.angle)*this.radius;
            
            // this.bubbles[i].x = this.x+Math.cos(this.angle*180/Math.PI)*this.radius*(i+1);
            // this.bubbles[i].y = this.y+Math.sin(this.angle*180/Math.PI)*this.radius*(i+1);
            this.bubbles[i].x = this.x+Math.cos(this.angle*180/Math.PI)*this.radius*(i+1);
            this.bubbles[i].y = this.y+Math.sin(this.angle*180/Math.PI)*this.radius*(i+1);
            console.log(Math.sin(this.angle*180/Math.PI)*this.radius*(i+1));
            // this.game.ctx.fillStyle = this.bubbles[i].color;
            // this.game.ctx.beginPath();
            // this.game.ctx.arc(0-((i+1)*this.bubbles[i].radius), 0, this.bubbles[i].radius, 0, Math.PI * 2);
            // this.game.ctx.fill();
            // this.game.ctx.closePath();
            this.game.ctx.drawImage(this.bubbleImage, 0-125-(i*70), 0-40, this.bubbles[i].radius*2.2, this.bubbles[i].radius*2.2);
            // this.game.ctx.drawImage(this.bubbleImage, this.bubbles[i].x, this.bubbles[i].y, this.bubbles[i].radius*2.2, this.bubbles[i].radius*2.2);
            this.game.ctx.fillStyle = '#ffffff';
            this.game.ctx.font = "bold 32px Arial Black";
            this.game.ctx.textAlign = 'center';
            this.game.ctx.textBaseline = 'middle';
            this.game.ctx.fillText(this.bubbles[i].value,0-75-(i*70), 5);
            // this.game.ctx.stroke();
            }
        }
        
        this.game.ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 0 - 60, 0 - 45, this.width / 3, this.height / 3);
        
        
        this.game.ctx.restore();
    }
}