import React from "react";

const GameOver = (props) => {
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Game over</h2>
        <p>Score was :{props.score}</p>
        <button onClick={props.close}>X</button>
      </div>
    </div>
  );
};

export default GameOver;
