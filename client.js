
// //recieve id
 socket.on('id', (id) => {
 	console.log(id)
 })

// //recieve list of connected players
 socket.on('playerlist', (playerlist) => {
 	console.log(playerlist)

 })
