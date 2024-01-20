import { Plant, Plant1 } from "./waterObjects.js";

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

// export class Background{
//     constructor(game){
//         this.game = game;
        
//         // this.width = this.game.width;
//         // this.height = this.game.height;
//         this.fixBackImage = document.getElementById('fixedBackground');
//         this.layer1image = document.getElementById('layer1');
//         // this.layer2image = document.getElementById('layer2');
//         // this.layer3image = document.getElementById('layer3');
//         // this.layer4image = document.getElementById('layer4');
//         // this.layer5image = document.getElementById('layer5');
//         this.layer1 = new Layer(this.game,2000*0.8, 471*0.6, 0.2, this.layer1image, 0, (this.game.height/2));
//         this.fixLayer = new Layer(this.game, 720, 1280, 0, this.fixBackImage, 0, 0);
//         // this.layer2 = new Layer(this.game, this.width, this.height, 0.13, this.layer2image);
//         // this.layer3 = new Layer(this.game, this.width, this.height, 0.17, this.layer3image);
//         // this.layer4 = new Layer(this.game, this.width, this.height, 0.2, this.layer4image);
//         // this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4];
//         this.backgroundLayers = [this.fixLayer, this.layer1];
// 1    }
//     update(){
//         this.backgroundLayers.forEach(layer =>{
//             layer.update();
//         });
//     }
//     draw(context){
//         this.backgroundLayers.forEach(layer =>{
//             layer.draw(context);
//         });
//     }
// }

export class Background{
    constructor(game, bgset){
        this.game = game;
        this.layers = [];
        this.plants = [];
        bgset.layers.forEach(layer => {
            this.layers.push(new Layer(this.game, layer.width, layer.height, layer.speedModifier, layer.image, layer.x, layer.y));
        });
        bgset.plants.forEach(plant => {
            this.plants.push(new Plant(this.game,plant.x, plant.y, plant.width, plant.height, plant.image, plant.mxFrame));
            // this.plants.push(new Plant(this.game));
        });
        // this.layer1 = new Layer(this.game,2000*0.8, 471*0.6, 0.2, this.layer1image, 0, (this.game.height/2));
        this.fixLayer = new Layer(this.game, bgset.fixLayer.width, bgset.fixLayer.height, bgset.fixLayer.speedModifier, bgset.fixLayer.image, bgset.fixLayer.x, bgset.fixLayer.y);
        this.backgroundLayers = [this.fixLayer, ...this.layers, ...this.plants];
1    }
    update(deltaTime){
        this.backgroundLayers.forEach(layer =>{
            layer.update(deltaTime);
        });
    }
    draw(context){
        this.backgroundLayers.forEach(layer =>{
            layer.draw(context);
        });
    }
    static canvasSize = {width: 720, height:1280}
}

export const BackgroundSet1 = {
    fixLayer : {
        image: document.getElementById('fixedBackground'),
        width: 720,
        height: 1280,
        x: 0,
        y: 0,
        speedModifier:0
    },
    layers: [
        {
            image: document.getElementById('layer1'),
            width: 2000*0.8,
            height: 471*0.6,
            x: 0,
            y: Background.canvasSize.height/2,
            speedModifier:0.2
        }
    ],
    plants: [
        {
            height: 120,
            width: 200,
            x: 0,
            y:1,
            image: 'grass1',
            mxFrame: 2
        },
        {
            height: 73,
            width: 270,
            x: 450,
            y:1,
            image: 'plant1',
            mxFrame: 1
        }
    ]
    
}
export const BackgroundSet2 = {
    fixLayer : {
        image: document.getElementById('fixedBackground2'),
        width: 720,
        height: 1280,
        x: 0,
        y: 0,
        speedModifier:0
    },
    layers: [
        {
            image: document.getElementById('layer1'),
            width: 2000*0.8,
            height: 471*0.6,
            x: 0,
            y: Background.canvasSize.height/2,
            speedModifier:0.2
        }
    ],
    plants: [
        {
            height: 73,
            width: 270,
            x: 450,
            y:1,
            image: 'plant1',
            mxFrame: 1
        }
    ]
}
export const BackgroundSet3 = {
    fixLayer : {
        image: document.getElementById('fixedBackground3'),
        width: 720,
        height: 1280,
        x: 0,
        y: 0,
        speedModifier:0
    },
    layers: [
        {
            image: document.getElementById('layer1'),
            width: 2000*0.8,
            height: 471*0.6,
            x: 0,
            y: Background.canvasSize.height/2,
            speedModifier:0.2
        }
    ],
    plants: [
        {
            height: 73,
            width: 270,
            x: 200,
            y:1,
            image: 'plant1',
            mxFrame: 1
        }
    ]
}
export const BackgroundSet4 = {
    fixLayer : {
        image: document.getElementById('fixedBackground4'),
        width: 720,
        height: 1280,
        x: 0,
        y: 0,
        speedModifier:0
    },
    layers: [
        {
            image: document.getElementById('layer1'),
            width: 2000*0.8,
            height: 471*0.6,
            x: 0,
            y: Background.canvasSize.height/2,
            speedModifier:0.2
        }
    ],
    plants: [
        {
            height: 73,
            width: 270,
            x: 200,
            y:1,
            image: 'plant1',
            mxFrame: 1
        }
    ]
}
