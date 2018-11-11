var socket = io('http://localhost:3001')

socket.on('connect', () => {
    console.log("connected")
})

/**
 * Send event to the websocket server.
 * @param {Event} event 
 */
function sendEvent(event) {
    console.log(event)
    socket.emit('event', event)
}

socket.on('remote_event', (event, id) => {
    console.log(event)
    console.log(id)
})

function recieveEvent(name, event) {
    if (name == 'jump') {
        window['runner'].onWebSocketJump(event)
    }
}