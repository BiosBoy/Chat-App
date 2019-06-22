const { typingUsers, storeTools } = require('./store');
const helpers = require('../utils');

const sessionDecorators = ({ broadcastNotificationHandlers, ws }) => {
  const { generateUUID, typingDebounce } = helpers;
  const { someoneTypingNofity } = broadcastNotificationHandlers;
  const { removeTypingUser } = storeTools;

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
    userConnectionID: generateUUID(),
    spliceRetiredTypingUser: typingUserDebounce()
  };
};

module.exports = sessionDecorators;
