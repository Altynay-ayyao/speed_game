import React from "react";

const closeHandler = () => {
  window.location.reload();
};

const GameOver = (props) => {
  return (
    <div className="overlay" onChick={closeHandler}>
      <div className="popup">
        <h2>Game over</h2>
        <p>Score was :{props.score}</p>
        <button onClick={closeHandler}>X</button>
      </div>
    </div>
  );
};

export default GameOver;
