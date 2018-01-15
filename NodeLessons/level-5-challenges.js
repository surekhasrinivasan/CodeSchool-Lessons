//Express Routes
//Let's create an express route that accepts GET requests on '/tweets' and 
//responds by sending back a static HTML file.
//tweets.html
<html>
  <ul>
    <li>Real Time Web with Node.JS Launched!</li>
    <li>Node.js Rules!</li>
  </ul>
</html>


//app.js
var express = require('express');
var app = express();
// a. Create a GET route for '/tweets' and give it the proper callback. 
//The callback function should accept two arguments: the request and the response.
app.get('/tweets', function(request, response){
    
    //b. Send back the file tweets.html, which lives under the project's root path. 
    //Remember to use __dirname to locate tweets.html.
    
    response.sendFile(__dirname + "/tweets.html");
});
// c. Finally, have the express app listen on port 8080.
app.listen(8080);

// 2. Route Params
//Let's create a route that accepts dynamic arguments in the URL path and responds 
//with the quote from the proper author.

//app.js
var express = require('express');
var app = express();

var quotes = {
  'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
  'berners-lee': 'The Web does not just connect machines, it connects people',
  'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
  'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};
//a. Start by creating a GET route for '/quotes' that takes a name parameter as part of the URL path.
app.get('/quotes/:name', function (request, response){
  /*Now, use the name parameter from the URL to retrieve a quote from the quotes object and write it out to the response. 
  Note: No piping here, just write the quote string to the response like you did in previous levels (and then close the response).*/
    //response.write(quotes[request.params.name]);
  //response.end();
  //or 
  response.end(quotes[request.params.name]);
});
app.listen(8080);

// 3. Rendering 
//Instead of just writing out the quote to the response, let's try using an EJS 
//template to render the response.
var express = require('express');
var app = express();

var quotes = {
  'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
  'berners-lee': 'The Web does not just connect machines, it connects people',
  'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
  'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

app.get('/quotes/:name', function(req, res) {
  var quote = quotes[req.params.name];
    //a. First, render the quote.ejs template to the response.
    //b. Next, make the name and the quote data available to the template.
    res.render('quote.ejs', {
        name: req.params.name,
        quote: quote
    });
});
app.listen(8080);

//views/quote.ejs
//c. Inside quote.ejs, add the code needed to render the data you passed to the template.
<h2>Quote by <%= name %></h2>

<blockquote>
  <%= quote %>
</blockquote>