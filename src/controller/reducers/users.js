import { INITIAL_DATA, ADD_USER, NEW_USER_CONNECTED } from '../../constants/actionsTypes';

const users = (state = [], action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        list: [...state.list, ...action.users]
      };
    case ADD_USER:
      return {
        ...state,
        list: [
          ...state.list,
          {
            name: action.name,
            uuid: action.uuid
          }
        ]
      };
    case NEW_USER_CONNECTED:
      return {
        ...state,
        list: [...action.users]
      };
    default:
      return state;
  }
};

export default users;
