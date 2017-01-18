//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db ) => {
  if ( err ) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eath Lunch'}).then((result) => {
  //   console.log(result);
  // }).catch((err) => {
  //   console.log(err);
  // })

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eath Lunch'}).then((result) => {
  //   console.log(result);
  // }).catch((err) => {
  //   console.log(err);
  // })

  // findOneAndDelete - aka. ID
  db.collection('Todos').findOneAndDelete({text: 'Eath Lunch'}).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  })

  
  //db.close();
});
