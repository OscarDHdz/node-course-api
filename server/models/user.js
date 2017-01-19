var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    require: true,
    minlength: 4,
    trim: true,
  }
});

module.exports = { User }
