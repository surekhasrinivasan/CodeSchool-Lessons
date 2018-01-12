// 1. File Read Stream
// Lets use the fs module to read a file and log its contents to the console.
var fs = require('fs');
// a. Use the fs module to create a Readable stream for fruits.txt. 
//Store the new stream in a variable called file.
var file = fs.createReadStream("fruits.txt");
// b. Next, listen to the readable event on the newly created stream and give it a callback.
file.on('readable', function(){
  // c. Inside the callback, read the data chunks from the stream and print them 
  // to the console using console.log() - you might want to use a while loop to do this. 
  //Don't forget to call toString() on the data before printing it.
  var chunk;
  while(null !== (chunk = file.read())){
      console.log(chunk.toString());
  }
});

// 2. File Piping
// Instead of manually listening for the 'readable' event on the 
// Readable stream, let's use pipe to read from the stream and write directly to process.stdout.
// a. Start by removing the code for the readable handler.
var fs = require('fs');

var file = fs.createReadStream('fruits.txt');

/*file.on('readable', function(){
  var chunk;
  while(null !== (chunk = file.read())){
    console.log(chunk.toString());
  }
});*/

//b. Call file.pipe(), passing it the stream to write to.
file.pipe(process.stdout);

//3. Fixing Pipe 
//The following code will throw an error because pipe automatically closed our writable stream.
var fs = require('fs');

var file = fs.createReadStream('origin.txt');
var destFile = fs.createWriteStream('destination.txt');

// You'll need to consult the pipe documentation to figure out the option which 
//keeps the Write stream open and dispatches the end event.

//file.pipe(destFile);
file.pipe(destFile, { end: false });

file.on('end', function(){
  destFile.end('Finished!');
});

// 4. Download Server
//Let's create an HTTP server that will serve index.html.
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  var file = fs.createReadStream('index.html');
  //a. Use pipe() to send index.html to the response.
  file.pipe(response);
  
}).listen(8080);