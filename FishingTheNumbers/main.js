import { Hook } from "./hook.js";
import { InputHandler } from "./input.js";
import {Fish} from "./fishes.js";
import { UI } from "./UI.js";
import { Background, BackgroundSet1, BackgroundSet2, BackgroundSet3} from './background.js';
import { Wave, QuestionBackground, Birds, WaterLayer } from "./backgroundObjects.js";
import { Level1_1, Level1_2, Level1_3, Level1_4, Level2_1,  Level2_2,  Level2_3,  Level2_4,  Level2_5,  Level2_6,  Level3_1, Level3_2, Level3_3, Level3_4} from "./levels.js";
import { LevelButton, MusicIcon, InfoButton, HomeButton, ShellIcon } from "./buttons.js";
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
            
            this.input = new InputHandler(this);
            this.fishes = [];
            this.fishTimer = 0;
            this.fishInterval = 2000;
            this.UI = new UI(this);
            this.score = 0;
            this.qbg = new QuestionBackground(this);
            this.qbgTimer = 0;
            this.qbgInterval = 5000;
            this.collisions = [];
            this.floatingPoints = [];
            // this.bgObjects = [new Plant(this)];
            this.bgObjects = [];
            this.backgrounds = [
                new Background(this, BackgroundSet1),
                new Background(this, BackgroundSet2),
                new Background(this, BackgroundSet3),
            ]
            
            this.backgroundIndex = 0;
            this.background = this.backgrounds[this.backgroundIndex];
            this.hook = new Hook(this);
            // this.correctSound = new Audio('assets/bubblesSound.wav');
            this.correctSound = new Audio('assets/correct.ogg');
            this.correctSound.volume = 0.5;
            // this.fishSingle = new Audio('assets/bubbleSingle.wav');
            this.wrongSound = new Audio('assets/wrong.ogg');
            this.wrongSound.volume = 0.6;
            this.music = new Audio('assets/playful.ogg');
            this.music.volume = 0.3;
            this.levelSelctionMusic = new Audio('assets/fun_kids_playful.ogg');
            this.levelSelctionMusic.volume = 0.2;
            this.questionNumber = Math.round(Math.random()*10);
            this.boxNumbers = ['?', '?'];
            this.winningScore = 5;
            this.fishValues = [];
            this.categories = [
                                [new Level1_1(this), new Level1_2(this), new Level1_3(this), new Level1_4(this)],
                                
                                [new Level2_1(this), new Level2_2(this), new Level2_3(this), new Level2_4(this),new Level2_5(this),new Level2_6(this)],
                                
                                [new Level3_1(this), new Level3_2(this), new Level3_3(this), new Level3_4(this)]
                                // [new Level3_1(this)]
                                ];
            this.levels = this.categories[0];
            this.currentLevel = 0;
            this.operationChar = '+';
            this.musicButton = new MusicIcon(this);
            this.music.muted = false;
            
            this.infoButton = new InfoButton(this);
            this.homeButton = new HomeButton(this);
            this.shellIcon = new ShellIcon(this);
            this.levelBoxes = [
                new LevelButton(this, 50, 570, 1, 'Identify'),
                new LevelButton(this, 270, 570, 2, 'Order'),
                new LevelButton(this, 500, 570, 3, 'Big & Small'),
            ];
            this.waves = [];
            this.waveTimer = 0;
            this.waveInterval = 1000;
            this.shells = 0;
            this.wateryLayers = [
                new WaterLayer(this, this.backgrounds[0].wateryLayer),
                new WaterLayer(this, this.backgrounds[1].wateryLayer),
                new WaterLayer(this, this.backgrounds[2].wateryLayer)
            ];
            this.wateryLayer = this.wateryLayers[0];
        }
        update(deltaTime) {
            this.time += deltaTime;
            this.background.update(deltaTime);
            this.wateryLayer.update(deltaTime);
            if(this.gameStart){
                this.bgObjects.forEach(obj => obj.update(deltaTime));
                this.music.pause();
                this.levelSelctionMusic.play().catch(function(){
                    console.log('need user interaction');
                });
            }else{
            this.hook.update(this.input.mouse, deltaTime);
            this.levelSelctionMusic.pause();
            this.music.play();
            //handle fishes
            if (this.fishTimer > this.fishInterval) {
                this.addFish();
                this.addBird();
                this.fishTimer = 0;
            } else this.fishTimer += deltaTime;
            if (this.waveTimer > this.waveInterval) {
                this.addWave();
                this.waveTimer = 0;
            } else this.waveTimer += deltaTime;

            if(this.qbg.showSwitch)
            if (this.qbgTimer > this.qbgInterval) {
                this.qbg.showSwitch = false;
                this.qbgTimer = 0;
                
            } else this.qbgTimer += deltaTime;
            [...this.waves, ...this.bgObjects,...this.fishes, this.wateryLayer,...this.collisions, ...this.floatingPoints, this.qbg].forEach(obj => obj.update(deltaTime));
            this.fishes = this.fishes.filter(fish => !fish.markedForDeletion);          
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.waves = this.waves.filter(wave => !wave.markedForDeletion);
            this.floatingPoints = this.floatingPoints.filter(points => !points.markedForDeletion);
        }
        }
        draw(context) {
            if(this.gameStart){
                [this.background,...this.waves, ...this.bgObjects, this.infoButton, this.musicButton, ...this.levelBoxes, this.wateryLayer].forEach(obj=>obj.draw(context));
            }
            else [this.background,...this.waves,...this.bgObjects,this.homeButton, this.infoButton,...this.fishes, this.hook, ...this.collisions, this.wateryLayer, ...this.floatingPoints,this.qbg, this.UI, this.musicButton].forEach(obj => obj.draw(context));
            // context.drawImage(this.background.wateryLayer.image, 0, 0);
        }
        addFish(){
            // var r = Math.round(Math.random()*4)+1;
            // switch(r){
            //     case 1:this.fishes.push(new Fish(this)); break;
            //     case 2: this.fishes.push(new Fish(this, Game.GreenFish));break;
            //     case 3: this.fishes.push(new Fish(this, Game.BlueFish));break;
            //     case 4: this.fishes.push(new Fish(this, Game.PinkFish));break;
            //     case 5: this.fishes.push(new Fish(this, Game.YellowFish));break;
            //     default: this.fishes.push(new Fish(this));

            // }
            this.fishes.push(new Fish(this));
            // console.log(this.fishes.length);
        }
        addWave(){
            var r = Math.round(Math.random()*7)+1;
            switch(r){
                case 1: this.waves.push(new Wave(this, 'w1',108,4)); break;
                case 2: this.waves.push(new Wave(this, 'w2',152,6)); break;
                case 3: this.waves.push(new Wave(this, 'w3',57,2)); break;
                case 4: this.waves.push(new Wave(this, 'w4',289,7)); break;
                case 5: this.waves.push(new Wave(this, 'w5',49,3)); break;
                case 6: this.waves.push(new Wave(this, 'w6',154,4)); break;
                case 7: this.waves.push(new Wave(this, 'w7',165,7)); break;
                case 8: this.waves.push(new Wave(this, 'w8',322,6)); break;
                default: this.waves.push(new Wave(this, 'w1',108,4));
            }
            // console.log(this.waves);
        }
        addBird(){
            this.waves.push(new Birds(this));
        }
        restart() {
            var gameInfos = document.getElementsByClassName('gameInfo');
            for(var i = 0; i< gameInfos.length; i++){
                gameInfos[i].style.display = "none";
            }
            this.fishes = [];
            this.collisions = [];
            this.floatingPoints = [];
            this.UI.infoIdx = 0;
            this.score = 0;
            if (this.gameOver && this.hook.health > 0) this.currentLevel++;
            this.hook.restart();
            this.gameOver = false;
            // this.gameStart = false;
            if (this.currentLevel > this.levels.length - 1) this.currentLevel = 0;
            // this.currentLevel = this.levels[this.levelIndex];
            this.levels[this.currentLevel].enter();
            // this.hook.restart();
            lastTime = performance.now();
            animate(0);
        }
        quit(){
            this.currentLevel = 0;
            this.fishes.length = 0;
            this.collisions = [];
            this.floatingPoints = [];
            this.UI.infoIdx = 0;
            this.score = 0;
            this.hook.restart();
            this.gamePause = false;
            this.gameStart = true;
            lastTime = performance.now();
            animate(lastTime);
        }
        // static GreenFish = {
        //     colorFish : document.getElementById('green_fish_swim_left'),
        //     colorFishRight : document.getElementById('green_fish_swim_right'),
        //     textColor : '#070E47'
        // }
        // static BlueFish = {
        //     colorFish : document.getElementById('blue_fish_swim_left'),
        //     colorFishRight : document.getElementById('blue_fish_swim_right'),
        //     textColor : '#070E47'
        // }
        // static PinkFish = {
        //     colorFish : document.getElementById('pink_fish_swim_left'),
        //     colorFishRight : document.getElementById('pink_fish_swim_right'),
        //     textColor : 'yellow'
        // }
        // static YellowFish = {
        //     colorFish : document.getElementById('yellow_fish_swim_left'),
        //     colorFishRight : document.getElementById('yellow_fish_swim_right'),
        //     textColor : '#070E47'
        // }
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
    document.getElementById('quitButton').addEventListener('click',function(){ 
        document.getElementById('quitLevel').style.display = 'none';
        game.quit();
    });
    document.getElementById('noQuit').addEventListener('click', function(){ 
        document.getElementById('quitLevel').style.display = 'none';
        if(game.gamePause) resumeGame();
    });
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
    document.getElementById('loader').style.display = 'none';
});