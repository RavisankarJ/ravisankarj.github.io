import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { Bacteria, Virus, Bacteria2 } from './pathogens.js';
import { UI } from './UI.js';
import { MusicIcon } from './buttons.js';
import {Level1, Level2, Level3} from './levels.js';

let lastTime = 0;

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');
    const ctx2 = canvas.getContext('2d');
    canvas.width = 1280 / 2;
    canvas.height = 720 / 2;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            // this.groundMargin = 50;
            this.speed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.pathogens = [];
            this.collisions = [];
            this.pathogenTimer = 0;
            this.pathogenInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 1 * 10 * 1000;
            this.gameStart = true;
            this.gameOver = false;
            this.music = new Audio('background_music.mp3');
            this.music.muted = false;
            // this.music.play();
            this.music.volume = 0.2;
            this.musicButton = new MusicIcon(this);
            this.levelIndex = 0;
            this.maxLevel = 3;
            this.levels = [new Level1(this), new Level2(this), new Level3(this)];
            this.currentLevel = this.levels[this.levelIndex];
            this.currentLevel.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            if (!this.gameOver && !this.gameStart) this.music.play();
            this.player.update(this.input.keys, deltaTime);
            //handle pathogens
            if (this.pathogenTimer > this.pathogenInterval) {
                this.addPathogen();
                this.pathogenTimer = 0;
            } else this.pathogenTimer += deltaTime;
            this.pathogens.forEach((pathogen, index) => {
                pathogen.update(deltaTime);
                if (pathogen.markedForDeletion) this.pathogens.splice(index, 1);
            });
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) this.collisions.splice(index, 1);
            });
        }
        draw(context) {
            this.background.draw(context);

            this.pathogens.forEach(pathogen => {
                pathogen.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.player.draw(context);
            this.UI.draw(context);
            this.musicButton.draw(context);
        }
        addPathogen() {
            switch (Math.floor(Math.random() * 4)) {
                case 1:
                    this.pathogens.push(new Bacteria(this));
                    break;
                case 2:
                    this.pathogens.push(new Virus(this));
                    break;
                case 3:
                    this.pathogens.push(new Bacteria2(this));
                    break;
            }
        }
        restart() {
            this.speed = 3;
            this.pathogens = [];
            this.collisions = [];
            this.pathogenTimer = 0;
            this.pathogenInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.time = 0;
            this.maxTime = 1 * 10 * 1000;
            if(this.gameOver) this.levelIndex++;
            this.gameOver = false;
            this.gameStart = false;
            if(this.levelIndex>this.maxLevel-1) this.levelIndex = 0;
            this.currentLevel = this.levels[this.levelIndex];
            this.currentLevel.enter();
            this.player.restart();
            lastTime = performance.now();
            animate(0);
        }
    }
    const game = new Game(canvas.width, canvas.height);


    function animate(timeStamp) {
        var deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver && !game.gameStart) requestAnimationFrame(animate);
        else {
            game.music.pause();
        }
    }
    animate(0);
});

