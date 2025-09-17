import { Birds } from "./backgroundObjects.js";
import {QuestionBox} from "./buttons.js";

export class ChaningQuestion{

}
function ChangeBackground(game){
    (game.backgroundIndex<game.backgrounds.length-1) ? game.backgroundIndex++ : game.backgroundIndex=0;
        game.background = game.backgrounds[game.backgroundIndex];
        game.wateryLayer = game.wateryLayers[game.backgroundIndex];
}
function setHookPos(game){
    game.hook.boat.x = game.background.boatPos.x;
    game.hook.boat.y = game.background.boatPos.y;
}
export class OneOperand{
    constructor(game){
        this.game = game;
    }
    enter(){
        this.game.boxNumbers = [];
        this.questionBoxes = [];
        this.game.fishValues = this.createFishValues();
        ChangeBackground(this.game);
        setHookPos(this.game);
        this.game.qbg.showSwitch = true;
    }
    
}
export class Identify extends OneOperand{
    constructor(game){
        super(game);
    }
    checkCorrectness(fish){
        if(fish.value==this.game.questionNumber) return true;
        else return false;
    }
    drawQuestion(){
        this.game.ctx.fillText('Catch '+this.game.questionNumber, this.game.width - 180, 90);
    }
    
}
export class Before extends OneOperand{
    constructor(game){
        super(game);
        this.questions = [];
    }
    enter(){
        this.createQuestionArray();
        super.enter();
    }
    checkCorrectness(fish){
        if(this.game.questionNumber-1==fish.value) return true;
        else return false;
    }
    drawQuestion(){
        this.game.ctx.fillText('Before '+this.game.questionNumber, this.game.width - 180, 90);
    }
}
export class After extends OneOperand{
    constructor(game){
        super(game);
        this.questions = [];
    }
    enter(){
        this.createQuestionArray();
        super.enter();
    }
    checkCorrectness(fish){
        if(parseInt(this.game.questionNumber)+1==fish.value) return true;
        else return false;
    }
    drawQuestion(){
        this.game.ctx.fillText('After '+this.game.questionNumber, this.game.width - 180, 90);
    }
}
export class InBetween extends OneOperand{
    constructor(game){
        super(game);
        this.questions = [];
    }
    enter(){
        this.createQuestionArray();
        super.enter();
    }
    checkCorrectness(fish){
        if(this.game.questionNumber==fish.value) return true;
        else return false;
    }
    drawQuestion(){
        // this.game.ctx.fillText((this.game.questionNumber-1) + ',  ___,  ' +(parseInt(this.game.questionNumber)+1), this.game.width - 255, 90);
        this.game.ctx.fillText(`${this.game.questionNumber-1},  ___,  ${parseInt(this.game.questionNumber)+1}`, this.game.width - 200, 90);
    }
}

export class Big extends OneOperand{
    constructor(game){
        super(game);
    }
    
    checkCorrectness(fish){
        if(fish.value>this.game.questionNumber) return true;
        else return false;
    }
    drawQuestion(){
        this.game.ctx.save();
        this.game.ctx.font = "bold 24px Arial Black";
        this.game.ctx.fillText('Catch bigger than '+this.game.questionNumber, this.game.width - 300, 90);
        this.game.ctx.restore();
    }
}
export class Small extends OneOperand{
    constructor(game){
        super(game);
    }
    checkCorrectness(fish){
        if(fish.value<this.game.questionNumber) return true;
        else return false;
    }
    drawQuestion(){
        this.game.ctx.save();
        this.game.ctx.font = "bold 24px Arial Black";
        this.game.ctx.fillText('Catch smaller than '+this.game.questionNumber, this.game.width - 300, 90);
        this.game.ctx.restore();
    }
}


export class Level1_1 extends Identify{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*8)+1;
        this.game.winningScore = 3;   
        super.enter();
        
    }
    createFishValues(){
        var arr = [];
        for(var i = 0; i<=9; i++) {
            arr.push(i);
            arr.push(this.game.questionNumber);
        }
        return arr;
    }
}
export class Level1_2 extends Identify{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*10+10);
        this.game.winningScore = 3;   
        super.enter();
    }
    createFishValues(){
        var arr = [];
        for(var i = 10; i<=20; i++) {
            arr.push(i);
            arr.push(this.game.questionNumber);
        }
        return arr;
    }
}
export class Level1_3 extends Identify{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = (Math.round(Math.random()*9)*10)+10;
        this.game.winningScore = 2;   
        super.enter();
    }
    createFishValues(){
        var arr = [];
        for(var i = 1; i<=10; i++) {arr.push(i*10);
            arr.push(this.game.questionNumber);
        }
        return arr;
    }
}

export class Level1_4 extends Identify{
    constructor(game) {
        super(game);
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*83)+11;
        this.game.winningScore = 2;   
        super.enter();
    }
    createFishValues(){
        var arr = [];
        for(var i = this.game.questionNumber-5; i<=this.game.questionNumber+5; i++) {
            arr.push(i);
            arr.push(this.game.questionNumber);
        }
        return arr;
    }
}

