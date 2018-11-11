/**
 * This file handles connections between server and client.
 */

var your_player_id
var socket = io('http://localhost:3001/')

socket.on('connect', () => {
	console.log("Connected.")
})

socket.on('id', (id) => {
	console.log("Your id is " + id)
	your_player_id = id
})

socket.on('event', (event, id) => {
	if (this.id == your_player_id) {
		console.log("You did something.")
	} else {
		console.log(id + " did something.")
	}

	recieveEvent(event, id)
})

// //recieve list of connected players
socket.on('playerlist', (playerlist) => {
	console.log(playerlist)
	Runner.instance_.updatePlayerList(playerlist)
	checkVoteCount(playerlist)
})

function checkVoteCount(dict) {
	var voteCount = 0;
	var totalPlayers = 0;
	for(var key in dict) {
  var value = dict[key];
	if (value == null) {
		continue
	}
	totalPlayers +=1
	if (value.votedStart) {
		voteCount += 1
	}

	console.log (voteCount)
	document.getElementById('voteCount').textContent = voteCount + " / "
	document.getElementById("totalPlayers").textContent = totalPlayers

  // do something with "key" and "value" variables

}
}

function clickVote() {
	socket.emit('voteStart')
}
