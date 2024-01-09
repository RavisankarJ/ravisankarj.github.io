import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import {Bubble} from "./bubbles.js";
import { UI } from "./UI.js";
import { Background } from './background.js';
import { Plant1 } from "./waterObjects.js";
let lastTime = 0, infoDivIndex = 0;

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 1280;
    class Game{
        constructor(canvas, ctx){
            this.canvas = canvas;
            this.ctx = ctx;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.gameStart = true;
            this.gameOver = false;
            this.gamePause = false;
            this.time = 0;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.bubbles = [];
            this.bubbleTimer = 0;
            this.bubbleInterval = 2000;
            this.UI = new UI(this);
            this.score = 0;
            this.levelIndex = 0;
            this.collisions = [];
            this.waterObjects = [new Plant1(this)];
            this.background = new Background(this);
        }
        update(deltaTime) {
            this.time += deltaTime;
            this.background.update();
            this.player.update(this.input.mouse, deltaTime);
            //handle bubbles
            if (this.bubbleTimer > this.bubbleInterval) {
                this.addBubble();
                this.bubbleTimer = 0;
            } else this.bubbleTimer += deltaTime;
            [...this.waterObjects,...this.bubbles, ...this.collisions].forEach(obj => obj.update(deltaTime));
            this.bubbles = this.bubbles.filter(bubble => !bubble.markedForDeletion);          
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);          
        }
        draw(context) {
            [this.background,...this.waterObjects,...this.bubbles, this.player, ...this.collisions, this.UI].forEach(obj => obj.draw(context));
        }
        addBubble(){
            this.bubbles.push(new Bubble(this));
        }
    }
    
    const game = new Game(canvas, ctx);
    function animate(timeStamp){
        var deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
        // if (!game.gameOver && !game.gameStart && !game.gamePause) requestAnimationFrame(animate);
        // else {
        //     game.music.pause();
        // }
    }
    animate(0);
});