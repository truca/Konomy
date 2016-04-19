var mongoose = require('mongoose');

var propertySchema = mongoose.Schema({
    user_id: String,
    city_id: String,
    size: Number
});

module.exports = mongoose.model('Property', propertySchema);