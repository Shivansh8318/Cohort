import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HMSPrebuilt } from '@100mslive/roomkit-react';
import { authAPI } from '../services/api';
import { Video, Loader2, AlertCircle, Users } from 'lucide-react';

export function LiveStream() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [roomInfo, setRoomInfo] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  // Load existing auth token and username from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUsername = localStorage.getItem('username');
    
    if (storedToken && storedUsername) {
      setAuthToken(storedToken);
      setUsername(storedUsername);
      setIsJoined(true);
    }
    
    loadRoomInfo();
  }, []);

  const loadRoomInfo = async () => {
    try {
      const response = await authAPI.getRoomCode();
      setRoomInfo(response.data);
    } catch (err) {
      console.error('Error loading room info:', err);
      setError('Failed to load room information');
    }
  };

  const handleStartStreaming = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Generate authentication token as broadcaster
      const response = await authAPI.generateToken(username, 'broadcaster');
      setAuthToken(response.data.token);
      setIsJoined(true);
      
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('username', username);
      
    } catch (err) {
      console.error('Error starting stream:', err);
      setError(err.response?.data?.message || 'Failed to start stream');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveStream = () => {
    setIsJoined(false);
    setAuthToken('');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    navigate('/');
  };

  // If already joined, show the 100ms prebuilt UI
  if (isJoined && authToken) {
    return (
      <div className="h-screen">
        <HMSPrebuilt
          authToken={authToken}
          onLeave={handleLeaveStream}
          options={{
            userName: username,
            settings: {
              isAudioMuted: false,
              isVideoMuted: false,
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-600 to-accent-700 rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Start Live Stream
          </h1>
          <p className="text-secondary-600">
            Configure your settings and start streaming to your cohort
          </p>
        </div>

        {/* Room Information */}
        {roomInfo && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-primary-900 mb-2">Stream Details</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Room ID:</span> {roomInfo.room_id}</p>
              <p><span className="font-medium">Room Code:</span> {roomInfo.room_code}</p>
              <p><span className="font-medium">Viewer Join URL:</span> 
                <a href="https://shivansh-webinar-356.app.100ms.live/meeting/kfj-eexl-uar" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-primary-600 hover:underline ml-1">
                  https://shivansh-webinar-356.app.100ms.live/meeting/kfj-eexl-uar
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-accent-600 mr-2" />
              <span className="text-accent-700">{error}</span>
            </div>
          </div>
        )}

        {/* Stream Form */}
        <form onSubmit={handleStartStreaming} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-secondary-700 mb-2">
              Your Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="input w-full"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="btn btn-primary btn-lg flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Video className="w-5 h-5 mr-2" />
                  Start Broadcasting
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-outline btn-lg"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 