

const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let turns = 0;
let record = 100000;
let match = 0;

restart();

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip'); 

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        turns += 1;
        document.querySelector('.turns').innerHTML = 'TURNS: ' + turns;
        checkForMatch();
    }
}

function checkForMatch() {
    if(firstCard.dataset.framework === secondCard.dataset.framework){
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    match++;
    if (match === 5){
    //confetti
  const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
      }
}

function unflipCards() {
    lockBoard = true;
    

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard()
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function restart() {
    let check = true;

    cards.forEach( card => {
        if(!card.classList.contains('flip')) check = false;
    });

    if(check && turns < record ){
       record = turns;
       document.querySelector('.record').innerHTML = 'MY RECORD: ' + record;
    }

    turns = 0;
    document.querySelector('.turns').innerHTML = 'TURNS: ' + turns;

    cards.forEach( card => {
        card.classList.remove('flip');
    })

    setTimeout(() => {
        shuffle();
    }, 2*1000);

    cards.forEach(card => card.addEventListener('click', flipCard));
    resetBoard();
}

function refreshGame() {
    shuffle();
    window.location.reload(true);   }

  const time = 2 * 60 * 1000;
  const times = setTimeout(refreshGame, time);

  function exitGame(){
    let warn = window.confirm('Do you really want to exit the game ?');
      if (warn === true) {
          document.getElementById('exit').innerHTML=refreshGame();
      } 
  }

  function refergame(){
    if(main.style.display === 'none'){
      main.style.display = 'block';
      startgame.style.display = 'none';
    }
    else{
      main.style.display = 'none';
      startgame.style.display = 'block';
    }

  }

  function gameLevel(){
    const wrapperEasy = document.getElementById("memory-card-wrapper-easy");
    const wrapperHard = document.getElementById("memory-card-wrapper-hard");
    console.log('here');

    if(wrapperEasy.style.display === 'none'){
      wrapperEasy.style.display = 'flex';
      wrapperHard.style.display = 'none';
    }
    else{
      wrapperEasy.style.display = 'none';
      wrapperHard.style.display = 'flex';
    }
  }

  window.onload = function(){
    refergame();
    startgame.style.display = 'flex';
  }

 