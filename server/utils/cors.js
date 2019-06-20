const cors = req => {
  const hosts = {
    origin: ['http://localhost, http://localhost:80', 'http://localhost:3000', 'chat-app-121.herokuapp.com'],
    default: 'http://localhost'
  };

  return hosts.origin.indexOf(req.headers.origin.toLowerCase()) > -1 ? req.headers.origin : hosts.default;
};

module.exports = cors;
