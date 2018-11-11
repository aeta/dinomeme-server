'use strict'

// dependencies
const express = require('express')
const app = express()
const sockets = require('./sockets')
const port = 3001

const server = require('http').Server(app)

sockets.init(server)

server.listen(port, () => {
	console.log('DinoMeme API is live on port ' + port)
})
