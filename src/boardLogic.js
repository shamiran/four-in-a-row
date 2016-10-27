


/* Creates the board used for game logic  */
const BoardLogic = class {

	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.board = generateBoard(this.rows,this.cols);
		this.EMPTY = 0;
		this.RED = 1;
		this.BLUE = 2;
		this.index = [];
		
	}

	/* Generates an empty m x n matrix  */
	generateBoard(rows, cols) {
		var rows =  [];
		for (let i = 0; i < rows; i++){
			let column = [];
			rows[i] = column;
			for (let j = 0; j < cols; j++) {
				column[j] = this.EMPTY;
			}
		}

		return rows;
	}
}

/* Generates an empty m x n matrix */

module.exports = BoardLogic;