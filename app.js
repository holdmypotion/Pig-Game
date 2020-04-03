/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his 
    ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
    After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
(Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var score, roundScore, activePlayer, gamePlaying;

init();


// Roll Dice Event
// Here in JS lamda is called as annonymous function.
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random Number
        var dice = Math.floor(Math.random()*6) + 1;
        var diceTwo = Math.floor(Math.random()*6) + 1;

        //2. Display the result
        // Dice 1
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Dice 2
        document.querySelector('.second-dice').style.display = 'block';
        document.querySelector(".second-dice").src = 'dice-' + diceTwo + '.png'; 

        //3. Update the round score IF the rolled number ain't 1.
        if (dice === 6 && diceTwo === 6) {
            // Player loose score
            score[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
            nextPlayer();
        }
        else if(dice !== 1 && diceTwo !== 1) {
            // add the scores
            roundScore += dice + diceTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});


// Hold Event
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Update the Global score based on roundScore
        score[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        
        // Taking input from the user for the winning score
        var input = document.querySelector('.final-score').value;
        var winningScore;
        // Undefined, 0,. null or "" are COERCED to false
        // Anything else is coerced to true
        if(input && input > 0) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //2. check if player won the game
        if (score[activePlayer] >= winningScore) {
            // Halt the game and present the winner
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.second-dice').style.display = 'none';
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
})


function nextPlayer() {
    /**
     * Toggle the activePlayer
     */
    // Refresh the roundScore
    document.getElementById('current-' + activePlayer).textContent = '0';
    roundScore = 0;

    // Change the active player and also refresh the dice.
    // document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

    // document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.second-dice').style.display = 'none';
}


// New Game event
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    /**
     * For initializing the game.
     */
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    /* Setting up for round 1 */
    // Changin the dice to none for the first round 
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.second-dice').style.display = 'none';
    document.querySelector('.final-score').value = '';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}




// We can also change CSS 
// document.querySelector('.dice').style.display = 'none';

// dice = Math.floor(Math.random()*6) + 1;
/* Using them as setters */
// document.querySelector('#current-' + activePlayer).textContent = dice;
// In place of .textContent we can also use .innerHTML add HTML code
// document.querySelector('#current-' + activePlayer).innerHTML = '<B>' + dice + '</B>';
/**Using them as getters*/ 
// var x = document.querySelector('#score-' + activePlayer).textContent;
// console.log(x);