const express = require('express');
const endpointsAPI = express.Router();

endpointsAPI
  .get('/fetch', (req, res) => res.send(JSON.stringify('Hello World!')));

module.exports = endpointsAPI;
