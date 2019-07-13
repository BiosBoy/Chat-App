import { combineReducers } from 'redux';
import users from './users';
import currentUser from './currentUser';
import debug from './debug';
import common from './common';
import chats from './chats';
import currentChat from './currentChat';

const chat = combineReducers({
  currentUser,
  users,
  debug,
  common,
  chats,
  currentChat
});

export default chat;

