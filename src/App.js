import React, { Component } from 'react';
import './App.css';
import BoardLogic from './boardLogic.js';
import HighScore from './highScore.js';

const boardLogic = new BoardLogic(7,6);
const highScore = new HighScore();

/* Highest level react component containing the entirety of the view and model for the game */
class App extends Component {
  constructor () {
    super();
    this.state = {
      boardLogic: boardLogic, 
      redPlayerName : "Player 1",
      yellowPlayerName : "Player 2"
    };
  }
  /* Triggered by Grid component when a valid play has been made */
  updateBoard() {
    this.setState({boardLogic:boardLogic});
  } 
  /* Triggered by NewGame button component when pressed */ 
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
      className="GameContainer"
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
/* In hindsight superfluos container class which could've been integrated with App */
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
/* Contains the menu components */
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
/* The panel which contains the high score list, utilizes highScore.js to store and read data */
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
      <table className="HighScoreTable">
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
    if (checkForWin === this.props.boardLogic.GAME_CONTINUES) {
      turnInfo = this.props.boardLogic.currentPlayer === this.props.boardLogic.RED ?
      redPlayerName + "'s turn" : yellowPlayerName + "'s turn";
    } else if (checkForWin !== this.props.boardLogic.GAME_DRAW) {
        if(checkForWin === this.props.boardLogic.RED_WIN) {
          turnInfo = redPlayerName + "wins!";
          //Makes sure that the win is counted only once in in the high score
          if (!this.props.boardLogic.winCounted) {
            this.props.boardLogic.winCounted = true;
            highScore.countWin(redPlayerName);
          }
        } 
        else if (checkForWin === this.props.boardLogic.YELLOW_WIN) {
          turnInfo = yellowPlayerName + "wins!";
          //Makes sure that the win is counted only once in in the high score
          if (!this.props.boardLogic.winCounted) {
            this.props.boardLogic.winCounted = true;
            highScore.countWin(yellowPlayerName);
          }
        }
    } else {
      turnInfo = "Draw!";
    }
    return(<h2>{turnInfo}</h2>);

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
/* Contains the grid components which comprise the game board */
class BoardContainer extends Component {
  render() {
    let gridContainer = [];
    let index = 0;
    for (let i = 0; i < this.props.boardLogic.rows; i++) {
      for(let j = 0; j < this.props.boardLogic.cols; j++) {
        gridContainer.push(<Grid 
          className="Grid"
          boardLogic={this.props.boardLogic}
          //The logic for the row index is a hack to compensate for the fact that 
          //the grids get positions from top to bottom by inverting its index
          row={this.props.boardLogic.rows - 1 - i}
          col={j}
          key={index++}
          onPlay={this.props.onPlay} />
        );
      }
    }
    return(
      //Wrapper for ensuring correct board ratio aspect across different screen sizes
      <div className="BoardWrapper">
        <div className="BoardContainer"> {gridContainer} </div>
      </div>
    );
  }
}
/* Component for the actual grids comprising the game board, uses the prop handleClick to 
   trigger re-render when a valid play has been made */
class Grid extends Component {
  handleClick() {
    if (this.props.boardLogic.play(this.props.col)) {
      this.props.onPlay();
    }
  }
  render() {
      let style = {
    }
    let gridStatus = this.props.boardLogic.board[this.props.col][this.props.row];
    if (gridStatus !== this.props.boardLogic.EMPTY)  {
      style.backgroundColor = gridStatus === this.props.boardLogic.RED ? "red" : "yellow";
    } 

    return(<div style={style} className="Grid" onClick={this.handleClick.bind(this)}></div>
    );
  }
}
export default App;
