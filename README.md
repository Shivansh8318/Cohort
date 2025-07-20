# Shivansh CP Cohort - Live Streaming Platform

A modern, feature-rich live streaming platform built for educational cohorts using **100ms technology**. This platform provides seamless video conferencing, interactive sessions, and recording capabilities with a beautiful, responsive UI.



## 🌟 Features

### Core Functionality
- **Live Streaming**: Ultra-low latency streaming with 100ms prebuilt UI
- **Interactive Sessions**: Real-time chat, screen sharing, and collaborative tools
- **Recording Management**: Access and download past session recordings
- **User Authentication**: Secure token-based authentication system
- **Responsive Design**: Beautiful UI that works on all devices

### Technical Features
- **100ms Integration**: Seamless video conferencing with prebuilt UI components
- **Real-time APIs**: RESTful backend with Express.js
- **Modern Frontend**: React 18 with Vite for fast development
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **State Management**: React Query for efficient data fetching and caching

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **100ms React SDK** - Video streaming components
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **100ms REST API** - Backend video streaming services

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **100ms Account** with API credentials

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/shivansh-cp/cohort-streaming.git
cd cohort-streaming
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install-deps
```

### 3. Environment Setup

#### Backend Environment
Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development

# 100ms Configuration
HMS_ACCESS_KEY=your_access_key_here
HMS_SECRET=your_secret_here
HMS_MANAGEMENT_TOKEN=your_management_token_here
HMS_ROOM_ID=your_room_id_here

# 100ms API Base URL
HMS_API_BASE_URL=https://api.100ms.live/v2
```

#### Frontend Environment
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=https://0f63687b8a8e.ngrok-free.app/api
```

### 4. 100ms Setup

1. **Create 100ms Account**: Sign up at [100ms.live](https://100ms.live)
2. **Get Credentials**: Navigate to your dashboard and get:
   - App Access Key
   - App Secret
   - Management Token
   - Room ID
3. **Update Environment**: Add these credentials to your backend `.env` file

## 🏃 Running the Project

### Development Mode
```bash
# Start both frontend and backend concurrently
npm run dev

# Or run them separately
npm run dev:backend    # Backend only (https://0f63687b8a8e.ngrok-free.app)
npm run dev:frontend   # Frontend only (http://localhost:5173)
```

### Production Build
```bash
# Build both frontend and backend
npm run build

# Start production server
npm start
```

## 🔧 API Endpoints

### Authentication Routes
- `POST /api/auth/token` - Generate authentication token
- `GET /api/auth/room-code` - Get room code information
- `POST /api/auth/validate` - Validate authentication token

### Recordings Routes
- `GET /api/recordings` - Get all recordings with pagination
- `GET /api/recordings/:id` - Get specific recording by ID
- `GET /api/recordings/room/:roomId` - Get recordings by room ID
- `POST /api/recordings/start` - Start recording session
- `POST /api/recordings/stop` - Stop recording session
- `GET /api/recordings/status/:roomId` - Get recording status

### Health Check
- `GET /api/health` - API health check

## 📱 Usage

### For Participants
1. **Join Session**: Navigate to `/join` and enter your name
2. **Interactive Features**: Use chat, mute/unmute, and video controls
3. **View Recordings**: Access past sessions from the recordings page

### For Hosts
1. **Start Stream**: Go to `/stream` and configure your session
2. **Manage Participants**: Control session settings and permissions
3. **Recording Controls**: Start/stop recordings during sessions

### For Administrators
1. **Monitor API**: Use the health check endpoint
2. **Manage Recordings**: Access recording management through the API
3. **User Management**: Handle authentication and permissions

## 🎨 UI Components

### Custom Components
- **Navigation**: Responsive navigation with mobile support
- **Cards**: Reusable card components for content
- **Buttons**: Consistent button styles with variants
- **Forms**: Accessible form components with validation
- **Error Boundaries**: Graceful error handling

### 100ms Components
- **HMSPrebuilt**: Main video conferencing interface
- **Video Controls**: Mute, unmute, camera toggle
- **Screen Sharing**: Share screen functionality
- **Chat**: Real-time messaging

## 🔐 Security

- **Token-based Authentication**: Secure JWT tokens for API access
- **CORS Protection**: Configured cross-origin resource sharing
- **Input Validation**: Server-side validation for all endpoints
- **Environment Variables**: Sensitive data stored in environment files
- **100ms Security**: Enterprise-grade security from 100ms platform

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Build the frontend
cd frontend
npm run build

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Backend Deployment (Railway/Heroku)
```bash
# Build the backend
cd backend
npm run build

# Deploy to your preferred platform
# Make sure to set environment variables
```

### Environment Variables for Production
Set these in your deployment platform:
- `NODE_ENV=production`
- `HMS_ACCESS_KEY=your_production_access_key`
- `HMS_SECRET=your_production_secret`
- `HMS_MANAGEMENT_TOKEN=your_production_management_token`
- `HMS_ROOM_ID=your_production_room_id`

## 📊 Monitoring

### Health Checks
- **API Health**: `GET /api/health`
- **100ms Status**: Monitor through 100ms dashboard
- **Error Logging**: Console logging with error boundaries

### Performance
- **React Query**: Efficient data fetching and caching
- **Lazy Loading**: Component-based code splitting
- **Optimized Images**: Responsive image handling

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add appropriate comments and documentation
- Test new features thoroughly
- Update README if needed

