let io

const hat = length => {
  var text = ''
  var possible = 'abcdef0123456789'

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

var gameStarted = false

/**
 * [id: PlayerObject]
 *
 * PlayerObject:
 *  - username
 * 	- votedStart
 *  - display
 */
var players = {}

module.exports = {
	init: server => {
		io = require('socket.io')(server)

		io.on('connection', socket => {
			if (gameStarted) {
				socket.disconnect(true)
				console.log("Game started, rejecting any additional connections.")
				return
			}

			console.log('Client successfully connected.')

			// generate an id for this socket
			const id = hat(16)
			const playerObject = {
				username: "Untitled",
				votedStart: false,
				isDead: false,
				display: 0
			}

			players[id] = playerObject

			console.log('id: ' + id)

			socket.emit('id', id)
			socket.join('room')

			io.to('room').emit('playerlist', players)

			socket.on('im_dead', function() {
				console.log("Recieved death message")
				players[id].isDead = true

				if (isEveryoneDead()) {
					console.log("Everyone's dead :(")
					io.to('room').emit('game_over')
					resetGameState()
					io.to('room').emit('playerlist', players)
				}
			})

      	//disconnect player condition
			socket.on('disconnect', function() {
				console.log('Got disconnect: '+ id);

				players[id] = null
				io.to('room').emit('playerlist', players)
			});

			socket.on('voteStart', socket => {
				if (gameStarted) return

        console.log("voted START: "+id)

				playerObject.votedStart = true
        io.to('room').emit('playerlist', players)

				// check if everyone voted
				var someoneDidntVoteStart = false
				for (var key in players) {
					if (players[key] == null) continue
					if (!players[key].votedStart) someoneDidntVoteStart = true
				}
				if (someoneDidntVoteStart) return 

				// start the game
				gameStarted = true
				io.to('room').emit('game_start')

				setInterval(obstacle, 3000)
			})

			socket.on('event', (event, id) => {
				console.log(event)
				io.to('room').emit('event', event, id)
			})
		})
	}
}

function isEveryoneDead() {
	for (var id in players)
		if (players[id] == null) continue
		if (!players[id].isDead) return false

	return true
}

function resetGameState() {
	compactPlayers()
	for (var key in players) {
		players[key].votedStart = false
		players[key].isDead = false
	}

	gameStarted = false
}

/**
 * This will remove all null/undefined player objects.
 */
function compactPlayers() {
	for (var id in players) {
		var compactPlayers = {}
		if (players[id] == null || players[id] == undefined) continue
		compactPlayers[id] = players[id]
		players = compactPlayers
	}
}

const obstacle = () => {
  io.to('room').emit('obstacle')

  if (gameStarted) setTimeout(obstacle, Math.random() * 2000 + 500)
}
