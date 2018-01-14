// 1. Missing Exports 

//Notice the two different files: high_five.js on the left side and app.js on the right. 
//The code as it's written will not work, high_five.js isn't exporting anything.

//high_five.js
var highfive = function() {
  console.log("smack!!");
};
//Add the proper exports line to have a successful high five!
module.exports = highfive;

//app.js
var highfive = require('./high_five.js');
highfive();

//2. Export A Function

// Notice the app.js file with the myRequest function below. 
//Let's refactor myRequest out to its own my_request.js module.

//app.js
myRequest('Hello, this is dog.');
//c. Require the my_request.js module in app.js.
var http = require('http');
var myRequest = require('./my_request');

myRequest('Hello, this is dog.');

//a. Move the myRequest function and the http require into my_request.js
//my_request.js
var http = require('http');

var myRequest = function(message) {
  var request = http.request('http://codeschool.com', function(response) {
    response.pipe(process.stdout, { end: false });
  });

  request.write(message);
  request.end();
};
//b. Export the myRequest function.
module.exports = myRequest;   

// 3. Exporting An Object
//The app.js code on the right side does not work. Once again we forgot to export
//our functions.
//logger.js 
var warn = function(message) {
  console.log("Warning: " + message);
};

var info = function(message) {
  console.log("Info: " + message);
};

var error = function(message) {
  console.log("Error: " + message);
};
// a. In the logger.js file, export the info function so we can use it in app.js by 
//assigning it to the exports object.
exports.info = info;  

// b. In the logger.js file, export the warn function so we can use it in app.js by 
//assigning it to the exports object.
exports.warn = warn;

// c. In the logger.js file, export the error function so we can use it in app.js by 
//assigning it to the exports object.
exports.error = error;

//app.js
var logger = require('./logger');

logger.info('This is some information');
logger.warn('something bad is happening');


// 4. Installing Local Modules 
//Practice using npm by installing the npm module underscore using the npm install command.
npm install underscore

// 5. Installing Global Modules
//Now install the coffee-script module, but install it globally so you can use the coffee 
//executable that comes with coffee-script.
npm install coffee-script -g

// 6. Dependency 
//Add two dependencies to our package.json file, connect and underscore. 
//We'll want to use version 2.1.1 of connect and version 1.3.3 of underscore.

//package.json
{
  "name": "My Awesome Node App",
  "version": "1",
  "dependencies": {
//a. Add the connect dependency to package.json
        "connect":"2.1.1"
//b. Add the underscore dependency to package.json
        "underscore":"1.3.3"
  }
}


// 7. Semantic Versioning
//We want to make sure we are always up-to-date with the most recent patch-level 
//changes to our dependencies when we run npm install.

//package.json
{
  "name": "My Awesome Node App",
  "version": "1",
  "dependencies": {
//Update the connect version on package.json to fetch the latest patch-level changes. 
//All we have to do is add one character to the beginning of the version number.
    "connect": "~2.2.1",
//Now update the underscore version on package.json to fetch the latest patch-level 
//changes. Again, all we have to do is add one character to the beginning of the version number.    
    "underscore": "~1.3.3"
  }
}