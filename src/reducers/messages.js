import { ADD_MESSAGE, INITIAL_DATA, MESSAGE_RECEIVED } from '../constants/actionsTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return [
        ...state,
        ...action.messages
      ];
    case ADD_MESSAGE:
      return [
        ...state,
        {
          message: action.message,
          author: action.author,
          uuid: action.uuid
        }
      ];
    case MESSAGE_RECEIVED:
      return [
        ...state,
        {
          ...action.message
        }
      ];
    default:
      return state;
  }
};

export default messages;
