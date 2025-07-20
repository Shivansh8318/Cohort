const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get all recordings
router.get('/', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { page = 1, limit = 10, room_id } = req.query;

    console.log('Recordings request - HMS Config:', {
      apiBaseUrl: HMS_CONFIG.apiBaseUrl,
      hasManagementToken: !!HMS_CONFIG.managementToken,
      roomId: HMS_CONFIG.roomId
    });

    const params = {
      limit: Math.min(limit, 100), // Maximum 100 per request
      start: (page - 1) * limit
    };

    if (room_id) {
      params.room_id = room_id;
    }

    console.log('Making request to HMS API with params:', params);

    const response = await axios.get(`${HMS_CONFIG.apiBaseUrl}/recordings`, {
      params,
      headers: {
        'Authorization': `Bearer ${HMS_CONFIG.managementToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('HMS API response status:', response.status);
    console.log('HMS API response data:', response.data);

    res.json({
      success: true,
      data: {
        recordings: response.data.data || [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: response.data.total || 0,
          has_next: response.data.has_next || false
        }
      }
    });

  } catch (error) {
    console.error('Recordings API error:', error.response?.data || error.message);
    console.error('Error status:', error.response?.status);
    console.error('Error config:', error.config);

    // Return a user-friendly error message
    res.status(error.response?.status || 500).json({
      success: false,
      error: true,
      message: error.response?.data?.message || 'Failed to fetch recordings',
      details: error.response?.data || { message: error.message }
    });
  }
});

// Test HMS API configuration
router.get('/test-config', async (req, res) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    
    res.json({
      success: true,
      data: {
        apiBaseUrl: HMS_CONFIG.apiBaseUrl,
        roomId: HMS_CONFIG.roomId,
        hasManagementToken: !!HMS_CONFIG.managementToken,
        managementTokenLength: HMS_CONFIG.managementToken ? HMS_CONFIG.managementToken.length : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get HMS configuration',
      error: error.message
    });
  }
});

// Get specific recording by ID
router.get('/:recordingId', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { recordingId } = req.params;

    const response = await axios.get(`${HMS_CONFIG.apiBaseUrl}/recordings/${recordingId}`, {
      headers: {
        'Authorization': `Bearer ${HMS_CONFIG.managementToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: true,
        message: 'Recording not found'
      });
    }
    console.error('Error fetching recording:', error.response?.data || error.message);
    next(error);
  }
});

// Get recordings by room ID
router.get('/room/:roomId', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { roomId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const params = {
      room_id: roomId,
      limit: Math.min(limit, 100),
      start: (page - 1) * limit
    };

    const response = await axios.get(`${HMS_CONFIG.apiBaseUrl}/recordings`, {
      params,
      headers: {
        'Authorization': `Bearer ${HMS_CONFIG.managementToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      data: {
        recordings: response.data.data || [],
        room_id: roomId,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: response.data.total || 0,
          has_next: response.data.has_next || false
        }
      }
    });

  } catch (error) {
    console.error('Error fetching room recordings:', error.response?.data || error.message);
    next(error);
  }
});

// Start recording
router.post('/start', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { 
      room_id = HMS_CONFIG.roomId,
      resolution = { width: 1920, height: 1080 },
      record = true 
    } = req.body;

    const recordingConfig = {
      room_id,
      resolution,
      record
    };

    const response = await axios.post(`${HMS_CONFIG.apiBaseUrl}/recordings/room/${room_id}/start`, 
      recordingConfig,
      {
        headers: {
          'Authorization': `Bearer ${HMS_CONFIG.managementToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      message: 'Recording started successfully',
      data: response.data
    });

  } catch (error) {
    console.error('Error starting recording:', error.response?.data || error.message);
    next(error);
  }
});

// Stop recording
router.post('/stop', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { room_id = HMS_CONFIG.roomId } = req.body;

    const response = await axios.post(`${HMS_CONFIG.apiBaseUrl}/recordings/room/${room_id}/stop`, 
      {},
      {
        headers: {
          'Authorization': `Bearer ${HMS_CONFIG.managementToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      message: 'Recording stopped successfully',
      data: response.data
    });

  } catch (error) {
    console.error('Error stopping recording:', error.response?.data || error.message);
    next(error);
  }
});

// Get recording status
router.get('/status/:roomId', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { roomId } = req.params;

    const response = await axios.get(`${HMS_CONFIG.apiBaseUrl}/recordings/room/${roomId}/status`, {
      headers: {
        'Authorization': `Bearer ${HMS_CONFIG.managementToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Error getting recording status:', error.response?.data || error.message);
    next(error);
  }
});

module.exports = router; 