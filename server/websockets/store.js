const users = [];
const messages = [];
const typingUsers = [];

const storeTools = {
  userExit: cookie => users.some(user => user.cookie === cookie),
  addConnectedUser: newUser => {
    users.push(newUser);
  },
  deleteDisconnectedUser: cookie => {
    users.splice(0, users.length, ...users.filter(user => user.cookie !== cookie));
  },
  decreaseConnection: leavedUser => {
    leavedUser.connections -= 1;
  },
  destroyConnection: leavedUser => {
    leavedUser.isConnected = false;
  },
  findCurrentUser: cookie => users.find(user => user.cookie === cookie),
  updateReconnectedUserData: ({ cookie, newConnectionID }) => {
    const reconnectedUser = users.find(user => user.cookie === cookie);

    reconnectedUser.uuid = newConnectionID;
    reconnectedUser.connections += 1;
    reconnectedUser.isConnected = true;

    return reconnectedUser;
  },
  addNewMessageToStore: newMessage => {
    messages.push(newMessage);
  },
  pushTypingUser: newUser => {
    if (typingUsers.some(user => user.cookie === newUser.cookie)) return;

    typingUsers.push(newUser);
  },
  removeTypingUser: cookie => {
    typingUsers.splice(0, typingUsers.length, ...typingUsers.filter(user => user.cookie !== cookie));
  }
};

module.exports = {
  users,
  messages,
  typingUsers,
  storeTools
};
