import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { Bacteria, Virus, Fungi } from './pathogens.js';
import { UI } from './UI.js';
import { MusicIcon, VitaminC, VitaminB6, VitaminE, Zinc, FullscreenIcon } from './buttons.js';
import { Level1, Level2, Level3, Level4, Level5 } from './levels.js';
import { BloodCell } from './bloodCell.js';
import { Lemon, Orange, Grapes, Banana, Almond, Amla, Greenpeas, Groundnut, Beans, Cashew, Egg, Milk, Tomato, GreenLeaf, Chips, FingerChips, ChipsRoll, Donut, Pizza, CoolDrinks } from './food.js';
let lastTime = 0;

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 480;
    class Game {
        constructor(canvas, ctx) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.speed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.pathogens = [];
            this.collisions = [];
            this.blasts = [];
            this.pathogenTimer = 0;
            this.pathogenInterval = 1000;
            this.bloodCells = [];
            this.healthyFoods = [];
            this.unHealthyFoods = [];
            this.floatingPoints = [];
            this.walls = [];
            this.healthyFoodTimer = 0;
            this.healthyFoodInterval = 5 * 1000;
            this.unHealthyFoodTimer = 0;
            this.unHealthyFoodInterval = 14 * 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 1 * 60 * 1000;
            this.gameStart = true;
            this.gameOver = false;
            this.music = new Audio('background_music.mp3');
            this.music.muted = false;
            this.music.volume = 0.2;
            this.musicButton = new MusicIcon(this);
            this.fullscreenButton = new FullscreenIcon(this);
            this.nutrientButtons = [new VitaminC(this), new VitaminE(this), new VitaminB6(this), new Zinc(this)];
            this.levelIndex = 0;
            // this.maxLevel = 4;
            this.levels = [new Level1(this), new Level2(this), new Level3(this), new Level4(this), new Level5(this)];
            this.currentLevel = this.levels[this.levelIndex];
            this.currentLevel.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime || this.player.health < 1) this.gameOver = true;
            this.background.update();
            if (!this.gameOver && !this.gameStart) this.music.play();
            this.player.update(this.input.keys, deltaTime);
            //handle pathogens
            if (this.pathogenTimer > this.pathogenInterval) {
                this.addPathogen();
                this.pathogenTimer = 0;
            } else this.pathogenTimer += deltaTime;
            if (this.healthyFoodTimer > this.healthyFoodInterval) {
                this.addHealthyFood();
                this.healthyFoodTimer = 0;
            } else this.healthyFoodTimer += deltaTime;
            if (this.unHealthyFoodTimer > this.unHealthyFoodInterval) {
                this.addUnHealthyFood();
                this.unHealthyFoodTimer = 0;
            } else this.unHealthyFoodTimer += deltaTime;
            [...this.blasts, ...this.pathogens, ...this.collisions, ...this.walls].forEach(obj => obj.update(deltaTime));
            [...this.bloodCells, ...this.healthyFoods, ...this.unHealthyFoods, ...this.floatingPoints, this.fullscreenButton].forEach(obj => {
                obj.update();
            });
            this.blasts = this.blasts.filter(blast => !blast.markedForDeletion);
            this.pathogens = this.pathogens.filter(pathogen => !pathogen.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.bloodCells = this.bloodCells.filter(bloodCell => !bloodCell.markedForDeletion);
            this.healthyFoods = this.healthyFoods.filter(food => !food.markedForDeletion);
            this.unHealthyFoods = this.unHealthyFoods.filter(food => !food.markedForDeletion);
            this.floatingPoints = this.floatingPoints.filter(floatingPoint => !floatingPoint.markedForDeletion);
            this.walls = this.walls.filter(wall => !wall.markedForDeletion);
        }
        draw(context) {
            [this.background, ...this.pathogens, ...this.collisions, ...this.walls, ...this.blasts, ...this.bloodCells,
            ...this.healthyFoods, ...this.unHealthyFoods, ...this.nutrientButtons, this.musicButton, this.fullscreenButton,
            this.player, ...this.floatingPoints, this.UI].forEach(obj => obj.draw(context));
        }
        addPathogen() {
            switch (Math.floor((Math.random() * 2) + 1)) {
                case 1:
                    this.pathogens.push(new Bacteria(this));
                    break;
                case 2:
                    this.pathogens.push(new Virus(this));
                    break;
                case 3:
                    this.pathogens.push(new Fungi(this));
                    break;
            }
        }
        // addBloodCells() {
        //     var bloodCell = new BloodCell(this);
        //     this.bloodCells.push(bloodCell);
        //     this.addHealthyFood(bloodCell);
        // }
        addHealthyFood() {
            // var bloodCell = new BloodCell(this);
            // this.bloodCells.push(bloodCell);
            // var foodChoice = Math.floor((Math.random() * 14)) + 1;
            // switch (foodChoice) {
            //     case 1:
            //         this.healthyFoods.push(new Lemon(this, bloodCell));
            //         break;
            //     case 2:
            //         this.healthyFoods.push(new Orange(this, bloodCell));
            //         break;
            //     case 3:
            //         this.healthyFoods.push(new Grapes(this, bloodCell));
            //         break;
            //     case 4:
            //         this.healthyFoods.push(new Banana(this, bloodCell));
            //         break;
            //     case 5:
            //         this.healthyFoods.push(new Amla(this, bloodCell));
            //         break;
            //     case 6:
            //         this.healthyFoods.push(new Almond(this, bloodCell));
            //         break;
            //     case 7:
            //         this.healthyFoods.push(new Beans(this, bloodCell));
            //         break;
            //     case 8:
            //         this.healthyFoods.push(new Cashew(this, bloodCell));
            //         break;
            //     case 9:
            //         this.healthyFoods.push(new Greenpeas(this, bloodCell));
            //         break;
            //     case 10:
            //         this.healthyFoods.push(new Groundnut(this, bloodCell));
            //         break;
            //     case 11:
            //         this.healthyFoods.push(new Tomato(this, bloodCell));
            //         break;
            //     case 12:
            //         this.healthyFoods.push(new Egg(this, bloodCell));
            //         break;
            //     case 13:
            //         this.healthyFoods.push(new Milk(this, bloodCell));
            //         break;
            //     case 14:
            //         this.healthyFoods.push(new GreenLeaf(this, bloodCell));
            //         break;
            //     default: console.log('without food');
            // }
            console.log('going to call current leve addhealthyfood method');
            this.currentLevel.addHealthyFood();
        }
        addUnHealthyFood() {
            var bloodCell = new BloodCell(this);
            this.bloodCells.push(bloodCell);
            var foodChoice = Math.floor((Math.random() * 6)) + 1;
            switch (foodChoice) {
                case 1:
                    this.unHealthyFoods.push(new Chips(this, bloodCell));
                    break;
                case 2:
                    this.unHealthyFoods.push(new FingerChips(this, bloodCell));
                    break;
                case 3:
                    this.unHealthyFoods.push(new ChipsRoll(this, bloodCell));
                    break;
                case 4:
                    this.unHealthyFoods.push(new Donut(this, bloodCell));
                    break;
                case 5:
                    this.unHealthyFoods.push(new Pizza(this, bloodCell));
                    break;
                case 6:
                    this.unHealthyFoods.push(new CoolDrinks(this, bloodCell));
                    break;
                default: console.log('without food');
            }
        }
        restart() {
            this.pathogens = [];
            this.collisions = [];
            this.floatingPoints = [];
            this.unHealthyFoods = [];
            this.pathogenTimer = 0;
            this.unHealthyFoodTimer = 0;
            this.pathogenInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.time = 0;
            if (this.gameOver && this.player.health > 0) this.levelIndex++;
            this.gameOver = false;
            this.gameStart = false;
            if (this.levelIndex > this.levels.length - 1) this.levelIndex = 0;
            this.currentLevel = this.levels[this.levelIndex];
            this.currentLevel.enter();
            this.player.restart();
            lastTime = performance.now();
            animate(0);
        }
    }
    const game = new Game(canvas, ctx);
    const useChromeElement = document.getElementById('useChrome');
    const useLandscapeElement = document.getElementById('useLandscape');
    function toggleFullScreen() {
        if (!document.fullscreenElement)
            canvas.requestFullscreen().catch(err => {
                alert(`Can't enable fullscreen mode. The error message is ${err.message}`)
            });
        else document.exitFullscreen();
    }
    // fullscreenButton.addEventListener('click', toggleFullScreen);
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
    if (navigator.userAgent.indexOf("Chrome") < 0) {
        var rect = canvas.getBoundingClientRect();
        useChromeElement.style.width = rect.width * 0.7;
        useChromeElement.style.height = rect.height * 0.7;
        useChromeElement.style.display = 'flex';
    }

    let portrait = window.matchMedia("(orientation: portrait)");
    portrait.onchange = function (e) {
        if (e.matches) {
            // Portrait mode
            var rect = canvas.getBoundingClientRect();
            useLandscapeElement.style.width = rect.width * 0.7;
            useLandscapeElement.style.height = rect.height * 0.7;
            useLandscapeElement.style.display = 'flex';
        } else {
            // Landscape
            useLandscapeElement.style.display = 'none';
        }
    }

    if (portrait.matches) {
        var rect = canvas.getBoundingClientRect();
        useLandscapeElement.style.width = rect.width * 0.7;
        useLandscapeElement.style.height = rect.height * 0.7;
        useLandscapeElement.style.display = 'flex';
    }
});
