import Confetti from "react-confetti";
import Box from "./Box";
import { useEffect, useState } from "react";

function Board() {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [curSign, setCurSign] = useState("X");
  const [winner, setWinner] = useState("");
  const [isMatchDraw, setisMatchDraw] = useState(false);

  const checkForWinner = () => {
    const winnerGrp = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 3, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnerGrp.length; i++) {
      let [pos1, pos2, pos3] = winnerGrp[i];
      if (
        boxes[pos1] !== "" &&
        boxes[pos1] === boxes[pos2] &&
        boxes[pos2] === boxes[pos3]
      ) {
        setWinner(boxes[pos1]);
        break;
      }
    }
  };

  const addSign = (idx) => {
    // if box is filled, no need to do anything
    if (boxes[idx] !== "" || winner !== "") {
      return;
    }

    // update the box value
    const newboxes = boxes.slice();
    newboxes[idx] = curSign;
    setBoxes(newboxes);

    // update the sign
    setCurSign(curSign === "O" ? "X" : "O");
  };
  const checkForDraw = () => {
    const allChecked = boxes.filter((box) => box === "").length === 0;
    if (winner === "" && allChecked) {
      setisMatchDraw(true);
    }
  };
  useEffect(() => {
    checkForWinner();
    checkForDraw();
  }, [boxes]);

  const retartGame = () => {
    setBoxes(Array(9).fill(""));
    setWinner("");
    setCurSign("");
    setisMatchDraw(false);
  };
  return (
    <>
      {winner !== "" && <h1>Winner is {winner}!!</h1>}
      {isMatchDraw && <h1>MATCH DRAW!!!</h1>}
      {winner !== "" && <Confetti />}
      <div className="board">
        {boxes.map((boxValue, idx) => (
          <Box sign={boxValue} addSign={() => addSign(idx)} />
        ))}
      </div>

      <button onClick={retartGame}>Restart</button>
    </>
  );
}

export default Board;
