


const BoardLogic = class {
	constructor(cols, rows) {
		this.EMPTY = 0;
		this.RED = 1;
		this.YELLOW = 2;
		this.RED_WIN = 3;
		this.YELLOW_WIN = 4;
		this.GAME_CONTINUES = 5;
		this.GAME_DRAW = 6;
		this.currentPlayer = this.RED;
		this.cols =  cols;
		this.rows =  rows;
		this.board = this.generateBoard(this.cols, this.rows);
		//Index array for tracking height of first game piece in each column
		this.height = new Array(cols).fill(0);

		
	}

	/* Returns an empty col x row matrix  */
	generateBoard(cols, rows) {
		let board =  new Array(cols).fill().map( () => Array(rows).fill(0));

		return board;
	}
	getBoard() {
		return this.board;
	}
	/* Returns the height of the first free board position */
	// TODO: Make it return something else than maxHeight
	getHeight(col) {
		const maxHeight = this.rows;
		// console.log(this.board);
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
	   Returns true if valid play */
	play(col) {
		//If column is full do nothing
		if (this.getHeight(col) >= this.rows || col < 0 || col >= this.cols) {
			return false;
		}
		//Do the play and check if it results in a win
		this.board[col][this.getHeight(col)] = this.currentPlayer;
		// console.log(JSON.stringify(this.board));
		this.currentPlayer = this.currentPlayer === this.RED ? this.YELLOW : this.RED;

		return true;
	}
	/* Checks if the last placed game piece in the column results in a win */
	checkForWin() {

		//Vertically
		for (let col = 0; col < this.cols; col++) {
			for(let row = 0; row < this.rows - 3; row++) {
				let currentPiece = this.board[col][row];
				if (currentPiece != this.EMPTY &&
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
				if (currentPiece != this.EMPTY &&
					currentPiece === this.board[col + 1][row] && 
					currentPiece === this.board[col + 2][row] && 
					currentPiece === this.board[col + 3][row]) {
					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN;
				}
			}
		}
		//Diagonally rightwards & downwards
		for (let row = 3; row < this.rows; row++) {
			
			let col = 0;
			for(let i = 0 ; i < Math.min(row + 1, this.cols); i++) {
				let currentPiece = this.board[i][row - i];
				if (currentPiece != this.EMPTY &&
					currentPiece === this.board[i + 1][row - i - 1] &&
					currentPiece === this.board[i + 2][row - i - 2] &&
					currentPiece === this.board[i + 3][row -i - 3]) {
					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN;
				}

			}
			
		}
		for (let col = 1; col < this.cols - 3; col++) {
			let initialRow = this.rows - 1;
			for(let i = 0; i < Math.min(this.cols - col, this.rows); i++) {
				let currentPiece = this.board[col + i][initialRow];

				if (currentPiece != this.EMPTY &&
					currentPiece === this.board[col + i + 1][initialRow - i - 1] &&
					currentPiece === this.board[col + i + 2][initialRow - i - 2] &&
					currentPiece === this.board[col + i + 3][initialRow - i - 3]) {
					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN;
				}

			}
		}
		//Diagonally leftwards & downwards
		for (let col = 3; col < this.cols; col++) {
			let initialRow = this.rows - 1;
			for(let i = 0; i < Math.min(col, this.rows); i ++) {
				let currentPiece = this.board[col - i][initialRow -  i];
				if (currentPiece != this.EMPTY &&
					currentPiece === this.board[col - i - 1][initialRow - i - 1] &&
					currentPiece === this.board[col - i - 2][initialRow - i - 2] &&
					currentPiece === this.board[col - i - 3][initialRow - i - 3]) {

					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN;
				}
			}
		}
		for (let row = 3; row < this.rows - 2; row ++) {
			let initialCol = this.cols - 1;
			for (let i = 0; i < Math.min(row, this.cols); i ++) {
				let currentPiece = this.board[row][initialCol];
				if (currentPiece != this.EMPTY &&
					currentPiece === this.board[initialCol - i - 1][row - i - 1] &&
					currentPiece === this.board[initialCol - i - 2][row - i - 2] &&
					currentPiece === this.board[initialCol - i - 3][row - i - 3]) {

					return currentPiece === this.RED ? this.RED_WIN : this.YELLOW_WIN;
				}
			}
		}

		for (let col = 0; col < this.cols; col++) {
			if (col != this.EMPTY) {
				return this.GAME_CONTINUES
			}
		}
		

		return this.GAME_DRAW;
		

	}
}



module.exports = BoardLogic;