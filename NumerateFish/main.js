import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import {Bubble} from "./bubbles.js";
import { UI } from "./UI.js";
import { Background } from './background.js';
import { Plant1 } from "./waterObjects.js";
import { Level1_1, Level1_2, Level1_3, Level1_4, Level1_5, Level1_6, Level2_1,  Level2_2,  Level2_3,  Level2_4,  Level3_1, Level3_2, Level3_3, Level4_1, Level4_2, Level5_1, Level5_2, Level5_3 } from "./levels.js";
import { LevelButton, MusicIcon, InfoButton, HomeButton } from "./buttons.js";
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
            // this.levelIndex = 0;
            this.collisions = [];
            this.waterObjects = [new Plant1(this)];
            this.background = new Background(this);
            this.bubbleSound = new Audio('assets/bubblesSound.wav');
            this.bubbleSingle = new Audio('assets/bubbleSingle.wav');
            this.wrongSound = new Audio('assets/wrong.wav');
            this.music = new Audio('assets/stage1.ogg');
            this.music.volume = 0.2;
            this.levelSelctionMusic = new Audio('assets/stage3.ogg');
            this.levelSelctionMusic.volume = 0.4;
            this.questionNumber = Math.round(Math.random()*10);
            this.boxNumbers = ['?', '?'];
            this.winningScore = 5;
            this.bubbleValues = [];
            this.categories = [[new Level1_1(this), new Level1_2(this), new Level1_3(this), new Level1_4(this), new Level1_5(this), new Level1_6(this)],
                                [new Level3_1(this), new Level3_2(this), new Level3_3(this)],
                                [new Level2_1(this), new Level2_2(this), new Level2_3(this), new Level2_4(this)],
                                [new Level4_1(this), new Level4_2(this)],
                                [new Level5_1(this), new Level5_2(this), new Level5_3(this)]
                                ];
            this.levels = this.categories[0];
            this.currentLevel = 0;
            this.operationChar = '+';
            this.musicButton = new MusicIcon(this);
            this.music.muted = false;
            
            this.infoButton = new InfoButton(this);
            // this.homeButton = new HomeButton(this);
            this.levelBoxes = [
                new LevelButton(this, 120, 170, 1, 'Addition'),
                new LevelButton(this, 420, 170, 2, 'Addition'),
                new LevelButton(this, 120, 470, 3, 'Subtraction'),
                new LevelButton(this, 420, 470, 4, 'Multiples'),
                new LevelButton(this, 270, 720, 5, 'Factors'),
            ];
        }
        update(deltaTime) {
            this.time += deltaTime;
            this.background.update();
            if(this.gameStart){
                this.waterObjects.forEach(obj => obj.update(deltaTime));
                this.music.pause();
                this.levelSelctionMusic.play().catch(function(){
                    console.log('need user interaction');
                });
            }else{
            this.player.update(this.input.mouse, deltaTime);
            this.levelSelctionMusic.pause();
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
        }
        draw(context) {
            if(this.gameStart){
                [this.background, ...this.waterObjects,this.infoButton, this.musicButton, ...this.levelBoxes].forEach(obj=>obj.draw(context));
            }
            else [this.background,...this.waterObjects,this.infoButton,...this.bubbles, this.player, ...this.collisions, this.UI, this.musicButton].forEach(obj => obj.draw(context));
        }
        addBubble(){
            this.bubbles.push(new Bubble(this));
            console.log(this.bubbles.length);
        }
        restart() {
            var gameInfos = document.getElementsByClassName('gameInfo');
            for(var i = 0; i< gameInfos.length; i++){
                gameInfos[i].style.display = "none";
            }
            this.bubbles = [];
            this.collisions = [];
            this.floatingPoints = [];
            this.UI.infoIdx = 0;
            this.score = 0;
            if (this.gameOver && this.player.health > 0) this.currentLevel++;
            this.player.restart();
            this.gameOver = false;
            // this.gameStart = false;
            if (this.currentLevel > this.levels.length - 1) this.currentLevel = 0;
            // this.currentLevel = this.levels[this.levelIndex];
            this.levels[this.currentLevel].enter();
            // this.player.restart();
            lastTime = performance.now();
            animate(0);
        }
    }
    
    const game = new Game(canvas, ctx);
    const useChromeElement = document.getElementById('useChrome');
    function animate(timeStamp){
        var deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        // console.log('here');
        // requestAnimationFrame(animate);
        if (!game.gameOver && !game.gamePause) requestAnimationFrame(animate);
        else {
            game.music.pause();
        }
    }
    function resumeGame(){
        // console.log('resuming game');
        game.gamePause = false;
        lastTime = performance.now();
        animate(0);
    }
    animate(0);
    if (navigator.userAgent.indexOf("Chrome") < 0) {
        var rect = canvas.getBoundingClientRect();
        useChromeElement.style.width = rect.width * 0.7;
        useChromeElement.style.height = rect.height * 0.7;
        useChromeElement.style.display = 'flex';
    }
    showInfoContainer(0);
    
    const restartButton = document.getElementById('restart');
    const nxtButton = document.getElementById('nxtLevel');
    
    restartButton.addEventListener('click', function(){
        restartButton.style.display = "none";
        game.restart();
    });
    nxtButton.addEventListener('click', function(){
        nxtButton.style.display = "none";
        game.restart();
    });

    function showInfoContainer(idx) {
        var infoContainerElement = document.getElementById('infoContainers');
        infoContainerElement.style.display = "flex";
        infoDivIndex += idx;
        // var infos = document.getElementsByClassName('info');
        var infos = document.querySelectorAll('#infoContainers .info');
        var dots = document.querySelectorAll('.dot');
        for (var i = 0; i < infos.length; i++)
            infos[i].style.display = "none";
        for (var i = 0; i < dots.length; i++)
            dots[i].className = dots[i].className.replace(" active", "");
        if (infoDivIndex > infos.length - 1) infoDivIndex = 0;
        if (infoDivIndex < 0) infoDivIndex = infos.length - 1;
        infos[infoDivIndex].style.display = "table";
        dots[infoDivIndex].className += " active";
    }
    document.getElementById('prev').addEventListener('click', evt => showInfoContainer(-1));
    document.getElementById('next').addEventListener('click', evt => showInfoContainer(1));
    document.getElementById('close').addEventListener('click', function(){
        document.getElementById('infoContainers').style.display = 'none';
        // document.getElementById('start').style.display = "block";
        if(game.gamePause) resumeGame();
    });
   
    document.getElementById('goHome').addEventListener('click', function(){
        document.getElementById('creditInfo').style.display = 'none';
        // document.getElementById('start').style.display = "block";
        game.score = 0;
        game.currentLevel = 0;
        game.gameOver = false;
        game.gameStart=true;
        game.restart();
    });
});