//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db ) => {
  if ( err ) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // findOneAndUpdate - aka. ID
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("587fdfb45155512cc4ab4dbd")
  },{
    $set: {
      completed: true
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  })


  //db.close();
});
