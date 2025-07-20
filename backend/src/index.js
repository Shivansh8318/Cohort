const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const recordingsRoutes = require('./routes/recordings');
const { errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 100ms Configuration
const HMS_CONFIG = {
  accessKey: process.env.HMS_ACCESS_KEY || '6874328dbd0dab5f9a012fae',
  secret: process.env.HMS_SECRET || 'na9wnS3b7TDgbG8ZDlRf28H_T8bdx5KFjTvUzKknmD-xCOxinIL9iD5wFO5IYOO54sEiFv6ycywCMSoEbbTcvC6OGRYdM5kLD68AoHi6M7jXjcYG9eAY3VkPQaR_NKIe6miBAospuX2aamgKIj77iGyPchb0FYrVGf2J4enxEhs=',
  managementToken: process.env.HMS_MANAGEMENT_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTI0NDYyOTUsImV4cCI6MTc1MzA1MTA5NSwianRpIjoiZWYyMjg2ZWItODhiZC00MzI0LWJhOWQtODEyMzg1N2U2ODk3IiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3NTI0NDYyOTUsImFjY2Vzc19rZXkiOiI2ODc0MzI4ZGJkMGRhYjVmOWEwMTJmYWUifQ.EOVKemYP92iLbkOAJ8h3KhmjbGXvVFE5a9XZuSs5r24',
  roomId: process.env.HMS_ROOM_ID || '687432dea48ca61c46475c16',
  apiBaseUrl: process.env.HMS_API_BASE_URL || 'https://api.100ms.live/v2'
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/recordings', recordingsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'shivansh CP Cohort Streaming API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to shivansh CP Cohort Streaming API',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      recordings: '/api/recordings'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// Make HMS_CONFIG available to other modules
app.locals.HMS_CONFIG = HMS_CONFIG;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`📹 100ms Room ID: ${HMS_CONFIG.roomId}`);
});

module.exports = app; 