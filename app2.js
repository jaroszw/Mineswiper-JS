document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 10;
  let squares = [];
  const bombAmount = 20;

  function createBoard() {
    const bombArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = emptyArray.concat(bombArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      square.addEventListener("click", function (e) {
        click(square);
      });
    }

    for (let i = 0; i < squares.length; i++) {
      const isLeftEdge = i % width === 0;
      const isRightEdge = (i + 1) % width === 0;

      let total = 0;

      if (squares[i].classList.contains("valid")) {
        if (
          i > 0 &&
          i != isLeftEdge &&
          squares[i - 1].classList.contains("bomb")
        )
          total++;

        console.log(total);
      }

      //   console.log(isLeftEdge);
    }
  }

  createBoard();
});
