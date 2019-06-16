import { USER_DISCONECTED, USER_INTIALIZATION_START, USER_INTIALIZATION_FINISH, ERROR_RECEIVED, SHOW_DEBUG, HIDE_DEBUG, HIDE_DEBUG_MANUAL } from '../../constants/actionsTypes';

const debug = (state = [], action) => {
  switch (action.type) {
    case USER_INTIALIZATION_START:
      return {
        ...state,
        errorType: action.errorType
      };
    case USER_INTIALIZATION_FINISH:
      return {
        ...state,
        errorType: action.errorType
      };
    case USER_DISCONECTED:
      return {
        ...state,
        errorType: action.errorType
      };
    case ERROR_RECEIVED:
      return {
        ...state,
        errorType: action.errorType,
        errorMessage: action.errorMessage
      };
    case SHOW_DEBUG:
      return {
        ...state,
        showDebug: action.showDebug
      };
    case HIDE_DEBUG:
      return {
        ...state,
        showDebug: action.showDebug
      };
    case HIDE_DEBUG_MANUAL:
      return {
        ...state,
        showDebug: action.showDebug
      };
    default:
      return state;
  }
};

export default debug;
