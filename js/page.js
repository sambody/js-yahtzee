// HTML page elements, View
export default {
    // dice
    dice : document.querySelector( '[data-dice="dice"]' ),
    btnRollDice : document.querySelector( '[data-dice="roll"]' ),
    btnNext : document.querySelector( '[data-dice="next"]' ),
    throw : document.querySelector( '[data-dice="throw"]' ),
    btnReset : document.querySelector( '[data-dice="start"]' ),

    // messages
    msgError : document.querySelector( '[data-msg="error"]' ),
    msgConfirm : document.querySelector( '[data-msg="confirmation"]' ),

    // scores
    ones : document.querySelector( '[data-score="ones"]' ),
    twos : document.querySelector( '[data-score="twos"]' ),
    threes : document.querySelector( '[data-score="threes"]' ),
    fours : document.querySelector( '[data-score="fours"]' ),
    fives : document.querySelector( '[data-score="fives"]' ),
    sixes : document.querySelector( '[data-score="sixes"]' ),
    threeKind : document.querySelector( '[data-score="three-kind"]' ),
    fourKind : document.querySelector( '[data-score="four-kind"]' ),
    fullHouse : document.querySelector( '[data-score="full"]' ),
    smallStraight : document.querySelector( '[data-score="small"]' ),
    largeStraight : document.querySelector( '[data-score="large"]' ),
    chance : document.querySelector( '[data-score="chance"]' ),
    fiveKind : document.querySelector( '[data-score="five-kind"]' ),

    subtotal : document.querySelector( '[data-number="subtotal"]' ),
    bonus : document.querySelector( '[data-number="bonus"]' ),
    total : document.querySelector( '[data-number="total"]' ),

    displayThrows(number){
        this.throw.textContent = String(number);    // .textContent for a span
    },
    enableRollDice(bool = true){
        this.btnRollDice.disabled = !bool;
    },
    addDiceImage(id, die){
        let image = document.createElement("img");
        image.src = `./img/${die.face}.png`;
        image.id = id;
        image.addEventListener('click', () => {
            image.classList.toggle("selected");
            die.toggleActive();
            console.log( `Clicked on die ${id} with face ${die.face}` );
        })
        this.dice.appendChild(image).focus();   // focus needed for css transition
        image.classList.add("fadeIn");
    },
    updateDiceImage(id, face){
        const dieImage = document.getElementById(id);
        dieImage.classList.remove("fadeIn");
        dieImage.src = "./img/" + face + ".png";
        dieImage.focus();                   // for css animation
        dieImage.classList.add("fadeIn");
    },

    // Scores
    displayScore(name, number){
        this[name].value = String(number);          // .value for a button
    },
    enableScore(name){
        // enable single score
        this[name].disabled = false;
    },
    disableScores(names) {
        // disable selected score buttons
        for (const name of names) {
            this[name].disabled = true;
        }
    },
    resetScoresToZero(){
        this.ones.textContent = "0";
        this.twos.textContent = "0";
        this.threes.textContent = "0";
        this.fours.textContent = "0";
        this.fives.textContent = "0";
        this.sixes.textContent = "0";
        this.threeKind.textContent = "0";
        this.fourKind.textContent = "0";
        this.fullHouse.textContent = "0";
        this.smallStraight.textContent = "0";
        this.largeStraight.textContent = "0";
        this.chance.textContent = "0";
        this.fiveKind.textContent = "0";

        this.subtotal.textContent = "0";
        this.bonus.textContent = "0";
        this.total.textContent = "0";
    },
    updateTotals(subtotalNumber, bonusNumber, totalNumber){
        this.subtotal.textContent = String(subtotalNumber);
        this.bonus.textContent = String(bonusNumber);
        this.total.textContent = String(totalNumber);
    }
}
