import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import currentUser from './currentUser';
import debug from './debug';
import common from './common';

const chat = combineReducers({
  currentUser,
  messages,
  users,
  debug,
  common
});

export default chat;

