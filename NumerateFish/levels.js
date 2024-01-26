import {QuestionBox} from "./buttons.js";

function ChangeBackground(game){
    (game.backgroundIndex<game.backgrounds.length-1) ? game.backgroundIndex++ : game.backgroundIndex=0;
        game.background = game.backgrounds[game.backgroundIndex];
}

export class OneOperand{
    constructor(game){
        this.game = game;
    }
    enter(){
        this.game.boxNumbers = [];
        this.questionBoxes = [];
        this.game.bubbleValues = this.createBubbleValues(); 
        ChangeBackground(this.game);
        this.game.qbg.showSwitch = true;
    }
    
}
export class Multiples extends OneOperand{
    constructor(game){
        super(game);
    }
    checkCorrectness(bbl){
        if(bbl.value%this.game.questionNumber==0) return true;
        else return false;
    }
    drawQuestion(){
        this.game.ctx.fillText('Multiples of '+this.game.questionNumber, this.game.width - 255, 90);
    }
}
export class Factors extends OneOperand{
    constructor(game){
        super(game);
        // this.factorValues = [];
    }
    checkCorrectness(bbl){
        if(this.game.questionNumber%bbl.value==0) return true;
        else return false;
    }
    drawQuestion(){
        this.game.ctx.fillText('Factors of '+this.game.questionNumber, this.game.width - 255, 90);
    }
    findFactors(n){
        var factorValues = [...Array(n + 1).keys()] 
        .filter( 
            (i) => n % i === 0 
        ); 
        return factorValues;
    }

}
export class TwoOperands{
    constructor(game){
        this.game = game;
        this.questionBoxes = [
            new QuestionBox(this.game, this.game.width - 300, 70, 70, 40),
            new QuestionBox(this.game, this.game.width - 190, 70, 70, 40),
        ];
    }
    enter(){
        this.game.boxNumbers = ['?', '?'];
        
        this.game.bubbleValues = this.createBubbleValues();
        ChangeBackground(this.game);
        this.game.qbg.showSwitch = true;
    }
    drawQuestion(){
        // this.questionBoxes.forEach(box => {
        //     box.draw(this.game.ctx);
        // });
        this.game.ctx.fillStyle = 'black';
        this.game.ctx.fillText(this.game.operationChar, this.game.width - 220, 95);
        this.game.ctx.fillText('= '+this.game.questionNumber, this.game.width - 105, 95);
        
        
        this.game.ctx.textAlign = 'centre';
        this.game.ctx.fillText(this.game.boxNumbers[0], this.game.width - 290, 95);
        this.game.ctx.fillText(this.game.boxNumbers[1], this.game.width - 185, 95);
    }
}
export class ThreeOperands{
    constructor(game){
        this.game = game;
        this.questionBoxes = [
            new QuestionBox(this.game, this.game.width - 340, 70, 60, 40),
            new QuestionBox(this.game, this.game.width - 250, 70, 60, 40),
            new QuestionBox(this.game, this.game.width - 160, 70, 60, 40)
        ];
    }
    enter(){
        this.game.boxNumbers = ['?', '?', '?'];
        
        this.game.bubbleValues = this.createBubbleValues();
        ChangeBackground(this.game);
        this.game.qbg.showSwitch = true;
    }
    drawQuestion(ctx){
        // this.questionBoxes.forEach(box => {
        //     box.draw(ctx);
        // });
        ctx.fillStyle = 'black';
        ctx.fillText(this.game.operationChar, this.game.width - 275, 95);
        ctx.fillText(this.game.operationChar, this.game.width - 185, 95);
        ctx.fillText('= '+this.game.questionNumber, this.game.width - 95, 95);
        ctx.fillText(this.game.boxNumbers[0], this.game.width - 327, 95);
        ctx.fillText(this.game.boxNumbers[1], this.game.width - 237, 95);
        ctx.fillText(this.game.boxNumbers[2], this.game.width - 147, 95);
    }
}

export class AdditionTwoOperands extends TwoOperands{
    constructor(game) {
        super(game);
    }
    enter(){
        super.enter();
        this.game.operationChar = '+';
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=this.game.questionNumber; i++) arr.push(i);
        return arr;
    }
    checkCorrectness(bbl2){
        if(this.game.player.bubbles[0].value + bbl2.value==this.game.questionNumber) return true;
        else return false;
    } 
}

export class Level1_1 extends AdditionTwoOperands{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*3+2);
        this.game.winningScore = 3;   
        super.enter();
    }
}
export class Level1_2 extends AdditionTwoOperands{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*4+6);
        this.game.winningScore = 3;   
        super.enter();
    }
}
export class Level1_3 extends AdditionTwoOperands{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*9+10);
        this.game.winningScore = 2;   
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i = 2; i<=this.game.questionNumber-2; i++) arr.push(i);
        return arr;
    }
}

