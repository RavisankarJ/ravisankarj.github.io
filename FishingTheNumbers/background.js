import { Plant, Plant1 } from "./backgroundObjects.js";
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
    constructor(game, w, h, sM, i, x, y, sw, sh){
        super(game, w, h, sM, i, x, y);
        this.frameX=0;
        this.maxFrame = 1;
        this.fps = 5;
        this.swidth = sw;
        this.sheight = sh;
        this.frameTimer=0;
        this.frameInterval = 1000 / this.fps;
    }
    update(deltaTime){
        // if (this.frameTimer > this.frameInterval) {
        //     this.frameTimer = 0;
        //     if (this.frameX < this.maxFrame) this.frameX++;
        //     else {
        //         this.frameX = 0;
        //         // if(this.frameY < this.maxFrameY) this.frameY++;
        //         // else this.frameY = 0;
        //     }
        // } else this.frameTimer += deltaTime;
        if(this.game.hook.isGoingToFish) this.frameX=1;
        else this.frameX = 0;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.swidth, 0, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}

{
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
}

export class Background{
    constructor(game, bgset){
        this.game = game;
        this.layers = [];
        this.plants = [];
        bgset.layers.forEach(layer => {
            this.layers.push(new Layer(this.game, layer.width, layer.height, layer.speedModifier, layer.image, layer.x, layer.y));
        });
        bgset.plants.forEach(plant => {
            this.plants.push(new Plant(this.game,plant.x, plant.y, plant.width, plant.height, plant.image, plant.mxFrame, plant.dwidth, plant.dheight));
            // this.plants.push(new Plant(this.game));
        });
        // this.fishermanImage = document.getElementById('fisherman');
        // this.fisherMan = new FisherMan(this.game, 210*0.8, 300*0.8, 0, this.fishermanImage, 450, 140);
        this.fixLayer = new Layer(this.game, bgset.fixLayer.width, bgset.fixLayer.height, bgset.fixLayer.speedModifier, bgset.fixLayer.image, bgset.fixLayer.x, bgset.fixLayer.y);
        this.fisherManDetails = bgset.fisherMan;

        this.fisherMan = new FisherMan(this.game, this.fisherManDetails.dwidth, this.fisherManDetails.dheight, 0, this.fisherManDetails.image, this.fisherManDetails.x, this.fisherManDetails.y, this.fisherManDetails.swidth, this.fisherManDetails.sheight);
        
        this.backgroundLayers = [this.fixLayer, ...this.layers, ...this.plants, this.fisherMan];
        this.fishSwimHeight = bgset.fishSwimHeight;
        this.waveHeight = bgset.waveHeight;
        this.splashPoint = bgset.splashPoint;
        this.mousePos = bgset.mousePos;
        this.hookPos = bgset.hookPos;
        this.boatPos = bgset.boatPos;
        this.wateryLayer = bgset.wateryLayer;
        // if(bgset.wateryLayer) this.wateryLayer = bgset.wateryLayer;
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
        swidth: 210,
        sheight: 300,
        dwidth: 210*0.8,
        dheight: 300*0.8,
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
            height: 200,
            width: 150,
            
            x: 560,
            y:0.97,
            image: 'plant5',
            mxFrame: 1
        },
        {
            height: 73,
            width: 270,
            x: 450,
            y:1,
            image: 'plant1',
            mxFrame: 1
        },
        {
            height: 200,
            width: 75,
            x: 340,
            y:1,
            image: 'plant7',
            mxFrame: 1
        },
        {
            height: 200,
            width: 75,
            dheight:200/1.2,
            dwidth: 75/1.2,
            x: 300,
            y:1,
            image: 'plant7',
            mxFrame: 1
        },
        {
            height: 200,
            width: 75,
            dheight:200/1.5,
            dwidth: 75/1.5,
            x: 380,
            y:0.99,
            image: 'plant7',
            mxFrame: 1
        },
        {
            height: 200,
            width: 150,
            dheight:200/1.5,
            dwidth: 150/1.5,
            x: 480,
            y:0.99,
            image: 'plant5',
            mxFrame: 1
        },
        
