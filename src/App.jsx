import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setdice] = useState(() => generateAllNewDice());
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const { width, height } = useWindowSize();
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    console.log(button);
    gameWon && button.focus();
  }, [gameWon]);

  // Alternative way for Array.every method
  // let allHeld = true;
  // let allSameValue = true;

  // for (let i = 0; i < dice.length; i++) {
  //   if (!dice[i].isHeld) {
  //     allHeld = false;
  //   }
  //   if (dice[i].value !== dice[0].value) {
  //     allSameValue = false;
  //   }

  //   if (!allHeld && !allSameValue) {
  //     break;
  //   }
  // }

  // if (allHeld && allSameValue) {
  //   console.log("Game win");
  // }

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
  }

  function rollDice() {
    // setdice(generateAllNewDice());
    if (!gameWon) {
      setdice((prevdice) =>
        prevdice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setdice(generateAllNewDice());
    }
  }

  function hold(id) {
    setdice((prevdice) =>
      prevdice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        hold={() => hold(die.id)}
      />
    );
  });

  return (
    <main>
      {gameWon && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden", // prevent any overflow scroll
            zIndex: 9999, // optional: make sure it overlays
            pointerEvents: "none", // optional: so it doesn't block clicks
          }}
        >
          <Confetti width={width} height={height} />
        </div>
      )}
      <div className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {gameWon && <p className="won-msg">You Win!</p>}

      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} onClick={rollDice} className="roll-dice-btn">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
