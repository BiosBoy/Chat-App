const users = [];
const messages = [];
const typingUsers = [];

const storeTools = {
  addConnectedUser: newUser => {
    users.push(newUser);
  },
  deleteDisconnectedUser: userConnectionID => {
    users.splice(0, users.length, ...users.filter(user => user.uuid !== userConnectionID));
  },
  findCurrentUser: userConnectionID => users.find(user => user.uuid === userConnectionID),
  addNewMessageToStore: newMessage => {
    messages.push(newMessage);
  },
  pushTypingUser: newUser => {
    if (typingUsers.some(user => user.uuid === newUser.uuid)) return;

    typingUsers.push(newUser);
  },
  removeTypingUser: userConnectionID => {
    typingUsers.splice(0, typingUsers.length, ...typingUsers.filter(user => user.uuid !== userConnectionID));
  }
};

module.exports = {
  users,
  messages,
  typingUsers,
  storeTools
};
