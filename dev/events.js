/**
 * This file handles client events and remote events
 */

/**
* Send event to the websocket server.
* @param {Event} event
*/
function sendEvent(keyEvent) {
    if (!is_game_running) return
    
    const eventsKey =  {
        JUMP: { '38': 1, '32': 1 },  // Up, spacebar
        DUCK: { '40': 1 },  // Down
    }

    var event;

    if (eventsKey.JUMP[keyEvent.keyCode] == 1) {
        event = 'JUMP'
    } else if (eventsKey.DUCK[keyEvent.keyCode] == 1) {
        event = 'DUCK'
    } else {
        return
    }

    console.log("Sent event: " + event)
    socket.emit('event', event, your_player_id)
}

function recieveEvent(event, id) {
    Runner.instance_.onWebSocketEvent(event, id)
}
