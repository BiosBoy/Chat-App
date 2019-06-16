let DEBUG_TIMER_ID = null;

const postponeDebugTimers = dispatch => ({
  // eslint-disable-next-line no-unused-vars
  startPostponeTimer: (action, delay) => {
    DEBUG_TIMER_ID = setTimeout(() => dispatch(action()), delay);
  },
  clearPostponeTimer: (action, getState) => {
    const {
      currentUser: { isConnected = false },
      debug: { showDebug = false }
    } = getState();

    clearTimeout(DEBUG_TIMER_ID);

    if (!showDebug && isConnected) return;

    dispatch(action());
  }
});

export { postponeDebugTimers };
