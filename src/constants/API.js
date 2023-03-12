const WSS_END_POINT = __DEV__ ? 'ws://localhost:3002' : 'wss://carradar.com.ua:5137';
const JOIN_END_POINT = __DEV__ ? 'http://localhost:3002/join' : 'https://carradar.com.ua:5137/join';
const AUTH_END_POINT = __DEV__ ? 'http://localhost:3002/auth' : 'https://carradar.com.ua:5137/auth';

export { WSS_END_POINT, JOIN_END_POINT, AUTH_END_POINT };
