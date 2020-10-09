const grid = document.querySelector(".grid");
const width = 10;
const bombAmount = 5;
const squares = [];
let isGameOver = false;
let flags = 0;
const result = document.getElementById("result");

function createBoard() {
  const bombArray = Array(bombAmount).fill("bomb");
  const validArray = Array(width * width - bombAmount).fill("valid");
  const gameArray = validArray.concat(bombArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  for (i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    square.classList.add(shuffledArray[i]);

    squares.push(square);
    grid.appendChild(square);

    square.addEventListener("click", (e) => click(e.target));
    square.addEventListener("contextmenu", (e) => addFlag(e));
  }

  //BOMB COLOR
  squares.forEach((square) =>
    square.classList.contains("bomb")
      ? (square.style.backgroundColor = "red")
      : ""
  );

  for (i = 0; i < squares.length; i++) {
    const isLeftEdge = i % width === 0;
    const isRightEdge = i % width === width - 1;
    let total = 0;

    if (squares[i].classList.contains("valid")) {
      if (
        i > 9 &&
        !isLeftEdge &&
        squares[i - 1 - width].classList.contains("bomb")
      )
        total++;
      if (i > 9 && squares[i - width].classList.contains("bomb")) total++;
      if (
        i > 9 &&
        !isRightEdge &&
        squares[i + 1 - width].classList.contains("bomb")
      )
        total++;
      if (
        i < 90 &&
        !isLeftEdge &&
        squares[i - 1 + width].classList.contains("bomb")
      )
        total++;
      if (i < 90 && squares[i + width].classList.contains("bomb")) total++;
      if (
        i < 90 &&
        !isRightEdge &&
        squares[i + width + 1].classList.contains("bomb")
      )
        total++;
      if (!isRightEdge && squares[i + 1].classList.contains("bomb")) total++;
      if (!isLeftEdge && squares[i - 1].classList.contains("bomb")) total++;

      squares[i].setAttribute("data", total);
    }
  }
}

function click(square) {
  if (isGameOver) return;
  if (square.classList.contains("checked") || square.classList.contains("flag"))
    return;
  if (square.classList.contains("bomb")) {
    gameOver(square);
  } else {
    let total = square.getAttribute("data");
    if (total != 0) {
      square.classList.add("checked");
      if (total == 1) square.classList.add("one");
      if (total == 2) square.classList.add("two");
      if (total == 3) square.classList.add("three");
      if (total == 4) square.classList.add("four");
      square.innerHTML = total;
      return;
    }
    recursieveCheck(square, square.id);
  }
  square.classList.add("checked");
}

function recursieveCheck(square, currentId) {
  const isLeftEdge = square.id % width === 0;
  const isRightEdge = square.id % width === width - 1;

  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge) {
      const newId = parseInt(currentId) - 1;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }

    if (currentId > 9) {
      const newId = currentId - width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }

    if (currentId < 99 && !isRightEdge) {
      const newId = parseInt(currentId) + 1;
      const newSquare = document.getElementById(newId);
      console.log(newSquare);
      click(newSquare);
    }

    if (currentId < 90) {
      const newId = parseInt(currentId) + width;
      const newSquare = document.getElementById(newId);
      console.log(newSquare);
      click(newSquare);
    }

    if (currentId > 9 && !isLeftEdge) {
      const newId = parseInt(currentId) - (width + 1);
      const newSquare = document.getElementById(newId);
      console.log(newSquare);
      click(newSquare);
    }

    if (currentId > 9 && !isRightEdge) {
      const newId = parseInt(currentId) - width + 1;
      const newSquare = document.getElementById(newId);
      console.log(newSquare);
      click(newSquare);
    }
  }, 20);
}

function addFlag(e) {
  e.preventDefault();
  const square = e.target;
  console.log(e.target);

  if (square.classList.contains("checked") || square.innerHTML != 0) return;
  if (!square.classList.contains("checked")) {
    if (square.classList.contains("flag")) {
      square.classList.remove("flag");
      flags--;
    } else if (flags < bombAmount) {
      square.classList.add("flag");
      flags++;
      checkForWin();
    }
  }
}

function checkForWin() {
  let matches = 0;
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].classList.contains("flag") &&
      squares[i].classList.contains("bomb")
    ) {
      matches++;
    }

    if (matches === bombAmount) {
      result.innerHTML = "YOU WIN";
      squares.forEach((square) => {
        const total = square.getAttribute("data");
        if (total != 0) {
          square.innerHTML = total;
        }
        square.classList.add("checked");
      });
    }
  }
}

function gameOver() {
  squares.forEach((square) => {});
  isGameOver = true;
}

createBoard();
