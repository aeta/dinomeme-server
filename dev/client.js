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

})

function clickVote() {
	socket.emit('voteStart')
}
