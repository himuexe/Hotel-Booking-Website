# 🚀 Vacays Hotel Booking Website - Setup Guide

> **Complete setup guide for the Vacays Hotel Booking Platform**  
> Get up and running in minutes with our comprehensive development and production setup instructions

<div align="center">

[![Setup Guide](https://img.shields.io/badge/Setup-Guide-brightgreen?style=for-the-badge&logo=rocket)](https://github.com/himuexe/Hotel-Booking-Website)
[![Development](https://img.shields.io/badge/Development-Ready-blue?style=for-the-badge&logo=code)](https://github.com/himuexe/Hotel-Booking-Website)
[![Production](https://img.shields.io/badge/Production-Ready-success?style=for-the-badge&logo=server)](https://github.com/himuexe/Hotel-Booking-Website)

</div>

---

## 📋 Table of Contents

1. [🛠️ Development Environment Setup](#️-development-environment-setup)
2. [🐳 Docker Environment Setup](#-docker-environment-setup)
3. [🧪 Testing Environment Setup](#-testing-environment-setup)
4. [🚀 Production Environment Setup](#-production-environment-setup)
5. [🔧 Troubleshooting](#-troubleshooting)

---

## 🛠️ Development Environment Setup

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download here](https://git-scm.com/)

### 🔧 Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/himuexe/Hotel-Booking-Website.git
cd Hotel-Booking-Website
```

#### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install e2e test dependencies
cd ../e2e-tests
npm install
```

#### 3. Environment Configuration

Create environment files for both frontend and backend:

**Backend Environment** (`.env` in project root):
```env
# 🗄️ Database Configuration
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/vacays
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/vacays

# 🔐 Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-at-least-32-characters-long

# 🌐 Application URLs
FRONTEND_URL=http://localhost:5173

# ☁️ Cloudinary Configuration (Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# 💳 Stripe Configuration (Payment Processing)
STRIPE_API_KEY=sk_test_your-stripe-secret-key
```

**Frontend Environment** (`frontend/.env`):
```env
# 🌐 API Configuration
VITE_API_BASE_URL=http://localhost:7000

# 💳 Stripe Configuration
VITE_STRIPE_PUB_KEY=pk_test_your-stripe-publishable-key
```

#### 4. Start Development Servers

```bash
# Terminal 1: Start Backend Server
cd backend
npm run dev

# Terminal 2: Start Frontend Server
cd frontend
npm run dev
```

#### 5. Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:7000
- **API Documentation**: http://localhost:7000/api-docs

---

## 🐳 Docker Environment Setup

> 💡 **Perfect for**: Quick setup, consistent environments, and production-like development

### 🚀 Quick Docker Setup

1. **Create Environment File**:
   ```bash
   touch .env
   # Edit .env with your configuration (see Environment Configuration above)
   ```

2. **Configure Environment Variables**:
   ```env
   # 🗄️ Database Configuration (Docker)
   MONGODB_CONNECTION_STRING=mongodb://admin:password123@mongodb:27017/vacays?authSource=admin
   MONGO_INITDB_ROOT_USERNAME=admin
   MONGO_INITDB_ROOT_PASSWORD=password123
   
   # 🔐 Authentication
   JWT_SECRET_KEY=your-super-secret-jwt-key-at-least-32-characters-long
   
   # 🌐 Application URLs
   FRONTEND_URL=http://localhost:5173
   
   # ☁️ Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # 💳 Frontend Configuration
   VITE_API_BASE_URL=http://localhost:7000
   VITE_STRIPE_PUB_KEY=pk_test_your_stripe_publishable_key
   ```

3. **Start the Application**:
   ```bash
   docker compose up -d
   ```

4. **Access Your Application**:
   - **Frontend**: http://localhost:5173 (with hot reload)
   - **Backend API**: http://localhost:7000 (with nodemon)
   - **API Documentation**: http://localhost:7000/api-docs

### 🔄 Docker Development Workflow

```bash
# 📊 View logs
docker compose logs -f

# 🔄 Restart specific service
docker compose restart backend

# 🔨 Rebuild after code changes
docker compose up -d --build

# 🛑 Stop all services
docker compose down

# 🧹 Clean up (removes volumes)
docker compose down -v
```

---

## 🧪 Testing Environment Setup

### 🎯 E2E Testing Setup

1. **Navigate to E2E Tests Directory**:
   ```bash
   cd e2e-tests
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**:
   ```bash
   npx playwright install
   ```

4. **Create Test Environment File** (`.env.test` in project root):
   ```env
   # 🧪 Testing Configuration
   JWT_SECRET_KEY=test_jwt_secret
   FRONTEND_URL=http://localhost:5173
   STRIPE_API_KEY=your_test_stripe_api_key
   ```

5. **Start Application for Testing**:

   **Option A: Without Docker**
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend  
   cd frontend && npm run dev
   ```

   **Option B: With Docker**
   ```bash
   # Use your existing MongoDB Atlas connection for testing
   docker compose up -d
   ```

6. **Run E2E Tests**:
   ```bash
   npm run test
   ```

### 🔬 Unit Testing Setup

#### Frontend Unit Tests

```bash
# Navigate to frontend directory
cd frontend

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

#### Backend Unit Tests

```bash
# Navigate to backend directory
cd backend

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🚀 Production Environment Setup

### 🐳 Option 1: Containerized Deployment

#### Build Production Images

```bash
# Build production Docker images
docker compose -f docker-compose.prod.yml build
```

#### Start Production Containers

```bash
# Start production containers
docker compose -f docker-compose.prod.yml up -d
```

#### Access Production Application

- **Frontend**: http://localhost (port 80)
- **Backend API**: http://localhost:7000

### ☁️ Option 2: Cloud Deployment

#### Prerequisites

- **Cloud Account**: AWS, GCP, or Azure account
- **Database**: MongoDB Atlas account (for managed MongoDB)
- **Domain**: Domain name (optional)

#### MongoDB Atlas Setup

1. **Create MongoDB Atlas Cluster**
2. **Create Database User** with appropriate permissions
3. **Configure Network Access** (whitelist IP addresses)
4. **Get Connection String** for your application

#### Frontend Deployment (Vercel/Netlify)

1. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Platform**:
   - Connect GitHub repository to Vercel/Netlify
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Output directory**: `dist`
   - Set environment variables:
     - `VITE_API_BASE_URL`: Your backend API URL
     - `VITE_STRIPE_PUB_KEY`: Your Stripe publishable key

#### Backend Deployment (AWS EC2/ECS)

1. **Create Cloud Instance** (EC2 instance or ECS service)
2. **Install Docker** on the instance
3. **Deploy Container** with environment variables:
   - `MONGODB_CONNECTION_STRING`: MongoDB Atlas connection string
   - `JWT_SECRET_KEY`: JWT secret key
   - `FRONTEND_URL`: Frontend URL
   - `STRIPE_API_KEY`: Stripe API key
   - `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Cloudinary API secret

---

## 🔧 Troubleshooting

### 🚨 Common Issues & Solutions

#### 🔌 Connection Issues

**MongoDB Connection Refused**
- ✅ Ensure MongoDB is running
- ✅ Check the connection string format
- ✅ Verify network connectivity
- ✅ Check firewall settings

**Docker Containers Not Starting**
- ✅ Check Docker logs: `docker compose logs`
- ✅ Ensure ports are not already in use
- ✅ Verify environment variables are set

#### 🌐 Frontend/Backend Communication

**Frontend Cannot Connect to Backend**
- ✅ Check `VITE_API_BASE_URL` environment variable
- ✅ Ensure backend server is running
- ✅ Verify CORS configuration

#### 🔐 Authentication Issues

**JWT Token Problems**
- ✅ Verify `JWT_SECRET_KEY` is set correctly
- ✅ Check token expiration settings
- ✅ Clear browser cookies and try again

#### 🐳 Docker-Specific Issues

**Port Already in Use**
```bash
# Kill processes on specific ports
npx kill-port 5173 7000

# Or check what's using the port
sudo lsof -i :5173
sudo lsof -i :7000
```

**Docker Permission Issues**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and log back in
```

#### ⚙️ Environment Variable Issues

**Variables Not Loading**
- ✅ Ensure `.env` files are in correct directories
- ✅ Check frontend variables are prefixed with `VITE_`
- ✅ Restart development servers after changes

#### 🗄️ Database Issues

**Database Connection Problems**
- ✅ Verify MongoDB is running
- ✅ Check `MONGODB_CONNECTION_STRING` format
- ✅ Ensure database credentials are correct

### 🆘 Getting Help

If you're still experiencing issues:

1. **📋 Check the logs** first: `docker compose logs` or `npm run dev`
2. **🔍 Verify environment variables**: `docker compose config`
3. **📊 Check system resources**: `docker system df`
4. **🐛 Create an issue** on GitHub with:
   - Error messages and logs
   - System information (OS, Node.js version, Docker version)
   - Steps to reproduce the issue

---

<div align="center">

**🚀 Ready to build amazing hotel booking experiences!**

**Questions?** [Create an issue](https://github.com/himuexe/Hotel-Booking-Website/issues) | **Contribute** [Submit a PR](https://github.com/himuexe/Hotel-Booking-Website/pulls)

[🔝 Back to Top](#-vacays-hotel-booking-website---setup-guide)

</div> 