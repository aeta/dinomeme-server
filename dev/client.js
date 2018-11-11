/**
 * This file handles connections between server and client.
 */

var your_player_id
var is_game_running
var socket = io('http://192.168.2.174:3001/')
var GAP = 50
var OBSTACLE_TYPE = 0

socket.on('gapthing', (gapnumber, obstacle_type) => {
	GAP = gapnumber
	OBSTACLE_TYPE = obstacle_type
	console.log("Gap Size: " + GAP + " | Type: " + OBSTACLE_TYPE)
})

socket.on('connect', () => {
	console.log("Connected.")
	document.getElementById("offlineStatusMessage").style.visibility = "hidden";
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

socket.on('game_start', () => {
	console.log("starting game");
	is_game_running = true
	recieveEvent('JUMP', your_player_id)

	document.getElementById("messageBox").style.visibility="hidden";
})

socket.on('game_over', () => {
	console.log("Everyone's dead :(((")
	is_game_running = false
	// TODO: reset state.
})

// //recieve list of connected players
socket.on('playerlist', (playerlist) => {
	//console.log("updated player list")
	Runner.instance_.updatePlayerList(playerlist)
	checkVoteCount(playerlist)
})

function handleEndGame() {
	socket.emit('im_dead')
}

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

//	console.log (voteCount)
	document.getElementById('voteCount').textContent = voteCount + " / "
	document.getElementById("totalPlayers").textContent = totalPlayers

  // do something with "key" and "value" variables

}
}

function clickVote() {
	socket.emit('voteStart')
}

function clickUpdateNickname() {
	const text = document.getElementById('onchange').value
//	console.log(text)
}
