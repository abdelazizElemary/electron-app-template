const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const cron = require('node-cron');
const { AddBookingsToQueue } = require('./src/cron-jobs');
const { config } = require('./config');
const { BookingRouter } = require('./src/router/booking-router');
const { bookingsWorker } = require('./src/bull/workers/bookings-worker');

const app = express();
const httpServer = http.createServer(app);

const {
  mongo: { mongodbUri },
} = config.get();
const port = 4000;

mongoose
  .connect(mongodbUri, {
    socketTimeoutMS: 30000,
  })
  .then(() => {
    console.log('MongoDB connection successful');
    return;
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Attach workers to run
bookingsWorker.run();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1', [BookingRouter]);

cron.schedule('*/10 * * * *', () => {
  console.log('⌛ Running AddBookingsToQueue every 10 minutes');
  AddBookingsToQueue();
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
