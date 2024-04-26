// Dice container, Data
import Die from './Die.js';
import page from './page.js';

export default class DiceContainer {
    constructor() {
        this._dice = new Map(); // Map with key=number 1-5 (id), value=dice object
        // Alternative: object literal, or array of objects
    }
    get faces(){
        let faces = [];
        this._dice.forEach(die => faces.push(die.face));
        return faces;
    }
    generateAllDice(){
        for (let i = 1; i < 6; i++) {
            // data
            const die = new Die();
            this._dice.set(i, die); // map item

            // page
            page.addDiceImage(i, die);
        }
        console.log("All dice generated:");
        console.dir(this._dice);
    }
    rollAllDice(){
        // New game, check no existing dice
        if (this._dice.size === 0){
            this.generateAllDice();
            return this.faces;
        }

        // Check active dice
        let countActiveDice = 0;
        for (const die of this._dice.values()) { // cannot use filter
            if (die.isActive) countActiveDice++;
        }
        if (countActiveDice === 0){
            console.log("No active dice to roll.");
            alert("There are no active dice to roll...")
            return false;
        }

        // Active dice
        this._dice.forEach((die, id) => {     // (value, key) of Map
            die.generateNewFace(id);
        });
        return this.faces;
    }
    removeAllDice(){
        // data
        this._dice.clear();

        // page
        page.dice.replaceChildren();
        console.log("All dice removed.");
    }
}