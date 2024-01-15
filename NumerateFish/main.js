import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import {Bubble} from "./bubbles.js";
import { UI } from "./UI.js";
import { Background } from './background.js';
import { Plant1 } from "./waterObjects.js";
import { Level1_1, Level1_2, Level1_3, Level1_4, Level1_5, Level1_6, Level2_1,  Level2_2,  Level2_3,  Level2_4,  Level3_1, Level3_2, Level3_3, Level4_1, Level4_2, Level5_1, Level5_2, Level5_3 } from "./levels.js";
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
            this.gameStart = false;
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
            this.bubbleSound = new Audio('assets/bubblesSound.wav');
            this.bubbleSingle = new Audio('assets/bubbleSingle.wav');
            this.music = new Audio('assets/stage1.ogg');
            this.music.volume = 0.2;
            this.questionNumber = Math.round(Math.random()*10);
            this.boxNumbers = ['?', '?'];
            this.winningScore = 5;
            this.bubbleValues = [];
            this.levels = [
                new Level1_1(this), new Level1_2(this), new Level1_3(this), new Level1_4(this), new Level1_5(this), new Level1_6(this), 
                new Level2_1(this), new Level2_2(this), new Level2_3(this), new Level2_4(this), 
                new Level3_1(this), new Level3_2(this), new Level3_3(this),
                new Level4_1(this), new Level4_2(this),
                new Level5_1(this), new Level5_2(this), new Level5_3(this)
            ];
            this.currentLevel = 13;
            this.operationChar = '+';
        }
        update(deltaTime) {
            this.time += deltaTime;
            this.background.update();
            this.player.update(this.input.mouse, deltaTime);
            this.music.play();
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
        // requestAnimationFrame(animate);
        if (!game.gameOver && !game.gameStart && !game.gamePause) requestAnimationFrame(animate);
        else {
            game.music.pause();
        }
    }
    game.levels[game.currentLevel].enter();
    animate(0);
});