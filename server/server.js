const {ObjectID} = require('mongodb');
const _ = require('lodash');
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
  logger.log(req);
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req, res) => {
    logger.log(req);
    var id = req.params.id;

    if ( !ObjectID.isValid(id) ) {
      res.status(404).send({
        error: 'INVALID_ID',
      });
    }
    Todo.findById(id).then((todo) => {
      if ( todo ) {
        return res.status(200).send({todo})
      }
      res.status(404).send(todo);
    }).catch((e) => {
      res.status(400).send();
    })
})

app.delete('/todos/:id', (req, res) => {
  logger.log(req);
  var id = req.params.id;

  if ( !ObjectID.isValid(id) ) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {

    if ( !todo ) {
      return res.status(404).send();
    }

    res.status(200).send({
      status: 'REMOVED'
    });
  }).catch((e) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id', (req, res) => {
  logger.log(req);
  var id = req.params.id;

  var body = _.pick(req.body, ['text', 'completed']);

  if ( !ObjectID.isValid(id) ) {
    res.status(404).send({
      error: 'INVALID_ID',
    });
  }

  if ( _.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
    Todo.findByIdAndUpdate(id, {
      $set: body
    }, {
      new: true
    }).then((todo) => {
      if (!todo)  {
        return res.status(404).send();
      } else {
        res.send({todo});
      }
    }).catch((e) => {
      res.status(404).send();
    });
  } else {
    body.completed = false;
    body.completedAt = null;
  }

});


app.listen(3000, () => {
  console.log('Started on port 3000');
});


module.exports = { app }
