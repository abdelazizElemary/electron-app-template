const { getRedisConnection } = require('../connection');
const { Worker } = require('bullmq');
const { bookingsQueue } = require('../queues/bookings');
const { attachDefaultWorkerListeners } = require('./attach-default-worker-listeners');

const bookingsWorker = new Worker(
  bookingsQueue.name,
  async (job) => {
    // Extract data from the job
    const { name } = job;

    try {
      switch (name) {
        /**
         * Here you can define whatever logic you want and different steps
         * for booking your session or whatever service you are building a monitoring tool to
         * you can also send events to pusher to communicate with the electron app
         */
        case 'first-case': {
          try {
            // example for pusher
            pusher.trigger('booking-channel', 'booking-event', {
              message: 'Booking started',
            });
          } catch (error) {
            // record and keep track of the error and store it in the database
            // For example:
            await BookingErrors.create({
              bookingId: job.data.bookingId,
              error: error,
            });
            throw error;
          }
        }

        default:
          throw new Error(`Unknown job name: ${name}`);
      }
    } catch (error) {
      await job.changePriority({ priority: 1 });
      throw error;
    }
  },
  {
    connection: getRedisConnection(),
    concurrency: 1,
    autorun: false,
  },
);

// worker event listeners
attachDefaultWorkerListeners(bookingsWorker);

module.exports = {
  bookingsWorker,
};
