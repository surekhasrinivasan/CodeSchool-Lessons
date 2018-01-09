// 1. Hello You 

//Let's start with a simple Hello server. Follow the tasks below to create a simple 
//Node server that outputs a greeting.

var http = require('http');

http.createServer(function(request, response) {
// a. First, tell the response which status it should have (a successful status is 200).    
    response.writeHead(200);
// b. Next, write a message to the response body in the form of "Hello, this is <your name here>".
    response.write("Hello, this is Surekha");
// c. To finish it up, tell the response to end so the client on the other side knows it has received all the data.
    response.end();
}).listen(8080);

/* 2. Convert Blocking 

//Not everyone knows why it's important to write non-blocking programs in 
Node.js. One of these unfortunate souls has written some code to read a file 
off the file-system using the blocking function readFileSync. 
Convert the code to be non-blocking using the readFile function instead.*/
//var fs = require('fs');
//a. Start by changing the call from readFileSync() to readFile().
//var contents = fs.readFileSync('index.html');
//b. Next, add a callback method to the readFile() call. This method should accept error and contents parameters.
    //var contents = fs.readFile('index.html');
    //var contents = fs.readFile('index.html', function(error, contents){
//c. To finish it up, remove the contents var declaration, and move the call to console.log() inside your callback.  
//});
//console.log(contents);

var fs = require('fs');

//var contents = 
fs.readFile('index.html', function(error, contents){
  console.log(contents);  
});

// 3. Running Your Code 
/*While you could go to the website and easily install node, we happen to have a console below where you can practice running node applications.

Go ahead and run that file we just created to read a file off the filesystem with
node file_read.js*/
//$ node file_read.js Hit Enter
// <html><p>Hello, this is a dog</p></html>
// Congratulations, you are correct! // is printed 

// 4. Read File in Server

/*Now that you know how to create an HTTP server and how to read a file off the filesystem in a 
non-blocking way, let's try to combine the two. Instead of just writing a string to the HTTP response,
write the contents of index.html to the response instead.*/


var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  response.writeHead(200);
//a. After response.writeHead(200), add a call to fs.readFile() that reads index.html asynchronously. 
//Remember to pass a callback function, that accepts an error parameter, and a contents parameter.
fs.readFile('index.html', function(error, contents){
    //b. Now that you have the file contents, write it to the response.
    response.write(contents);
    //c. To finish up, end the response after the file contents have been written.
    response.end();
  });
  //response.end();
}).listen(8080);


// 5. Issuing a Request 

/*Let's see our new server in action. We've already run node app.js, so 
in the terminal below use curl to issue a request to http://localhost:8080 and
we'll see our server respond with the contents of index.html.*/

//$ curl http://localhost:8080 Hit Enter
// <html><p>Hello, this is a dog</p></html>
// Congratulations, you are correct! // is printed 


// 6. Writing Response Headers

/*Up until now all we've been sending into the response.writeHead() 
function is the status code. However, it can take additional parameters.*/

var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
//Consult the node documentation, and add a 'Content-Type' of 'text/html' to the response.
 // response.writeHead(200);
response.writeHead(200, {'Content-Type': 'text/html'});

  fs.readFile('index.html', function(err, contents) {
    response.write(contents);
    response.end();
  });

}).listen(8080);


// 7. Response End

//Our original Hello server can be shortened since the response.end() function optionally 
//takes data as a parameter. Remove the response.write line altogether, and send the hello 
//string as a parameter on the response.end function. This will send the data, and once finished 
//add the end to the response.

var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200);
 //Instead of passing the content to response.write(), pass it to response.end().
  //response.write("Hello, this is dog");
  response.end("Hello, this is dog");
}).listen(8080);