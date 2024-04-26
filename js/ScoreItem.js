// Score item

export default class ScoreItem {
    constructor(element) {
        this._score = 0;
        this._isActive = true; // active, not frozen
        this._element = element;
    }

    get score() {   // use: .score = value
        return this._score;
    }
    get isActive(){
        return this._isActive;
    }
    get element(){
        return this._element;
    }

    set score(number){
        this._score = number;
    }
    set isActive (bool){
        this._isActive = bool;
    }
}