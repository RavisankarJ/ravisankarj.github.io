export class Level1 {
    constructor(game) {
        this.game = game;
    }
    enter(){
        this.game.speed = 3;
        this.game.pathogeInterval = 1000;
        this.game.maxTime = 1 * 10 * 1000;
        this.game.player.jumpingCapacity = 23;
        // this.game.player.jumpingCapacity = 35;
    }
}

export class Level2 extends Level1{
    constructor(game){
        super(game);
    }
    enter(){
        super.enter();
        this.game.speed = 6;
        this.game.maxTime = 1 * 10 * 1000;
        // this.game.player.sizeModifier = 1;
    }
}

export class Level3 extends Level2{
    constructor(game){
        super(game);
    }
    enter(){
        super.enter();
        this.game.speed = 8;
        this.game.maxTime = 1 * 10 * 1000;
        this.game.pathogenInterval = 500;
    }
}

export class Level4 extends Level3{
    constructor(game){
        super(game);
    }
    enter(){
        super.enter();
        this.game.speed = 8;
        this.game.maxTime = 1 * 10 * 1000;
        this.game.pathogenInterval = 300;
    }
}