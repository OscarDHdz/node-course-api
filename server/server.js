require('./config/config');

const {ObjectID} = require('mongodb');
const _ = require('lodash');
// Modulse
var express = require('express');
var bodyParser = require('body-parser');

// My Modules
const logger = require('./logging/logger');
logger.setPath('./server/logging/');

// DB
var {mongoose} = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var {User}     = require('./models/user');

// Middleware
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;

// Inject  Middleware to Express
app.use(bodyParser.json());

// TOdos -----------------------------------------------------------------------
app.post('/todos', authenticate, (req, res) => {

  logger.log(req);


  var todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
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

app.get('/todos', authenticate, (req, res) => {
  logger.log(req);
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({
      todos
    });
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', authenticate, (req, res) => {
    logger.log(req);
    var id = req.params.id;

    if ( !ObjectID.isValid(id) ) {
      res.status(404).send({
        error: 'INVALID_ID',
      });
    }
    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if ( todo ) {
        return res.status(200).send({todo})
      }
      res.status(404).send();
    }).catch((e) => {
      res.status(400).send();
    })
})

app.delete('/todos/:id', authenticate, (req, res) => {
  logger.log(req);
  var id = req.params.id;

  if ( !ObjectID.isValid(id) ) {
    return res.status(404).send();
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {

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

app.patch('/todos/:id', authenticate, (req, res) => {
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
    Todo.findOneAndUpdate({
      _id: id,
      _creator: req.user._id
    }, {
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

// Users -----------------------------------------------------------------------
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  // jwt


  user.save()
  .then(() => {
    return user.generateAuthToken();
  })
  .then((token) => {
    res.header('x-auth', token).send(user);
  })
  .catch((e) => {
    res.status(400).send(e);
  });


});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);


  // User.findByCredentials( body.email, body.password )
  // .then((user) => {
  //   res.send(user);
  // })
  // .catch((e) => {
  //   res.status(404).send(e);
  // })

  User.findByCredentials( body.email, body.password  )
  .then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  })
  .catch((e) => {
    res.status( e.status || 400).send();
  });

});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch((e) => {
    res.status(400).send();
  })
});

// With Middleware
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});


module.exports = { app }
