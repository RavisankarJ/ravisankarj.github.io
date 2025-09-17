export class FloatingPoint{
    constructor(game, bubble, paddingIndex){
        this.game = game;
        this.bubble = bubble;
        this.x = bubble.x;
        this.y = bubble.y;
        this.width = 20;
        this.height =20;
        this.targetX = (this.game.width/3)-20;
        this.targetY = 100-194/7;
        this.markedForDeletion = false;
        this.timer = 0;
        this.paddingIndex = paddingIndex;
        this.audio = new Audio('assets/points.ogg');
        this.audio.volume = 0.3;
        this.audio.play();
        // console.log('i am constructed');
    }
    update(){
        this.x += (this.targetX - this.x)*0.03*this.paddingIndex;
        this.y += (this.targetY - this.y)*0.03*this.paddingIndex;
        this.timer++;
        if(this.timer > 100) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(FloatingPoint.floatingImage.coin, this.x, this.y, this.width, this.height);
    }
    static floatingImage = {
        coin : document.getElementById('coin')
    }
}


export class FloatingMessage{
    constructor(value, x, y, targetX, targetY){
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
    }
    update(){
        this.x += (this.targetX - this.x)*0.03;
        this.y += (this.targetY - this.y)*0.03;
        this.timer++;
        if(this.timer > 80) this.markedForDeletion = true;
    }
    draw(context){
        context.font = '26px Garamond';
        context.fillStyle = 'black';
        context.fillText(this.value, this.x+2, this.y+2);
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
    }
}