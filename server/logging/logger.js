const fs = require('fs');

var logPath = '';
var logName = 'server.log';

var log = ( req ) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile( logPath + logName, log + '\n', (err) => {
    if ( err ) {
      console.log('Unable to append to server.log');
    }
  });
};
var setPath = ( path ) => {
  logPath = path;
}
var setName = ( name ) => {
  logName = name;
}

module.exports = { log, setPath, setName };
