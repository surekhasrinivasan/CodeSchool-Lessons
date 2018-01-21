// 1. Mounting Middleware

//Given an application instance is set to the app variable, which of the following function 
//calls would you use to mount a middleware called logger ?

//app.run(logger)
// Answer : app.use(logger)
//app.route(logger)

// 2. Default Middleware

//What is the only middleware that's shipped with Express 4?
//validations
//Answer : express-static
//body-parser

// 3.  Express Static

//Change the code in app.js to use the express-static middleware instead of 
//the response.sendFile() function.
//app.js
var express = require('express');
var app = express();

// a. Remove our app.get() containing the root '/' route.
//app.get('/', function (request, response) {
  //response.sendFile(__dirname + '/public/index.html');
//});

// b. Mount the static middleware and serve files under the public directory.
app.use(express.static('public'));

app.get('/cities', function(req, res){
  var cities = ['Lotopia', 'Caspiana', 'Indigo'];
  res.send(cities);
});

app.listen(3001);

// 4. Script Tags

//Now we can add some client-side JavaScript by including the jquery.js and client.js files.

//index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cities</title>
</head>
<body>
  <h1>Cities</h1>

  <ul class='city-list'></ul>
   <!-- a. Within index.html, include jquery.js using a <script> tag.-->
    <script src = "jquery.js"></script>
    <!-- b. Within index.html, include client.js using a <script> tag.-->
    <script src = "client.js"></script>
   
</body>
</html>

//client.js 

$(function(){

// c. Now in the client.js file, complete the code for the $.get function so that it 
//calls the /cities URL path, and then runs the appendToList function.
  $.get('/cities', appendToList);

  function appendToList(cities) {
    var list = [];
    for(var i in cities){
      list.push($('<li>', { text: cities[i] }));
    }
    $('.city-list').append(list);
  }
});

// 5. Logging Middleware

//Help finish the following middleware code in the logger.js file:

//logger.js
module.exports = function (request, response, next) {
  var startTime = +new Date();
  var stream = process.stdout;
  var duration = null;

// a. On the response object, listen to the event that's emitted when the response has 
//been handed off from Express to the underlying Operating System.
  response.on('finish', function () {
    // b. Inside of the finish callback, calculate the duration of the request by 
    //subtracting the startTime from a new Date object. Store the duration in the duration variable, 
    //which has already been declared for you.
     duration = +new Date() - startTime;
     
     // c. Using the stream object, which holds a reference to standard out, 
     //write the following message: "This request took ____ ms", where ____ is the duration for the request.
     stream.write("This request took " + duration + " ms");
  });
  // d. If we run the code as is, the request will be stuck in our middleware. Call the function that moves 
  //processing to the next middleware in the stack.
  next();   
};

// 6. Add Logging Middleware

//In the following code in app.js, we require our new middleware and assign it 
//to a variable called logger.

//app.js 

var express = require('express');
var app = express();

var logger = require('./logger');

//TODO: mount middleware

app.listen(3000);
What function should we call in order to mount the middleware and add it to the stack?

//app.route(logger)
// Answer : app.use(logger)
//app.mount(logger)

// 7. Only GET 

//Let's build a middleware that ensures only GET requests are allowed to go through.

//only_get.js

// a. First, in the only_get.js file, create an anonymous function that uses the middleware 
//signature and assign it to module.exports. Remember, the Express middleware function 
//signature takes three arguments.
module.exports = function(request, response, next){
   // b. Use the request object to check if the HTTP method used is 'GET' and if it is, 
   //then call the function that moves processing to the next middleware in the stack.
   if(request.method === 'GET'){
     next();
   }
   // c. If the HTTP method is not 'GET', then complete the request by sending back a 
   //message that says 'Method is not allowed'.
   else{
     response.send("Method is not allowed");
   }
};

// 8. Buildings 

var express = require('express');
var app = express();

app.use(function(request, response, next){
  if (request.path === "/cities"){
    next();
  } else {
    response.status(404).json("Path requested does not exist");
  }
});

app.get('/cities', function(request, response){
  var cities = ['Caspiana', 'Indigo', 'Paradise'];
  response.json(cities);
});

app.listen(3000);

//When we run our previous code and issue a GET request to the /buildings endpoint, 
//what will the response be?

//A successful response with ['Caspiana', 'Indigo', 'Paradise']
//An error
// Answer : A 404 response with 'Path requested does not exist' 
