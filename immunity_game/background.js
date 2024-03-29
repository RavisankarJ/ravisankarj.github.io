class Layer{
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update(){
        if(this.x < -this.game.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.game.width, this.game.height);
        context.drawImage(this.image, this.x + this.game.width, this.y, this.game.width, this.game.height);
    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.layer1image = document.getElementById('layer1');
        this.layer2image = document.getElementById('layer2');
        this.layer3image = document.getElementById('layer3');
        this.layer4image = document.getElementById('layer4');
        // this.layer5image = document.getElementById('layer5');
        this.layer1 = new Layer(this.game, this.width, this.height, 0.1, this.layer1image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.13, this.layer2image);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.17, this.layer3image);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.2, this.layer4image);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4];
        // this.backgroundLayers = [this.layer1];
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