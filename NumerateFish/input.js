import { CollisionAnimation } from "./CollisionAnimation.js";

export class InputHandler{
    constructor(game){
        this.game = game;
        this.mouse = {
            x: this.game.canvas.width / 2,
            y: this.game.canvas.height / 2,
            click: false
        }
        
        this.game.canvas.addEventListener('mousedown', evt => {
            var rect = this.game.canvas.getBoundingClientRect();
            var scaleX = this.game.canvas.width / rect.width;
            var scaleY = this.game.canvas.height / rect.height;
            this.mouse.click = true;
            
            this.mouse.x = (evt.clientX - rect.left)*scaleX;
            this.mouse.y = (evt.clientY - rect.top)*scaleY;
            if(this.isClicked(this.game.player, evt))
            {
                console.log('clicked on player');
                if(this.game.player.bubbles.length>0)
                {
                    var lastBubble = this.game.player.bubbles.pop();
                    lastBubble.color = 'blue';
                    lastBubble.inFish = false;
                    this.game.collisions.push(new CollisionAnimation(this.game, lastBubble));
                    lastBubble.markedForDeletion = true;
                    // lastBubble.counted = false;
                }
                // this.game.bubbles.push(lastBubble);
            }
        });
        this.game.canvas.addEventListener('mouseup', evt => {
            this.mouse.click = false;
        });
    }
    isClicked(button, evt) {
        var rect = this.game.canvas.getBoundingClientRect();
        var mbutton = {
            radius: button.radius,
            x: button.x* rect.width / this.game.width,
            y: button.y* rect.width / this.game.width
        }
        const dx = evt.offsetX - mbutton.x;
        const dy = evt.offsetY - mbutton.y;
        var distance = Math.sqrt(dx*dx+dy*dy);
        
        if (!document.fullscreenElement) {
            if (distance < this.game.player.radius)
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