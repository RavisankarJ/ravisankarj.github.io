class Layer{
    constructor(game,width, height, speedModifier, image, x, y){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x =x;
        this.y = y;
        // this.movable = true;
    }
    update(){
        // if(this.movable)
        if(this.x < -this.width) this.x = 0;
        else this.x -= 1 * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

class FisherMan extends Layer{
    constructor(game, w, h, sM, i, x, y){
        super(game, w, h, sM, i, x, y);
    }
    draw(context){
        console.log(this);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.fixBackImage = document.getElementById('fixedBackground');
        this.layer1image = document.getElementById('layer1');
        this.fishermanImage = document.getElementById('fisherman');
        this.layer1 = new Layer(this.game,2000*0.8, 471*0.6, 0.2, this.layer1image, 0, (this.game.height/1.5));
        this.fixLayer = new Layer(this.game, 720, 1280, 0, this.fixBackImage, 0, 0);
        this.fisherMan = new FisherMan(this.game, 210*0.8, 300*0.8, 0, this.fishermanImage, 450, 140);
        this.backgroundLayers = [this.fixLayer, this.layer1, this.fisherMan];
1    }
    update(){
        this.backgroundLayers.forEach(layer =>{
            layer.update();
        });
    }
    draw(context){
        this.backgroundLayers.forEach(layer =>{
            layer.draw(context);
        });
    }
}

