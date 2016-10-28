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
		expect(boardLogic.getBoard(), board);
	});

	it("Returns depth 0 for an empty column", () => {
		const boardLogic = new BoardLogic(cols, rows);

		expect(boardLogic.getDepth(0), 0);
	});

	it("Plays a red piece in an empty column", () => {
		const boardLogic = new BoardLogic(cols, rows);
		//Put a red piece in column 0
		const playAccepted = boardLogic.play(0);
		const board = boardLogic.getBoard();
		expect(board[0][0], boardLogic.RED);
		expect(playAccepted, true);
	})
	it("Plays a yellow piece in an empty column", () => {
		const boardLogic = new BoardLogic(cols, rows);
		boardLogic.play(0);
		boardLogic.play(1);
		expect(boardLogic.getBoard()[1][1], boardLogic.YELLOW);
	})
	it("Disallows moves outside of column bounds", () => {
		const boardLogic = new BoardLogic(cols,rows);
		expect(boardLogic.play(-1), false);
		expect(boardLogic.play(cols), false);
	})
	it("Disallows move in a full column", () => {
		const boardLogic = new BoardLogic(cols, rows);
		for (let height = 0; height < rows; height++) {
			expect(boardLogic.play(0),true);
		}
		expect(boardLogic.play(0),false)
	})
	


})