import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/join';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Generate token for joining room
  async generateToken(username, role = 'viewer-realtime') {
    const response = await api.post('/auth/token', { username, role });
    return response.data;
  },

  // Get available roles
  async getRoles() {
    const response = await api.get('/auth/roles');
    return response.data;
  },

  // Get room code
  async getRoomCode() {
    const response = await api.get('/auth/room-code');
    return response.data;
  },

  // Validate token
  async validateToken(token) {
    const response = await api.post('/auth/validate', { token });
    return response.data;
  },
};

// Recordings API
export const recordingsAPI = {
  // Get all recordings
  async getRecordings(page = 1, limit = 10, roomId = null) {
    const params = { page, limit };
    if (roomId) params.room_id = roomId;
    
    const response = await api.get('/recordings', { params });
    return response.data;
  },

  // Get specific recording
  async getRecording(recordingId) {
    const response = await api.get(`/recordings/${recordingId}`);
    return response.data;
  },

  // Get recordings by room
  async getRecordingsByRoom(roomId, page = 1, limit = 10) {
    const response = await api.get(`/recordings/room/${roomId}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Start recording
  async startRecording(roomId, options = {}) {
    const response = await api.post('/recordings/start', {
      room_id: roomId,
      ...options
    });
    return response.data;
  },

  // Stop recording
  async stopRecording(roomId) {
    const response = await api.post('/recordings/stop', { room_id: roomId });
    return response.data;
  },

  // Get recording status
  async getRecordingStatus(roomId) {
    const response = await api.get(`/recordings/status/${roomId}`);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  async checkHealth() {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 