

// name: String, 
// schema: Hash {name: String, coins: Number}, 
// routes: Hash [{route: "get cities", 'callback': function}, .. ]
module.exports = function(name, Model, io){
	var routes = [];

	//get all
	routes.push({"route": 'get all ' + name, "callback": function(res){
			Model.find(function(err, res){
				if(err) return io.emit('error getting all ' + name, err);
				io.emit('return all ' + name, res);
			});
		}})
	//get one
	routes.push({'route': "get one " + name, 'callback': function(id){
		Model.find({id: id}, function(err, res){
			if(err) return io.emit('error getting one ' + name, err);
			io.emit('return one ' + name, res);
		});
	}})
	//create
	routes.push({'route': "create " + name, 'callback': function(object){
		Model.create(object, function(err, res){
			if(err) return io.emit('error creating ' + name, err);
			io.emit('created ' + name, res);
		});
	}})
	//update
	routes.push({'route': "update " + name, 'callback': function(id, update){
		Model.findOneAndUpdate({id: id}, update, function(err, res){
			if(err) return io.emit('error updating ' + name, err);
			io.emit('updated ' + name, res);
		});
	}})
	//delete
	routes.push({'route': "delete " + name, 'callback': function(id){
		Model.remove({id: id}, function(err){
			if(err) return io.emit('error deleting ' + name, err);
			io.emit('deleted ' + name);
		});
	}})

	return routes;
}