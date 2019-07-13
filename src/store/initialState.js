const initialState = {
  currentUser: {
    name: '',
    uuid: null,
    connectionStatus: 'notConnected'
  },
  debug: {
    errorType: '',
    errorMessage: '',
    showDebug: false
  },
  users: {
    list: [],
    mobileLayout: false
  },
  common: {
    disableBlurOverlay: false,
    typingUsers: []
  },
  chats: {
    direct: [],
    rooms: []
  },
  currentChat: {
    title: 'global',
    chatType: 'rooms',
    chatID: 'global'
  }
};

export default initialState;
