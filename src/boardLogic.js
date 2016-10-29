


const BoardLogic = class {
	constructor(cols, rows) {
		this.EMPTY = 0;
		this.RED = 1;
		this.YELLOW = 2;
		this.RED_WIN = 3;
		this.YELLOW_WIN = 4;
		this.GAME_CONTINUES = 5;
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
	checkForWin(col) {
		let row = this.getHeight(col) - 1;
		let currentPlayer = this.board[col][row];
		let sum = [];

		//Down
		let tempSum = 1;
		for (let i = row; i > 0; i--) {
			if (this.board[col][i] != currentPlayer) {
				break;
			}
			tempSum++;
		}

		sum.push(tempSum);
		//Horizontally to the right
		tempSum = 1;
		for (let i = col + 1; i < Math.min(col + 4, this.cols); i++) {
			if (this.board[i][row] != currentPlayer){
				break;
			}
			tempSum++;
		}
		//Horizontally to the left
		for (let i = col; i > Math.max(col - 4, 0); i--) {
			if(this.board[i][row] != currentPlayer) {
				break;
			}
			tempSum++;
		}
		sum.push(tempSum);
		//Diagonally up to the right

		//Diagonally down to the left

		//Diagonally up to the left

		//Diagonally down to the right
		// console.log(this.board);
		// console.log(Math.max.apply(Math, sum));
		if(Math.max.apply(Math,sum) >= 4) {
			return currentPlayer === this.RED ? this.RED_WIN : this.YELLOW_WIN;
		} else {
			return this.GAME_CONTINUES;
		}

	}
}



module.exports = BoardLogic;