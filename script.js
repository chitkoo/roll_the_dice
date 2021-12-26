'use script';

const player0 = document.querySelector('.player0');
const player1 = document.querySelector('.player1');

const player0Score = document.querySelector('#player0-score');
const player1Score = document.querySelector('#player1-score');

const player0Current = document.querySelector('#player0-current');
const player1Current = document.querySelector('#player1-current');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let activePlayer,scores,currentScore,playing;

dice.classList.add('hidden');

const init = function(){
    activePlayer = 0;
    scores = [0,0];
    currentScore = 0;
    playing = true;

    player0Score.textContent = 0;
    player1Score.textContent = 0;

    player0Current.textContent = 0;
    player1Current.textContent = 0;

    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');

    player0.classList.add('player-active');
    player1.classList.remove('player-active');

};
init();

const switchPlayer = function(){
    document.querySelector(`#player${activePlayer}-current`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
};

btnRoll.addEventListener('click',function(){
    if(playing){
        //generate ramdom number
        const ramdomNum = Math.trunc(Math.random()*6)+1;
        console.log(ramdomNum);

        dice.src = `img/dice-${ramdomNum}.png`;
        dice.classList.remove('hidden');

        if(ramdomNum !== 1){
            currentScore += ramdomNum;
            document.querySelector(`#player${activePlayer}-current`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;

        document.querySelector(`#player${activePlayer}-score`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 100){
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player${activePlayer}`).classList.remove('player-active');

        }else{
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', init);