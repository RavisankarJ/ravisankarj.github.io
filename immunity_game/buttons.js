export class MusicIcon{
    constructor(game){
        this.game = game;
        this.icon = document.getElementById('musicButton');
        this.width = 45;
        this.height  = 45;
        this.x = game.width - this.width - 5;
        this.y = 5;
        this.frameX = 0;
    }
    draw(context){
        context.drawImage(this.icon, this.width*this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}