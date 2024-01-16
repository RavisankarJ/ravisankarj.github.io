export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Arial Black';
        this.infoIdx = 0;
        this.game.questionNumber = 10;
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 1.5;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = 'black';
        //level
        context.fillText('Level: ' + (this.game.currentLevel+1), this.game.canvas.width/3, 50);
        //score
        context.drawImage(document.getElementById('star'), 10, 30, 30, 30);
        context.fillText(': ' + this.game.score + ' / '+this.game.winningScore, 50, 50);
        // context.fillText('Health : ', 2, 100);
        
        this.game.levels[this.game.currentLevel].drawQuestion();
        context.restore();
        context.save();
        
        context.fillStyle = 'red';
        context.fillRect(35, 91, this.game.player.health*10, 10);
        context.fillStyle = 'black';
        context.lineWidth = 2;
        context.strokeRect(35, 90, 100, 13);
        context.drawImage(document.getElementById('heart'), 10, 80, 30, 30);
        context.restore();
    }
    showCreditInfo(idx) {
        var creditInfoContainer = document.getElementById('creditInfo');
        creditInfoContainer.style.display = "flex";
        this.infoIdx += idx;
        // var infos = document.getElementsByClassName('info');
        var creditTitle = document.getElementById('creditTitle');
        creditTitle.style.display = "none";
        var infos = document.querySelectorAll('#creditInfo .info');
        var dots = document.querySelectorAll('#creditInfo .dot');
        for (var i = 0; i < infos.length; i++)
            infos[i].style.display = "none";
        for (var i = 0; i < dots.length; i++)
            dots[i].className = dots[i].className.replace(" active", "");
        if (this.infoIdx > infos.length - 1) this.infoIdx = 0;
        if (this.infoIdx < 0) this.infoIdx = infos.length - 1;
        if (this.infoIdx != 0) creditTitle.style.display = "block";
        infos[this.infoIdx].style.display = "table";
        dots[this.infoIdx].className += " active";
    }
}