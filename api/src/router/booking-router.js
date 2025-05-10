const { auth } = require('../auth');
const { saveBooking } = require('../use-cases/save-booking');
const { addBookingValidator } = require('../validators');

const BookingRouter = require('express').Router();

// In my case I need to implement an API to add a booking to the queue
BookingRouter.post('/add-booking', auth, addBookingValidator, async (req, res) => {
  try {
    const data = req.body;
    // Add whatever logic you need and call save booking where it handles the added sessions
    saveBooking(data);

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { BookingRouter };
