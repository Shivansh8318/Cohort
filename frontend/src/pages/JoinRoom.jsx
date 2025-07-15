import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HMSPrebuilt } from '@100mslive/roomkit-react';
import { authAPI } from '../services/api';
import { Users, Video, Loader2, AlertCircle, Radio, Eye } from 'lucide-react';

export function JoinRoom() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState('');
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState('viewer-realtime');
  const [availableRoles, setAvailableRoles] = useState({
    'broadcaster': {
      name: 'Broadcaster',
      description: 'Can publish audio/video and start/stop streams'
    },
    'viewer-realtime': {
      name: 'Viewer',
      description: 'Watch with low latency, can interact via chat'
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [roomInfo, setRoomInfo] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  // Load room info and available roles on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [roomResponse, rolesResponse] = await Promise.all([
        authAPI.getRoomCode(),
        authAPI.getRoles()
      ]);
      
      console.log('Room response:', roomResponse);
      console.log('Roles response:', rolesResponse);
      
      setRoomInfo(roomResponse.data);
      
      // Only update availableRoles if we get valid data from API
      if (rolesResponse.data && rolesResponse.data.descriptions) {
        // Filter to only show broadcaster and viewer-realtime
        const filteredRoles = {
          broadcaster: rolesResponse.data.descriptions.broadcaster,
          'viewer-realtime': rolesResponse.data.descriptions['viewer-realtime']
        };
        setAvailableRoles(filteredRoles);
        console.log('Available roles set to:', filteredRoles);
        
        // Ensure selectedRole is valid
        if (!['broadcaster', 'viewer-realtime'].includes(selectedRole)) {
          setSelectedRole('viewer-realtime');
        }
      }
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError('Failed to load room information');
      
      // Ensure selectedRole is valid even on error
      if (!['broadcaster', 'viewer-realtime'].includes(selectedRole)) {
        setSelectedRole('viewer-realtime');
      }
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    // If viewer-realtime, redirect to the direct meeting link
    if (selectedRole === 'viewer-realtime') {
      window.location.href = 'https://shivansh-webinar-356.app.100ms.live/meeting/kfj-eexl-uar';
      return;
    }

    // Only continue with token generation for broadcasters
    setIsLoading(true);
    setError('');

    try {
      console.log('Calling generateToken with:', { username, role: selectedRole });
      const response = await authAPI.generateToken(username, selectedRole);
      console.log('Token generation response:', response);
      setAuthToken(response.data.token);
      setIsJoined(true);
      
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('username', username);
      
    } catch (err) {
      console.error('Error joining room:', err);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveRoom = () => {
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
          onLeave={handleLeaveRoom}
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
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Join Cohort Session
          </h1>
          <p className="text-secondary-600">
            Enter your name and select your role to join the live streaming session
          </p>
        </div>

        {/* Room Information */}
        {roomInfo && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-primary-900 mb-2">Session Details</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Room ID:</span> {roomInfo.room_id}</p>
              <p><span className="font-medium">Room Code:</span> {roomInfo.room_code}</p>
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

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary-700 mb-3">
            Select Your Role
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(availableRoles).map(([roleKey, roleInfo]) => {
              const IconComponent = roleKey === 'broadcaster' ? Radio : Eye;
              
              return (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => setSelectedRole(roleKey)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedRole === roleKey
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <IconComponent className="w-5 h-5 mr-2" />
                    <span className="font-medium">{roleInfo.name}</span>
                  </div>
                  <p className="text-sm text-secondary-600">{roleInfo.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Join Form */}
        <form onSubmit={handleJoinRoom} className="space-y-6">
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
                  Joining...
                </>
              ) : (
                <>
                  <Users className="w-5 h-5 mr-2" />
                  {selectedRole === 'viewer-realtime' ? 'Join as Viewer' : 'Start Broadcasting'}
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