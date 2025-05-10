const Pusher = require('pusher');
const { config } = require('./config');

const {
  pusher: { appId, key, secret, cluster, useTLS },
} = config.get();

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
  useTLS,
});

module.exports = {
  pusher,
};
