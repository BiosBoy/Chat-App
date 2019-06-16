import { INITIAL_DATA, ADD_USER, USERS_LIST, USERS_LIST_TOGGLER } from '../../constants/actionsTypes';

const users = (state = [], action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        list: [
          ...state.list,
          ...action.users
        ]
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
    case USERS_LIST:
      return {
        ...state,
        list: [
          ...state.list,
          action.users
        ]
      };
    case USERS_LIST_TOGGLER:
      return {
        ...state,
        mobileLayout: !state.mobileLayout
      };
    default:
      return state;
  }
};

export default users;
