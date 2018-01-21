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