const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { sendFeedbackConfirmationEmail } = require('../config/email');

// POST /api/feedback - Create new feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, eventName, rating, feedbackMessage } = req.body;

    // Validate required fields
    if (!name || !email || !eventName || !rating || !feedbackMessage) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create new feedback document
    const newFeedback = new Feedback({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      eventName: eventName.trim(),
      rating: parseInt(rating),
      feedbackMessage: feedbackMessage.trim()
    });

    // Save to database
    const savedFeedback = await newFeedback.save();
    console.log('✅ Feedback saved to MongoDB:', savedFeedback._id);

    // Send confirmation email
    const emailSent = await sendFeedbackConfirmationEmail({
      name: savedFeedback.name,
      email: savedFeedback.email,
      eventName: savedFeedback.eventName,
      rating: savedFeedback.rating,
      feedbackMessage: savedFeedback.feedbackMessage
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!',
      feedbackId: savedFeedback._id,
      emailSent: emailSent
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback: ' + error.message
    });
  }
});

// GET /api/feedback - Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback: ' + error.message
    });
  }
});

// GET /api/feedback/:id - Get single feedback
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback: ' + error.message
    });
  }
});

module.exports = router;
