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
    pace: 1500,
    rounds: 0,
  };

  timer = undefined;

  clickHandler = (id) => {
    console.log("you click", id);
    if (this.state.current !== id) {
      this.startHandler();
      return; //return will stop it
    }
    this.setState({
      score: this.state.score + 10,
      rounds: 0,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 5) {
      this.stopHandler();
      return; //if u found it, then stop here
    }
    let nextActive;

    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace);

    console.log("active circles is", this.state.current);
    console.log("round number", this.state.current);
  };

  startHandler = () => {
    this.nextCircle();
    this.setState({
      gameStart: true,
    });
  };

  stopHandler = () => {
    clearTimeout(this.timer);
    this.setState({
      gameOver: true,
      current: 0,
      gameStart: false,
    });
  };

  closeHandler = () => {
    this.setState({
      gameOver: false,
      score: 0,
      pace: 1500,
      rounds: 0,
    });
  };

  render() {
    return (
      <div>
        {this.state.gameOver && (
          <GameOver score={this.state.score} close={this.closeHandler} />
        )}
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
                whatever={() => this.clickHandler(c.id)} //finding the data on the event
                active={this.state.current === c.id}
              />
            ); //when using mapping, react wants to know the specific element, so elements has to have id, key is used for that
          })}
        </div>
        <div className="button_container">
          <button disabled={this.state.gameStart} onClick={this.startHandler}>
            Start
          </button>
          <button onClick={this.stopHandler}>Stop</button>
        </div>
      </div>
    );
  }
}

export default App;

//
