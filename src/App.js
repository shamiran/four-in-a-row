import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Four in a row! </h1>
        <BoardContainer/>
      </div>
    );
  }
}
/* Contains the board and playbar */
class BoardContainer extends Component {
  render() {
    return(
      <div className="BoardContainer"> 
        <PlayBar/>
        <Board />
      </div>
    );
  }
}
/* Contains the bar used for selecting which column to place your gamepiece in */
class PlayBar extends Component {
  render() {
    return()
  }
}

class Board extends Component {
  render() {
    return ()
  }

}

export default App;
