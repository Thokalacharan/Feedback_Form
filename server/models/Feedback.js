const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  eventName: {
    type: String,
    required: [true, 'Please provide an event name'],
    trim: true,
    maxlength: [150, 'Event name cannot be more than 150 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  feedbackMessage: {
    type: String,
    required: [true, 'Please provide feedback message'],
    trim: true,
    minlength: [10, 'Feedback message must be at least 10 characters'],
    maxlength: [1000, 'Feedback message cannot exceed 1000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
