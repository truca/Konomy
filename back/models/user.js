var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    coins: Number
});

module.exports = mongoose.model('User', userSchema);