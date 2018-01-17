// 1. Setting Up socket.io Server-Side

//So far we've created an Express server. Now we want to start building a real-time 
//Q&A moderation service and we've decided to use socket.io.
//app.js
var express = require('express');
var app = express();
// a. Using the http module, create an new http server and pass 
//the express app as the listener for that new server.
var server = require('http').createServer(app);
// b. Using the socket.io module, listen for requests on the http server. 
//Store the return object of this operation in a variable called io.
var io = require('socket.io')(server);
// c. Use the object stored in io to listen for client 'connection' events. 
//Remember, the callback function takes one argument, which is the client object that has connected.
io.on('connection', function(client){
    // d. When a new client connects, log a message using console.log().
    console.log('Client connected ...');
});
//e. Finally, we want to tell our http server to listen to requests on port 8080.
server.listen(8080);

// 2. Client socket.io Setup 

//In our html file, load the socket.io.js script and connect to the socket.io server.
//index.html
// use the socket.io server to connect to localhost:8080 here
// a. Load the socket.io.js script. The socket.io.js path you should use is '/socket.io/socket.io.js'. Express knows to serve the socket.io client js for this path.
  <script src = "./socket.io/socket.io.js"></script>

// b. Using the global io object that's now available for us, connect to the socket.io server at http://localhost:8080.
    <script>  
    var server = io.connect('http://localhost/8080');
    </script>

// 3. Listening For Questions

//In our client below, listen for 'question' events from the server and call the insertQuestion function whenever the event fires.
// index.html
<script src="/socket.io/socket.io.js"></script>
<script src="/insertQuestion.js"></script>

// a. First, listen for 'question' events from the server.
<script>
  var server = io.connect('http://localhost:8080');

  //Insert code here
  server.on('question', function(question){
  //Now, have the event callback function call the insertQuestion function. The insertQuestion function is 
  //already created for you, and it's placed in its own file. It expects exactly one argument - the question.
      insertQuestion(question);
  });
          
</script>
//insertQuestion.js
var insertQuestion = function(question){
  var newQuestion = document.createElement('li');
  newQuestion.innerHTML = question;

  var questions = document.getElementsByTagName('ul')[0];
  return questions.appendChild(newQuestion);
}

// 4. Broadcasting Questions 

//When a question is submitted to our server, we want to broadcast it out to all the connected 
//clients so they can have a chance to answer it.

//app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
  console.log("Client connected...");
// a. In the server, listen for 'question' events from clients.
  client.on('question', function(question){
      // b. Now, emit the 'question' event on all the other clients connected, 
      //passing them the question data.
    client.broadcast.emit('question', question);
  });
});
server.listen(8080);

