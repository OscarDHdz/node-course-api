var mongoose = require('mongoose');

// Set Promises ON
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };
