var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    name: String,
    population: Number
});

module.exports = mongoose.model('City', citySchema);