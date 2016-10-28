


const BoardLogic = class {
	constructor(cols, rows) {
		this.EMPTY = 0;
		this.RED = 1;
		this.YELLOW = 2;
		this.currentPlayer = this.RED;
		this.cols =  cols;
		this.rows =  rows;
		this.board = this.generateBoard(this.cols, this.rows);
		//Index array for tracking depth of first game piece in each column
		this.depth = new Array(cols).fill(0);

		
	}

	/* Returns an empty col x row matrix  */
	generateBoard(cols, rows) {
		let board =  new Array(cols).fill().map( () => Array(rows).fill(0));

		return board;
	}
	getBoard() {
		return this.board;
	}
	/* Returns the depth of the first free board position */
	getDepth(col) {
		const maxDepth = this.rows;
		if( col < 0 || col >= this.cols) {
			return -1;
		}
		for (let currentDepth = 0; currentDepth < maxDepth; currentDepth++) {
			if (this.board[col][this.rows] != 0) {
				return currentDepth;
			}
		}
		return maxDepth;
	}
	/* Attempts to play a piece in seleted column
	   Returns true if valid play */
	play(col) {
		//If column is full do nothing
		if (this.getDepth(col) >= this.rows || col < 0 || col >= this.cols) {
			return false;
		}
		this.board[col][this.getDepth(col)] = this.currentPlayer;
		// console.log(JSON.stringify(this.board));
		this.currentPlayer = this.currentPlayer === this.RED ? this.YELLOW : this.RED;
		return true;
	}
}



module.exports = BoardLogic;