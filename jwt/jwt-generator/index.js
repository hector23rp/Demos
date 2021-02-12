const express = require('express');
const router = require('./routes/routes');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
require('./auth/auth');

const UserModel = require('./model/user.model');

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});


const httpServer = http.createServer(app);
httpServer.listen(3000);
httpServer.on('listening', () => {
  console.log(`Listening on port ${3000}`);
});
httpServer.on('error', (error) => {
  console.error(error);
})
