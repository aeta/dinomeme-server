
//connect to socket
 const io = require('socket.io-client')

 const socket = io('http://localhost:3001/')


// //recieve id
// socket.on('id', (id) => {
// 	console.log(id)
// })

// //recieve list of connected players
// socket.on('playerlist', (playerlist) => {
// 	console.log(playerlist)

// })
