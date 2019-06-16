import { ERROR_RECEIVED, SHOW_DEBUG, HIDE_DEBUG, HIDE_DEBUG_MANUAL } from '../../constants/actionsTypes';

const errorReceived = errorPayload => ({
  type: ERROR_RECEIVED,
  errorType: errorPayload.errorType,
  errorMessage: errorPayload.message
});

const showDebug = () => ({
  type: SHOW_DEBUG,
  showDebug: true
});

const hideDebug = () => ({
  type: HIDE_DEBUG,
  showDebug: false
});

const hideDebugManual = () => ({
  type: HIDE_DEBUG_MANUAL,
  showDebug: false,
  disableBlur: true
});

export { errorReceived, showDebug, hideDebug, hideDebugManual };
