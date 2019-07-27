import { INITIAL_DATA, USER_DISCONECTED, USER_INTIALIZATION_START, USER_INTIALIZATION_FINISH, FAVORIVE_CHANNEL_ADDED } from '../../constants/actionsTypes';
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
    case FAVORIVE_CHANNEL_ADDED:
      return {
        ...state,
        favoriteChats: action.favoriteChats
      };
    default:
      return state;
  }
};

export default currentUser;