        {
            height: 200,
            width: 150,
            dheight:200/1.5,
            dwidth: 150/1.5,
            x: 520,
            y:0.93,
            image: 'plant5',
            mxFrame: 1
        },
        {
            height: 100,
            width: 100,
            dheight: 50,
            dwidth: 50,
            x: 160,
            y:0.95,
            image: 'plant8',
            mxFrame: 1
        },
        {
            height: 100,
            width: 100,
            // dheight: 75,
            // dwidth: 75,
            x: 50,
            y:0.93,
            image: 'plant8',
            mxFrame: 1
        },
        {
            height: 120,
            width: 200,
            x: 0,
            y:1,
            image: 'grass1',
            mxFrame: 2
        }
    ],
    
    fishSwimHeight: {max: 450, min: Background.canvasSize.height-550},
    waveHeight: {max: 402, min: Background.canvasSize.height-850},
    splashPoint: {hookY: 400, splashY: 310},
    mousePos : {x: 300, y: 200},
    hookPos : {x: 300, y: 200},
    boatPos : {x: 450, y: 144},
    wateryLayer: 'wateryLayer1'
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
        swidth: 210,
        sheight: 300,
        dwidth: 210*0.8,
        dheight: 300*0.8,
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
            height: 200,
            width: 150,
            x: 20,
            y:1,
            image: 'plant5',
            mxFrame: 1
        },
        {
            height: 200,
            width: 100,
            x: 100,
            y:1,
            image: 'plant3',
            mxFrame: 2
        },
        {
            height: 200,
            width: 100,
            dheight: 200/1.8,
            dwidth: 100/1.8,
            x: 170,
            y:1.05,
            image: 'plant3',
            mxFrame: 2
        },
        {
            height: 200,
            width: 150,
            dheight: 200/1.3,
            dwidth: 150/1.3,
            x: 240,
            y:1.02,
            image: 'plant5',
            mxFrame: 1
        },
        {
            height: 188,
            width: 94,
            x: 400,
            y:1,
            image: 'plant2',
            mxFrame: 1
        },
        
        {
            height: 188,
            width: 94,
            dheight: 188/2,
            dwidth:94/2,
            x: 590,
            y:1.06,
            image: 'plant2',
            mxFrame: 1
        },
        {
            height: 188,
            width: 94,
            dheight: 188/2,
            dwidth:94/2,
            x: 550,
            y:1.04,
            image: 'plant2',
            mxFrame: 1
        },
        {
            height: 188,
            width: 94,
            dheight: 188/2,
            dwidth:94/2,
            x: 620,
            y:1.05,
            image: 'plant2',
            mxFrame: 1
        },
        
    ],
    fishSwimHeight: {max: 550, min: Background.canvasSize.height-620},
    waveHeight: {max: 560, min: Background.canvasSize.height-870},
    splashPoint: {hookY: 540, splashY: 465},
    mousePos : {x: 164, y: 303},
    hookPos : {x: 164, y: 303},
    boatPos : {x: 310, y: 247},
    wateryLayer: 'wateryLayer2'
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
        swidth: 458,
        sheight: 533,
        dwidth: 458*0.5,
        dheight: 533*0.5,
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
            height: 200,
            width: 100,
            x: 220,
            y:1,
            image: 'plant4',
            mxFrame: 2
        },
        {
            height: 167,
            width: 250/3,
            x: 400,
            y:1,
            image: 'plant6',
            mxFrame: 2
        },
        {
            height: 167,
            width: 250/3,
            dheight: 167/2,
            dwidth: 250/6,
            x: 600,
            y:1.02,
            image: 'plant6',
            mxFrame: 2
        },
        {
            height: 200,
            width: 100,
            dheight: 100,
            dwidth: 50,
            x: 150,
            y:1.05,
            image: 'plant4',
            mxFrame: 2
        },
        {
            height: 200,
            width: 100,
            dheight: 50,
            dwidth: 25,
            x: 120,
            y:1.05,
            image: 'plant4',
            mxFrame: 2
        },
        {
            height: 200,
            width: 100,
            dheight: 50,
            dwidth: 25,
            x: 520,
            y:1.08,
            image: 'plant4',
            mxFrame: 2
        },
        {
            height: 200,
            width: 100,
            // dheight: 50,
            // dwidth: 25,
            x: 20,
            y:1,
            image: 'plant9',
            mxFrame: 2
        },
        {
            height: 200,
            width: 100,
            dheight: 100,
            dwidth: 50,
            x: 550,
            y:1.05,
            image: 'plant9',
            mxFrame: 2
        }
    ],
    fishSwimHeight: {max: 600, min: Background.canvasSize.height-750},
    waveHeight: {max: 585, min: Background.canvasSize.height-850},
    splashPoint: {hookY: 585, splashY: 505},
    mousePos : {x: 450, y: 50},
    hookPos : {x: 450, y: 50},
    boatPos : {x: 430, y: 100},
    wateryLayer: 'wateryLayer3'
}
