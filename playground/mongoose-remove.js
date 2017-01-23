const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo}     = require('../server/models/todo');
const {User}     = require('../server/models/user');



// Todo.findOneAndRemove


// Todo.findById({...}).then((todo) => {
//   console.log(todo);
// });


Todo.findByIdAndRemove("5882882ecf397107b0b25501").then((todo) => {

  console.log('Removed Todo:', todo);
});
