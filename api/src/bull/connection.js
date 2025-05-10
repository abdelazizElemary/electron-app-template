const { config } = require('../../config');

const getRedisConnection = () => {
  const { host, port } = config.get().redis;
  return { host, port };
};

module.exports = { getRedisConnection };
