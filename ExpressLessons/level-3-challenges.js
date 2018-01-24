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

// 4. Flexible Routes

//Our current route only works when the city name argument matches exactly the properties in the cities object. This is a problem. We need a way to make our code more flexible.
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
  // a. Inside our route, call the parseCityName() function passing in the name parameter. 
  //Assign the return value to the new variable called cityName.
  var cityName = parseCityName(request.params.name);
  // b. Now, using the city name returned from the parseCityName() function, lookup the 
  //corresponding description using the cities object and store it in the correct variable 
  //that will make the rest of the function work as intended.
  var cityInfo = cities[cityName];

  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json('City not found');
  }
});

function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}
app.listen(3000);                                                                                                                                                                                                                                                                                                                

// 5. Dynamic Routes I 

//Which Express function maps placeholders to callback functions, 
//and is commonly used for running pre-conditions on Dynamic Routes?
//app.use()
//app.get()
// Answer: app.param()

// 6.  Dynamic Routes II 

//Whenever we use our name parameter we want to parse it a specific way. 
//Let's clean up our existing code so that all routes with a name parameter get 
//the same special handling.

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
// a. Call app.param() to intercept requests that contain an argument called 'name'. 
//Remember app.param() takes a callback function as its second argument, which uses 
//the same signature as a middleware.
app.param('name', function(request, response, next){
  // b. Inside the app.param() callback function, call the parseCityName() function 
  //with the submitted name parameter. Set the return value to a new property in the 
  //request object called cityName.
  request.cityName = parseCityName(request.params.name);
  // c. Finally, call a function that moves processing to the next function in the stack.
  next();
});

app.get('/cities/:name', function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json("City not found");
  }
});

function parseCityName(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}
app.listen(3000);             

// 7.  Dynamic Routes III

//The following code has a Dynamic Route that takes a year as an argument and returns 
//the city created in that year. The problem with our current implementation is that 
//it breaks when invalid data is sent on client requests. Let's add some basic validation.

//app.js 
var express = require('express');
var app = express();
// a. Call a function that intercepts Dynamic Routes with the 'year' param.
app.param('year', function(request, response, next){
  // b. Inside of that function, use the isYearFormat() function to check whether the 
  //year parameter is in a valid format. If so, then move processing to the next function 
  //in the stack.
  if(isYearFormat(request.params.year)){
    next();
  }
  // c. If the year parameter is not in a valid format, then respond with a 400 HTTP 
  //status code and a JSON message 'Invalid Format for Year'.
  else {
    response.status(400).json('Invalid Format for Year');
  }
  
});
var citiesYear = {
  5000: 'Lotopia',
  5100: 'Caspiana',
  5105: 'Indigo',
  6000: 'Paradise',
  7000: 'Flotilla'
};

function isYearFormat(value) {
  var regexp = RegExp(/^d{4}$/);
  return regexp.test(value);
}

app.get('/cities/year/:year', function(request, response) {
  var year = request.params.year;
  var city = citiesYear[year];

  if(!city) {
    response.status(404).json("No City found for given year");
  } else {
    response.json("In " + year + ", " + city + " is created.");
  }
});

app.listen(3000);                                                                                                                                                                                                                                                                                                       


// 8. Dynamic Routes IV 250 PTS

  var express = require('express');
  var app = express();

  app.param('year', function(request, response, next) {
    if(isYearFormat(request.params.year)) {
      next();
    } else {
      response.status(400).json('Invalid Format for Year');
    }
  });

  var citiesYear = {
    5000: 'Lotopia',
    5100: 'Caspiana',
    5100: 'Indigo',
    6000: 'Paradise',
    7000: 'Flotilla'
  };

  function isYearFormat(value) {
    var regexp = RegExp(/^\d{4}$/);
    return regexp.test(value);
  }

  app.get('/cities/year/:year', function(request, response) {
    var year = request.params.year;
    var city = citiesYear[year];

    if(!city) {
      response.status(404).json("No City found for given year");
    } else {
      response.json("In " + year + ", " + city + " is created.");
    }
  });
  app.listen(3000);
//With the proper validations in place for the following code, what would the 
//output be for a GET request to /cities/year/500?
//In 5000 year city Lotopia is created.
//404 No city found for given year
// Answer: 400 Invalid Format for Year