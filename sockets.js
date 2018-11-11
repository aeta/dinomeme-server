let io

const hat = length => {
  var text = ''
  var possible = 'abcdef0123456789'

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

var gameStarted = false
var referenceDate
var nowEpoch = Date.now()

/**
 * [id: PlayerObject]
 *
 * PlayerObject:
 *  - username
 * 	- votedStart
 *  - display
 *  - distance
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
				display: 0,
        distance: 0,
			}


			players[id] = playerObject

			console.log('id: ' + id)

			socket.emit('id', id)
			socket.join('room')

			io.to('room').emit('playerlist', players)

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
				for (var i = 0; i < players.length; i++) {
					if (!players[i].votedStart) return
				}

				// start the game
				gameStarted = true
				io.to('room').emit('startGame')

				setInterval(obstacle, 500)
			})

      socket.on('distance', (distance) => {
        	playerObject.distance = distance
      })




			socket.on('event', (event, id) => {
				console.log(event)
				io.to('room').emit('event', event, id)
			})
		})
	}
}

const obstacle = () => {
  io.to('room').emit('obstacle')

  if (gameStarted) setTimeout(obstacle, Math.random() * 2000 + 500)

  //update player object
  io.to('room').emit('playerlist', players)
// if (referenceDate == null || referenceDate == undefined) {
//   referenceDate = new Date().value
// } else {
//   const now = new Date().value
//   const delta = now - referenceDate
//   if delta >= 500 {
//     // send the thing
//       io.to('room').emit('playerlist', players)
//     referenceDate = now
//   }
// }
}
