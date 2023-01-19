const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State{
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State{
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){
        this.frameX =0;
        this.player.maxFrame = 15;
        this.player.frameY = 0;
    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight') || input.includes('swipe left') || input.includes('swipe right')){
            this.player.setState(states.RUNNING);
        }else if(input.includes('swipe up') || input.includes('ArrowUp')) this.player.setState(states.JUMPING);
    }
}

export class Running extends State{
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){
        this.frameX =0;
        this.player.maxFrame = 15;
        this.player.frameY = 0;
    }
    handleInput(input){
        if(input.includes('ArrowDown') || input.includes('swipe down')){
            this.player.setState(states.SITTING);
        }else if (input.includes('ArrowUp') || input.includes('swipe up')){
            this.player.setState(states.JUMPING);
        }
    }
}

export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        this.frameX =0;
        this.player.maxFrame = 15;
        if(this.player.onGround()) this.player.vy -= this.player.jumpingCapacity;
        this.player.frameY = 0;
    }
    handleInput(input){
        if(this.player.vy > this.player.weight){
            this.player.setState(states.FALLING);
        }
    }
}

export class Falling extends State{
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.frameX =0;
        this.player.maxFrame = 15;
        this.player.frameY = 0;
    }
    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.RUNNING);
        }
    }
}