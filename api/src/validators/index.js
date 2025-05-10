const Joi = require('joi');

const addBookingSchema = Joi.object().keys({
  body: Joi.object().keys({
    bayId: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    sessionStartTime: Joi.string().required(),
    sessionEndTime: Joi.string().required(),
  }),
});
const addBookingValidator = async (req, res, next) => {
  const { error } = addBookingSchema.validate({ body: req.body });
  const { sessionStartTime, sessionEndTime } = req.body;
  const startTime = new Date(sessionStartTime);
  const endTime = new Date(sessionEndTime);
  if (endTime < startTime) {
    return res.status(400).json({
      error: 'Session end time should be greater than start time',
    });
  }

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

module.exports = {
  addBookingValidator,
};
