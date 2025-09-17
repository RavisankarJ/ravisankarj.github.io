export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.mousePos = [];
        this.touchY = '';
        this.touchX = '';
        this.touchThreshold = this.game.height / 4;
        this.xTouchThreshold = 5;
        // this.canvas1 = document.getElementById('canvas1');
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
            } else if (e.key === 'z') this.game.nutrientButtons[3].usePower();
            else if (e.key === 'c') this.game.nutrientButtons[0].usePower();
            else if (e.key === 'e') this.game.nutrientButtons[1].usePower();
            else if (e.key === 'b') this.game.nutrientButtons[2].usePower();
            else if (e.key === "Escape") {
                if (document.fullscreenElement) this.exitfullScreen();
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

        this.game.canvas.addEventListener('click', evt => {
            if (this.isClicked(this.game.musicButton, evt)) {
                if (this.game.music.muted) {
                    this.game.music.muted = false;
                    this.game.musicButton.frameX = 0;
                }
                else {
                    this.game.music.muted = true;
                    this.game.musicButton.frameX = 1;
                }
            }
            if (this.isClicked(this.game.fullscreenButton, evt)) {
                if (!document.fullscreenElement) this.enterfullScreen();
                else this.exitfullScreen();
            }
            if (this.isClicked(this.game.infoButton, evt)) {
                this.game.gamePause = true;
                document.getElementById('infoContainers').style.display = "flex";
            }
            this.game.nutrientButtons.forEach((button, i) => {
                if (this.isClicked(button, evt)) button.usePower();
            });
        }, false);

        this.game.canvas.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
        });

        this.game.canvas.addEventListener('touchmove', e => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
            if (swipeDistanceY < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
            // else if (swipeDistanceY > this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
            //     this.keys.push('swipe down');
            //     if (this.game.gameOver || this.game.gameStart) this.game.restart();
            // }
            if (swipeDistanceX < -this.xTouchThreshold && this.keys.indexOf('swipe left') === -1) {
                this.keys.push('swipe left');
            }
            else if (swipeDistanceX > this.xTouchThreshold && this.keys.indexOf('swipe right') === -1) {
                if (this.game.gameOver || this.game.gameStart) this.game.restart();
                else this.keys.push('swipe right')
            }
        });

        this.game.canvas.addEventListener('touchend', e => {
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe right'), 1);
            this.keys.splice(this.keys.indexOf('swipe left'), 1);
        });
    }
    isClicked(button, evt) {
        var rect = this.game.canvas.getBoundingClientRect();
        var mbutton = {
            width: button.width * rect.width / this.game.width,
            height: button.width * rect.width / this.game.width,
            // height: button.height * rect.height / this.game.height,
            x: button.x * rect.width / this.game.width,
            y: button.y * rect.width / this.game.width
            // y: button.y * rect.height / this.game.height
        }
        if (!document.fullscreenElement) {
            if (evt.offsetX > mbutton.x && evt.offsetX < mbutton.x + mbutton.width && evt.offsetY < mbutton.y + mbutton.height && evt.offsetY > mbutton.y)
                return true;
            else false;
        }
        else {
            var offsetheight = (rect.height - (rect.width/2.6))/2
            if (evt.offsetX > mbutton.x && evt.offsetX < mbutton.x + mbutton.width && evt.offsetY - offsetheight < mbutton.y + mbutton.height && evt.offsetY - offsetheight > mbutton.y)
                return true;
            else false;
        }
    }
    enterfullScreen() {
        // this.game.canvas.requestFullscreen().catch(err => {
        //     alert(`Can't enable fullscreen mode. The error message is ${err.message}`)
        // });
        document.getElementById('gameDiv').requestFullscreen().catch(err => {
            alert(`Can't enable fullscreen mode. The error message is ${err.message}`);
        });
        // this.game.fullscreenButton.y = this.game.height - this.game.fullscreenButton.height - 5;
        this.game.fullscreenButton.frameX = 1;
        this.game.background.update();
        // this.game.fullscreenButton.update();
        this.game.draw(this.game.ctx);
    }
    exitfullScreen() {
        document.exitFullscreen();
        // this.game.fullscreenButton.y = this.game.height - this.game.fullscreenButton.height - 5;
        this.game.fullscreenButton.frameX = 0;
        this.game.background.update();
        // this.game.fullscreenButton.update();
        this.game.draw(this.gIame.ctx);
    }
}