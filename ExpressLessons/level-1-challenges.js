// 1. Installing Express

//Let's start building our new Express application by installing Express. 
//Type the command that installs the latest version for the 4.9 branch.
npm install express@4.9

// 2. Locations

//Let's start coding our Express application.

// a. In our app.js, require the express module and assign it to the express variable.
//app.js 
 var express = require('express');
// b. Using the function assigned to express, create an application instance and assign 
//it to the app variable.
var app = express();
// c. Using our application instance, app, create a new route that accepts GET 
//requests on the /locations URL path. Remember to pass a callback function which 
//takes a request and response.
app.get('/locations', function(request, response){
   // d. Respond with an array of city names. The city names should be Caspiana, Indigo and Paradise.
   var cityNames = ['Caspiana', 'Indigo', 'Paradise'];
   response.send(cityNames);
 });
 // e. Bind our application to port 3001.
 //app.listen(3001);
 // f. When our application is ready to receive requests, print the string "Running Express" to the console.
 app.listen(3001, function(){
  console.log("Running Express");
});

// 3. Content Type

var express = require('express');
var app = express();

app.get('/locations', function (request, response) {
  var cities = ['Caspiana', 'Indigo', 'Paradise'];
  response.send(cities);
});

app.listen(3001, function () {
  console.log("Running Express");
});
//When we run our previous code and issue a GET request to the /locations endpoint, 
//what will the Content-Type header for the response be set to?
//text/plain
//text/html
//Answer : application/json

// 4. Content Type II

//If we were to craft a response sending a string of text with the response.send() function, 
//just like the following code, what would Express set this Content-Type to?

  app.get('/locations', function(request, response) {
    var cities = '<ul><li>Caspiana</li><li>Indigo</li></ul>';
    response.send(cities);
  });
//text/plain
// Answer: text/html
//application/json


// 5. Cities 

//In order to better reflect the domain of our application, we want to change our existing 
//route from /locations to /cities.
//app.js
var express = require('express');
var app = express();

// a. First, change our existing route from /locations to /cities.
//app.get('/locations', function (request, response) {
app.get('/cities', function(request, response){
  var cities = ['Caspiana', 'Indigo', 'Paradise'];
  response.send(cities);
});
// b. Now create a new route for /locations.
app.get('/locations', function(request, response){
  // c. Now redirect from /locations to /cities path using the Moved Permanently 
  //HTTP status code (free hint for you, the code for that is 301).
  response.redirect(301, '/cities');
});
app.listen(3001, function () {
  console.log("Running Express");
});