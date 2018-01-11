// Streams are like channels where data simply flow through. They can be of different types, the moste 
// common ones are readable or writable or both. the stream API described is version v0.10 a.k.a streams2 API.
// The request object for example is a readable stream and response object is writable stream. We read data
// from the request and write data to the response. 

//How to read from the Request?
/*The combination of Request(readable stream) which inherits from EventEmitter 
Request object communicate to other objects through firing events. The events fired are readable,
which is fired when data is ready to be consumed.*/ 
//Lets print what we receive from the request that is the data from the client. 
http.createServer(function(request, response) { //request handler
  
response.writeHead(200);
//listen to the readable event on the request object  
request.on('readable', function(){
    //declare a chunk variable, inside of the while loop we read out a chunk from the request and if it 
    //not null we will print to the console. 
var chunk = null;
while(null !== (chunk = request.read())){
    //call the toString is required because the chunk we get are buffers which might have binary codes so it needs conversion to string. 
console.log(chunk.toString());
}
});
// finally we listen to the end event and when that event is fired we finish the response  
request.on('end', function(){
    
});
}).listen(8080)

//Lets echo back the client the data that we get from the request 
http.createServer(function(request, response) { //request handler
  
response.writeHead(200);
//listen to the readable event on the request object  
request.on('readable', function(){
    //declare a chunk variable, inside of the while loop we read out a chunk from the request and if it 
    //not null we will print to the console. 
var chunk = null;
while(null !== (chunk = request.read())){
    //just change one line. instead of console.log we write the below code
    //node there is no toString because response.write will take care of the conversion to string 
    response.write(chunk);
}
});
// finally we listen to the end event and when that event is fired we finish the response  
request.on('end', function(){
    
});
}).listen(8080)

//All we need to do is write to a writable stream as soon as you read from a readable stream
// and that is what is shown above. Node offers the helper method to pipe these two operations 
//together. this method is called 'pipe'. pipe does all the event listening and chunk reading
//behind the scene. So we can replace the above code by one line. 
http.createServer(function(request, response) { //request handler
    response.writeHead(200);
    request.pipe(response);
}).listen(8080)

//so now when we send in a string hello we can see the string hello being sent back 
$ curl -d 'hello' http://localhost:8080
//hello

//  streams API which is not still stable, Node itself has not reached 1.0 yet
//so we should always check whether the API we want to use is stable or not
//we can do that by looking at the docs. Each core module has a stability score next to it.
//Ex. File system module has stabilit score: 3 - stable 
// Streams module stability -2 - unstable // change possible 


//Another Example of using streams 
// Reading and writing a File - we are going read the contents from 
//a file in the file system and stream to another file.
var fs = require('fs'); //require filesystem module 

var file = fs.createReadStream("readme.md");
var newFile = fs.createWtriteStream("readme_copy.md");

file.pipe(newFile);


// Upload a file - we can pipe any read stream to write stream. Below is the combination:
//here instead of reading from a file we are going to read from a request and pipe it to a file
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){
	var newFile = fs.createWtriteStream("readme_copy.md");
	request.pipe(newFile);
	//close response
	request.on('end', function(){
		response.end('uploaded');
});
}).listen(8080);
//when we run this from the client passsing in a file argument
//$ curl --upload-file readme.md http://localhost:8080
//we can see the response - uploaded.

/*visualizing streaming process

it is amazing Node supports streaming. so we are streaming pieces of the file from the client 
to the server and the server is streaming those pieces to the disk as they being read from 
the request.At no point of time is the server is holding the entire file in memory at 
once it just flowing continuously and due to Node's nature it's all non-blocking 
so if we try to upload 2 files at the same time to the server we can see that 
our Node server can handle both simultaneously. */

//File uploading progress
//we can upload a file using the command prompt 
// curl --upload-file readme.md http://localhost:8080
//or attaching files and receivethe progress 
//as the file is uploaded  
//Outputs 
//progress: 3%
//progress: 6%
//progress: 9%
//progress: 13%
//progress: 50%
//progress: 99%
//progress: 100%
//we are going to need 
//HTTP server
//file system 
//we start with the below code used to upload a file then we need to know the entire size of the 
//file is by reading the content length header from the request and store it in fileBytes variable 
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){
	var newFile = fs.createWtriteStream("readme_copy.md");
    var fileBytes = request.headers['content-length'];   
    //we create uploadedBytes variable to keep track of how many bytes were uploaded and will initialize to 0
    var uploadedBytes = 0;
//the only reason we are using the readable event is to keep track of the current progress 
//listening to the readable event 
    request.on('readable', function(){
	    var chunk = null;
	   //loop through and read each of the chunks from the request 
	    while(null !== (chunk = request.read())){
	    //inside the while loop we increment the uploadedBytes with the length of each chunk
	    uploadedBytes += chunk.length;
	    //calculate the progress 
	    var progress = (uploadedBytes / fileBytes) *100;
	    //then we send a progress back to client using the response.write function 
	    //we use parseInt to round the progress to an integer
	    response.write("progress: " + parseInt(progress, 10) + "%\n");
	    }
    });
    //pipe is taking care of upload for us 
	request.pipe(newFile);
	//close response
	request.on('end', function(){
		response.end('uploaded');
});
}).listen(8080);

//now we run the file 
//$ node app.js
//listening to the port ...
// curl --upload-file large_file.jpg http://localhost:8080
//progress: 3%
//progress: 6%
//progress: 9%
//progress: 13%
//progress: 50%
//progress: 99%
//progress: 100%
