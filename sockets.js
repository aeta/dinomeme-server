let io

const hat = length => {
	var text = ''
	var possible = 'abcdef0123456789'

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

var gameStarted = false
var players = []

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

			socket.emit('id', id)

			socket.on('voteStart', socket => {
				if (gameStarted) return

				playerObject.votedStart = true

				// check if everyone voted
				for (var i = 0; i < players.length; i++) {
					if (!players[i].votedStart) return
				}

				// start the game
				gameStarted = true
				startGame()
			})
		})
	}
	// ,
	// onPiPointChange: (memberId, piPointChange) => {
	// 	io.to(memberId.toString()).emit('piPointChange', piPointChange)
	// }
}

const startGame = () => {
	io.to('room').emit('startGame')
}
