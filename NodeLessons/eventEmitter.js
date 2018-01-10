//Custom Event Emitter 

//First we require a EventEmitter class 
var EventEmitter = require('events').EventEmitter;
// we require a logger to emit error event, warn events, info events
var logger = new EventEmitter();
//we have to write listeners so that we can listen when the events occur. So if want to listen
// to a error event. on this error event run this function. 
logger.on('error', function(message){
	console.log('ERR: ' + message);
});

logger.emit('error', 'Spilled Milk');
// prints ERR: Spilled Milk

logger.emit('error', 'Eggs Cracked');
// prints ERR: Eggs Cracked




//When the request event is emitted 

/*http.createServer(function(request, response){ ...});

http.createServer([requestListener])
returns a new web server object. 

The requestListener is a function which is automatically added to the 'request' event.

Class: http.Server
This is an EventEmitter with the following events:

Event: 'request'
function(request, response){}
Emitted each time there is a request. 
*/
//Alternate syntax 
//create server with no parameters
//on the request event call this function 
var server = http.createServer();

server.on('request', function(request, response){...}):
This is how we add addEventListeners 

//for example 
//Event: 'close'
function(){}
//emitted when the server closes 
server.on('close', function(){ ...});
