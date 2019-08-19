import { HIDE_DEBUG_MANUAL, SOMEONE_TYPING, SIDEBAR_TOGGLER, HIDE_SIDEBAR, UNREADED_MESSAGE, CHAT_SELECTED } from '../../constants/actionsTypes';

const common = (state = [], action) => {
  switch (action.type) {
    case HIDE_DEBUG_MANUAL:
      return {
        ...state,
        disableBlurOverlay: action.disableBlur
      };
    case SOMEONE_TYPING:
      return {
        ...state,
        typingUsers: action.typingUsers
      };
    case SIDEBAR_TOGGLER:
      return {
        ...state,
        showSidebar: !state.showSidebar
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        showSidebar: action.status
      };
    case UNREADED_MESSAGE:
      // eslint-disable-next-line no-case-declarations
      const unreadedChats = JSON.parse(JSON.stringify(state.unreadedMessages));

      if (state.unreadedMessages.length <= 0 || !unreadedChats.find(unrededChat => unrededChat.ID === action.chat.ID)) {
        unreadedChats.push({
          ID: action.chat.ID,
          type: action.chat.type,
          unreadedCount: 1
        });
      } else {
        unreadedChats.forEach((chat, id) => (
          chat.ID === action.chat.ID && unreadedChats.splice(id, 1, {
            ...chat,
            unreadedCount: chat.unreadedCount + 1
          })
        ));
      }

      return {
        ...state,
        unreadedMessages: unreadedChats
      };
    case CHAT_SELECTED:
      return {
        ...state,
        unreadedMessages: state.unreadedMessages.filter(chat => {
          return chat.ID !== action.payload.chatID;
        })
      };
    default:
      return state;
  }
};

export default common;
