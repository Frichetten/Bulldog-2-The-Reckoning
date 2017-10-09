// server.js - Nick Frichette 9/24/2017


// Dependencies
var express 	= require('express');
var app	 	= express();
var bodyParser 	= require('body-parser');



// Basic routing
app.get('/', function(req, res) {
  res.render('views/index', { title: 'Express' });
});

function myController($scope) {
  $scope.title = "Hello There!";
} 


// Start
var port = 8080;
console.log("Starting server on port: " + port);
app.listen(port);
