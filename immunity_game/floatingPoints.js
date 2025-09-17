export class FloatingPoint{
    constructor(food, nutrientButton, paddingIndex){
        this.food = food;
        this.x = food.x;
        this.y = food.y;
        this.width = 20;
        this.height =20;
        this.targetX = nutrientButton.x;
        this.targetY = nutrientButton.y;
        this.markedForDeletion = false;
        this.timer = 0;
        this.paddingIndex = paddingIndex;
        this.audio = new Audio('points.ogg');
        this.audio.volume = 0.05;
        this.audio.play();
    }
    update(){
        this.x += (this.targetX - this.x)*0.03*this.paddingIndex;
        this.y += (this.targetY - this.y)*0.03*this.paddingIndex;
        this.timer++;
        if(this.timer > 100) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.food.image, this.x, this.y, this.width, this.height);
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
        context.font = '20px Garamond';
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = 'black';
        context.fillText(this.value, this.x+2, this.y+2);
    }
}