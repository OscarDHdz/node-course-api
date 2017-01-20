const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo}     = require('../server/models/todo');

var id = '68824a61e34b3b3788abbc6a';

if ( !ObjectID.isValid(id)){
  return console.log('Invalid ID Format');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos:', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  if ( !todo ) {
    return console.log('ID not Found');
  }
  console.log('Todo:', todo);
});


Todo.findById(id)
  .then((todo) => {
    if ( !todo ) {
      return console.log('ID not Found');
    }
    console.log('Todo by ID', todo);
  })
  .catch()
