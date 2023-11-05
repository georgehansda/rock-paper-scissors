
let score = (JSON.parse(localStorage.getItem('score'))|| {
  wins:0,
  loses:0,
  ties:0
});

updateScoreElement();

let autoPlaying = false;
let intervalId;
function autoPlay(){
if(!autoPlaying) {
  intervalId = setInterval(function () {
  const playerMove=pickCompMove();
  playGame(playerMove);
  console.log('Autoplay is on');
  },2000);
} else {
  clearInterval(intervalId);
  autoPlaying = false;
}

}

document.querySelector('.js-rock-button').
addEventListener('click',()=>{
playGame('Rock');
});

document.querySelector('.js-paper-button').
addEventListener('click',()=>{
playGame('Paper');
});

document.querySelector('.js-scissors-button').
addEventListener('click',()=>{
playGame('Scissors');
});

document.body.addEventListener('keydown',(event)=>{
if(event.key==='r') {
  playGame('Rock');
} else if(event.key==='p'){
  playGame('Paper');
} else if(event.key==='s'){
  playGame('Scissors');
}
});

function playGame(playerMove) {
  
  const computerMove=pickCompMove();
        
  let result = ''; 
    if(playerMove==='Scissors') {
          if(computerMove==='Rock') {
        result = 'You lose!';
        } else if(computerMove==='Paper') {
          result = 'You win!';
        } else if(computerMove==='Scissors') {
          result = 'Tie!';
        } 

  }  else if(playerMove==='Paper') {
    
      if(computerMove==='Rock') {
        result = 'You win!';
        } else if(computerMove==='Paper') {
          result = 'Tie!';
        } else if(computerMove==='Scissors') {
          result = 'You lose!';
        }  

}  else if(playerMove==='Rock'){

      if(computerMove==='Rock') {
        result = 'Tie!'; 
        } else if(computerMove==='Paper') {
        result = 'You lose!';
        } else if(computerMove==='Scissors') {
        result = 'You win!';
        }

 }

  if(result==='Tie!'){
      score.ties+=1;
    } else if(result==='You lose!') {
      score.loses+=1;
    } else if(result==='You win!'){
      score.wins+=1;
  }
 
  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You picked: <img alt="${playerMove}" class="ss-moves" src="images/${playerMove}-emoji.png"> Computer picked: <img alt="${computerMove}" class="ss-moves" src="images/${computerMove}-emoji.png">`;

}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;  
}

function pickCompMove() {
  const randNum = Math.random();
  
  let computerMove='';

  if(randNum>=0 && randNum<1/3) {
    computerMove = 'Rock';    
  } else if(randNum>=1/3 &&randNum<2/3) {
    computerMove = 'Paper';
  } else if (randNum>=2/3 && randNum < 1) {
    computerMove = 'Scissors';
  }
    
    return computerMove;  
   }

function reSet() {
  score.wins=0;
  score.loses=0;
  score.ties=0;
localStorage.removeItem('score');
updateScoreElement();
}
