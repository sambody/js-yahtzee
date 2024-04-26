// Scorecard container, Data
import ScoreItem from './ScoreItem.js';
import page from './page.js';
import { countInArray, isSequential, sumOfItems } from './helpers.js';

export default class Scorecard {
    constructor() {
        this._scoreNames = [
            "ones", "twos", "threes", "fours", "fives", "sixes",
            "threeKind", "fourKind", "fullHouse", "smallStraight",
            "largeStraight", "chance", "fiveKind"
        ]
        this._scores = this.generateScores();   // { "ones" : scoreItem, ...}
        // Alternative: [ scoreItem,...] with each scoreItem containing the name property
    }
    generateScores(){
        let scores = {};
        this._scoreNames.forEach(name => scores[name] = new ScoreItem())
        console.log("scores:");
        console.dir(scores);
        return scores;
    }
    get scoreNames(){
        return this._scoreNames;
    }
    get activeScoreNames(){
        // active scores, not frozen
        let inactiveScoreNames = [];
        for (let name in this._scores) {
            if (this._scores[name].isActive){
                inactiveScoreNames.push(name);
            }
        }
        return inactiveScoreNames;
    }
    // Getters
    get subtotal() {
        return this._scores.ones.score + this._scores.twos.score + this._scores.threes.score
            + this._scores.fours.score + this._scores.fives.score + this._scores.sixes.score;
    }
    get bonus() {
        return this.subtotal >= 63 ? 35 : 0;
    }
    get total() {
        let subtotal2 = this._scores.threeKind.score + this._scores.fourKind.score
            + this._scores.fullHouse.score + this._scores.smallStraight.score
            + this._scores.largeStraight.score + this._scores.chance.score + this._scores.fiveKind.score;
        return this.subtotal + this.bonus + subtotal2;
    }

    updateAndDisplayScores(faces){
        faces.sort();
        const uniqueFaces = [...new Set(faces)];
        let hasSuggestedScores = false;
        console.log(`Faces (sorted): ${faces}`);

        // Loop first 6 scores (ones - sixes)
        for (let i = 1; i < 7; i++) {
            let name = this._scoreNames[i - 1];
            // if the number is part of the face and is active, show score
            if (faces.includes(i) && this._scores[name].isActive) {
                let sum = countInArray(i, faces) * i;
                this.updateScore(name, sum);
                hasSuggestedScores = true;

                page.displayScore(name, sum);
                page.enableScore(name);
            }
        }

        // Three of a kind
        if (uniqueFaces.length > 1 && uniqueFaces.length < 4 && this._scores["threeKind"].isActive) {
            let foundThree = false;
            uniqueFaces.forEach(face => {
                if (countInArray(face, faces) >= 3) foundThree = true;
            });
            if (foundThree) {
                this.updateScore("threeKind", sumOfItems(faces));
                page.enableScore("threeKind");
                hasSuggestedScores = true;
            }
        }
        // Four of a kind
        if (uniqueFaces.length === 2 && this._scores["fourKind"].isActive) {
            if (countInArray(uniqueFaces[0], faces) === 1 || countInArray(uniqueFaces[0], faces) === 4) {
                this.updateScore("fourKind", sumOfItems(faces));
                page.enableScore("fourKind");
                hasSuggestedScores = true;
            }
        }
        // Full house
        if (uniqueFaces.length === 2 && this._scores["fullHouse"].isActive) {
            if (countInArray(uniqueFaces[0], faces) === 2 || countInArray(uniqueFaces[0], faces) === 3) {
                this.updateScore("fullHouse", 25);
                page.enableScore("fullHouse");
                hasSuggestedScores = true;
            }
        }
        // Small straight, two options
        if (uniqueFaces.length === 4 && this._scores["smallStraight"].isActive) {
            // 4 unique numbers, with a difference of one between each
            if (isSequential(uniqueFaces)) {
                this.updateScore("smallStraight", 30);
                page.enableScore("smallStraight");
                hasSuggestedScores = true;
            }
        }
        if (uniqueFaces.length === 5 && this._scores["smallStraight"].isActive) {
            // 4 unique numbers, check array minus first/last item to be sequential: "12345" or "23456"
            if (
                isSequential(uniqueFaces.slice(1)) ||
                isSequential(uniqueFaces.slice(0, uniqueFaces.length - 1))
            ) {
                this.updateScore("smallStraight", 30);
                page.enableScore("smallStraight");
                hasSuggestedScores = true;
            }
        }
        // Large straight
        if (uniqueFaces.length === 5 && this._scores["largeStraight"].isActive) {
            // 5 unique numbers, sequential
            if (isSequential(uniqueFaces)) {
                this.updateScore("largeStraight", 40);
                page.enableScore("largeStraight");
                hasSuggestedScores = true;
            }
        }
        // Yahtzee, five of a kind
        if (uniqueFaces.length === 1 && this._scores["fiveKind"].isActive) {
            console.log(`5 Unique faces: ${uniqueFaces}`);
            console.log(`5 Unique faces object: ${Array.isArray(uniqueFaces)}`);
            console.log(`5 Unique faces length: ${uniqueFaces.length}`);
            this.updateScore("fiveKind", 50);
            page.enableScore("fiveKind");
            hasSuggestedScores = true;
        }
        // Chance
        if (this._scores["chance"].isActive) {
            this.updateScore("chance", sumOfItems(faces));
            page.enableScore("chance");
            hasSuggestedScores = true;
        }

        // If no possible/computed scores, enable zero scores
        if (!hasSuggestedScores){
            this.scoreNames.forEach( name => {
                if (this._scores[name].score === 0 && this._scores[name].isActive) {
                    page.enableScore(name)
                }
            })
        }

        // Update totals
        page.updateTotals(this.subtotal, this.bonus, this.total);

        console.log("Scorecard updated.");
    }
    updateScore(name, number){
        // Update in data
        this._scores[name].score = number;    // alternative to setter: .setScore(scoreNumber)

        // Update in page
        page.displayScore(name, number);

        console.log(`Updated score for ${name}`);
    }
    // Todo: combine two reset methods into one?
    resetActiveScores(){
        // Set each score to 0 if active, in data and page
        for (const name of this.scoreNames) {
            if (this._scores[name].isActive){
                this._scores[name].score = 0;
                page.displayScore(name, 0);
            }
        }

        page.updateTotals(this.subtotal, this.bonus, this.total);
        console.log("All scores reset to 0.");
    }
    resetAllScores(){
        // Set each score to 0, in data and page
        for (const name of this.scoreNames) {
            this._scores[name].score = 0;
            this._scores[name].isActive = true;
            page.displayScore(name, 0);
        }

        page.updateTotals(this.subtotal, this.bonus, this.total);
        console.log("All scores reset to 0.");
    }
    freezeScore(scoreName){
        this._scores[scoreName].isActive = false;
    }
}