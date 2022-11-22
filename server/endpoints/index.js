const express = require('express');
const endpointsAPI = express.Router();

const USERS_DATA_MOCKS = require('../db/index');

endpointsAPI
  .get('/fetch', (req, res) => res.send(JSON.stringify('Hello World!')))
  .post('/auth', (req, res) => {
    const isUserFound = Object.values(USERS_DATA_MOCKS).some(user => user.sessionID === req.body.sessionID)

    console.log(isUserFound, req.body.sessionID, 'USERS_DATA_MOCKS')

    if (!isUserFound) {
      res.send(JSON.stringify({ error: true, message: 'User is not logged.' }));

      return;
    }

    res.send(JSON.stringify({ error: false, message: 'User is logged.' }));
  })
  .post('/join', (req, res) => {
    const userName = req.body.email.substr(0, req.body.email.split('@')[0].length);

    const isUserFounded = USERS_DATA_MOCKS.some(user => {
      const { email, name, sessionID } = user;
      const isEmailMatch = /.*@.*\.\w+/i.test(req.body.email);

      return (isEmailMatch ? email === req.body.email : name === req.body.email) || user.loggedIn;
    });

    if (isUserFounded) {
      res.send(JSON.stringify({ error: true, message: 'Username is already taken or logged in. Please, try another nick.' }));

      return;
    }

    const userData = Object.values(USERS_DATA_MOCKS).find(user => user.sessionID === req.sessionID) || [];

    if (!userData[0]) {
      USERS_DATA_MOCKS.push({
        email: req.body.email,
        name: userName,
        isLogged: true,
        password: req.body.password,
        sessionID: req.body.isRemember ? req.sessionID : null
      });
    }

    const response = USERS_DATA_MOCKS[USERS_DATA_MOCKS.length - 1] || {
      isAuth: true,
      sessionID: req.body.isRemember ? req.sessionID : null,
      name: userName,
      email: req.body.email
    };

    res.send(JSON.stringify(response));
  });


module.exports = endpointsAPI;
