import React, { Component } from "react";
import Circle from "./Circle";
import "./index.css";
import { circles } from "./circles";
import GameOver from "./GameOver";

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
    //each of circle has their own id and color
  };

  timer = undefined;
  pace = 1500;

  clickHandler = () => {
    this.setState({
      score: this.state.score + 10,
    });
  };

  nextCircle = () => {
    let nextActive;

    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
    });

    this.pace *= 0.95;

    this.timer = setTimeout(this.nextCircle, this.pace);

    console.log("active circles is", this.state.current);
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer);
    this.setState({
      gameOver: true,
    });
  };

  render() {
    return (
      <div>
        {this.state.gameOver && <GameOver score={this.state.score} />}
        <div className="text">
          <h1>Speed Game</h1>
          <p>Your score is:{this.state.score}</p>
        </div>

        <div className="circles">
          {circles.map((c) => {
            return (
              <Circle
                key={c.id}
                color={c.color}
                id={c.id}
                whatever={this.clickHandler}
                active={this.state.current === c.id}
              />
            ); //when using mapping, react wants to know the specific element, so elements has to have id, key is used for that
          })}
        </div>
        <div className="button_container">
          <button onClick={this.startHandler}>Start</button>
          <button onClick={this.stopHandler}>Stop</button>
        </div>
      </div>
    );
  }
}

export default App;
