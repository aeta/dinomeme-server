
var your_player_id;

// socket.on('connect', () => {
//     // console.log("connected")
// })

/**
 * Send event to the websocket server.
 * @param {Event} event 
 */
function sendEvent(event) {
    console.log("sent")
    
    socket.emit('event', event)
}

socket.on('id', (id) => {
    console.log("Your id is " + id)
    your_player_id = id
})

socket.on('event', (event, id) => {
    if (id == your_player_id) {
        console.log("You did something.")
    } else {
        console.log(id + " did something.")
    }
})

function recieveEvent(name, event) {
    if (name == 'jump') {
        window['runner'].onWebSocketEvent(event)
    }
}