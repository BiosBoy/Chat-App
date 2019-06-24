const cors = req => {
  const hosts = {
    origin: ['http://localhost, http://localhost:80', 'http://localhost:3000', 'http://192.168.0.102', 'http://192.168.0.102:3000', 'chat-app-121.herokuapp.com'],
    default: 'http://localhost'
  };

  const requestedHost = req.headers && req.headers.origin && req.headers.origin.toLowerCase();
  const hostAccepted = hosts.origin.includes(requestedHost);

  return hostAccepted ? req.headers.origin : hosts.default;
};

module.exports = cors;
