const WSS_END_POINT = __DEV__ ? 'ws://localhost:80' : 'wss://chat-app-121.herokuapp.com';
const AUTH_END_POINT = __DEV__ ? 'http://localhost:80/login' : 'https://chat-app-121.herokuapp.com/login';

export { WSS_END_POINT, AUTH_END_POINT };
