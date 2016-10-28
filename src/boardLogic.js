


/* Creates the board used for game logic  */
const BoardLogic = class {
	constructor(rows, cols) {
		this.rows =  rows;
		this.cols =  cols;
		this.board = this.generateBoard(this.rows, this.cols);
		//Index array for tracking depth of first game piece in each column
		this.index = new Array(cols).fill(0);
		BoardLogic.EMPTY = 0;
		BoardLogic.RED = 1;
		BoardLogic.BLUE = 2;
		
	}

	/* Generates an empty m x n matrix  */
	generateBoard(rows, cols) {
		let board =  [];
		for (let i = 0; i < rows; i++){
			let column = [];
			board[i] = column;
			for (let j = 0; j < cols; j++) {
				column[j] = BoardLogic.EMPTY;
			}
		}
		this.board = board;
		return board;
	}
}



module.exports = BoardLogic;