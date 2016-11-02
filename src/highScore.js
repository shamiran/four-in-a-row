const MAX_PLAYERS = 10;
/* A utility class for storing the high score data, is not persistent
   but could be made so in the future with cookies or localStorage
   (using node-localStorage) */
const HighScore = class {
	constructor() {
		this.highScore = [];

	}
	/* Records a win for playerName and adds playerName to 
	   the high score list if not already present*/
	countWin(playerName) {
		console.log(playerName);
		let player = this.highScore.find( 
			(playerEntry) => {return playerEntry.playerName === playerName});
		if (player === undefined) {
			this.highScore.push({playerName : playerName, wins: 1});
			return;
		} else {
			player.wins++;
		}
	}
	/* Sorts and returns the high score list containing the top  */
	getHighScore() {
		this.highScore.sort( (a,b) => {
			if (a.wins < b.wins) {
				return 1;
			} else {
				return -1;
			}}
		 );
		if (this.highScore.length < MAX_PLAYERS) {
			return this.highScore;
		} else {
			return this.highScore.slice(0,10);
		}
	}
}

module.exports = HighScore;