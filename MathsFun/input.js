import { CollisionAnimation } from "./CollisionAnimation.js";
import { Fish } from "./fishes.js";

export class InputHandler{
    constructor(game){
        this.game = game;
        this.mouse = {
            x: 300,
            y: 200,
            click: false
        }
        this.game.canvas.addEventListener('mousedown', evt => {
            var rect = this.game.canvas.getBoundingClientRect();
            var scaleX = this.game.canvas.width / rect.width;
            var scaleY = this.game.canvas.height / rect.height;
            this.mouse.click = true;
            var mouseOldPos = {x:0, y:0}
            mouseOldPos.x = this.mouse.x;
            mouseOldPos.y = this.mouse.y;
            this.mouse.x = (evt.clientX - rect.left)*scaleX;
            this.mouse.y = (evt.clientY - rect.top)*scaleY;
            
            if(this.mouse.y<(60*this.game.height/rect.height)) {
                this.mouse.x = mouseOldPos.x;
                this.mouse.y = mouseOldPos.y;
            }

            this.game.hook.isGoingToFish = true;
            this.game.hook.hookHasFish = false;
            // if(this.isClicked(this.game.hook, evt))
            // {
            //     // console.log('clicked on hook');
            //     if(this.game.hook.fishes.length>0)
            //     {
            //         var lastFish = this.game.hook.fishes.pop();
            //         this.game.fishSingle.play();
            //         this.game.collisions.push(new CollisionAnimation(this.game, lastFish));
            //         lastFish.markedForDeletion = true;
            //         Fish.resetFishes(this.game);
            //     }
                
            // }
            if(this.isClickedButton(this.game.musicButton, evt)){

                if (this.game.music.muted) {
                    this.game.music.muted = false;
                    this.game.musicButton.frameX = 0;
                }
                else {
                    this.game.music.muted = true;
                    this.game.musicButton.frameX = 1;
                }
                if (this.game.levelSelctionMusic.muted) {
                    this.game.levelSelctionMusic.muted = false;
                    this.game.musicButton.frameX = 0;
                }
                else {
                    this.game.levelSelctionMusic.muted = true;
                    this.game.musicButton.frameX = 1;
                }
            }
            if(this.game.gameStart && !this.game.gamePause)
            this.game.levelBoxes.forEach(lvlBox => {
                if(this.isClickedButton(lvlBox, evt)){
                    this.game.levels = this.game.categories[lvlBox.levelNumber-1];
                    
                    this.game.levels[this.game.currentLevel].enter();
                    this.game.gameStart = false;
                    this.mouse.x = mouseOldPos.x;
                    this.mouse.y = mouseOldPos.y;
                }
            });
            if (this.isClickedButton(this.game.infoButton, evt)) {
                this.game.gamePause = true;
                document.getElementById('infoContainers').style.display = "flex";
            }

            this.game.fishes.forEach(fish => {
            if(this.isClicked(fish, evt))
            {
                console.log('clicked on fish '+fish.value);
                fish.selected = true;
            }});
        });
        this.game.canvas.addEventListener('mouseup', evt => {
            this.mouse.click = false;
            console.log('input file clicking mouse '+this.mouse.click);
        });
    }
    isClicked(button, evt) {
        var rect = this.game.canvas.getBoundingClientRect();
        var mbutton = {
            radius: button.radius,
            x: button.x* rect.width / this.game.width,
            y: button.y* rect.height / this.game.height
        }
        const dx = evt.offsetX - mbutton.x;
        const dy = evt.offsetY - mbutton.y;
        var distance = Math.sqrt(dx*dx+dy*dy);
        
        if (!document.fullscreenElement) {
            if (distance < (mbutton.radius*rect.width/this.game.width))
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
    isClickedButton(button, evt) {
        var rect = this.game.canvas.getBoundingClientRect();
        var mbutton = {
            width: button.width * rect.width / this.game.width,
            height: button.height * rect.height / this.game.height,
            x: button.x* rect.width / this.game.width,
            y: button.y* rect.height / this.game.height
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
}