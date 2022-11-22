const cors = req => {
  const hosts = {
    origin: ['http://localhost, http://localhost:80', 'localhost', 'localhost:80', 'localhost:3000', 'localhost:3001', 'localhost:3002', 'http://localhost:3000', 'http://localhost:3001','http://localhost:3002', 'http://192.168.0.102', 'http://192.168.0.102:3000', 'chat-app-121.herokuapp.com'],
    default: 'http://localhost'
  };

  const requestedHost = req.headers && req.headers?.origin && req.headers.origin?.toLowerCase();
  const hostAccepted = hosts.origin.includes(req.hostname) || hosts.origin.includes(requestedHost);

  return hostAccepted ? req.headers.origin || req.hostname : hosts.default;
};

module.exports = cors;
