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

export class Background{
    constructor(game){
        this.game = game;
        
        // this.width = this.game.width;
        // this.height = this.game.height;
        this.fixBackImage = document.getElementById('fixedBackground');
        this.layer1image = document.getElementById('layer1');
        // this.layer2image = document.getElementById('layer2');
        // this.layer3image = document.getElementById('layer3');
        // this.layer4image = document.getElementById('layer4');
        // this.layer5image = document.getElementById('layer5');
        this.layer1 = new Layer(this.game,2000*0.8, 471*0.6, 0.2, this.layer1image, 0, (this.game.height/2));
        this.fixLayer = new Layer(this.game, 720, 1280, 0, this.fixBackImage, 0, 0);
        // this.layer2 = new Layer(this.game, this.width, this.height, 0.13, this.layer2image);
        // this.layer3 = new Layer(this.game, this.width, this.height, 0.17, this.layer3image);
        // this.layer4 = new Layer(this.game, this.width, this.height, 0.2, this.layer4image);
        // this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4];
        this.backgroundLayers = [this.fixLayer, this.layer1];
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