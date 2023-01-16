export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 1.5;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score, 20, 50);
        //game time
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + Math.floor(this.game.time/1000), 20, 80);
        //game start message
        if(this.game.gameStart){
            context.textAlign = 'center';
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText('ENTER / Swipe down to start', this.game.width * 0.5, (this.game.height * 0.5)+30);
        }
        //game over message
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > 5)
                context.fillText('You win!', this.game.width * 0.5, this.game.height * 0.5);
            else
            context.fillText('You lose :-(', this.game.width * 0.5, this.game.height * 0.5);
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText('ENTER / Swipe down to restart', this.game.width * 0.5, (this.game.height * 0.5)+30);
        }
        context.restore();
    }
}