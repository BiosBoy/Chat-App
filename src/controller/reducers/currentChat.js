import { CHAT_SELECTED } from '../../constants/actionsTypes';

const currentChat = (state = {}, action) => {
  switch (action.type) {
    case CHAT_SELECTED:
      return {
        ...state,
        chatType: action.payload.chatType,
        chatID: action.payload.chatID,
        title: action.payload.title
      };
    default:
      return state;
  }
};

export default currentChat;
