# MindMesh

<div align="center">
  <img src="frontend/public/MindMesh.png" alt="MindMesh Logo" width="500">
  <h1>Collaborative Study Platform</h1>
  
  <p>
    <a href="#-features"><img src="https://img.shields.io/badge/Features-Available-brightgreen.svg" alt="Features"></a>
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/Tech_Stack-Modern-blue.svg" alt="Tech Stack"></a>
    <a href="#-getting-started"><img src="https://img.shields.io/badge/Status-Active-success.svg" alt="Status"></a>
    <a href="#-license"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  </p>
</div>

<p align="center">
  <b>MindMesh</b> is a comprehensive real-time collaborative study platform designed for students who want to study together remotely. It provides an integrated environment combining video conferencing, collaborative tools, and study management features in one seamless experience.
</p>
---

## 📋 Table of Contents

<div align="center">

| [✨ Features](#-features) | [🛠️ Tech Stack](#-tech-stack) | [🏗 Architecture](#-architecture) |
|:------------------------:|:-----------------------------:|:--------------------------------:|
| [🚀 Getting Started](#-getting-started) | [🚢 Deployment](#-deployment) | [📚 API Docs](#-api-documentation) |
| [🤝 Contributing](#-contributing) | [📄 License](#-license) |  |

</div>

---

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td align="center">👥 <b>Group Collaboration</b></td>
      <td align="center">📚 <b>Study Sessions</b></td>
      <td align="center">🔄 <b>Tool Integration</b></td>
    </tr>
    <tr>
      <td>
        • Study group management<br>
        • Member role management<br>
        • Private sessions
      </td>
      <td>
        • Video conferencing<br>
        • Interactive whiteboard<br>
        • Rich text notes<br>
        • Collaborative code editor
      </td>
      <td>
        • Seamless tool switching<br>
        • Session persistence<br>
        • Resource sharing
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <table>
    <tr>
      <td align="center">📊 <b>Analytics</b></td>
      <td align="center">💰 <b>Subscription Plans</b></td>
      <td align="center">🔐 <b>Admin Features</b></td>
    </tr>
    <tr>
      <td>
        • Study time tracking<br>
        • Time period analysis<br>
        • Progress visualization
      </td>
      <td>
        • Free & premium tiers<br>
        • Razorpay integration<br>
        • Plan management
      </td>
      <td>
        • User management<br>
        • Group oversight<br>
        • Content moderation<br>
        • Session control
      </td>
    </tr>
  </table>
</div>

---

## 🛠️ Tech Stack

<div align="center">
  <table>
    <tr>
      <th>Frontend</th>
      <th>Backend</th>
      <th>Database</th>
      <th>DevOps</th>
    </tr>
    <tr>
      <td>
        • Next.js 15 (App Router)<br>
        • Tailwind CSS<br>
        • React Context API<br>
        • Socket.IO client<br>
        • WebRTC / Simple-Peer<br>
        • Fabric.js<br>
        • Monaco Editor<br>
        • TipTap<br>
        • Recharts
      </td>
      <td>
        • Node.js<br>
        • Express.js<br>
        • RESTful API<br>
        • JWT Authentication<br>
        • Socket.IO<br>
        • Cloudinary<br>
        • Nodemailer<br>
        • Node-cron
      </td>
      <td>
        • MongoDB<br>
        • Mongoose<br>
        • Redis Cache
      </td>
      <td>
        • Docker<br>
        • Docker Compose<br>
        • GitHub Actions<br>
        • Winston logging
      </td>
    </tr>
  </table>
</div>

---

## 🏗 Architecture

MindMesh follows a modern microservices architecture:

<div align="center">
  <pre>
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend   │────▶│  Database   │
│  (Next.js)  │     │  (Express)  │     │ (MongoDB)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  WebRTC     │     │  Socket.IO  │     │   Redis     │
│  (P2P)      │     │  (Real-time)│     │  (Cache)    │
└─────────────┘     └─────────────┘     └─────────────┘
  </pre>
</div>

- **Frontend**: Next.js application with server-side rendering and client-side interactivity
- **Backend**: Express.js REST API with Socket.IO for real-time communication
- **Database**: MongoDB for data persistence with Redis for caching
- **Real-Time Communication**: WebRTC for peer-to-peer video/audio and Socket.IO for signaling

---

## 🚀 Getting Started

### Prerequisites

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Node.js</b><br>v18+</td>
      <td align="center"><b>MongoDB</b><br>Latest</td>
      <td align="center"><b>Redis</b><br>Latest</td>
      <td align="center"><b>Docker</b><br>Optional</td>
    </tr>
  </table>
</div>

### Installation

#### Clone the repository

```bash
git clone https://github.com/btwshivam/MindMesh.git
cd MindMesh
```

#### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Setup

1. Copy the example environment file
```bash
cp backend/.env.example backend/.env
```

2. Update the environment variables with your configuration:
   - MongoDB connection string
   - JWT secrets
   - Email credentials
   - Cloudinary keys
   - Redis configuration
   - Google OAuth credentials (if using)

---

## 🚢 Deployment

### Using Docker Compose

The easiest way to deploy the entire stack is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/btwshivam/MindMesh.git
cd MindMesh

# Create .env file from example
cp backend/.env.example backend/.env
# Edit the .env file with your configuration

# Build and start all services (backend and frontend)
docker-compose up -d

# To view logs
docker-compose logs -f

# To stop all services
docker-compose down
```

This will start both the backend and frontend services. The backend will be available at http://localhost:5000 and the frontend at http://localhost:3000.

### Manual Deployment

#### Backend Deployment

```bash
# Navigate to the backend directory
cd backend

# Build the Docker image
docker build -t mindmesh-backend .

# Run the container
docker run -p 5000:5000 --env-file .env mindmesh-backend
```

#### Frontend Deployment

```bash
# Navigate to the frontend directory
cd frontend

# Build the application
npm run build

# Start the production server
npm start
```

---

## 📚 API Documentation

API documentation is available at `/api/docs` when running the backend server.

<div align="center">
  <table>
    <tr>
      <th colspan="2">Key API Endpoints</th>
    </tr>
    <tr>
      <td><code>/api/auth/*</code></td>
      <td>Authentication endpoints</td>
    </tr>
    <tr>
      <td><code>/api/users/*</code></td>
      <td>User management</td>
    </tr>
    <tr>
      <td><code>/api/groups/*</code></td>
      <td>Group operations</td>
    </tr>
    <tr>
      <td><code>/api/sessions/*</code></td>
      <td>Study session management</td>
    </tr>
    <tr>
      <td><code>/api/notes/*</code></td>
      <td>Note operations</td>
    </tr>
    <tr>
      <td><code>/api/code-snippets/*</code></td>
      <td>Code snippet management</td>
    </tr>
  </table>
</div>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <img src="frontend/public/MindMesh.png" alt="MindMesh Logo" width="60">
  <p>Built with ❤️ by Shivam</p>
</div>
