/**
 * This file handles client events and remote events
 */

/**
* Send event to the websocket server.
* @param {Event} event
*/
function sendEvent(event) {
   console.log("sent")
   socket.emit('event', event)
}

function recieveEvent(name, event) {
   if (name == 'jump') {
       window['runner'].onWebSocketEvent(event)
   }
}
