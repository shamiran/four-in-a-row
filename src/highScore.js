const MAX_PLAYERS = 10;
const HighScore = class {
	constructor() {
		this.highScore = [];

	}
	/* Records a win for player and adds it to the high score list if not already present*/
	countWin(playerName) {
		let player = this.highScore.find( 
			(playerEntry) => {return playerEntry.playerName == playerName});

		/*for (let i = 0; i < this.highScore.length; i ++) {
			if (this.highScore[i].playerName = playerName) {
				this.highScore[i].wins = this.highScore[i].wins + 1;
				return;
			}
		}*/
		if (player === undefined) {
			this.highScore.push({playerName : playerName, wins: 1});
			return;
		} else {
			player.wins = player.wins + 1;
		}
	}
	/* Sorts and returns the high score list */
	getHighScore() {
		this.highScore.sort( (a,b) => {
			if (a.wins < b.wins) {
				return 1;
			} else {
				return -1;
			}}
		 );
		return this.highScore;
	}
}

module.exports = HighScore;