var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	mongoose = require('mongoose'),
	City = require('./models/city.js'),
	User = require('./models/user.js'),
	Property = require('./models/property.js'),
	CRUDModelHelper = require('./models/model_helpers.js');

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var routes = [];
city_routes = CRUDModelHelper('city', City, io);
user_routes = CRUDModelHelper('user', User, io);
property_routes = CRUDModelHelper('property', Property, io);

//console.log(JSON.stringify(routes));

mongoose.connect('mongodb://localhost/konomy');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to Database');
});

io.on('connection', function(socket){
  	console.log('a user connected');
  	console.log(JSON.stringify(city_routes));
  	console.log(JSON.stringify(user_routes));
  	console.log(JSON.stringify(property_routes));

  	city_routes.forEach(function(route){
  		socket.on(route.route, route.callback);
  	});
  	user_routes.forEach(function(route){
  		socket.on(route.route, route.callback);
  	});
  	property_routes.forEach(function(route){
  		socket.on(route.route, route.callback);
  	});
});