const io = require('socket.io-client')

const socket = io('http://localhost:3001/')

socket.on('id', (id) => {
	console.log(id)

})
socket.on('jump', (id) => {
	
	console.log(id)

})


//socket.emit('voteStart')
