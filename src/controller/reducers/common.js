import { HIDE_DEBUG_MANUAL, SOMEONE_TYPING } from '../../constants/actionsTypes';

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
    default:
      return state;
  }
};

export default common;
