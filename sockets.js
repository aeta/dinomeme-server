let io

const hat = length => {
	var text = ''
	var possible = 'abcdef0123456789'

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

var gameStarted = false
var playerlist = []

module.exports = {
	init: server => {
		io = require('socket.io')(server)

		io.on('connection', socket => {
			// generate an id for this socket
			const id = hat(16)
			const playerObject = {
				socket,
				id,
				votedStart: false,
				display: 0
			}
			players.push(playerObject)

			socket.join('room')

			socket.emit('id', id)
			io.to('room').emit('playerlist', playerlist)

			socket.on('voteStart', socket => {
				if (gameStarted) return

				playerObject.votedStart = true

				// check if everyone voted
				for (var i = 0; i < players.length; i++) {
					if (!players[i].votedStart) return
				}

				// start the game
				gameStarted = true
				io.to('room').emit('startGame')

				setInterval(obstacle, 3000)
			})

			socket.on('event', (event) => {
				console.log(event)
				io.to('room').emit('event', event, id)
			})

			socket.on('jump', () => {
				if (!gameStarted) return
				io.to('room').emit('jump', id)
			})

			socket.on('crouch', () => {
				if (!gameStarted) return
				io.to('room').emit('crouch', id)
			})

			socket.on('obstacle', () => {
				if (!gameStarted) return
				io.to('room').emit('obstacle', id)
			})
		})
	}
}

const obstacle = () => {
	io.to('room').emit('obstacle')

	if (gameStarted) setTimeout(obstacle, Math.random() * 2000 + 500)
}
