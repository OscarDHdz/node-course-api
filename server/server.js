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


  var todo = new Todo({
      text: req.body.text
  });

  console.log('POST: todo');
  console.log(JSON.stringify(todo, undefined, 2));

  // todo.save().then(
  //   (doc) => {
  //   res.status(200).send(doc);
  //   }, (e) => {
  //   res.status(400).send(e);
  //   }
  // );

  todo.save()
  .then((doc) => {
    res.status(200).send(doc);
  })
  .catch((e) => {
    res.status(400).send(e);
  })

});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.listen(3000, () => {
  console.log('Started on port 3000');
});


module.exports = { app }