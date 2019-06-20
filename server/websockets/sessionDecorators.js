const { typingUsers, storeTools } = require('./store');
const helpers = require('../utils');

const sessionDecorators = (broadcastNotificationHandlers, ws) => {
  const { generateUUID, debounce } = helpers;
  const { someoneTypingNofity } = broadcastNotificationHandlers;
  const { removeTypingUser } = storeTools;

  const userConnectionID = generateUUID();

  const typingUserDebounce = () => {
    const invokeFunctions = [removeTypingUser, someoneTypingNofity];
    const params = {
      0: [userConnectionID],
      1: [typingUsers, ws],
      common: {
        delay: 1000
      }
    };

    return debounce(invokeFunctions, params);
  };

  return {
    userConnectionID,
    spliceRetiredTypingUser: typingUserDebounce()
  };
};

module.exports = sessionDecorators;
