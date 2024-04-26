// Dice item
import page from "./page.js";

export default class Die {
    constructor() {
        this._face = this.getRandom();  // 1-6
        this._isActive = true;
    }

    get face(){
        return this._face;
    }
    get isActive(){
        return this._isActive;
    }
    generateNewFace(dieId){
        if (this._isActive){
            // set face number
            this._face = this.getRandom();

            // update image in page
            page.updateDiceImage(dieId, this._face);

            console.log("New face set.");
        }
    }
    toggleActive(){
        this._isActive = !this._isActive;
    }
    getRandom(){
        return Math.floor((Math.random() * 6) + 1);
    }
}