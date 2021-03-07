import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'

import { router } from './routes/routes.js'
import * as auth from './auth/auth.js'
import UserModel from './model/user.model.js'

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")))
app.use(router);
console.log('- Registered endpoint /user')
console.log('- Registered endpoint /signup')
console.log('- Registered endpoint /login')

// Port
const port = 3000;

const httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.on('listening', () => {
  console.log(`Listening on port ${port}`);
});
httpServer.on('error', (error) => {
  console.error(error);
})
