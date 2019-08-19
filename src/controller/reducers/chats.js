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
      const localState = JSON.parse(JSON.stringify(state)); // creating sn object without reference
      // eslint-disable-next-line no-case-declarations
      const stateKeys = Object.keys(localState);
      // eslint-disable-next-line no-case-declarations
      const chatsToUpdate = stateKeys.map(chat => (
        {
          [chat]: localState[chat].map(channel => {
            const updatedChannel = channel;

            if (action.chats.some(chatToInsert => chatToInsert.ID === updatedChannel.ID)) {
              updatedChannel.messages.push(action.message);
            }

            return updatedChannel;
          })
        }
      ))[0];

      return {
        ...localState,
        ...chatsToUpdate
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
