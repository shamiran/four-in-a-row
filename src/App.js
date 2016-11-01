import React, { Component } from 'react';
import './App.css';
import BoardLogic from './boardLogic.js';

const GRID_SIZE = 50;
const boardLogic = new BoardLogic(7,6);
class App extends Component {
  constructor () {
    super();
    this.state = {
      boardLogic: boardLogic, 
      redPlayerName : "Player 1",
      yellowPlayerName : "Player 2"
    };
  }
  updateBoard() {
    this.setState({boardLogic:boardLogic});
  } 
  updatePlayerName(color, name) {
    console.log(color, name); 
    console.log(this.state);
    this.setState({color : name});
  }
  render() {
      return (
      <div className="App">

        <GameContainer 
        boardLogic={this.state.boardLogic} 
        onPlay={this.updateBoard.bind(this)}
        onSubmitName={this.updatePlayerName.bind(this)}
        redPlayerName={this.state.redPlayerName} 
        yellowPlayerName={this.state.yellowPlayerName} />
      </div>
    );
  }
}
class GameContainer extends Component {
 render() {
    return (
      <div className="GameContainer"> 
        <MenuBar onSubmitName={this.props.onSubmitName} />
        <TurnInfo 
        boardLogic={this.props.boardLogic}
        redPlayerName={this.props.redPlayerName}
        yellowPlayerName={this.props.yellowPlayerName}
        />
        <BoardContainer boardLogic={this.props.boardLogic} 
         onPlay={this.props.onPlay}   />
      </div>
    );
  }
}
class MenuBar extends Component {
  render() {
    return (
      <div className="MenuBar">
        <NamePicker 
        className="MenuItem"
        onSubmitName={this.props.onSubmitName}
        />
        <NewGameButton className="MenuItem"/>
      </div>
    );
  }
}
//TODO: Change player1, player2 to NamePicker input names
class TurnInfo extends Component {
  render() {
    let turnInfo = "";
    let checkForWin = this.props.boardLogic.checkForWin();
    let redPlayerName = "Player1";
    let yellowPlayerName = "Player2";
    //Check if a player name has been input
    if (document.getElementById('redPlayerInput')!= null && 
        document.getElementById('yellowPlayerInput') != null) {
      redPlayerName = document.getElementById('redPlayerInput').value;
      yellowPlayerName = document.getElementById('yellowPlayerInput').value;
    } 

    

    if (checkForWin === this.props.boardLogic.GAME_CONTINUES) {
      turnInfo = this.props.boardLogic.currentPlayer === this.props.boardLogic.RED ?
      redPlayerName + "'s turn" : yellowPlayerName + "'s turn";
    } else if (checkForWin !== this.props.boardLogic.GAME_DRAW) {
      turnInfo = checkForWin === this.props.boardLogic.RED_WIN ? 
      "Player1 wins!" : "player2 wins!"
    } else {
      turnInfo = "Draw!";
    }
    return(<div>{turnInfo}</div>);

  }
}
class NamePicker extends Component {
  handleInput(e) {

    console.log(document.getElementById('redPlayerInput').value);
    e.preventDefault();
    //this.props.onSubmitName(event.target.name, event.target.value);
  }
  render() {
    return (
      <div className="PlayerNamePickerContainer">
        
        <form onSubmit={this.handleInput.bind(this)}>
          {"Red Player:"} <br/>
          <input 
          type="text" 
          id="redPlayerInput"
          name="redPlayerName" 
          defaultValue="Player1"/> <br/>

            
          {"Yellow Player:"}<br/> 
          <input 
          type="text"
          id="yellowPlayerInput" 
          name="yellowPlayerName" 
          defaultValue="Player2" 
          /> <br/>
          <input type="submit" id="nameSubmit" value="Change Names" />
        </form>
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
class BoardContainer extends Component {
  render() {
    let gridContainer = [];
    let index = 0;
    for (let i = 0; i < this.props.boardLogic.rows; i++) {
      for(let j = 0; j < this.props.boardLogic.cols; j++) {
        gridContainer.push(<Grid 
          boardLogic={this.props.boardLogic}
          row={this.props.boardLogic.rows - 1 - i}
          col={j}
          key={index++}
          onPlay={this.props.onPlay} />
        );
      }
    }
    let style = {
      "width": this.props.boardLogic.cols * (GRID_SIZE + 3),
      "height": this.props.boardLogic.rows * (GRID_SIZE + 3),
      "backgroundColor": "blue",
    }
    return(<div style={style}> {gridContainer} </div>);
  }
}
class Grid extends Component {
  handleClick() {
    if (this.props.boardLogic.play(this.props.col)) {
      this.props.onPlay();
    }
  }
  render() {
      let style = {
      width:GRID_SIZE,
      height:GRID_SIZE,
      display:'inline-block',
      backgroundColor: "blue",
      border:'1px solid black'
    }
    let gridStatus = this.props.boardLogic.board[this.props.col][this.props.row];
    if (gridStatus !== this.props.boardLogic.EMPTY)  {
      style.backgroundColor = gridStatus === this.props.boardLogic.RED ? "red" : "yellow";
      style.borderRadius = '50%';
    } 

    return(<div style={style} onClick={this.handleClick.bind(this)}></div>
    );
  }
}
export default App;
