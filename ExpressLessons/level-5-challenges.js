// 1. Route Instance 

//Let's rewrite our cities routes using a Route Instance.
//app.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
// In memory store for the cities in our application
var cities = {};
// d. Now, let's get rid of the citiesRoute temporary variable and use chaining function calls.
// a. Create a new Route Instance for the '/cities' URL path and assign it to the citiesRoute variable.
//var citiesRoute = app.route('/cities');
app.route('/cities')
// b. Move the code from our previous app.get() route to a new GET route on the citiesRoute object.
// GET route for /cities
//app.get('/cities', function (request, response) {
    //citiesRoute.get(function(request, response){
    .get(function(request, response){
  if(request.query.search) {
    response.json(citySearch(request.query.search));
  } else {
    response.json(cities);
  }
})

// c. Move app.post() to citiesRoute.
// POST route for /cities
//citiesRoute.post(parseUrlencoded, function (request, response) {
    .post(parseUrlencoded, function (request, response) {
  if(request.body.description.length > 4) {
    var city = createCity(request.body.name, request.body.description);
    response.status(201).json(city);
  } else {
    response.status(400).json('Invalid City');
  }
});
// e. Finally, let's move the old routes for the '/cities/:name' URL path to use the new Route Instance API.
/*
// GET route for /cities/:name
app.get('/cities/:name', function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json('City not found');
  }
});

// DELETE route for /cities/:name
app.delete('/cities/:name', function (request, response) {
  if(cities[request.cityName]) {
    delete cities[request.cityName];
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});
*/
app.route('/cities/:name')
// GET route for /cities/:name
   .get(function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json('City not found');
  }
})

// DELETE route for /cities/:name
   .delete(function (request, response) {
  if(cities[request.cityName]) {
    delete cities[request.cityName];
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});

// Searches for keyword in description and returns the city
function citySearch(keyword) {
  var result = null;
  var search = RegExp(keyword, 'i');
  for(var city in cities) {
    if(search.test(cities[city])) {
      return city;
    }
  }
}

// Adds a new city to the in memory store
function createCity(name, description) {
  cities[name] = description;
  return name;
}

app.listen(3000);
