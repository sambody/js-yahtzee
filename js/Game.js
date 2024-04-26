// Game, Controller
import DiceContainer from './DiceContainer.js';
import page from './page.js';
import Scorecard from "./Scorecard.js";

export default class Game {
    constructor() {
        this._diceContainer = new DiceContainer();  // add diceContainer and scorecard as params?
        this._scorecard = new Scorecard();
        this._scoreNames = this._scorecard.scoreNames;
        this._activeScores = this._scorecard.activeScoreNames;
        this._gameIsOn = true;
        this._throws = 0;
        this._maximumThrows = 3; // default 3
        this._turns = 0;
        this._maximumTurns = 13; // default 13
    }

    updateThrows(number = null){
        // update throws count (increment if no number set)
        this._throws = (typeof number === 'number') ? number : this._throws + 1;
        if (this._throws === this._maximumThrows){
            page.enableRollDice(false);
        }
        // update page
        page.displayThrows(this._throws);
        console.log("Throws updated.");
    }
    start(){
        // Buttons
        page.btnRollDice.addEventListener("click", () => {
            this.rollDice();
        })
        page.btnReset.addEventListener("click", () => {
            this.resetGame();
        })

        // Scores - disable all
        page.disableScores(this._scoreNames);

        // Scores - add event listeners
        for (const name of this._scoreNames) {
            page[name].addEventListener("click", () => {
                this._scorecard.freezeScore(name);
                this.setNextTurn();
            })
        }

        console.log("Start/Init finished.");
    }
    setNextTurn(){
        this.updateThrows(0);
        this._turns++;

        if (this._turns === this._maximumTurns){
            // game over
            this.setGameOver();
        } else {
            // game not over
            page.resetScoresToZero(this._activeScores);
            page.enableRollDice();
            console.log("Next turn has been set.");
        }

        this._diceContainer.removeAllDice();
        this._scorecard.resetActiveScores();
        page.disableScores(this._scoreNames);
    }
    rollDice(){
        console.log(`inactive scores: ${this._activeScores}`)
        page.disableScores(this._activeScores);
        let faces = this._diceContainer.rollAllDice();
        if (faces) {
            this._scorecard.resetActiveScores();
            this._scorecard.updateAndDisplayScores(faces);
            this.updateThrows();
        }
        console.log("========== Dice rolled.");
    }
    resetGame(){
        this.updateThrows(0);
        this._turns = 0;
        this._gameIsOn = true;
        this._diceContainer.removeAllDice();
        this._scorecard.resetAllScores();

        page.resetScoresToZero();
        page.disableScores(this._scoreNames);
        page.enableRollDice();

        console.log("Reset finished.");
    }
    setGameOver(){
        this._gameIsOn = false;

        page.enableRollDice(false);

        console.log("========== Game over");
        alert("Game over");
    }
}
