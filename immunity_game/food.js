
class Food {
    constructor(game, bloodCell) {
        this.game = game;
        this.bloodCell = bloodCell;
        this.x = bloodCell.x;
        this.y = bloodCell.y;
        this.markedForDeletion = false;
    }
    update() {
        this.x = this.bloodCell.x;
        this.y = this.bloodCell.y;
        if (this.x + this.width < 0) {
            this.bloodCell.markedForDeletion = true;
            this.markedForDeletion = true;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


class Healthy extends Food {
    constructor(game, bloodCell) {
        super(game, bloodCell);
    }
}

class UnHealthy extends Food {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.audio = new Audio('gameNegative.ogg');
        this.audio.volume = 0.5;
    }
    update(){
        super.update();
        this.bloodCell.x--;
    }
}

export class Lemon extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('lemon');
        this.width = 91;
        this.height = 70;
        // this.nutrient = game.nutrientButtons[nutrients.VITAMINC];
        this.nutrients = {
            vitaminC: 5,
            vitaminE: 0,
            vitaminB6: 1,
            zinc: 0
        };
    }
}

export class Orange extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('orange');
        this.width = 90;
        this.height = 88;
        // this.nutrient = game.nutrientButtons[nutrients.VITAMINE];
        this.nutrients = {
            vitaminC: 10,
            vitaminE: 0,
            vitaminB6: 4,
            zinc: 0
        };
    }
}

export class Grapes extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('grapes');
        this.width = 90 * 0.5;
        this.height = 128 * 0.5;

        this.nutrients = {
            vitaminC: 5,
            vitaminE: 0,
            vitaminB6: 3,
            zinc: 0
        };
    }
    update() {
        super.update();
        this.x = this.bloodCell.x + this.bloodCell.width / 2;
        this.y = this.bloodCell.y - this.height / 2;
    }
}

export class Banana extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('banana');
        this.width = 90;
        this.height = 60;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 4,
            vitaminE: 0,
            vitaminB6: 10,
            zinc: 0
        };
    }
}

export class Amla extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('amla');
        this.width = 90;
        this.height = 60;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 20,
            vitaminE: 10,
            vitaminB6: 0,
            zinc: 0
        };
    }
}

export class Almond extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('almond');
        this.width = 90;
        this.height = 55;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 1,
            vitaminE: 20,
            vitaminB6: 2,
            zinc: 0
        };
    }
}

export class Cashew extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('cashew');
        this.width = 70;
        this.height = 60;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 1,
            vitaminE: 0,
            vitaminB6: 5,
            zinc: 15
        };
    }
}

export class Egg extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('egg');
        this.width = 90;
        this.height = 60;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 1,
            vitaminE: 5,
            vitaminB6: 10,
            zinc: 5
        };
    }
}

export class Greenpeas extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('greenpeas');
        this.width = 90;
        this.height = 61;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 5,
            vitaminE: 5,
            vitaminB6: 3,
            zinc: 5
        };
    }
}

export class Groundnut extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('groundnut');
        this.width = 86;
        this.height = 41;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 0,
            vitaminE: 10,
            vitaminB6: 5,
            zinc: 5
        };
    }
}

export class Milk extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('milk');
        this.width = 68;
        this.height = 100;

        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 0,
            vitaminE: 0,
            vitaminB6: 5,
            zinc: 10
        };
    }
    update() {
        super.update();
        this.x = this.bloodCell.x + this.bloodCell.width / 3;
        this.y = this.bloodCell.y - this.height * 0.8;
    }
}

export class Beans extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('bean');
        this.width = 90;
        this.height = 53;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 5,
            vitaminE: 0,
            vitaminB6: 5,
            zinc: 5
        };
    }
}

export class Tomato extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('tomato');
        this.width = 90 * 0.6;
        this.height = 97 * 0.6;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 10,
            vitaminE: 0,
            vitaminB6: 0,
            zinc: 0
        };
    }
    update() {
        super.update();
        this.x = this.bloodCell.x + this.bloodCell.width * 0.3;
        this.y = this.bloodCell.y - this.height * 0.3;
    }
}

export class GreenLeaf extends Healthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('greenleaf');
        this.width = 78;
        this.height = 101;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 10,
            vitaminE: 5,
            vitaminB6: 0,
            zinc: 5
        };
    }
    update() {
        super.update();
        this.y = this.bloodCell.y - this.height * 0.3;
    }
}

export class Chips extends UnHealthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('chips');
        this.width = 110 * 0.9;
        this.height = 55 * 0.9;
        this.healthImpact = 15;
    }
}

export class FingerChips extends UnHealthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('fingerchips');
        this.width = 90 * 0.9;
        this.height = 118 * 0.9;
        this.healthImpact = 8;
    }
    update() {
        super.update();
        this.y = this.bloodCell.y - this.height * 0.7;
    }
}

export class ChipsRoll extends UnHealthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('chipsroll');
        this.width = 115 * 0.8;
        this.height = 75 * 0.8;
        this.healthImpact = 10;
    }
}

export class Donut extends UnHealthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('donut');
        this.width = 106;
        this.height = 64;
        this.healthImpact = 12;
    }
}

export class Pizza extends UnHealthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('pizza');
        this.width = 116 * 0.8;
        this.height = 67 * 0.8;
        this.healthImpact = 15;
    }
}

export class CoolDrinks extends UnHealthy {
    constructor(game, bloodCell) {
        super(game, bloodCell);
        this.image = document.getElementById('cooldrinks');
        this.width = 65 * 0.9;
        this.height = 143 * 0.9;
        this.healthImpact = 15;
    }
    update() {
        super.update();
        this.y = this.bloodCell.y - this.height * 0.8;
    }
}