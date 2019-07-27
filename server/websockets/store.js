const store = {
  users: [],
  typingUsers: [],
  chats: {
    direct: [
      {
        ID: 0,
        messages: [],
        allowedUsers: []
      }
    ],
    rooms: [
      {
        ID: 'global',
        uuid: 1,
        type: 'rooms',
        security: 'public',
        allowedUsers: [],
        messages: []
      },
      {
        ID: 'flood',
        uuid: 2,
        type: 'rooms',
        security: 'public',
        allowedUsers: [],
        messages: []
      }
    ]
  }
};

const storeTools = {
  userAlredyExist: cookie => store.users.some(user => user.cookie === cookie),
  addConnectedUser: newUser => {
    store.users.push(newUser);
    store.chats.rooms.forEach(channel => {
      channel.security === 'public' && channel.allowedUsers.push(newUser.uuid);
    });
  },
  deleteDisconnectedUser: cookie => {
    store.users.splice(0, store.users.length, ...store.users.filter(user => user.cookie !== cookie));
  },
  decreaseConnection: leavedUser => {
    leavedUser.connections -= 1;
  },
  destroyConnection: leavedUser => {
    leavedUser.isConnected = false;
  },
  findCurrentUser: cookie => store.users.find(user => user.cookie === cookie),
  updateReconnectedUserData: ({ cookie }) => {
    const reconnectedUser = store.users.find(user => user.cookie === cookie);

    reconnectedUser.connections += 1;
    reconnectedUser.isConnected = true;

    return reconnectedUser;
  },
  createNewChat: ({ type, allowedUsers, ID, uuid, messages }) => {
    const chatToAddNewChannel = store.chats[type];
    const newChannel = { ID, type, uuid, allowedUsers, messages };

    chatToAddNewChannel.push(newChannel);
  },
  addUserConnectionStatusMessageToChats: (userID, newMessage) => {
    const chatsList = Object.keys(store.chats);

    chatsList.forEach(chat => {
      store.chats[chat].forEach(channel => {
        channel.allowedUsers.includes(userID) && channel.messages.push(newMessage);
      });
    });
  },
  addNewMessageToChat: ({ type, ID }, newMessage) => {
    store.chats[type].forEach(channel => {
      const isChatWrong = channel.ID !== ID;

      if (isChatWrong) {
        return;
      }

      channel.messages.push(newMessage);
    });
  },
  pushTypingUser: newUser => {
    const isCurrentUserAlreadyTyping = store.typingUsers.some(user => user.cookie === newUser.cookie);

    if (isCurrentUserAlreadyTyping) return;

    store.typingUsers.push(newUser);
  },
  removeTypingUser: cookie => {
    store.typingUsers.splice(0, store.typingUsers.length, ...store.typingUsers.filter(user => user.cookie !== cookie));
  },
  addChatToUserFavorites: ({ currentUser, favoriteChat }) => {
    const isAlreadyFavorite = currentUser.favoriteChats.find(
      chat => chat.ID === favoriteChat.ID && chat.type === favoriteChat.type
    );

    if (isAlreadyFavorite) {
      currentUser.favoriteChats.splice(
        0,
        currentUser.favoriteChats.length,
        ...currentUser.favoriteChats.filter(chat => {
          return chat.ID !== isAlreadyFavorite.ID || chat.type !== isAlreadyFavorite.type;
        })
      );

      return;
    }

    currentUser.favoriteChats.push(favoriteChat);
  }
};

module.exports = {
  store,
  storeTools
};
