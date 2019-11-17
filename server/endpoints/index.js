const express = require('express');
const endpointsAPI = express.Router();

endpointsAPI
  .get('/fetch', (req, res) => res.send(JSON.stringify('Hello World!')))
  .post('/login', (req, res) => {
    console.log('Login Attempt:', req.body, req.sessionID);

    const response = {
      isAuth: true,
      sessionID: req.body.isRemember ? req.sessionID : null
    };

    res.send(JSON.stringify(response));
  });

module.exports = endpointsAPI;