export class Level1_4 extends AdditionTwoOperands{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*7+3)*10;
        this.game.winningScore = 2;   
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=Math.round(this.game.questionNumber/10); i++) arr.push(i*10);
        return arr;
    }
}
export class Level1_5 extends AdditionTwoOperands{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = (Math.round(Math.random()*8+2))*50;
        this.game.winningScore = 2;   
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=Math.round(this.game.questionNumber/50); i++) arr.push(i*50);
        return arr;
    }
}
export class Level1_6 extends AdditionTwoOperands{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = (Math.round(Math.random()*8+2))*25;
        this.game.winningScore = 2;   
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=Math.round(this.game.questionNumber/25); i++) arr.push(i*25);
        return arr;
    }
}
export class Level2_1 extends TwoOperands{
    constructor(game) {
        super(game);       
    }
    enter(){
        super.enter();
        this.game.questionNumber = Math.round(Math.random()*4+1);
        this.game.winningScore = 3;
        // this.game.bubbleValues = this.createBubbleValues();
        this.game.operationChar = '-';
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=9; i++){
            arr.push(i);
        }
        return arr;
    }
    checkCorrectness(bbl2){
        if(this.game.player.bubbles[0].value - bbl2.value==this.game.questionNumber) return true;
        else return false;
    }
}
export class Level2_2 extends TwoOperands{
    constructor(game) {
        super(game);       
    }
    enter(){
        super.enter();
        this.game.questionNumber = Math.round(Math.random()*4+6);
        this.game.winningScore = 3;
        this.game.bubbleValues = this.createBubbleValues();
        this.game.operationChar = '-';
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=20; i++){
            arr.push(i);
        }
        return arr;
    }
    checkCorrectness(bbl2){
        if(this.game.player.bubbles[0].value - bbl2.value==this.game.questionNumber) return true;
        else return false;
    }
}
export class Level2_3 extends TwoOperands{
    constructor(game) {
        super(game);       
    }
    enter(){
        super.enter();
        this.game.questionNumber = Math.round(Math.random()*4+6)*10;
        this.game.winningScore = 3;
        this.game.bubbleValues = this.createBubbleValues();
        this.game.operationChar = '-';
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=20; i++){
            arr.push(i*10);
        }
        return arr;
    }
    checkCorrectness(bbl2){
        if(this.game.player.bubbles[0].value - bbl2.value==this.game.questionNumber) return true;
        else return false;
    }
}
export class Level2_4 extends TwoOperands{
    constructor(game) {
        super(game);       
    }
    enter(){
        super.enter();
        this.game.questionNumber = Math.round(Math.random()*3+7)*50;
        this.game.winningScore = 2;
        this.game.bubbleValues = this.createBubbleValues();
        this.game.operationChar = '-';
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=20; i++){
            arr.push(i*50);
        }
        return arr;
    }
    checkCorrectness(bbl2){
        if(this.game.player.bubbles[0].value - bbl2.value==this.game.questionNumber) return true;
        else return false;
    }
}
export class AdditionThreeOperands extends ThreeOperands{
    constructor(game) {
        super(game);
        
    }
    enter(){
        super.enter();
        this.game.operationChar = '+';
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=this.game.questionNumber; i++){
            arr.push(i);
        }
        return arr;
    }
    checkCorrectness(bbl3){
        if(this.game.player.bubbles[0].value + this.game.player.bubbles[1].value + bbl3.value ==this.game.questionNumber) return true;
        else return false;
    }
}

export class Level3_1 extends AdditionThreeOperands{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*7+3);
        this.game.winningScore = 3;
        super.enter();
    }
}
export class Level3_2 extends AdditionThreeOperands{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*10+10);
        this.game.winningScore = 3;
        super.enter();
    }
}
export class Level3_3 extends AdditionThreeOperands{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*7+3)*10;
        this.game.winningScore = 2;
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i =0; i<=Math.round(this.game.questionNumber/10)*2; i++) arr.push(i*5);
        return arr;
    }
}
export class Level4_1 extends Multiples{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*3+2);
        this.game.winningScore = 1;
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i = 1; i<=this.game.questionNumber+10; i++) {
            arr.push((i+this.game.questionNumber)*Math.round(Math.random()*this.game.questionNumber+1));
            arr.push(i*this.game.questionNumber);
            arr.push(i*this.game.questionNumber-i);
            arr.push(i*this.game.questionNumber+i);
        }
        arr = Array.from(new Set(arr));
        return arr;
    }
}
export class Level4_2 extends Multiples{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*4+6);
        this.game.winningScore = 3;
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i = 1; i<=this.game.questionNumber+10; i++) {
            arr.push((i+this.game.questionNumber)*Math.round(Math.random()*this.game.questionNumber+1));
            arr.push(i*this.game.questionNumber);
        }
        arr = Array.from(new Set(arr));
        return arr;
    }
}
export class Level5_1 extends Factors{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*3+2) * Math.round(Math.random()*4+1);
        this.game.winningScore = 3;
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i = 2; i<=this.game.questionNumber+1; i++) {
            arr.push(i);
        }
        arr.push(...this.findFactors(this.game.questionNumber));
        return arr;
    }
}
export class Level5_2 extends Factors{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*4+6) * Math.round(Math.random()*4+2);
        this.game.winningScore = 3;
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i = 2; i<=this.game.questionNumber+1; i++) {
            arr.push(i);
        }
        arr.push(...this.findFactors(this.game.questionNumber));
        return arr;
    }
}
export class Level5_3 extends Factors{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*4+6) * Math.round(Math.random()*6+4);
        this.game.winningScore = 3;
        super.enter();
    }
    createBubbleValues(){
        var arr = [];
        for(var i = 2; i<=this.game.questionNumber/2; i++) {
            arr.push(i);
        }
        arr.push(...this.findFactors(this.game.questionNumber));
        return arr;
    }
}