import { INITIAL_DATA } from '../../constants/actionsTypes';

const initialLoad = ({ chats, users, typingUsers }) => ({
  type: INITIAL_DATA,
  chats,
  users,
  typingUsers
});

export { initialLoad };
