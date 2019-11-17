const express = require('express');
const endpointsAPI = express.Router();

const USERS_DATA_MOCKS = [
  {
    email: 'asdas@sdfsdf.com',
    password: '1242_21sf'
  }
];

endpointsAPI
  .get('/fetch', (req, res) => res.send(JSON.stringify('Hello World!')))
  .post('/login', (req, res) => {
    console.log('Login Attempt:', req.body, req.sessionID);

    let isUserFounded = false;

    USERS_DATA_MOCKS.forEach(user => {
      const { email, password } = user;

      if (email === req.body.email && password === req.body.password) {
        isUserFounded = true;
      }
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
