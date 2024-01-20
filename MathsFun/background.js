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

class FisherMan extends Layer{
    constructor(game, w, h, sM, i, x, y){
        super(game, w, h, sM, i, x, y);
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// export class Background{
//     constructor(game){
//         this.game = game;
//         this.fixBackImage = document.getElementById('fixedBackground');
//         this.layer1image = document.getElementById('layer1');
//         this.fishermanImage = document.getElementById('fisherman');
//         this.layer1 = new Layer(this.game,2000*0.8, 471*0.6, 0.2, this.layer1image, 0, (this.game.height/1.5));
//         this.fixLayer = new Layer(this.game, 720, 1280, 0, this.fixBackImage, 0, 0);
//         this.fisherMan = new FisherMan(this.game, 210*0.8, 300*0.8, 0, this.fishermanImage, 450, 140);
//         this.backgroundLayers = [this.fixLayer, this.layer1, this.fisherMan];
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
            this.plants.push(new Plant(this.game, plant.x, plant.y, plant.width, plant.height, plant.image, plant.mxFrame));
            // this.plants.push(new Plant(this.game));
        });
        // this.fishermanImage = document.getElementById('fisherman');
        // this.fisherMan = new FisherMan(this.game, 210*0.8, 300*0.8, 0, this.fishermanImage, 450, 140);
        this.fixLayer = new Layer(this.game, bgset.fixLayer.width, bgset.fixLayer.height, bgset.fixLayer.speedModifier, bgset.fixLayer.image, bgset.fixLayer.x, bgset.fixLayer.y);
        this.fisherManDetails = bgset.fisherMan;
        this.fisherMan = new FisherMan(this.game, this.fisherManDetails.width, this.fisherManDetails.height, 0, this.fisherManDetails.image, this.fisherManDetails.x, this.fisherManDetails.y);
        this.backgroundLayers = [this.fixLayer, ...this.layers, ...this.plants, this.fisherMan];
        this.fishSwimHeight = bgset.fishSwimHeight;
        this.waveHeight = bgset.waveHeight;
        this.splashPoint = bgset.splashPoint;
        this.mousePos = bgset.mousePos;
        this.hookPos = bgset.hookPos;
        this.boatPos = bgset.boatPos;
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
    fisherMan: {
        width: 210*0.8,
        height: 300*0.8,
        x: 450,
        y: 140,
        image: document.getElementById('fisherman1')
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
    ],
    
    fishSwimHeight: {max: 450, min: Background.canvasSize.height-500},
    waveHeight: {max: 402, min: Background.canvasSize.height-850},
    splashPoint: {hookY: 400, splashY: 310},
    mousePos : {x: 300, y: 200},
    hookPos : {x: 300, y: 200},
    boatPos : {x: 450, y: 144}

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
    fisherMan: {
        width: 210*0.8,
        height: 300*0.8,
        x: 150,
        y: 240,
        image: document.getElementById('fisherman')
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
    ],
    fishSwimHeight: {max: 550, min: Background.canvasSize.height-450},
    waveHeight: {max: 540, min: Background.canvasSize.height-850},
    splashPoint: {hookY: 540, splashY: 465},
    mousePos : {x: 164, y: 303},
    hookPos : {x: 164, y: 303},
    boatPos : {x: 314, y: 247}
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
    fisherMan: {
        width: 458*0.5,
        height: 533*0.5,
        x: 200,
        y: 90,
        image: document.getElementById('fishergirl')
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
    ],
    fishSwimHeight: {max: 600, min: Background.canvasSize.height-500},
    waveHeight: {max: 585, min: Background.canvasSize.height-850},
    splashPoint: {hookY: 585, splashY: 505},
    mousePos : {x: 450, y: 50},
    hookPos : {x: 450, y: 50},
    boatPos : {x: 430, y: 100}
}
