var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	mongoose = require('mongoose'),
	City = require('./models/city.js');

http.listen(3000, function(){
  console.log('listening on *:3000');
});



mongoose.connect('mongodb://localhost/cities');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to Database');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('get cities', function(payload){
  	City.find(function(err, cities){
  		io.emit('return cities', cities);
  	});
  });
});