


/* Creates the board used for game logic  */
const BoardLogic = function() {

	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.board = generateBoard(this.rows,this.cols);
		this.index = []
		index.map( (i) => i = 0);
		
	}

	/* Generates an empty m x n matrix  */
	generateBoard = function() {
		var rows =  [];
		for (let i = 0; i < rows; i++){
			let column = [];
			rows[i] = column;
			for (let j = 0; j < cols; j++) {
				column[j] = BoardLogic.EMPTY;
			}
		}

		return rows;
	}
}

BoardLogic.EMPTY = 0;
BoardLogic.RED = 1;
BoardLogic.BLUE = 2;

/* Generates an empty m x n matrix */

export { BoardLogic,  };