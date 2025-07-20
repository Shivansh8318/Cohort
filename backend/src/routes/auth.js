const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Valid 100ms live streaming roles
const VALID_ROLES = [
  'broadcaster',
  'co-broadcaster', 
  'viewer-realtime',
  'viewer-near-realtime'
];

const ROLE_DESCRIPTIONS = {
  'broadcaster': {
    name: 'Broadcaster',
    description: 'Can publish audio/video and start/stop streams',
    canPublish: true,
    canControl: true
  },
  'co-broadcaster': {
    name: 'Co-Broadcaster', 
    description: 'Can publish audio/video but cannot start/stop streams',
    canPublish: true,
    canControl: false
  },
  'viewer-realtime': {
    name: 'Viewer (Real-time)',
    description: 'Watch with low latency, can interact via chat',
    canPublish: false,
    canControl: false
  },
  'viewer-near-realtime': {
    name: 'Viewer (HLS)',
    description: 'Watch with slight delay, scalable for large audiences',
    canPublish: false,
    canControl: false
  }
};

// Generate authentication token for joining a room
router.post('/token', async (req, res, next) => {
  try {
    const { username, role = 'viewer-realtime' } = req.body;
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;

    console.log('Token request received:', { username, role });
    console.log('Valid roles:', VALID_ROLES);

    if (!username) {
      return res.status(400).json({
        error: true,
        message: 'Username is required'
      });
    }

    // Validate role
    if (!VALID_ROLES.includes(role)) {
      console.log('Invalid role received:', role);
      return res.status(400).json({
        error: true,
        message: `Invalid role. Valid roles are: ${VALID_ROLES.join(', ')}`
      });
    }

    console.log('Role validation passed for:', role);

    // Generate user ID
    const userId = uuidv4();

    // Create JWT payload for 100ms
   
    // Sign the token with 100ms secret
    const token = jwt.sign(payload, HMS_CONFIG.secret, {
      algorithm: 'HS256',
      expiresIn: '24h'
    });

    res.json({
      success: true,
      data: {
        token,
        user_id: userId,
        room_id: HMS_CONFIG.roomId,
        username,
        role,
        expires_in: 24 * 60 * 60 // 24 hours in seconds
      }
    });

  } catch (error) {
    next(error);
  }
});

// Generate room code for easy joining
router.get('/room-code', async (req, res, next) => {
  try {
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;
    
    // For simplicity, we'll return a static room code
    // In production, you might want to generate dynamic room codes
    const roomCode = HMS_CONFIG.roomId;
    
    res.json({
      success: true,
      data: {
        room_code: roomCode,
        room_id: HMS_CONFIG.roomId,
        join_url: `${req.protocol}://${req.get('host')}/join/${roomCode}`
      }
    });
  } catch (error) {
    next(error);
  }
});

// Validate token endpoint
router.post('/validate', async (req, res, next) => {
  try {
    const { token } = req.body;
    const HMS_CONFIG = req.app.locals.HMS_CONFIG;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: 'Token is required'
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, HMS_CONFIG.secret);
    
    res.json({
      success: true,
      data: {
        valid: true,
        user_id: decoded.user_id,
        room_id: decoded.room_id,
        role: decoded.role,
        expires_at: new Date(decoded.exp * 1000)
      }
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: true,
        message: 'Invalid or expired token',
        data: { valid: false }
      });
    }
    next(error);
  }
});

// Get available roles
router.get('/roles', async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        roles: VALID_ROLES,
        descriptions: ROLE_DESCRIPTIONS
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 