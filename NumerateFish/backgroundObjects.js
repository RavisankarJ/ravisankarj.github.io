class BackgroundObjects {
    constructor(game, moveable, modifySize, maxFrame, frameX = 0, frameY = 0) {
        this.game = game;
        this.frameX = frameX;
        this.frameY = frameY;
        // this.fps = 2;
        this.fps = Math.random()*2+2;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.modifySize = modifySize;
        this.markedForDeletion = false;
        this.modifySize ? this.sizeModifier = Math.random() * 3 + 0.5 : this.sizeModifier = 1;
        this.speedX = Math.random()*2+1;
        this.speedY = Math.random()*2+1;
        this.maxFrame = maxFrame;
        this.moveable = moveable;
    }
    update(deltaTime) {
        if(this.moveable){
            this.x -= this.speedX;
            // this.y -= this.speedY;
        }
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //check if off screen
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }
    draw(context) {
        
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width / this.sizeModifier, 0, this.width / this.sizeModifier, this.height / this.sizeModifier, this.x, this.y, this.width, this.height);
        
    }
}
// {
// export class Plant1 extends BackgroundObjects {
//     constructor(game) {
//         super(game, false, false, 1);
//         this.width = 270 * this.sizeModifier;
//         this.height = 73 * this.sizeModifier;
//         this.x = 0;
//         this.y = this.game.height - this.height;
//         this.image = document.getElementById('plant1');
//     }
//     update(deltaTime) {
//         super.update(deltaTime); 
//     }
// }}
export class Wave extends BackgroundObjects {
    constructor(game, imageID, width, height) {
        super(game, true, true, 0);
        this.width = width * this.sizeModifier;
        this.height = height * this.sizeModifier;
        this.x = game.width+2;
        this.y = Math.random()*(game.height-250)+250;
        this.image = document.getElementById(imageID);
    }   
}

export class Plant extends BackgroundObjects {
    constructor(game, x=0, y =1, w = 270, h=73, img = 'plant1', mxFrame = 1, dw=w, dh=h) {
        super(game, false, false, mxFrame);
        this.width = w * this.sizeModifier;
        this.height = h * this.sizeModifier;
        this.x = x;
        this.y = y*this.game.height - this.height;
        this.image = document.getElementById(img);
        this.dw = dw;
        this.dh = dh;
    }
    update(deltaTime) {
        super.update(deltaTime); 
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width / this.sizeModifier, 0, this.width / this.sizeModifier, this.height / this.sizeModifier, this.x, this.y, this.dw, this.dh);
        
    }
}

export class QuestionBackground{
    constructor(game){
        this.game = game;
        // this.x = this.game.width - 360;
        // this.y = 65;
        // this.twidth = 360;
        // this.width = 360;
        // this.height = 50;
        
        this.y = 105;
        this.twidth = 132/2;
        this.width = 132/2;
        this.height = 210/2;

        this.x = this.game.width - this.width;
        this.fps = 10;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.toggle = false;
        this.blinkInterval = 2000;
        this.blinkTimer = 0;
        this.i = 0;
        this.image = document.getElementById('arrow1');
        this.showSwitch = true;
        
    }
    update(deltaTime){
        
            // this.pushAndPullEffect(deltaTime);
            // this.blinkEffect(deltaTime);
            if(this.showSwitch)
                this.growAndShring(deltaTime);

       
    }
    draw(ctx){
        // ctx.fillStyle= '#DCFFB7';
        // ctx.fillRect(this.x, this.y, this.twidth, this.height);
        // ctx.drawImage(this.image, this.x, this.y);
        if(this.showSwitch)
            ctx.drawImage(this.image, this.x, this.y, this.twidth, this.height);
    }
    pushAndPullEffect(deltaTime){
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(!this.toggle && this.twidth > 10 ) {
                this.twidth /= 2;
                this.x = this.game.width - this.twidth;
            }
            else this.toggle = true;
            if(this.toggle && this.twidth<this.width) {
                this.twidth *=2;
                this.x = this.game.width - this.twidth;
            }
            else this.toggle = false; 
        } else {
        this.frameTimer += deltaTime;
        }
    }
    blinkEffect(deltaTime){
        if (this.blinkTimer > this.blinkInterval) {
            this.blinkTimer = 0;
            if(this.blinkInterval > 10 ) {
                this.twidth = this.i*this.width;
                this.blinkInterval /=2;
                (this.i === 1)?this.i=0:this.i=1;
                console.log(this.twidth);
            }
            else this.blinkInterval = 2000;
            
        }else this.blinkTimer+=deltaTime;
    }
    growAndShring(deltaTime){
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(!this.toggle && this.twidth > 10 ) {
                this.twidth /= 2;
                this.height /=2;
                this.x = this.game.width - this.twidth;
                this.y = 210-this.height;
                
            }
            else this.toggle = true;
            if(this.toggle && this.twidth<this.width) {
                this.twidth *=2;
                this.height *=2;
                this.x = this.game.width - this.twidth;
                this.y = 210-this.height;
            }
            else this.toggle = false; 
        } else {
        this.frameTimer += deltaTime;
        }
    }
}