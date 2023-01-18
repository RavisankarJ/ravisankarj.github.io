export class BloodCell{
    constructor(game){
        this.game = game;
        this.image = document.getElementById('redBlood');
        this.width = 150/1.5;
        this.height = 100/1.5;
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height - this.height);
        this.markedForDeletion = false;
    }
    update(){
        this.x--;
        if(this.x + this.width< 0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}