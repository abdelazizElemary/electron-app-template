const mongoose = require('mongoose');

const BookingErrorsSchema = new mongoose.Schema(
  {
    // Add here whatever data you want to track in case of errors
  },
  {
    timestamps: true,
  },
);

const BookingErrors = mongoose.model('booking-errors', BookingErrorsSchema);

module.exports = { BookingErrors };