export class Level2_1 extends Before{
    constructor(game) {
        super(game);    
    }
    enter(){
        this.game.winningScore = 3;
        super.enter();
        this.changeQuestion();
    }
    createFishValues(){
        var arr = [];
        for(var i =0; i<=9; i++){
            arr.push(i);
            arr.push(...this.questions.map(n => n-1));
        }
        return arr;
    }
    createQuestionArray(){
        var tempArr = [];
        for(var i = 2; i<=10; i++) tempArr.push(i);
        for(var i=0; i<this.game.winningScore; i++){
            this.questions.push(tempArr.splice(Math.round(Math.random()*tempArr.length)-1,1));
        }
    }
    changeQuestion(){
        this.game.questionNumber = this.questions.pop();
        this.game.qbg.showSwitch = true;
    }
}
export class Level2_2 extends Before{
    constructor(game) {
        super(game);       
    }
    enter(){
        super.enter();
        this.game.winningScore = 3;
        this.changeQuestion();
    }
    createFishValues(){
        var arr = [];
        for(var i =9; i<=19; i++){
            arr.push(i);
            arr.push(...this.questions.map(n => n-1));
        }
        return arr;
    }
    createQuestionArray(){
        var tempArr = [];
        for(var i = 10; i<=20; i++) tempArr.push(i);
        for(var i=0; i<this.game.winningScore; i++){
            this.questions.push(tempArr.splice(Math.round(Math.random()*tempArr.length)-1,1));
        }
    }
    changeQuestion(){
        this.game.questionNumber = this.questions.pop();
        this.game.qbg.showSwitch = true;
    }
}
export class Level2_3 extends After{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.winningScore = 3;
        super.enter();
        this.changeQuestion();
    }
    createFishValues(){
        var arr = [];
        for(var i =1; i<=10; i++){
            arr.push(i);
            arr.push(...this.questions.map(n => parseInt(n)+1));
        }
        return arr;
    }
    createQuestionArray(){
        var tempArr = [];
        for(var i = 0; i<=9; i++) tempArr.push(i);
        for(var i=0; i<this.game.winningScore; i++){
            this.questions.push(tempArr.splice(Math.round(Math.random()*tempArr.length)-1,1));
        }
    }
    changeQuestion(){
        this.game.questionNumber = this.questions.pop();
        this.game.qbg.showSwitch = true;
    }
}
export class Level2_4 extends After{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.winningScore = 3;
        super.enter();
        this.changeQuestion();
    }
    createFishValues(){
        var arr = [];
        for(var i =11; i<=20; i++){
            arr.push(i);
            arr.push(...this.questions.map(n => parseInt(n)+1));
        }
        return arr;
    }
    createQuestionArray(){
        var tempArr = [];
        for(var i = 10; i<=19; i++) tempArr.push(i);
        for(var i=0; i<this.game.winningScore; i++){
            this.questions.push(tempArr.splice(Math.round(Math.random()*tempArr.length)-1,1));
        }
    }
    changeQuestion(){
        this.game.questionNumber = this.questions.pop();
        this.game.qbg.showSwitch = true;
    }
}
export class Level2_5 extends InBetween{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.winningScore = 3;
        super.enter();
        this.changeQuestion();
    }
    createFishValues(){
        var arr = [];
        for(var i =1; i<=9; i++){
            arr.push(i);
            arr.push(...this.questions);
        }
        return arr;
    }
    createQuestionArray(){
        var tempArr = [];
        for(var i = 1; i<=10; i++) tempArr.push(i);
        for(var i=0; i<this.game.winningScore; i++){
            this.questions.push(...tempArr.splice(Math.round(Math.random()*tempArr.length)-1,1));
        }
    }
    changeQuestion(){
        this.game.questionNumber = this.questions.pop();
        this.game.qbg.showSwitch = true;
    }
}
export class Level2_6 extends InBetween{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.winningScore = 3;
        super.enter();
        this.changeQuestion();
    }
    createFishValues(){
        var arr = [];
        for(var i =10; i<=20; i++){
            arr.push(i);
            arr.push(...this.questions);
        }
        return arr;
    }
    createQuestionArray(){
        var tempArr = [];
        for(var i = 11; i<=19; i++) tempArr.push(i);
        for(var i=0; i<this.game.winningScore; i++){
            this.questions.push(...tempArr.splice(Math.round(Math.random()*tempArr.length-1),1));
        }
    }
    changeQuestion(){
        this.game.questionNumber = this.questions.pop();
        this.game.qbg.showSwitch = true;
    }
}

export class Level3_1 extends Big{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*8+1);
        this.game.winningScore = 3;
        super.enter();
    }
    createFishValues(){
        var arr = [];
        for(var i =0; i<=20; i++){
            arr.push(i);
        }
        return arr;
    }
}
export class Level3_2 extends Big{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*10+10);
        this.game.winningScore = 3;
        super.enter();
    }
    createFishValues(){
        var arr = [];
        for(var i =9; i<=30; i++){
            arr.push(i);
        }
        return arr;
    }
}
export class Level3_3 extends Small{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*10+5);
        this.game.winningScore = 3;
        super.enter();
    }
    createFishValues(){
        var arr = [];
        for(var i =0; i<=15; i++){
            arr.push(i);
        }
        return arr;
    }
}
export class Level3_4 extends Small{
    constructor(game) {
        super(game);       
    }
    enter(){
        this.game.questionNumber = Math.round(Math.random()*10+10);
        this.game.winningScore = 3;
        super.enter();
    }
    createFishValues(){
        var arr = [];
        for(var i =0; i<=20; i++){
            arr.push(i);
        }
        return arr;
    }
}
