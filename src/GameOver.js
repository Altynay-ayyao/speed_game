import React from "react";

const GameOver = (props) => {
  return (
    <div className="overlay">
      <div className="gameover_box">
        <h2>GAME OVER</h2>
        <p> Score was: {props.score} </p>
        <button className="end" onClick={props.close}>
          X
        </button>
      </div>
    </div>
  );
};

export default GameOver;
