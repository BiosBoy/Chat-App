import { INITIAL_DATA, USER_DISCONECTED, USER_INTIALIZATION_START, USER_INTIALIZATION_FINISH } from '../../constants/actionsTypes';
import getCookie from '../../utils/getCookie';

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        ...action.users.find(user => user.cookie === getCookie('cookieUUID'))
      };
    case USER_INTIALIZATION_START:
      return {
        ...state,
        connectionStatus: action.status
      };
    case USER_INTIALIZATION_FINISH:
      return {
        ...state,
        connectionStatus: action.status
      };
    case USER_DISCONECTED:
      return {
        ...state,
        connectionStatus: action.status
      };
    default:
      return state;
  }
};

export default currentUser;
