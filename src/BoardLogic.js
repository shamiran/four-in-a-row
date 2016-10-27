



const BoardLogic = function(nbrRows, nbrColumns) {
	this.nbrRows = nbrRows;
	this.nbrColumns = nbrColumns;
	this.board = generateBoard();
	
}

BoardLogic.EMPTY = 0;
BoardLogic.RED = 1;
BoardLogic.BLUE = 2;

/* Generates an empty m x n matrix */
BoardLogic.prototype.generateBoard = function() {
	var rows =  [];
	for (var i = 0; i < nbrRows; i++){
		var column = [];
		rows[i] = column;
		for (var j = 0; j < nbrColumns; j++) {
			column[j] = BoardLogic.EMPTY;
		}
	}
	return rows;
};