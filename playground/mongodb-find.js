//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db ) => {
  if ( err ) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').find().count().then((docs) => {
    console.log(docs);
    // console.log('Todos:');
    // console.log(JSON.stringify(docs, undefined, 2));
  }).catch((err) => {
    console.log('Unable to fecth', err);
  })

  db.collection('Users').find({
    name: 'Brenda'
  }).toArray().then((docs) => {
    // console.log('Todos:');
     console.log(JSON.stringify(docs, undefined, 2));
  }).catch((err) => {
    console.log('Unable to fecth', err);
  })

  //db.close();
});
