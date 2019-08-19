import { INITIAL_DATA, SIDEBAR_TOGGLER, HIDE_SIDEBAR, UNREADED_MESSAGE } from '../../constants/actionsTypes';

const initialLoad = ({ chats, users, typingUsers }) => ({
  type: INITIAL_DATA,
  chats,
  users,
  typingUsers
});

const unreadedMessages = ({ chat }) => ({
  type: UNREADED_MESSAGE,
  chat
});

const sidebarToggler = () => ({
  type: SIDEBAR_TOGGLER
});

const hideSidebar = () => ({
  type: HIDE_SIDEBAR,
  status: false
});

export { initialLoad, sidebarToggler, hideSidebar, unreadedMessages };
