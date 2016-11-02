
const HighScore = require('../highScore.js')

describe('HighScore ranking players by won games', () => {
	it("Registers win of a new player", () => {
		const highScore =  new HighScore();
		highScore.countWin("Player1");
		console.log(highScore.getHighScore());
		expect(highScore.getHighScore()).toEqual([{playerName:"Player1", wins:1}]);
	});
	it("Returns a list of sorted players by their wins", () => {
		const highScore =  new HighScore();
		highScore.countWin("Player1");
		highScore.countWin("Player1");
		highScore.countWin("Player1");
		highScore.countWin("Player2");
		highScore.countWin("Player2");
		highScore.countWin("Player3");
		expect(highScore.getHighScore()).toEqual([
			{playerName:"Player1", wins:3}, 
			{playerName:"Player2", wins:2},
			{playerName:"Player3", wins:1}]);
	})

})
