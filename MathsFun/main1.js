const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 800;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

//mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: 500*canvas.width/canvasPosition.width,
    y: 800*canvas.height/canvasPosition.height,
    click: false
}
canvas.addEventListener('mousedown', function (event) {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', function () {
    mouse.click = false;
});

const playerLeft = new Image();
playerLeft.src = 'assets/fish_swim_left.png';
const playerRight = new Image();
playerRight.src = 'assets/fish_swim_right.png'

class Hook {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spritewidth = 498;
        this.spriteheight = 327;
        this.numbers = [];
        this.lineTo ={x: 150, y: 150}
        this.distanceToFish;
        this.distanceToPlayer;
        this.player = {x:100, y:100}
        this.hookHasFish = false;
        this.isGoingToFish = false;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const Pdx = this.x - this.player.x;
        const Pdy = this.y - this.player.y;
        if(mouse.click) {
            this.isGoingToFish = true;
            this.hookHasFish = false;
        }
        if(!this.hookHasFish && this.isGoingToFish){
            if (mouse.x != this.x) {
                this.x -= dx / 10;
            }
            if (mouse.y != this.y) {
                this.y -= dy / 10;
            }
        }
        if(this.hookHasFish && !this.isGoingToFish){
            if (this.player.x != this.x) {
                this.x -= Pdx / 5;
            }
            if (this.player.y != this.y) {
                this.y -= Pdy / 5;
            }
        }
        
        this.distanceToFish = Math.sqrt(dx*dx+dy*dy);
        if(this.distanceToFish<this.radius) {
            this.hookHasFish = true;
            this.isGoingToFish = false;
            console.log('caught fish');
        }
        this.distanceToPlayer = Math.sqrt(Pdx*Pdx+Pdy*Pdy);
        // this.angle = Math.atan2(dy, dx);
    }
    draw() {
        
        
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);
        if (this.distanceToFish>this.radius/2) {
            ctx.linewidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.player.x, this.player.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        }else if(this.distanceToPlayer>this.radius){

        }
        // ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.rotate(this.angle);
        // if (this.x >= mouse.x) {
            // ctx.drawImage(playerLeft, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, 100, 100, this.spritewidth / 4, this.spriteheight / 4);
        // } else {
            // ctx.drawImage(playerRight, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, 0 - 60, 0 - 45, this.spritewidth / 4, this.spriteheight / 4);
        // }
        // ctx.restore();
    }
}
const hook = new Hook();
const bubblesArray = [];
class Bubble {
    constructor() {
        
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.inFish = false;
        this.color = 'blue';
    }
    update() {
        const dx = this.x - hook.x;
        const dy = this.y - hook.y;
        if(!this.inFish){
            this.y -= this.speed;
            this.color = 'blue';
        }
            else{
                this.x = hook.x+hook.radius;
                this.y = hook.y;
                this.color = 'pink';
            }
        this.distance = Math.sqrt(dx * dx + dy * dy);
        
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}
function handleBubbles() {
    if (gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble());
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i, 1);
        }
        if (bubblesArray[i]) {
            if (bubblesArray[i].distance < bubblesArray[i].radius + hook.radius) {
                if (!bubblesArray[i].counted) {
                    bubblesArray[i].counted = true;  
                    if(hook.numbers.length<1){
                        hook.numbers.push(bubblesArray[i]);
                        bubblesArray[i].inFish = true;
                    }else{
                        score++;
                        bubblesArray.splice(i, 1);
                    }
                                      
                }
            }
        }
    }
}

//animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // handleBubbles();
    hook.update();
    hook.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});