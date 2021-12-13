import React, { Component } from "react";
import Circle from "./Circle";
import "./index.css";
import { circles } from "./circles";
import GameOver from "./GameOver";
import clickSound from "./assets/sounds/clickSound.wav";
import gameOver from "./assets/sounds/gameOver.wav";

let gameOverSound = new Audio(gameOver);

let dogSound = new Audio(clickSound);

const clickedList = [];
const activeList = [];

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
    pace: 1500,
    rounds: 0,
    gameStart: false,
    maxscore: 0,
  };

  timer = undefined;

  clickPlay = () => {
    if (dogSound) {
      dogSound.play();
    } else {
      dogSound.currentTime = 0;
    }
  };

  clickHandler = (id) => {
    this.clickPlay();

    console.log("you clicked: ", id);

    if (this.state.current !== id) {
      this.stopHandler();
      return;
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
    gameOverSound.play();
    clearTimeout(this.timer);

    this.setState({
      gameOver: true,
      current: 0,
      gameStart: false,
    });
  };

  closeHandler = () => {
    if (this.state.score > this.state.maxscore) {
      this.setState({
        maxscore: this.state.score,
      });
    }
    this.setState({
      gameOver: false,
      score: 0,
      pace: 1500,
      rounds: 0,
    });
  };

  render() {
    return (
      <div className="app">
        {this.state.gameOver && (
          <GameOver score={this.state.score} close={this.closeHandler} />
        )}
        <h1> Dog fetch bone Game </h1>
        <p>Your score: {this.state.score}</p>

        <div className="circles">
          {circles.map((c) => (
            <Circle
              key={c.id}
              color={c.color}
              id={c.id}
              click={() => this.clickHandler(c.id)}
              active={this.state.current === c.id}
              disabled={this.state.gameStart}
            />
          ))}
        </div>
        <div className="button_container">
          <button
            className="start"
            disabled={this.state.gameStart}
            onClick={this.startHandler}
          >
            Start
          </button>
          <button
            className="stop"
            disabled={!this.state.gameStart}
            onClick={this.stopHandler}
          >
            Stop
          </button>
        </div>
      </div>
    );
  }
}

export default App;

//
