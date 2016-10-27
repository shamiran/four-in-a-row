const BoardLogic = require("../BoardLogic.js");

var rows = 6;
var cols = 7;

test("Generates a board filled with 0's", () => {
	const boardLogic = new BoardLogic(rows, cols);
	const board = boardLogic.generateBoard(rows, cols);
	rows = [];
	for (var i = 0; i < rows; i++){
		var column = [];
		rows[i] = column;
		for (var j = 0; j < cols; j++) {
			column[j] = 0;
		}
	}
	expect(board, rows);
});