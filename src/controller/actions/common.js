import { INITIAL_DATA } from '../../constants/actionsTypes';

const initialLoad = ({ users, messages }) => ({
  type: INITIAL_DATA,
  users,
  messages
});

export { initialLoad };
