import { INITIAL_DATA, SIDEBAR_TOGGLER, HIDE_SIDEBAR } from '../../constants/actionsTypes';

const initialLoad = ({ chats, users, typingUsers }) => ({
  type: INITIAL_DATA,
  chats,
  users,
  typingUsers
});

const sidebarToggler = () => ({
  type: SIDEBAR_TOGGLER
});

const hideSidebar = () => ({
  type: HIDE_SIDEBAR,
  status: false
});

export { initialLoad, sidebarToggler, hideSidebar };
