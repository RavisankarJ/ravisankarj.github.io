
class Food{
    constructor(game, bloodCell){
        this.game = game;
        this.bloodCell = bloodCell;
        this.x = bloodCell.x;
        this.y = bloodCell.y;
        this.markedForDeletion = false;
    }
    update(){
        this.x = this.bloodCell.x;
        this.y = this.bloodCell.y;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


// class Fruit extends Healthy{
//     constructor(game, bloodCell){
//         super(game, bloodCell);
//     }
// }

export class Lemon extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('lemon');
        this.width = 91;
        this.height = 70;
        // this.nutrient = game.nutrientButtons[nutrients.VITAMINC];
        this.nutrients = {
            vitaminC: 5, 
            vitaminE: 2,
            vitaminB6: 0,
            zinc: 0
        };
    }
}

export class Orange extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('orange');
        this.width = 90;
        this.height = 88;
        // this.nutrient = game.nutrientButtons[nutrients.VITAMINE];
        this.nutrients = {
            vitaminC: 2, 
            vitaminE: 5,
            vitaminB6: 0,
            zinc: 0
        };
    }
}

export class Grapes extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('grapes');
        this.width = 90*0.7;
        this.height = 128*0.7;
        // this.nutrient = game.nutrientButtons[nutrients.VITAMINB6];
        this.nutrients = {
            vitaminC: 2, 
            vitaminE: 0,
            vitaminB6: 5,
            zinc: 0
        };
    }
}

export class Banana extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('banana');
        this.width = 90;
        this.height = 60;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 2, 
            vitaminE: 2,
            vitaminB6: 0,
            zinc: 5
        };
    }
}

export class Amla extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('amla');
        this.width = 90;
        this.height = 60;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 20, 
            vitaminE: 10,
            vitaminB6: 5,
            zinc: 5
        };
    }
}

export class Almond extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('almond');
        this.width = 90;
        this.height = 55;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 1, 
            vitaminE: 2,
            vitaminB6: 5,
            zinc: 10
        };
    }
}

export class Cashew extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('cashew');
        this.width = 70;
        this.height = 60;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 2, 
            vitaminE: 5,
            vitaminB6: 5,
            zinc: 8
        };
    }
}

export class Egg extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('egg');
        this.width = 90;
        this.height = 60;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 5, 
            vitaminE: 2,
            vitaminB6: 10,
            zinc: 10
        };
    }
}

export class Greenpeas extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('greenpeas');
        this.width = 90;
        this.height = 61;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 5, 
            vitaminE: 2,
            vitaminB6: 10,
            zinc: 10
        };
    }
}

export class Groundnut extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('groundnut');
        this.width = 86;
        this.height = 41;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 5, 
            vitaminE: 2,
            vitaminB6: 10,
            zinc: 10
        };
    }
}

export class Milk extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('milk');
        this.width = 68;
        this.height = 100;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 5, 
            vitaminE: 2,
            vitaminB6: 10,
            zinc: 10
        };
    }
}

export class Beans extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('bean');
        this.width = 90;
        this.height = 53;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 5, 
            vitaminE: 2,
            vitaminB6: 10,
            zinc: 10
        };
    }
}

export class Tomato extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('tomato');
        this.width = 90;
        this.height = 97;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: 5, 
            vitaminE: 2,
            vitaminB6: 10,
            zinc: 10
        };
    }
}

export class Noodles extends Food{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('noodles');
        this.width = 90;
        this.height = 97;
        // this.nutrient = game.nutrientButtons[nutrients.ZINC];
        this.nutrients = {
            vitaminC: -5, 
            vitaminE: -2,
            vitaminB6: -10,
            zinc: -10
        };
    }
}