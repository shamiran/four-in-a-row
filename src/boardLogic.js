


const BoardLogic = class {
	constructor(cols, rows) {
		this.EMPTY = 0;
		this.RED = 1;
		this.YELLOW = 2;
		this.RED_WIN = 3;
		this.YELLOW_WIN = 4;
		this.GAME_CONTINUES = 5;
		this.GAME_DRAW = 6;
		this.GAME_OVER = 7;

		this.currentPlayer = this.RED;
		this.cols =  cols;
		this.rows =  rows;
		//Counter to prevent react high score render function from counting several wins at a time 
		this.winCounted = false;
		this.board = this.generateBoard(this.cols, this.rows);
	}

	/* @Returns an empty columns x rows matrix  */
	generateBoard(cols, rows) {
		this.cols = cols;
		this.rows = rows;
		this.board = new Array(cols).fill().map( () => Array(rows).fill(0));
		this.currentPlayer = this.RED;
		this.winCounted = false;
		return this.board;
	}

	getBoard() {
		return this.board;
	}
	/* @Returns height of the first free board position of column col */
	getHeight(col) {
		const maxHeight = this.rows;
		if( col < 0 || col >= this.cols) {
			return -1;
		}
		for (let currentHeight = 0; currentHeight < maxHeight; currentHeight++) {
			if (this.board[col][currentHeight] === this.EMPTY) {
				return currentHeight;
			}
			
		}
		return maxHeight;
	}
	/* Attempts to play a piece in seleted column
	   @Returns true if valid play */
	play(col) {
		//Check if game is over and if column is full or out of bounds 
		if (this.winCounted === true ||this.getHeight(col) >= this.rows || col < 0 || col >= this.cols) {
			return false;
		}
		this.board[col][this.getHeight(col)] = this.currentPlayer;
		this.currentPlayer = this.currentPlayer === this.RED ? this.YELLOW : this.RED;
		return true;
	}
	/* Checks which player has won, if the game is still ongoing or if the game is a draw
	   @Returns RED_WIN, YELLOW_WIN, GAME_CONTINUES or GAME_DRAW */
	checkForWin() {
		//Vertically
		for (let col = 0; col < this.cols; col++) {
			for(let row = 0; row < this.rows - 3; row++) {
				let currentPiece = this.board[col][row];
				if (currentPiece !== this.EMPTY &&
					currentPiece === this.board[col][row + 1] && 
					currentPiece === this.board[col][row + 2] && 
					currentPiece === this.board[col][row + 3]) {
					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN;
				}
			}	
		}
		//Horizontally
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols - 3; col++) {
				let currentPiece = this.board[col][row];
				if (currentPiece !== this.EMPTY &&
					currentPiece === this.board[col + 1][row] && 
					currentPiece === this.board[col + 2][row] && 
					currentPiece === this.board[col + 3][row]) {
					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN;
				}
			}
		}
		//Diagonally down-right
		for (let col = 0; col < this.cols - 3; col++) {
			for (let row = 3; row < this.rows; row++) {
				let currentPiece = this.board[col][row];
				if (currentPiece !== this.EMPTY &&
					currentPiece === this.board[col + 1][row - 1] &&
					currentPiece === this.board[col + 2][row - 2] &&
					currentPiece === this.board[col + 3][row - 3])
					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN; 
			}
		}
		//Diagonally down-left
		for (let col = 3; col < this.cols; col++) {
			for (let row = 3; row < this.rows; row++) {
				let currentPiece = this.board[col][row];
				if (currentPiece !== this.EMPTY &&
					currentPiece === this.board[col - 1][row - 1] &&
					currentPiece === this.board[col - 2][row - 2] &&
					currentPiece === this.board[col - 3][row - 3])
					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN; 
			}
		}
		for (let col = 0; col < this.cols; col++) {
			if (this.board[col][this.rows - 1] === this.EMPTY) {
				return this.GAME_CONTINUES
			}
		}
		return this.GAME_DRAW;
		

	}
	/* Helper function for preventing react counting several wins at a time */
	winCounted() {
		if (this.winCounted) {
			return true;
		} else {
			this.winCounted = true;
			return false;
		}
	}
}



module.exports = BoardLogic;