const express = require('express');
const axios = require('axios');
const router = express.Router();

// Helper function to transform recording data
const transformRecording = (recording) => {
  // Calculate duration in seconds if we have start and stop times
  let duration = 0;
  if (recording.started_at && recording.stopped_at) {
    duration = Math.floor((new Date(recording.stopped_at) - new Date(recording.started_at)) / 1000);
  }

  // Generate title based on date
  const date = new Date(recording.created_at);
  const title = `Session Recording - ${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })}`;

  // Transform the recording object to match UI expectations
  return {
    id: recording.id,
    title: title,
    description: `Recording from ${date.toLocaleString('en-US')}`,
    created_at: recording.created_at,
    status: recording.status,
    duration: duration,
    play_url: recording.meeting_url,
    download_url: null, // Will be populated when assets are available
    participant_count: null, // Not available in current API response
    size: null, // Will be populated when assets are available
    asset_types: recording.asset_types || []
  };
};

// Debug endpoint to test router
router.get('/debug', (req, res) => {
  const HMS_CONFIG = req.app.locals.HMS_CONFIG;
  res.json({
    message: 'Recordings router is working',
    availableEndpoints: {
      debug: '/api/recordings/debug',
      testConfig: '/api/recordings/test-config',
      roomRecordings: '/api/recordings/room/:roomId',
      recordingStatus: '/api/recordings/status/:roomId',
      specificRecording: '/api/recordings/:recordingId',
      root: '/api/recordings/'
    },
    config: {
      hasHmsConfig: !!HMS_CONFIG,
      roomId: HMS_CONFIG?.roomId,
      apiBaseUrl: HMS_CONFIG?.apiBaseUrl
    }
  });
});

// Log all requests to the recordings router
router.use((req, res, next) => {
  console.log('Recordings Router - Incoming request:', {
    method: req.method,
    url: req.url,
    path: req.path,
    params: req.params,
    query: req.query,
    timestamp: new Date().toISOString()
  });
  next();
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

// Get all recordings (redirects to room recordings)
router.get('/', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const roomId = HMS_CONFIG.roomId;

    console.log('Root recordings endpoint - Redirecting to room recordings:', {
      roomId,
      redirectUrl: `/api/recordings/room/${roomId}`
    });
    
    // Redirect to room recordings endpoint
    res.redirect(`/api/recordings/room/${roomId}`);

  } catch (error) {
    console.error('Error in root recordings endpoint:', error);
    next(error);
  }
});

// Create a router specifically for room-related endpoints
const roomRouter = express.Router();

// Get recordings by room ID
roomRouter.get('/:roomId', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { roomId } = req.params;

    console.log('Room recordings endpoint - Request details:', {
      roomId,
      apiUrl: `${HMS_CONFIG.apiBaseUrl}/recordings?room_id=${roomId}`,
      hasManagementToken: !!HMS_CONFIG.managementToken
    });

    const response = await axios.get(`${HMS_CONFIG.apiBaseUrl}/recordings`, {
      params: {
        room_id: roomId
      },
      headers: {
        'Authorization': `Bearer ${HMS_CONFIG.managementToken}`,
        'Content-Type': 'application/json'
      }
    });

    // Log the actual response structure to help debug
    console.log('HMS API Raw Response:', JSON.stringify(response.data, null, 2));

    // Extract and transform recordings from the response data
    const recordings = (response.data?.data || []).map(transformRecording);

    console.log('HMS API Response:', {
      status: response.status,
      hasData: !!recordings,
      dataLength: Array.isArray(recordings) ? recordings.length : 'not an array',
      limit: response.data?.limit,
      hasMore: response.data?.has_more
    });

    res.json({
      success: true,
      data: {
        recordings: recordings,
        room_id: roomId,
        pagination: {
          limit: response.data?.limit,
          has_more: response.data?.has_more
        }
      }
    });

  } catch (error) {
    console.error('Room recordings endpoint - Error details:', {
      message: error.message,
      responseStatus: error.response?.status,
      responseData: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        hasAuthHeader: !!error.config?.headers?.Authorization,
        params: error.config?.params
      }
    });

    res.status(error.response?.status || 500).json({
      success: false,
      error: true,
      message: error.response?.data?.message || 'Failed to fetch recordings',
      details: error.response?.data || { message: error.message }
    });
  }
});

// Mount the room router
router.use('/room', roomRouter);

// Get recording status
router.get('/status/:roomId', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { roomId } = req.params;

    console.log('Recording status endpoint - Request details:', {
      roomId,
      apiUrl: `${HMS_CONFIG.apiBaseUrl}/rooms/${roomId}/recording/status`
    });

    const response = await axios.get(`${HMS_CONFIG.apiBaseUrl}/rooms/${roomId}/recording/status`, {
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
    console.error('Recording status endpoint - Error:', error.response?.data || error.message);
    next(error);
  }
});

// Get specific recording by ID - This should now only match if no other routes match
router.get('/:recordingId([a-zA-Z0-9-]+)', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    const { recordingId } = req.params;

    console.log('Specific recording endpoint - Request details:', {
      recordingId,
      apiUrl: `${HMS_CONFIG.apiBaseUrl}/recordings/${recordingId}`
    });

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
      console.log('Recording not found:', recordingId);
      return res.status(404).json({
        error: true,
        message: 'Recording not found'
      });
    }
    console.error('Specific recording endpoint - Error:', error.response?.data || error.message);
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

module.exports = router; 