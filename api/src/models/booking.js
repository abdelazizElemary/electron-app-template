const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    // You can add your Booking details
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model('booking', BookingSchema);

module.exports = { Booking };
