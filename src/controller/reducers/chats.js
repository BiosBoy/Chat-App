import { INITIAL_DATA, ADD_MESSAGE, MESSAGE_RECEIVED, NEW_CHAT_CREATED } from '../../constants';

const chats = (state = {}, action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        ...action.chats
      };
    case ADD_MESSAGE:
      return {
        ...state,
        [action.chat.type]: state[action.chat.type].map(channel => (
          channel.ID === action.chat.ID ?
            {
              ...channel,
              messages: [
                ...channel.messages,
                {
                  layout: action.messageType,
                  message: action.message,
                  author: action.author,
                  timestamp: action.timestamp,
                  uuid: action.uuid,
                  uuidAuthor: action.uuidAuthor
                }
              ]
            } : channel))
      };
    case MESSAGE_RECEIVED:
      // eslint-disable-next-line no-case-declarations
      const localState = JSON.parse(JSON.stringify(state));

      return {
        ...localState,
        ...Object.keys(localState).map(chat => (
          {
            [chat]: localState[chat].map(channel => {
              if (action.chats.some(chatToInsert => chatToInsert.ID === channel.ID)) {
                channel.messages.push(action.message);
              }

              return channel;
            })
          }
        ))[0]
      };
    case NEW_CHAT_CREATED:
      return {
        ...state,
        [action.payload.newChat.type]: [
          ...state[action.payload.newChat.type],
          action.payload.newChat
        ]
      };
    default:
      return state;
  }
};

export default chats;
