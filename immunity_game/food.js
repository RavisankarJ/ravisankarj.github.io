
class Healthy{
    constructor(game, bloodCell){
        this.game = game;
        this.bloodCell = bloodCell;
        this.x = bloodCell.x;
        this.y = bloodCell.y;
        this.markedForDeletion = false;
        this.nutrient = game.nutrientButtons[0];
    }
}

class Fruit extends Healthy{
    constructor(game, bloodCell){
        super(game, bloodCell);
    }
}

export class Lemon extends Fruit{
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
    update(){
        this.x = this.bloodCell.x;
        this.y = this.bloodCell.y;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Orange extends Fruit{
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
    update(){
        this.x = this.bloodCell.x;
        this.y = this.bloodCell.y;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Grapes extends Fruit{
    constructor(game, bloodCell){
        super(game, bloodCell);
        this.image = document.getElementById('grapes');
        this.width = 90;
        this.height = 128;
        // this.nutrient = game.nutrientButtons[nutrients.VITAMINB6];
        this.nutrients = {
            vitaminC: 2, 
            vitaminE: 0,
            vitaminB6: 5,
            zinc: 0
        };
    }
    update(){
        this.x = this.bloodCell.x;
        this.y = this.bloodCell.y;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Banana extends Fruit{
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
    update(){
        this.x = this.bloodCell.x;
        this.y = this.bloodCell.y;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}