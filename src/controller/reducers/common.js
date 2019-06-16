import { HIDE_DEBUG_MANUAL } from '../../constants/actionsTypes';

const common = (state = [], action) => {
  switch (action.type) {
    case HIDE_DEBUG_MANUAL:
      return {
        ...state,
        disableBlurOverlay: action.disableBlur
      };
    default:
      return state;
  }
};

export default common;
