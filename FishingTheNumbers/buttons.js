export class MusicIcon {
    constructor(game) {
        this.game = game;
        this.icon = document.getElementById('musicButton');
        this.width = 50;
        this.height = 50;
        this.radius = 30;
        this.x = game.width - this.width - 5;
        this.y = 5;
        this.frameX = 0;
    }
    draw(context) {
        context.drawImage(this.icon, this.width * this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class InfoButton {
    constructor(game) {
        this.game = game;
        this.icon = document.getElementById('infoButton');
        this.width = 50;
        this.height = 50;
        // this.x = game.width - (this.width * 6 * 1.5);
        this.x = game.width - this.width - 65;
        this.y = 5;
        this.frameX = 0;
    }
    draw(context) {
        context.drawImage(this.icon, this.width * this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class HomeButton {
    constructor(game) {
        this.game = game;
        this.icon = document.getElementById('homeButton');
        this.width = 50;
        this.height = 50;
        // this.x = game.width - (this.width * 6 * 1.5);
        this.x = game.width - this.width - 125;
        this.y = 5;
        this.frameX = 0;
    }
    draw(context) {
        context.drawImage(this.icon, 0, 0, this.width, this.height, this.x, this.y, 50, 50);
    }
}


export class QuestionBox {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.frameX = 0;
    }
    draw(context) {
        // context.drawImage(this.icon, this.x, this.y, this.width, this.height);
        context.rect(this.x, this.y, this.width, this.height);
    }
}

export class LevelButton {
    constructor(game, x, y, lvlIdx, desc) {
        this.game = game;
        this.icon = document.getElementById('levelIcon2');
        this.width = 150;
        this.height = 150;
        this.x = x;
        this.y = y;
        this.frameX = 0;
        this.levelNumber = lvlIdx;
        this.description = desc;
        this.radius = 75;
    }
    draw(context) {
        context.drawImage(this.icon, 0, 0, 640, 604, this.x, this.y, this.width, this.height);
        context.save();
        this.game.ctx.textBaseline = 'middle';
        this.game.ctx.textAlign = 'center';
        context.font = 'bold 36px Arial';
        context.fillStyle = '#3C0753';
        context.fillText('L'+this.levelNumber, this.x+75, this.y+100);
        context.font = 'bold 36px Arial';
        // this.game.ctx.textAlign = 'left';
        context.shadowOffsetX = 1.5;
        context.shadowOffsetY = 1.5;
        context.shadowColor = 'white';
        context.shadowBlur = 5;
        context.fillStyle = '#11235A';
        context.fillText(this.description, this.x+75, this.y+170);
        context.restore();
    }
}

export class ShellIcon {
    constructor(game) {
        this.game = game;
        this.icon = document.getElementById('shell');
        this.width = 50;
        this.height = 45;
        this.radius = 30;
        this.x = (this.game.width/3)-20;
        this.y = 100-194/7;
        
    }
    // draw(context) {
    //     context.drawImage(this.icon, this.width * this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    // }
}