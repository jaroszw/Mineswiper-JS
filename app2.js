document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const squares = [];
  const width = 10;
  const bombAmount = 20;
  let isGameOver = false;
  let flags = 0;

  const bombArray = Array(bombAmount).fill('bomb');
  const emptyArray = Array(width * width - bombAmount).fill('valid');
  const gameArray = emptyArray.concat(bombArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);

      // if (square.classList.contains('bomb')) {
      //   square.style.backgroundColor = 'red';
      // }

      squares.push(square);
      grid.appendChild(square);

      square.addEventListener('click', (e) => {
        click(square);
      });

      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };
    }

    for (let i = 0; i < squares.length; i++) {
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;
      let total = 0;

      if (
        i > 9 &&
        !isLeftEdge &&
        squares[i - (width + 1)].classList.contains('bomb')
      )
        total++;
      if (i > 9 && squares[i - width].classList.contains('bomb')) total++;
      if (
        i > 9 &&
        !isRightEdge &&
        squares[i + 1 - width].classList.contains('bomb')
      )
        total++;
      if (!isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
      if (
        i < 90 &&
        !isLeftEdge &&
        squares[i + (width - 1)].classList.contains('bomb')
      )
        total++;
      if (
        i < 90 &&
        !isRightEdge &&
        squares[i + (width + 1)].classList.contains('bomb')
      )
        total++;
      if (i < 90 && squares[i + width].classList.contains('bomb')) total++;
      if (!isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
      squares[i].setAttribute('data', total);
    }
  }
  createBoard();

  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains('checked') && flags < bombAmount) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag');
        square.innerHTML = '🚩';
        checkForWin();
        flags++;
      } else {
        square.classList.remove('flag');
        square.innerHTML = '';
        flags--;
      }
    }
  }

  function click(square) {
    let currentId = square.id;
    if (isGameOver) return;
    if (
      square.classList.contains('checked') ||
      square.classList.contains('flag')
    )
      return;
    if (square.classList.contains('bomb')) {
      gameOver(square);
      return;
    } else {
      let total = square.getAttribute('data');
      if (total != 0) {
        square.classList.add('checked');
        if (total == 1) square.classList.add('one');
        if (total == 2) square.classList.add('two');
        if (total == 3) square.classList.add('three');
        if (total == 4) square.classList.add('four');
        square.innerHTML = total;
        return;
      }
      checkSquare(square, currentId);
    }
    square.classList.add('checked');
  }

  function checkSquare(square, currentId) {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = parseInt(currentId) - 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = parseInt(currentId) + 1 - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = parseInt(currentId) - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 99 && !isRightEdge) {
        const newId = parseInt(currentId) + 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89 && !isRightEdge) {
        const newId = parseInt(currentId) + 1 + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90) {
        const newId = parseInt(currentId) + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89 && !isLeftEdge) {
        const newId = parseInt(currentId) + width - 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 15);
  }

  function gameOver(square) {
    console.log('BOOM');
    isGameOver = true;

    squares.forEach((square) => {
      if (square.classList.contains('bomb')) {
        square.innerText = '💣';
        square.classList.add('explode');
      }
    });
  }

  function checkForWin() {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains('flag') &&
        squares[i].classList.contains('bombs')
      ) {
        matches++;
      }
      if (matches === bombAmount) {
        console.log('WIN');
        isGameOver(true);
      }
    }
  }
});
