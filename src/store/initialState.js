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
  messages: [],
  common: {
    disableBlurOverlay: false
  }
};

export default initialState;
