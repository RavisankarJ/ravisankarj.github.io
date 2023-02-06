import { BloodCell } from "./bloodCell.js";
import { Almond, Amla, Banana, Beans, Cashew, Chips, Egg, FingerChips, ChipsRoll, Donut, Pizza, CoolDrinks, Grapes, GreenLeaf, Greenpeas, Groundnut, Lemon, Milk, Orange, Tomato } from "./food.js";

export class Level1 {
    constructor(game) {
        this.game = game;
    }
    enter(){
        this.game.speed = 3;
        this.game.pathogeInterval = 1000;
        this.game.healthyFoodInterval = 5*1000;
        this.game.unHealthyFoodInterval = 9*1000;
        this.game.maxTime = 1 * 15 * 1000;
    }
    addHealthyFood() {
        var bloodCell = new BloodCell(this.game);
        this.game.bloodCells.push(bloodCell);
        var foodChoice = Math.floor((Math.random() * 3)) + 1;
        switch (foodChoice) {
            case 1:
                this.game.healthyFoods.push(new Beans(this.game, bloodCell));
                break;
            case 2:
                this.game.healthyFoods.push(new Greenpeas(this.game, bloodCell));
                break;
            case 3:
                this.game.healthyFoods.push(new GreenLeaf(this.game, bloodCell));
                break;
            default: console.log('without food');
        }
    }
    addUnHealthyFood() {
        var bloodCell = new BloodCell(this.game);
        this.game.bloodCells.push(bloodCell);
        var foodChoice = Math.floor((Math.random() * 6)) + 1;
        switch (foodChoice) {
            case 1:
                this.game.unHealthyFoods.push(new Chips(this, bloodCell));
                break;
            case 2:
                this.game.unHealthyFoods.push(new FingerChips(this, bloodCell));
                break;
            case 3:
                this.game.unHealthyFoods.push(new ChipsRoll(this, bloodCell));
                break;
            case 4:
                this.game.unHealthyFoods.push(new Donut(this, bloodCell));
                break;
            case 5:
                this.game.unHealthyFoods.push(new Pizza(this, bloodCell));
                break;
            case 6:
                this.game.unHealthyFoods.push(new CoolDrinks(this, bloodCell));
                break;
            default: console.log('without food');
        }
    }
}

export class Level2 extends Level1{
    constructor(game){
        super(game);
    }
    enter(){
        super.enter();
        this.game.speed = 6;
        this.game.maxTime = 1 * 30 * 1000;
    }
    addHealthyFood() {
        var bloodCell = new BloodCell(this.game);
        this.game.bloodCells.push(bloodCell);
        var foodChoice = Math.floor((Math.random() * 6)) + 1;
        switch (foodChoice) {
            case 1:
                this.game.healthyFoods.push(new Lemon(this.game, bloodCell));
                break;
            case 2:
                this.game.healthyFoods.push(new Grapes(this.game, bloodCell));
                break;
            case 3:
                this.game.healthyFoods.push(new Groundnut(this.game, bloodCell));
                break;
            case 4:
                this.game.healthyFoods.push(new Tomato(this.game, bloodCell));
                break;
            case 5:
                this.game.healthyFoods.push(new Egg(this.game, bloodCell));
                break;
            case 6:
                this.game.healthyFoods.push(new Milk(this.game, bloodCell));
                break;
            default: console.log('without food');
        }
    }
}

export class Level3 extends Level2{
    constructor(game){
        super(game);
    }
    enter(){
        super.enter();
        this.game.speed = 8;
        this.game.maxTime = 1 * 60 * 1000;
        this.game.pathogenInterval = 500;
    }
    addHealthyFood() {
        var bloodCell = new BloodCell(this.game);
        this.game.bloodCells.push(bloodCell);
        var foodChoice = Math.floor((Math.random() * 14)) + 1;
        switch (foodChoice) {
            case 2:
                this.game.healthyFoods.push(new Orange(this.game, bloodCell));
                break;
            case 4:
                this.game.healthyFoods.push(new Banana(this.game, bloodCell));
                break;
            case 5:
                this.game.healthyFoods.push(new Amla(this.game, bloodCell));
                break;
            case 6:
                this.game.healthyFoods.push(new Almond(this.game, bloodCell));
                break;
            case 8:
                this.game.healthyFoods.push(new Cashew(this.game, bloodCell));
                break;
            default: console.log('without food');
        }
    }
}

export class Level4 extends Level3{
    constructor(game){
        super(game);
    }
    enter(){
        super.enter();
        this.game.speed = 10;
        this.game.maxTime = 1 * 60 * 1000;
        this.game.pathogenInterval = 300;
        this.game.healthyFoodInterval = 4*1000;
    }
    addHealthyFood() {
        var bloodCell = new BloodCell(this.game);
        this.game.bloodCells.push(bloodCell);
        var foodChoice = Math.floor((Math.random() * 14)) + 1;
        switch (foodChoice) {
            case 1:
                this.game.healthyFoods.push(new Lemon(this.game, bloodCell));
                break;
            case 2:
                this.game.healthyFoods.push(new Orange(this.game, bloodCell));
                break;
            case 3:
                this.game.healthyFoods.push(new Grapes(this.game, bloodCell));
                break;
            case 4:
                this.game.healthyFoods.push(new Banana(this.game, bloodCell));
                break;
            case 5:
                this.game.healthyFoods.push(new Amla(this.game, bloodCell));
                break;
            case 6:
                this.game.healthyFoods.push(new Almond(this.game, bloodCell));
                break;
            case 7:
                this.game.healthyFoods.push(new Beans(this.game, bloodCell));
                break;
            case 8:
                this.game.healthyFoods.push(new Cashew(this.game, bloodCell));
                break;
            case 9:
                this.game.healthyFoods.push(new Greenpeas(this.game, bloodCell));
                break;
            case 10:
                this.game.healthyFoods.push(new Groundnut(this.game, bloodCell));
                break;
            case 11:
                this.game.healthyFoods.push(new Tomato(this.game, bloodCell));
                break;
            case 12:
                this.game.healthyFoods.push(new Egg(this.game, bloodCell));
                break;
            case 13:
                this.game.healthyFoods.push(new Milk(this.game, bloodCell));
                break;
            case 14:
                this.game.healthyFoods.push(new GreenLeaf(this.game, bloodCell));
                break;
            default: console.log('without food');
        }
    }
}

export class Level5 extends Level4{
    constructor(game){
        super(game);
    }
    enter(){
        super.enter();
        this.game.speed = 10;
        this.game.maxTime = 1 * 60 * 1000;
        this.game.pathogenInterval = 300;
        this.game.healthyFoodInterval = 4*1000;
        this.game.unHealthyFoodInterval = 7*1000;
    }
}