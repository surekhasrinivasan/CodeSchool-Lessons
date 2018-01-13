//module from other libraries so we could use their code
var http = require('http'); //http library 
var fs = require('fs'); //file system library 

//Lets create our own Module

//we can set only one object equals to module.exports and thats the only public method in that module 
//custom_hello.js
var hello = function(){
	console.log("hello");
}
//make it public
module.exports = hello;


//custom_goodbye can set  multiple methods as public  
//custom_goodbye.js
exports.goodbye = function(){
	console.log("bye!");
}

//inisde our application file
app.js
var hello = require('./custom_hello');
var gb = require('./custom_goodbye');

hello();
gb.goodbye();

//or we can call goodbye method in one line 
require('./custom_goodbye').goodbye();