var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var citySchema = new Schema({  
  name:    { type: String },
  population:     { type: Number },
  total_spots:  { type: Number },
  free_spots:   { type: Number }
});

module.exports = mongoose.model('City', citySchema); 