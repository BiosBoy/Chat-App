const WSS_END_POINT = __DEV__ ? 'ws://localhost:3002' : 'wss://carradar.com.ua:8443';
const JOIN_END_POINT = __DEV__ ? 'http://localhost:3002/join' : 'https://chat.carradar.com.ua/join';
const AUTH_END_POINT = __DEV__ ? 'http://localhost:3002/auth' : 'https://chat.carradar.com.ua/auth';

export { WSS_END_POINT, JOIN_END_POINT, AUTH_END_POINT };
