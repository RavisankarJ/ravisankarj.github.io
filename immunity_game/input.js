export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.mousePos = [];
        this.touchY = '';
        this.touchX = '';
        this.touchThreshold = this.game.height/4;
        this.xTouchThreshold = 10;
        this.canvas1 = document.getElementById('canvas1');
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight'
            ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            } else if (e.key === 'Enter' && (game.gameOver || game.gameStart)) {
                this.game.restart();
            }

        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight'
            ) {
                this.keys.splice(this.keys.indexOf(e.key, 1));

            }
        });
        this.canvas1.addEventListener('click', evt => {
            var rect = canvas1.getBoundingClientRect();
            var mbutton = {
                width: rect.width * 45 / this.game.width,
                height: rect.height * 45 / this.game.height,
                x: rect.width - rect.width * 45 / this.game.width - 5 * 45 / this.game.width,
                y: 5 * 45 / this.game.height,
            }

            if (evt.offsetX > mbutton.x && evt.offsetX < mbutton.x + mbutton.width && evt.offsetY < mbutton.y + mbutton.height && evt.offsetY > mbutton.y) {
                if (this.game.music.muted) {
                    this.game.music.muted = false;
                    this.game.musicButton.frameX = 0;
                }
                else {
                    this.game.music.muted = true;
                    this.game.musicButton.frameX = 1;
                }

            }
        }, false);

        this.canvas1.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
        });

        this.canvas1.addEventListener('touchmove', e => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
            if (swipeDistanceY < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
            else if (swipeDistanceY > this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
                this.keys.push('swipe down');
                if(this.game.gameOver || this.game.gameStart) this.game.restart();
            }
            if (swipeDistanceX < -this.xTouchThreshold && this.keys.indexOf('swipe left') === -1) this.keys.push('swipe left');
            else if (swipeDistanceX > this.xTouchThreshold && this.keys.indexOf('swipe right') === -1) {
                this.keys.push('swipe right');
            }
        });

        this.canvas1.addEventListener('touchend', e => {
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
        });
    }
}