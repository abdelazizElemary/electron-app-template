const { Queue } = require('bullmq');
const { getRedisConnection } = require('../connection');

const bookingsQueue = new Queue('bookings', {
  connection: getRedisConnection(),
  defaultJobOptions: {
    attempts: 1,
    priority: 2,
    backoff: 0,
  },
});

module.exports = {
  bookingsQueue,
};
