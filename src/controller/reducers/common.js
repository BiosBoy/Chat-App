import { HIDE_DEBUG_MANUAL, SOMEONE_TYPING, SIDEBAR_TOGGLER, HIDE_SIDEBAR } from '../../constants/actionsTypes';

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
    default:
      return state;
  }
};

export default common;
