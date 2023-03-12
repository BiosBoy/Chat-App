
const debug = require('debug')('app:server');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const webSocketsServer = require('./websockets');
const endpoints = require('./endpoints');
const cors = require('./utils/cors');
const { PORT, STATIC } = require('./constants');

// ----------------------
// Server Configuration
// ----------------------
const server = express()
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', cors(req));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'public, max-age=31557600');
    next();
  })
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(session({
    secret: 'give-five',
    resave: true,
    saveUninitialized: true,
    name: 'cookieUUID',
    cookie: {
      maxAge: 86400000,
      httpOnly: false,
      secure: false,
      sameSite: false
    },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
  }))
  .use(express.static(STATIC))
  .use(endpoints)
  // .use('*', (req, res) => res.sendFile(INDEX))
  .listen(PORT);

// ----------------------
// WebSockets Runner
// ----------------------
webSocketsServer(server);

console.log('Express App Server is Started! Port 1: ', PORT);
debug('Express App Server is Started! Port: ', PORT);
