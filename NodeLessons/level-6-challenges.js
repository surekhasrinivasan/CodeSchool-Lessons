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

// 5. Saving Client Data 

//In our real-time Q&A app, we want to allow each client only one question at a time, but how 
//do we enforce this rule? We can use socket.io's ability to save data on the client, 
//so whenever a question is asked, we first want to check the question_asked value on the client.
//app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
  console.log("Client connected...");

  client.on('question', function(question) {
      // c. Finally, when a client emits a 'question' event, check to make sure question_asked is 
        //not already set to true. We only want to allow one question per user, so make sure that 
        //we only set the value of question_asked and broadcast the question to other clients 
        //when the value of question_asked is not already true.
        if(!client.question_asked){
    // b. Second, when a client emits a 'question' event, we want to broadcast that question to the other clients.
    client.broadcast.emit('question', question);
    // a. First, when a client emits a 'question' event, we want to set the value of question_asked to true.
    client.question_asked = true;
        }
  });
});
server.listen(8080);

// 6. Answering Questions 

//Clients can also answer each other's questions, so let's build that feature by first 
//listening for the 'answer' event on the client, which will send us both the question and 
//answer, which we want to broadcast out to the rest of the connected clients.

//app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.sockets.on('connection', function(client) {
  console.log("Client connected...");

  // listen for answers here
  
  // a. With the client, listen for the 'answer' event from clients. 
  //This listener will have both a question and answer to broadcast so make sure 
  //to include both as function parameters.
  client.on('answer', function(question, answer){
    // b. Now, emit the 'answer' event on all the other 
    //clients connected, passing them the question and answer data.
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
    }
  });
});

server.listen(8080);


// 7. Answering Question Client

//Now on the client, listen for the 'answer' event and then add the appropriate data to the DOM.
// index.html
<script src="/socket.io/socket.io.js"></script>

<script>
  var server = io.connect('http://localhost:8080');

  server.on('question', function(question) {
    insertQuestion(question);
  });
  // a. Listen for the 'answer' event off of the server.
  server.on('answer', function(question, answer){
    // b. Call the answerQuestion function, passing in both the question and the answer that was broadcast from the server.
    answerQuestion(question, answer);
  });
   
  //Don't worry about these methods, just assume 
  //they insert the correct html into the DOM
  // var insertQuestion = function(question) {
  // }

  // var answerQuestion = function(question, answer) {
  // }
</script>
 
