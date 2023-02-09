import { BlastAnimation } from "./collisionAnimation.js";
import { Wall } from "./wall.js";

export class MusicIcon {
    constructor(game) {
        this.game = game;
        this.icon = document.getElementById('musicButton');
        this.width = 50;
        this.height = 50;
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
        this.x = game.width - this.width - 5;
        this.y = 65;
        this.frameX = 0;
    }
    draw(context) {
        context.drawImage(this.icon, this.width * this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class FullscreenIcon {
    constructor(game) {
        this.game = game;
        this.icon = document.getElementById('fullscreen');
        this.width = 50;
        this.height = 50;
        this.x = game.width - this.width - 5;
        this.y = game.height - this.height - 5;
        this.frameX = 0;
    }
    update() {
        if (!document.fullscreenElement) this.frameX = 0;
        else this.frameX = 1;
    }
    draw(context) {
        context.drawImage(this.icon, this.width * this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
//Vitamin C makes bigger
//vitamin E makes jump higher
//vitamin b6 makes antibody bomb
//zinc improves player health

class Nutrients {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.y = 5;
        this.frameX = 0;
        this.points = 0;
        this.padding = 1.5;
        this.fontFamily = 'Arial';
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
        context.fillText(this.points, this.x + this.width / 2, this.y + this.height + 15);
        context.restore();
    }
}

export class VitaminC extends Nutrients {
    constructor(game) {
        super(game);
        this.icon = document.getElementById('vitaminc');
        // this.icon.className += " greyscale";
        this.x = game.width - (this.width * 2 * this.padding);
        // this.nutrientType = NutrientTypes.VITAMINC;
        this.powerPoint = 20;
    }
    usePower() {
        if (this.points >= this.powerPoint) {
            this.points -= this.powerPoint;
            this.game.player.powerSize += this.powerPoint / 10;
            this.game.player.powerSizeTimer = this.powerPoint * 1000 / 2;
        } else
            if (this.points > 0) {
                this.game.player.powerSize += this.points / 10;
                this.game.player.powerSizeTimer = this.points * 1000 / 2;
                this.points -= this.points;
            }
    }
}

export class VitaminE extends Nutrients {
    constructor(game) {
        super(game);
        this.icon = document.getElementById('vitamine');
        this.x = game.width - (this.width * 3 * this.padding);
        // this.nutrientType = NutrientTypes.VITAMINE;
        this.powerPoint = 15;
    }
    usePower() {
        if (this.points >= this.powerPoint) {
            this.points -= this.powerPoint;
            this.game.blasts.push(new BlastAnimation(this.game, this.game.player.x + this.game.player.width / 2, this.game.player.y + this.game.player.height / 2, this.game.player.width * this.powerPoint / 3, this.game.player.height * this.powerPoint / 3));
        } else
            if (this.points > 0) {
                this.game.blasts.push(new BlastAnimation(this.game, this.game.player.x + this.game.player.width / 2, this.game.player.y + this.game.player.height / 2, this.game.player.width * this.points / 3, this.game.player.height * this.points / 3));
                this.points -= this.points;
            }
    }
}

export class VitaminB6 extends Nutrients {
    constructor(game) {
        super(game);
        this.icon = document.getElementById('vitaminb6');
        this.x = game.width - (this.width * 4 * this.padding);
        // this.nutrientType = NutrientTypes.VITAMINB6;
        this.powerPoint = 10;
    }
    usePower() {
        if (this.points >= this.powerPoint) {
            this.points -= this.powerPoint;
            this.game.walls.push(new Wall(this.game, this.game.player.x, this.game.height, this.powerPoint * 1000));
        } else
            if (this.points > 0) {
                this.game.walls.push(new Wall(this.game, this.game.player.x, this.game.height * this.points / this.powerPoint, this.points * 1000));
                this.points -= this.points;
            }
    }
}

export class Zinc extends Nutrients {
    constructor(game) {
        super(game);
        this.icon = document.getElementById('zinc');
        this.x = game.width - (this.width * 5 * this.padding);
        // this.nutrientType = NutrientTypes.ZINC;
        this.powerPoint = 4;
    }
    usePower() {
        if (this.points >= this.powerPoint) {
            this.points -= this.powerPoint;
            this.game.player.health += this.powerPoint * 10;
        } else
            if (this.points > 0) {
                this.game.player.health += this.points * 10;
                this.points -= this.points;
            }
        if (this.game.player.health > 100) this.game.player.health = 100;
    }
}