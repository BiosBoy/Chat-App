import { INITIAL_DATA } from '../constants/actionsTypes';

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        uuid: action.users[action.users.length - 1].uuid,
        name: action.users[action.users.length - 1].name
      };
    default:
      return state;
  }
};

export default currentUser;
