// Modulse
var express = require('express');
var bodyParser = require('body-parser');

// My Modules
const logger = require('./logging/logger');
logger.setPath('./logging/');

// DB
var {mongoose} = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var {User}     = require('./models/user');


var app = express();

// Inject  Middleware to Express
app.use(bodyParser.json());

app.post('/todos', (req, res) => {

  logger.log(req);

  console.log(req.body);

  var todo = new Todo({
      text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }).catch((err) => {
    console.log(err);
  });


});



app.listen(3000, () => {
  console.log('Started on port 3000');
});
