const express = require('express');
const endpointsAPI = express.Router();

const USERS_DATA_MOCKS = require('../db/index');

endpointsAPI
  .get('/fetch', (req, res) => res.send(JSON.stringify('Hello World!')))
  .post('/login', (req, res) => {
    const isUserFounded = USERS_DATA_MOCKS.some(user => {
      const { email, name, password } = user;
      const isEmailMatch = /.*@.*\.\w+/i.test(req.body.email);
      const isUserMatch = isEmailMatch ? email === req.body.email : name === req.body.email;

      return isUserMatch && password === req.body.password;
    });

    if (!isUserFounded) {
      res.send(JSON.stringify({ error: true, message: 'Wrong email or password. Please, try again.' }));

      return;
    }

    const response = {
      isAuth: true,
      sessionID: req.body.isRemember ? req.sessionID : null
    };

    res.send(JSON.stringify(response));
  });

module.exports = endpointsAPI;
