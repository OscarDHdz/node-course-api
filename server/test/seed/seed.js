const {ObjectID} = require('mongodb');
const {Todo}     = require('./../../models/todo');
const {User}     = require('./../../models/user');
const jwt        = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID()
const usersConst = [
  {
    _id: userOneId,
    email: 'oscar@test.com',
    password: 'userpass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
  },
  {
    _id: userTwoId,
    email: 'asd@sad.com',
    password: 'My Pass'
  }
]
const todosConst = [{
  _id: new ObjectID(),
  text: 'First test todo'
  }, {
  _id: new ObjectID(),
  text: 'Second test todo'
}]


const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todosConst);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(usersConst[0]).save();
    var userTwo = new User(usersConst[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => {
    return done();
  }).catch((e) => {
    console.log(e);
  })
}

module.exports = { todosConst, usersConst, populateTodos, populateUsers }
