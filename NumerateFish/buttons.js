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

