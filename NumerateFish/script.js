//canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

//mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
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

//player
const playerLeft = new Image();
playerLeft.src = 'assets/fish_swim_left.png';
const playerRight = new Image();
playerRight.src = 'assets/fish_swim_right.png'
class Player {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spritewidth = 498;
        this.spriteheight = 327;
        this.numbers = [];
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx / 10;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 10;
        }
        this.angle = Math.atan2(dy, dx);
    }
    draw() {
        if (mouse.click) {
            this.game.ctx.linewidth = 0.2;
            this.game.ctx.beginPath();
            this.game.ctx.moveTo(this.x, this.y);
            this.game.ctx.lineTo(mouse.x, mouse.y);
            this.game.ctx.stroke();
        }
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.game.ctx.fill();
        this.game.ctx.closePath();
        this.game.ctx.fillRect(this.x, this.y, this.radius, 10);

        this.game.ctx.save();
        this.game.ctx.translate(this.x, this.y);
        this.game.ctx.rotate(this.angle);
        if (this.x >= mouse.x) {
            this.game.ctx.drawImage(playerLeft, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, 0 - 60, 0 - 45, this.spritewidth / 4, this.spriteheight / 4);
        } else {
            this.game.ctx.drawImage(playerRight, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, 0 - 60, 0 - 45, this.spritewidth / 4, this.spriteheight / 4);
        }
        this.game.ctx.restore();
    }
}
const player = new Player();

//bubbles
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
        const dx = this.x - this.game.player.x;
        const dy = this.y - this.game.player.y;
        if(!this.inFish){
            this.y -= this.speed;
            this.color = 'blue';
        }
            else{
                this.x = this.game.player.x+this.game.player.radius;
                this.y = this.game.player.y;
                this.color = 'pink';
            }
        this.distance = Math.sqrt(dx * dx + dy * dy);
        
    }
    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.game.ctx.fill();
        this.game.ctx.closePath();
        this.game.ctx.stroke();
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
            if (bubblesArray[i].distance < bubblesArray[i].radius + this.game.player.radius) {
                if (!bubblesArray[i].counted) {
                    bubblesArray[i].counted = true;  
                    if(this.game.player.numbers.length<1){
                        this.game.player.numbers.push(bubblesArray[i]);
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
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});