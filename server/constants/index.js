const path = require('path');

const PORT = process.env.PORT || 80;
const INDEX = path.join(__dirname, '../../public/index.html');
const STATIC = path.join(__dirname, '../../public');

module.exports = {
  PORT,
  INDEX,
  STATIC
};
