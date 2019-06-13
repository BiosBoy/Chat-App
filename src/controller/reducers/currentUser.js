import { INITIAL_DATA, USER_DISCONECTED } from '../../constants/actionsTypes';

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        uuid: action.users[action.users.length - 1].uuid,
        name: action.users[action.users.length - 1].name
      };
    case USER_DISCONECTED:
      return {
        ...state,
        isDisconnected: action.disconected
      };
    default:
      return state;
  }
};

export default currentUser;
