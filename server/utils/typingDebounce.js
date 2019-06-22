const debounce = (functions, params) => {
  let timer = null;
  const { typingUsers, ws, delay } = params;

  return cookie => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      const { removeTypingUser, someoneTypingNofity } = functions;

      removeTypingUser(cookie);
      someoneTypingNofity(typingUsers, ws);

      timer = null;
    }, delay);
  };
};

module.exports = debounce;
