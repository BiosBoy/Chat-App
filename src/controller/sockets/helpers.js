import { ADD_USER } from '../../constants';
import getCookie from '../../utils/getCookie';

const websocketsHelpers = () => ({
  subscribeUser: (socket, name) => {
    const payload = {
      type: ADD_USER,
      name,
      cookie: getCookie('cookieUUID')
    };

    socket.send(JSON.stringify(payload));
  },
  dataParser: event => JSON.parse(event.data)
});

export default websocketsHelpers;
