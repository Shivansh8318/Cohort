import { useState } from 'react';
import { useQuery } from 'react-query';
import { recordingsAPI } from '../services/api';
import { 
  PlayCircle, 
  Calendar, 
  Clock, 
  Download, 
  Users, 
  Search,
  AlertCircle,
  Loader2,
  Video,
  RefreshCw
} from 'lucide-react';

export function Recordings() {
  const [searchTerm, setSearchTerm] = useState('');

  const { 
    data: recordingsData, 
    isLoading, 
    error, 
    refetch,
    isError
  } = useQuery(
    ['recordings'],
    () => recordingsAPI.getRecordings(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      onError: (error) => {
        console.error('Error fetching recordings:', error);
      }
    }
  );

  const recordings = recordingsData?.data?.recordings || [];
  const filteredRecordings = recordings.filter(recording => 
    recording.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recording.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const handlePlayRecording = (recording) => {
    if (recording.play_url) {
      window.open(recording.play_url, '_blank');
    }
  };

  const handleDownloadRecording = (recording) => {
    if (recording.download_url) {
      window.open(recording.download_url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-secondary-600">Loading recordings...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-accent-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">
            Error Loading Recordings
          </h2>
          <p className="text-secondary-600 mb-4">
            {error?.response?.data?.message || 'Failed to load recordings. Please try again.'}
          </p>
          <button 
            onClick={() => refetch()}
            className="btn btn-primary inline-flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!filteredRecordings || filteredRecordings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Video className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">
            No Recordings Available
          </h2>
          <p className="text-secondary-600 mb-4">
            {searchTerm 
              ? 'No recordings match your search criteria.' 
              : 'There are no recordings available yet. Start a live session to create recordings.'}
          </p>
          <button 
            onClick={() => refetch()}
            className="btn btn-outline inline-flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">
            Session Recordings
          </h1>
          <p className="text-secondary-600">
            Access past cohort sessions and catch up on missed content
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search recordings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
      </div>

      {/* Recordings List */}
      <div className="space-y-4">
        {filteredRecordings.map((recording) => (
          <div key={recording.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900">
                      {recording.title || `Session ${recording.id}`}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {recording.description || 'Cohort session recording'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(recording.created_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(recording.created_at)}
                  </div>
                  {recording.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(recording.duration)}
                    </div>
                  )}
                  {recording.participant_count && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recording.participant_count} participants
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handlePlayRecording(recording)}
                  className="btn btn-primary btn-sm"
                  disabled={!recording.play_url}
                >
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Play
                </button>
                
                {recording.download_url && (
                  <button
                    onClick={() => handleDownloadRecording(recording)}
                    className="btn btn-outline btn-sm"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Recording Status */}
            <div className="mt-4 pt-4 border-t border-secondary-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    recording.status === 'completed' ? 'bg-green-500' :
                    recording.status === 'processing' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-sm text-secondary-600 capitalize">
                    {recording.status || 'Available'}
                  </span>
                </div>
                
                {recording.size && (
                  <span className="text-sm text-secondary-500">
                    {Math.round(recording.size / (1024 * 1024))} MB
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 