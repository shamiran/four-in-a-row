const BoardLogic = require('../boardLogic.js');

/*beforeEach(() => {
	const boardLogic = new BoardLogic(cols, rows);
}); */
describe('Board logic for the game', () =>{

	const cols = 7;
	const rows = 6;
	it("Generates a board filled with 0's", () => {
		const boardLogic = new BoardLogic(cols, rows);
		let board =  [];
			for (let i = 0; i < cols; i++){	
				board[i] = new Array(rows).fill(boardLogic.EMPTY);
			}
		expect(boardLogic.getBoard()).toEqual(board);
	});

	it("Returns depth 0 for an empty column", () => {
		const boardLogic = new BoardLogic(cols, rows);
		expect(boardLogic.getHeight(0)).toEqual(0);
	});

	it("Returns depth 3 for a column with 3 pieces", () => {
		const boardLogic = new BoardLogic(cols, rows);
		boardLogic.play(0);
		boardLogic.play(0);
		boardLogic.play(0);
		expect(boardLogic.getHeight(0)).toEqual(3);
	});

	it("Plays a red piece in an empty column", () => {
		const boardLogic = new BoardLogic(cols, rows);
		//Put a red piece in column 0
		const playAccepted = boardLogic.play(0);
		const board = boardLogic.getBoard();
		expect(board[0][0], boardLogic.RED);
		expect(playAccepted).toBeTruthy();
	});
	it("Plays a yellow piece in an empty column", () => {
		const boardLogic = new BoardLogic(cols, rows);
		boardLogic.play(0);
		boardLogic.play(1);
		expect(boardLogic.getBoard()[1][0]).toEqual(boardLogic.YELLOW);
	});
	it("Disallows moves outside of column bounds", () => {
		const boardLogic = new BoardLogic(cols,rows);
		expect(boardLogic.play(-1), false);
		expect(boardLogic.play(cols)).toBeFalsy();
	});
	it("Disallows move in a full column", () => {
		const boardLogic = new BoardLogic(cols, rows);
		for (let height = 0; height < rows; height++) {
			expect(boardLogic.play(0)).toBeTruthy();
		}
		expect(boardLogic.play(0)).toBeFalsy();
	});
	it("Detects vertical red win condition", () => {
		const boardLogic = new BoardLogic(cols, rows);
		for (let turn = 0; turn < 6; turn ++)  {
			boardLogic.play(turn % 2);
		}

		boardLogic.play(0);
		expect(boardLogic.checkForWin()).toEqual(boardLogic.RED_WIN);

	});
	it("Detects vertical yellow win condition", () => {
		const boardLogic = new BoardLogic(cols, rows);
		boardLogic.play(3);
		for (let turn = 0; turn < 6; turn ++)  {
			boardLogic.play(turn % 2);
		}

		boardLogic.play(0);
		expect(boardLogic.checkForWin()).toEqual(boardLogic.YELLOW_WIN);

	});
	it("Detects horizontal win condition", () => {
		const boardLogic = new BoardLogic(cols,rows);
		boardLogic.play(0);
		boardLogic.play(0);
		boardLogic.play(1);
		boardLogic.play(1);
		boardLogic.play(2);
		boardLogic.play(2);
		boardLogic.play(3);
		expect(boardLogic.checkForWin()).toEqual(boardLogic.RED_WIN);
	});
	it("Detects a right-down win condition", () => {
		const boardLogic = new BoardLogic(cols, rows);
		boardLogic.play(0);
		boardLogic.play(0);
		boardLogic.play(0);
		boardLogic.play(1);
		boardLogic.play(0);
		boardLogic.play(1);
		boardLogic.play(1);
		boardLogic.play(2);
		boardLogic.play(2);
		boardLogic.play(2);
		boardLogic.play(3);
		expect(boardLogic.checkForWin()).toEqual(boardLogic.RED_WIN);
	});
	it("Detects a right-up win condition", () => {
		const boardLogic = new BoardLogic(cols, rows);
		boardLogic.play(0);
		boardLogic.play(1);
		boardLogic.play(1);
		boardLogic.play(2);
		boardLogic.play(3);
		boardLogic.play(2);
		boardLogic.play(2);
		boardLogic.play(3);
		boardLogic.play(4);
		boardLogic.play(3);
		boardLogic.play(3);
		expect(boardLogic.checkForWin()).toEqual(boardLogic.RED_WIN);
	});


})