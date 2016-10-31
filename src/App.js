import React, { Component } from 'react';
import './App.css';
import BoardLogic from './boardLogic.js';

const GRID_SIZE = 50;
const boardLogic = new BoardLogic(7,6);
class App extends Component {
  constructor () {
    super();
    this.state = {boardLogic: boardLogic};
    /*let boardLogic = new BoardLogic(7,6);
    props = {boardLogic : {boardLogic}};
    console.log(boardLogic);
    props = ({boardLogic: {boardLogic}});
    this.setState({boardLogic: props.boardLogic});
*/  }
  updateBoard() {
    this.setState({boardLogic:boardLogic});
    console.log("Hey");

  }
  render() {
      return (
      <div className="App">
        <h1> Four in a row! </h1>

        <GameContainer boardLogic={this.state.boardLogic} onPlay={this.updateBoard.bind(this)}/>}
      </div>
    );
  }
}
class GameContainer extends Component {
 render() {
    return (
      <div className="GameContainer"> 
        <MenuBar />
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
class BoardContainer extends Component {
  render() {
    let gridContainer = [];
    let index = 0;
    for (let i = 0; i < this.props.boardLogic.rows; i++) {
      for(let j = 0; j < this.props.boardLogic.cols; j++) {
        gridContainer.push(<Grid 
          boardLogic={this.props.boardLogic}
          row={i}
          col={j}
          key={index++}
          onPlay={this.props.onPlay} />
        );
      }
    }
    let style = {
      "width": this.props.boardLogic.cols * (GRID_SIZE + 3),
      "height": this.props.boardLogic.rows * (GRID_SIZE + 3),
      "backgroundColor": "yellow",
    }
    return(<div style={style}> {gridContainer} </div>);
  }
}
class Grid extends Component {
  handleClick() {
    if (this.props.boardLogic.play(this.props.col)) {
      console.log("click");
      this.props.onPlay();
    }
  }
  render() {
    let gridStatus = this.props.boardLogic.board[this.props.col][this.props.row];
    let backgroundColor = "white";
    if (gridStatus !== this.props.boardLogic.EMPTY)  {
      backgroundColor = gridStatus === this.props.boardLogic.RED ? "red" : "yellow";
    } 
      let style = {
      width:GRID_SIZE,
      height:GRID_SIZE,
      display:'inline-block',
      "backgroundColor": backgroundColor,
      border:'1px solid blue'
    }
    return(<div style={style} onClick={this.handleClick.bind(this)}>X</div>
    );
  }
}


/* Contains the bar used for selecting which column to place your gamepiece in */
/*class PlayBar extends Component {
  render() {
    return(
      <div>
        PlayBar
      </div>
    );
  }
}*/
/* Contains a row x col table, beware coordinate axis is flipped from boardLogic */
/*class Board extends Component {
  render() {
    return (
      <div className="Board">
        <table>
          <tbody>
              <tr> <PlayBar /> </tr>
              {for (let row= 0; row < this.props.board.rows; row++) {
                return <RowContainer row=row />
              }}
            
          </tbody>
        </table>
      </div>
    );
  }

}*/


export default App;
