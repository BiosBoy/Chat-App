import { USER_DISCONECTED } from '../../constants/actionsTypes';

const debug = (state = [], action) => {
  switch (action.type) {
    case USER_DISCONECTED:
      return {
        ...state,
        errorType: action.errorType
      };
    default:
      return state;
  }
};

export default debug;
