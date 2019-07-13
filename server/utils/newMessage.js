const generateUUID = require('./generateUUID');

const newMessage = ({ type = 'user', message = '', uuid, timestamp }) => {
  return {
    layout: type,
    message,
    uuid: uuid || generateUUID(),
    timestamp: timestamp || Date.now()
  };
};

module.exports = newMessage;
