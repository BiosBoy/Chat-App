import { INITIAL_DATA, ADD_USER, USERS_LIST } from '../../constants/actionsTypes';

const users = (state = [], action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return [
        ...state,
        ...action.users
      ];
    case ADD_USER:
      return [
        ...state,
        {
          name: action.name,
          uuid: action.uuid
        }
      ];
    case USERS_LIST:
      return action.users;
    default:
      return state;
  }
};

export default users;
