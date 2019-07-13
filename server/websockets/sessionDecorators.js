const { typingUsers, storeTools } = require('./store');
const helpers = require('../utils');

const sessionDecorators = ({ broadcastNotificationHandlers, ws }) => {
  const { generateUUID, typingDebounce } = helpers;
  const { someoneTypingNofity } = broadcastNotificationHandlers;
  const { removeTypingUser, findCurrentUser } = storeTools;
  const createUUID = generateUUID();

  const getUUID = () => cookie => {
    const userAlreadyPresent = findCurrentUser(cookie);

    const recognizedUUID = userAlreadyPresent && userAlreadyPresent.uuid || createUUID;

    ws.ID = recognizedUUID;

    return recognizedUUID;
  };

  const typingUserDebounce = () => {
    const invokeFunctions = {
      removeTypingUser,
      someoneTypingNofity
    };
    const params = {
      typingUsers,
      ws,
      delay: 500
    };

    return typingDebounce(invokeFunctions, params);
  };

  return {
    userConnectionID: getUUID(),
    spliceRetiredTypingUser: typingUserDebounce()
  };
};

module.exports = sessionDecorators;
