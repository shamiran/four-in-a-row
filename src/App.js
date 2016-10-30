import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Four in a row! </h1>
        <GameContainer/>
      </div>
    );
  }
}
class GameContainer extends Component {
  render() {
    return (
      <div className="GameContainer"> 
        <MenuBar />
        <BoardContainer />
      </div>
    );
  }
}
class MenuBar extends Component {
  render() {
    return (
      <div className="MenuBar">
        <NamePicker className="MenuItem"/>
        <NewGameButton className="MenuItem"/>
      </div>
    );
  }
}
class NamePicker extends Component {
  render() {
    return (
      <div className="PlayerNamePickerContainer">
        <div className="PlayerNamePicker">
          {"Red Player: "}
          <input type="text" defaultValue="Player1" />

            
        </div>
        <div className="PlayerNamePicker">
          {"Yellow Player: "} 
          <input type="text" defaultValue="Player2" />
        </div>
      </div>
    );
  }
}
class NewGameButton extends Component {
  render() {
    return (
      <h1>{"New Game"}</h1>
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
    return(
      <div>
        PlayBar
      </div>
    );
  }
}

class Board extends Component {
  render() {
    return (
      <div>
        Board
      </div>
    );
  }

}

export default App;
