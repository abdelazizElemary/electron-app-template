const { bookingsQueue } = require('../../bull/queues/bookings');
const { Booking } = require('../../models/booking');

/**
 * This handles the added sessions to be added to the database and the cron job can access it later
 */
const saveBooking = async (data) => {
  try {
    await Booking.create(data);

    return true;
  } catch (error) {
    console.error('Error saving booking:', error);
    return false;
  }
};

module.exports = {
  saveBooking,
};
