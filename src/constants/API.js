const WSS_END_POINT = __DEV__ ? 'ws://localhost:3002' : 'wss://chat-app-121.herokuapp.com';
const JOIN_END_POINT = __DEV__ ? 'http://localhost:3002/join' : 'https://chat-app-121.herokuapp.com/join';
const AUTH_END_POINT = __DEV__ ? 'http://localhost:3002/auth' : 'https://chat-app-121.herokuapp.com/auth';

export { WSS_END_POINT, JOIN_END_POINT, AUTH_END_POINT };
