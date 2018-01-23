// 1. City Search

//We want to create an endpoint that we can use to filter cities. 
//Follow the tasks below to to create this new route.
//app.js
var express = require('express');
var app = express();

var cities = ['Caspiana', 'Indigo', 'Paradise'];
// a. Create a new route for GET requests to '/cities'. 
//The second argument should be a callback function which takes request and response.
app.get('/cities', function(request, response){
  // b. From inside of our route, create an if statement that 
  //checks whether a value is set to the query string parameter search.
  if(request.query.search){
   // c. Inside of the if block, call the citySearch() function, passing in 
   //the user submitted parameter for search. Then return the result of the 
   //function as a JSON response.
   response.json(citySearch(request.query.search));
  }
});

function citySearch (keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}
app.listen(3000);

// 2. Dynamic Route Variables

//Consider the following Dynamic Route:
app.get('/cities/:name', function (request, response) {
  // ...
})
//When requests come in for this route, how can we access the city name submitted by the user?
//request.query.name
//request.name
//Answer: request.params.name

// 3. City Information

//Now lets look up some information about the city.
//app.js
var express = require('express');
var app = express();

var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

app.get('/cities/:name', function (request, response) {
    //a. Inside of our dynamic route, grab the name submitted by the user, 
    //lookup the city information on the cities object and assign it to the cityInfo variable.
    var cityInfo = cities[request.params.name];
    // b. Check to see if cityInfo exists and if so, respond with the cityInfo in JSON format.
    if(cities[request.params.name]){
    response.json(cityInfo);
    }
    // c. If cityInfo does not exist, respond with a 404 HTTP status code and 
    //a JSON message that says "City not found".
    else {
    response.status(404).json("City not found");
  }
});
app.listen(3000);

