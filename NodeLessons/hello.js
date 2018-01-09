// Run the hello.js file and click on - Your code is running at 
// https://firstworkspace-surekhasrinivasan.c9users.io to see the results in a browser

var http = require('http');

http.createServer(function(request, response){
	response.writeHead(200);
	response.write("Hello, this is dog.");
	response.end();
}).listen(8080);
console.log('Listening on port 8080...');