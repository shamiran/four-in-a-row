import React, { Component } from 'react';
import './App.css';
import BoardLogic from './boardLogic.js';
import HighScore from './highScore.js';

const GRID_SIZE = 100;
const boardLogic = new BoardLogic(7,6);
const highScore = new HighScore();
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
  newGame() {
    let newBoard = boardLogic.generateBoard(7,6);
    console.log(newBoard);
    this.setState({boardLogic:boardLogic});

  }
 toggleHighScore() {
  let showHighScore = this.state.showHighScore ? false : true;
  console.log("toggle");
  this.setState({showHighScore: showHighScore});
 } 
  updatePlayerNames(redPlayerInput, yellowPlayerInput) {
    console.log(redPlayerInput, yellowPlayerInput); 
    console.log(this.state);
    this.setState({
      redPlayerName : redPlayerInput, 
      yellowPlayerName : yellowPlayerInput});
  }
  render() {
      return (
      <div className="App">

        <GameContainer 
        boardLogic={this.state.boardLogic} 
        onPlay={this.updateBoard.bind(this)}
        onSubmitName={this.updatePlayerNames.bind(this)}
        onNewGame={this.newGame.bind(this)}
        onToggleHighScore={this.toggleHighScore.bind(this)}
        showHighScore={this.state.showHighScore}
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
        <MenuBar 
        onSubmitName={this.props.onSubmitName}
        onNewGame={this.props.onNewGame}
        onToggleHighScore={this.props.onToggleHighScore}  />
        
        {this.props.showHighScore ? <HighScorePanel />  : null}
        <TurnInfo 
        boardLogic={this.props.boardLogic}
        redPlayerName={this.props.redPlayerName}
        yellowPlayerName={this.props.yellowPlayerName}
        />
        <BoardContainer 
        className="BoardContainer" 
        boardLogic={this.props.boardLogic} 
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
        <div className="MenuButtonContainer">
          <button className="MenuButton" onClick={this.props.onNewGame} >
            NEW GAME
          </button>
          <button className="MenuButton" onClick={this.props.onToggleHighScore}>
            HIGH SCORE
          </button>
        </div>
      </div>
    );
  }
}
/* The panel which contains the high score list */
class HighScorePanel extends Component {
  render() {
    const importedHighScore = highScore.getHighScore();
    const highScoreList = [];
    for (let i = 0; i < importedHighScore.length; i++) {

      highScoreList.push(
        <tr key={i}>  
          <td key={i.toString() + ".index"}> 
            {i} 
          </td>
          <td key={i.toString() + ".name"}>
            {importedHighScore[i].playerName}
          </td>
          <td key={i.toString() + ".wins"}> 
            {importedHighScore[i].wins} 
          </td>
        </tr>);
    }
    return (
      <table>
        <tbody key="tableBody"> 
          <tr key="tableHeader">
            <th key="rankHeader">
              Rank
            </th>
            <th key="nameHeader">
              Name
            </th>
            <th key="winHeader">
              Wins
            </th>
          </tr>
            {highScoreList}
        </tbody>
      </table>);

  }
}

class TurnInfo extends Component {
  render() {
    let turnInfo = "";
    let checkForWin = this.props.boardLogic.checkForWin();
    let redPlayerName = this.props.redPlayerName;
    let yellowPlayerName = this.props.yellowPlayerName;
    //Check if a player name has been input
    

    

    if (checkForWin === this.props.boardLogic.GAME_CONTINUES) {
      turnInfo = this.props.boardLogic.currentPlayer === this.props.boardLogic.RED ?
      redPlayerName + "'s turn" : yellowPlayerName + "'s turn";
    } else if (checkForWin !== this.props.boardLogic.GAME_DRAW) {
      if(checkForWin === this.props.boardLogic.RED_WIN) {
        turnInfo = redPlayerName + "wins!";
        if (!this.props.boardLogic.winCounted) {
          this.props.boardLogic.winCounted = true;
          highScore.countWin(redPlayerName);
        }
      } else if (checkForWin === this.props.boardLogic.YELLOW_WIN) {
        turnInfo = yellowPlayerName + "wins!";
        if (!this.props.boardLogic.winCounted) {
          this.props.boardLogic.winCounted = true;
          highScore.countWin(yellowPlayerName);
        }
      }
    } else {
      turnInfo = "Draw!";
    }
    return(<div>{turnInfo}</div>);

  }
}
class NamePicker extends Component {
  handleInput(e) {
    this.props.onSubmitName(document.getElementById('redPlayerInput').value,
                            document.getElementById('yellowPlayerInput').value);
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
      width: this.props.boardLogic.cols * (GRID_SIZE + 3),
      height: this.props.boardLogic.rows * (GRID_SIZE + 6),
      backgroundColor: "blue",
      margin:"auto",
    }
    return(<div style={style} className=""> {gridContainer} </div>);
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
