export class MusicIcon {
    constructor(game) {
        this.game = game;
        this.icon = document.getElementById('musicButton');
        this.width = 45;
        this.height = 45;
        this.x = game.width - this.width - 5;
        this.y = 5;
        this.frameX = 0;
    }
    draw(context) {
        context.drawImage(this.icon, this.width * this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

class Nutrients {
    constructor(game) {
        this.game = game;
        this.width = 45;
        this.height = 45;
        this.y = 5;
        this.frameX = 0;
        this.points = 0;
        this.padding = 5;
    }
    draw(context) {
        context.drawImage(this.icon, this.x, this.y, this.width, this.height);
        context.save();
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = 'white';
        context.shadowBlur = 1;
        context.font = '20px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText(this.points, this.x + this.width/2, this.y + this.height+15);
        context.restore();
    }
}

export class VitaminC extends Nutrients {
    constructor(game) {
        super(game);
        this.icon = document.getElementById('vitaminc');
        this.x = game.width - this.width - 55 - this.padding;
    }
}

export class VitaminE extends Nutrients {
    constructor(game) {
        super(game);
        this.icon = document.getElementById('vitamine');
        this.x = game.width - this.width - 110 - this.padding;
    }
}

export class VitaminB6 extends Nutrients {
    constructor(game) {
        super(game);
        this.icon = document.getElementById('vitaminb6');
        this.x = game.width - this.width - 165 - this.padding;
    }
}

export class Zinc extends Nutrients {
    constructor(game) {
        super(game);
        this.icon = document.getElementById('zinc');
        this.x = game.width - this.width - 220 - this.padding;
    }
}