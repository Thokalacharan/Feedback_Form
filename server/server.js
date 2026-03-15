require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import database connection
const connectDB = require('./config/database');

// Import routes
const feedbackRoutes = require('./routes/feedback');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/feedback', feedbackRoutes);

// Home route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Admin route - serve admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Unknown error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   🎉 Smart Feedback System Server Started 🎉          ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║   📍 Server running at: http://localhost:${PORT.toString().padEnd(34)}║`);
  console.log(`║   📋 Feedback Form: http://localhost:${PORT.toString().padEnd(27)}║`);
  console.log(`║   📊 Admin Dashboard: http://localhost:${PORT.toString().padEnd(20)}admin║`);
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║   🗄️  Database: ${(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart-feedback').padEnd(40)}║`);
  console.log('║   📧 Email Service: Nodemailer + Gmail SMTP             ║');
  console.log('║   🛠️  Environment: ' + (process.env.NODE_ENV || 'development').padEnd(40) + '║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
});

module.exports = app;
