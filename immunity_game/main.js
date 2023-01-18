import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { Bacteria, Virus, Bacteria2 } from './pathogens.js';
import { UI } from './UI.js';
import { MusicIcon, VitaminC, VitaminB6, VitaminE, Zinc } from './buttons.js';
import { Level1, Level2, Level3 } from './levels.js';
import { BloodCell } from './bloodCell.js';
import { Lemon, Orange, Grapes, Banana } from './food.js';
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
            this.bloodCells = [];
            this.healthyFoods = [];
            this.bloodCellTimer = 0;
            this.bloodCellInterval = 5000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 1 * 60 * 1000;
            this.gameStart = true;
            this.gameOver = false;
            this.music = new Audio('background_music.mp3');
            this.music.muted = false;
            // this.music.play();
            this.music.volume = 0.2;
            this.musicButton = new MusicIcon(this);
            this.nutrientButtons = [new VitaminC(this), new VitaminE(this), new VitaminB6(this), new Zinc(this)];
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
            if (this.bloodCellTimer > this.bloodCellInterval) {
                this.addBloodCells();
                this.bloodCellTimer = 0;
            } else this.bloodCellTimer += deltaTime;
            [...this.pathogens, ...this.collisions].forEach(obj => obj.update(deltaTime));
            [...this.bloodCells, ...this.healthyFoods].forEach(obj => obj.update());
            this.pathogens = this.pathogens.filter(pathogen => !pathogen.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.bloodCells = this.bloodCells.filter(bloodCell => !bloodCell.markedForDeletion);
            this.healthyFoods = this.healthyFoods.filter(healthyFood => !healthyFood.markedForDeletion);
        }
        draw(context) {
            [this.background, ...this.pathogens, ...this.collisions, ...this.bloodCells,
            ...this.healthyFoods, ...this.nutrientButtons, this.UI, this.musicButton,
            this.player].forEach(obj => obj.draw(context));
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
        addBloodCells() {
            var bloodCell = new BloodCell(this);
            this.bloodCells.push(bloodCell);
            this.addHealthyFood(bloodCell);
        }
        addHealthyFood(bloodCell) {
            switch (Math.floor((Math.random() * 5) + 0.5)) {
                case 1:
                    this.healthyFoods.push(new Lemon(this, bloodCell));
                    break;
                case 2:
                    this.healthyFoods.push(new Orange(this, bloodCell));
                    break;
                case 3:
                    this.healthyFoods.push(new Grapes(this, bloodCell));
                    break;
                case 4:
                    this.healthyFoods.push(new Banana(this, bloodCell));
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
            this.maxTime = 1 * 60 * 1000;
            if (this.gameOver) this.levelIndex++;
            this.gameOver = false;
            this.gameStart = false;
            if (this.levelIndex > this.maxLevel - 1) this.levelIndex = 0;
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

