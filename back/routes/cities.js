
module.exports = function(app) {
	var City = require('../models/city.js');
	
	//GET - Return all citys in the DB
	exports.findAllCities = function(req, res) {  
	    City.find(function(err, cities) {
	    	if(err) 
	    		res.send(500, err.message);
	    	console.log('GET /cities')
	        res.status(200).jsonp(cities);
	    });
	};

	//GET - Return a City with specified ID
	exports.findById = function(req, res) {  
	    City.findById(req.params.id, function(err, city) {
	    	if(err) 
	    		return res.send(500, err.message);
			console.log('GET /city/' + req.params.id);
	        res.status(200).jsonp(city);
	    });
	};

	//POST - Insert a new City in the DB
	exports.addCity = function(req, res) {  
	    console.log('POST');
	    console.log(req.body);

	    var city = new City({
	    	name:			req.body.name,
			population:   	req.body.population,
			total_spots:  	req.body.total_spots,
			free_spots:   	req.body.free_spots
	    });

	    city.save(function(err, city) {
	        if(err) 
	        	return res.status(500).send( err.message);
	    	res.status(200).jsonp(city);
	    });
	};

	//PUT - Update a register already exists
	exports.updateCity = function(req, res) {  
	    City.findById(req.params.id, function(err, city) {
	        city.name   	 = req.body.name;
	        city.population  = req.body.population;
	        city.total_spots = req.body.total_spots;
	        city.free_spots  = req.body.free_spots;

	        city.save(function(err) {
	            if(err) 
	            	return res.status(500).send(err.message);
	      		res.status(200).jsonp(city);
	        });
	    });
	};

	//DELETE - Delete a City with specified ID
	exports.deleteCity = function(req, res) {  
	    City.findById(req.params.id, function(err, city) {
	        city.remove(function(err) {
	            if(err) 
	            	return res.status(500).send(err.message);
	      		res.status(200).send();
	        })
	    });
	};

	app.get('/cities', findAllCities);
  	app.get('/city/:id', findById);
  	app.post('/city', addCity);
  	app.put('/city/:id', updateCity);
  	app.delete('/city/:id', deleteCity);
}