# 🐳 Docker Deployment Guide

> **Complete Docker deployment guide for the Vacays Hotel Booking Platform**  
> Deploy locally for development or to production using Docker containers

<div align="center">

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-Supported-2496ED?style=for-the-badge&logo=docker)](https://docs.docker.com/compose/)
[![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen?style=for-the-badge&logo=checkmarx)](https://github.com/himuexe/Hotel-Booking-Website)

</div>

---

## 📋 Table of Contents

1. [🚀 Quick Start (30 seconds)](#-quick-start-30-seconds)
2. [🛠️ Development Setup](#️-development-setup)
3. [🚀 Production Deployment](#-production-deployment)
4. [🔧 Environment Configuration](#-environment-configuration)
5. [💰 Free Hosting Options](#-free-hosting-options)
6. [🔍 Monitoring & Health Checks](#-monitoring--health-checks)
7. [🛠️ Troubleshooting](#️-troubleshooting)
8. [📊 Performance Optimization](#-performance-optimization)

---

## 🚀 Quick Start (30 seconds)

> 💡 **Prerequisites**: Docker and Docker Compose installed on your system

### 🎯 Deployment Process Overview

```mermaid
flowchart TD
    A[🚀 Start Deployment] --> B[📋 Check Prerequisites]
    B --> C{🐳 Docker Installed?}
    C -->|No| D[📥 Install Docker]
    C -->|Yes| E[📂 Clone Repository]
    D --> E
    E --> F[🔧 Configure Environment]
    F --> G{🎯 Deployment Type?}
    G -->|Development| H[🛠️ Development Setup]
    G -->|Production| I[🏭 Production Setup]
    
    H --> H1[🔄 docker compose up -d]
    H1 --> H2[🌐 Access on :5173]
    H2 --> J[✅ Development Ready]
    
    I --> I1[🔄 docker compose -f docker-compose.prod.yml up -d --build]
    I1 --> I2[🌐 Access on :80]
    I2 --> K[✅ Production Ready]
    
    style A fill:#e3f2fd
    style J fill:#c8e6c9
    style K fill:#c8e6c9
    style D fill:#fff3e0
```

### ⚡ One-Command Deployment

```bash
# Clone and deploy in one go
git clone https://github.com/himuexe/Hotel-Booking-Website.git
cd Hotel-Booking-Website
touch .env
# Edit .env with your configuration
docker compose -f docker-compose.prod.yml up -d --build

# ✅ Access your application
# Frontend: http://localhost
# Backend: http://localhost:7000
# MongoDB: localhost:27017
```

### 🎯 What You Get

- **🏨 Full Hotel Booking Platform** running in containers
- **🔒 Secure MongoDB** with authentication
- **🌐 Production-ready** frontend and backend
- **📊 Health monitoring** and logging
- **🔄 Auto-restart** on failures

---

## 🛠️ Development Setup

### 🔧 Development Workflow

```mermaid
flowchart LR
    A[👨‍💻 Developer] --> B[📝 Code Changes]
    B --> C[🔄 Hot Reload]
    C --> D[🧪 Test Changes]
    D --> E{✅ Working?}
    E -->|Yes| F[📝 Commit]
    E -->|No| G[🐛 Debug]
    G --> H[🔍 Check Logs]
    H --> I[🛠️ Fix Issues]
    I --> B
    F --> J[🚀 Deploy]
    
    style A fill:#e3f2fd
    style F fill:#c8e6c9
    style G fill:#ffcdd2
    style J fill:#e8f5e8
```

### 🔧 Local Development with Docker

Perfect for development with hot reloading and debugging:

```bash
# 1. Clone the repository
git clone https://github.com/himuexe/Hotel-Booking-Website.git
cd Hotel-Booking-Website

# 2. Set up environment
touch .env
# Edit .env with development values (see Environment Configuration)

# 3. Start development containers
docker compose up -d

# 4. Access your application
# Frontend: http://localhost:5173 (with hot reload)
# Backend: http://localhost:7000 (with nodemon)
# MongoDB: localhost:27017
```

### 🔄 Development Workflow

```bash
# View logs
docker compose logs -f

# Restart specific service
docker compose restart backend

# Rebuild after code changes
docker compose up -d --build

# Stop all services
docker compose down
```

### 🐛 Development Debugging

```bash
# Access backend container for debugging
docker compose exec backend bash

# Access MongoDB container
docker compose exec mongodb mongosh

# View container resource usage
docker stats
```

---

## 🚀 Production Deployment

### 🏭 Production Deployment Flow

```mermaid
flowchart TD
    A[🏭 Production Deployment] --> B[🔧 Environment Setup]
    B --> C[📝 Configure .env]
    C --> D[🔒 Security Check]
    D --> E{🛡️ Secure?}
    E -->|No| F[🔐 Fix Security Issues]
    E -->|Yes| G[🐳 Build Images]
    F --> D
    G --> H[🚀 Deploy Stack]
    H --> I[🏥 Health Checks]
    I --> J{✅ Healthy?}
    J -->|No| K[🔄 Rollback]
    J -->|Yes| L[📊 Monitor]
    K --> M[🐛 Debug Issues]
    M --> G
    L --> N[✅ Production Live]
    
    style A fill:#e3f2fd
    style N fill:#c8e6c9
    style F fill:#ffcdd2
    style K fill:#ffcdd2
```

### 📈 Scaling Strategy

```mermaid
graph TB
    subgraph "🔄 Load Balancing"
        LB[⚖️ Load Balancer]
    end
    
    subgraph "🎨 Frontend Tier"
        FE1[Frontend 1]
        FE2[Frontend 2]
        FE3[Frontend 3]
    end
    
    subgraph "🖥️ Backend Tier"
        BE1[Backend 1]
        BE2[Backend 2]
        BE3[Backend 3]
    end
    
    subgraph "🗄️ Database Tier"
        DB[(MongoDB<br/>Replica Set)]
    end
    
    LB --> FE1
    LB --> FE2
    LB --> FE3
    
    FE1 --> BE1
    FE2 --> BE2
    FE3 --> BE3
    
    BE1 --> DB
    BE2 --> DB
    BE3 --> DB
    
    style LB fill:#FF6B6B,color:#fff
    style FE1 fill:#61DAFB,color:#000
    style FE2 fill:#61DAFB,color:#000
    style FE3 fill:#61DAFB,color:#000
    style BE1 fill:#339933,color:#fff
    style BE2 fill:#339933,color:#fff
    style BE3 fill:#339933,color:#fff
    style DB fill:#47A248,color:#fff
```

### 🏭 Production Docker Compose

For production deployment with optimized settings:

```bash
# 1. Prepare production environment
touch .env
# Configure production values (see Environment Configuration)

# 2. Deploy production stack
docker compose -f docker-compose.prod.yml up -d --build

# 3. Verify deployment
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs
```

### 🚀 Using the Deployment Script

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy with production settings
./scripts/deploy.sh --type docker-compose --env production

# Monitor deployment
docker compose -f docker-compose.prod.yml logs -f
```

### 📈 Scaling Services

```bash
# Scale backend for high traffic
docker compose -f docker-compose.prod.yml up -d --scale backend=3

# Scale frontend for load distribution
docker compose -f docker-compose.prod.yml up -d --scale frontend=2

# View scaled services
docker compose -f docker-compose.prod.yml ps
```

### 🔄 Production Updates

```mermaid
sequenceDiagram
    participant D as 👨‍💻 Developer
    participant G as 📂 Git Repository
    participant CI as 🔄 CI/CD Pipeline
    participant P as 🏭 Production
    participant M as 📊 Monitoring
    
    D->>G: Push Code Changes
    G->>CI: Trigger Build
    CI->>CI: Run Tests
    CI->>CI: Build Docker Images
    CI->>P: Deploy New Version
    P->>P: Health Check
    P->>M: Report Status
    M->>D: Deployment Success
    
    Note over CI,P: Zero-downtime deployment
    Note over P,M: Continuous monitoring
```

```bash
# Update application
git pull origin main
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build

# Zero-downtime update (advanced)
docker compose -f docker-compose.prod.yml up -d --scale backend=2
# Wait for new containers to be healthy
docker compose -f docker-compose.prod.yml up -d --scale backend=1
```

---

## 🔧 Environment Configuration

### 📝 Required Environment Variables

Create a `.env` file in the project root:

```env
# 🗄️ Database Configuration
MONGODB_CONNECTION_STRING=mongodb://admin:password123@mongodb:27017/vacays?authSource=admin
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123

# 🔐 Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-at-least-32-characters-long

# 🌐 Application URLs
FRONTEND_URL=http://localhost:5173

# ☁️ Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# 💳 Stripe (Payment Processing)
STRIPE_API_KEY=sk_test_your-stripe-secret-key
```

### 🔒 Security Best Practices

> 🚨 **Important**: Never commit your `.env` file to version control

```bash
# Generate secure JWT secret
openssl rand -base64 32

# Generate secure MongoDB password
openssl rand -base64 24

# Verify .env is in .gitignore
echo ".env" >> .gitignore
```

### 🌍 Production Environment Variables

For production deployment, update these values:

```env
# Production URLs
FRONTEND_URL=https://your-domain.com

# Production Stripe keys
STRIPE_API_KEY=sk_live_your-live-stripe-secret-key
```

---

## 💰 Free Hosting Options

Deploy your Docker containers to production for **$0-5/month**:

### 🚀 Option A: Railway (Recommended)

**Cost**: $5 credit/month | **Docker Support**: ✅ Full

```bash
# 1. Push to GitHub
git add . && git commit -m "Deploy to Railway"
git push origin main

# 2. Deploy to Railway
# - Visit railway.app
# - Connect GitHub repository
# - Railway auto-detects Docker configuration
# - Set environment variables in dashboard
# - Deploy automatically

# 3. Custom domain (optional)
# - Add custom domain in Railway dashboard
# - Update FRONTEND_URL and VITE_API_BASE_URL
```

**✅ Advantages:**
- Full Docker support
- Automatic deployments
- Built-in monitoring
- Custom domains
- Database hosting

### 🌐 Option B: Render

**Cost**: Free tier | **Docker Support**: ✅ Dockerfile

```bash
# 1. Create Render account
# - Visit render.com
# - Connect GitHub repository

# 2. Create services
# - Web Service for backend (Dockerfile)
# - Static Site for frontend
# - Connect to MongoDB Atlas (free)

# 3. Configure environment variables
# - Set all required variables in Render dashboard
```

**✅ Advantages:**
- Completely free tier
- Automatic SSL certificates
- Global CDN
- Easy setup

### 🌊 Option C: DigitalOcean App Platform

**Cost**: $4/month | **Docker Support**: ✅ Full

```bash
# 1. Create DigitalOcean account
# 2. Use App Platform
# 3. Connect GitHub repository
# 4. Configure Docker deployment
# 5. Set environment variables
```

**✅ Advantages:**
- Full Docker support
- Managed databases
- Automatic scaling
- Professional infrastructure

### 📊 Comparison Table

| Service | Monthly Cost | Docker Support | Database | SSL | Custom Domain |
|---------|-------------|----------------|----------|-----|---------------|
| **Railway** | $5 credit | ✅ Full | ✅ Included | ✅ Auto | ✅ Free |
| **Render** | Free | ✅ Dockerfile | ⚠️ External | ✅ Auto | ✅ Free |
| **DigitalOcean** | $4 | ✅ Full | ✅ Managed | ✅ Auto | ✅ Free |

---

## 🔍 Monitoring & Health Checks

### 🏥 Health Check Commands

```bash
# Check all services status
docker compose -f docker-compose.prod.yml ps

# Check backend health
curl http://localhost:7000/health

# Check frontend
curl http://localhost:5173

# Check MongoDB connection
docker compose -f docker-compose.prod.yml exec mongodb mongosh --eval "db.adminCommand('ping')"
```

### 📊 Monitoring Logs

```bash
# View all logs
docker compose -f docker-compose.prod.yml logs

# Follow logs in real-time
docker compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker compose -f docker-compose.prod.yml logs backend
docker compose -f docker-compose.prod.yml logs frontend
docker compose -f docker-compose.prod.yml logs mongodb

# View last 100 lines
docker compose -f docker-compose.prod.yml logs --tail=100
```

### 📈 Performance Monitoring

```bash
# Monitor resource usage
docker stats

# Monitor specific containers
docker stats hotel-booking-backend hotel-booking-frontend

# Check disk usage
docker system df

# Clean up unused resources
docker system prune -f
```

---

## 🛠️ Troubleshooting

### 🚨 Common Issues & Solutions

#### 🔌 Port Already in Use

```bash
# Check what's using the port
sudo lsof -i :80
sudo lsof -i :7000
sudo lsof -i :27017

# Kill process using port
sudo kill -9 <PID>

# Or use different ports in docker-compose.yml
```

#### 🗄️ Database Connection Issues

```bash
# Check MongoDB container status
docker compose logs mongodb

# Verify environment variables
docker compose config

# Reset MongoDB data
docker compose down -v
docker compose up -d
```

#### 🔧 Build Failures

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker compose build --no-cache

# Check Dockerfile syntax
docker build -t test-build ./frontend
docker build -t test-build ./backend
```

#### 🌐 Frontend/Backend Communication Issues

```bash
# Check network connectivity
docker compose exec frontend ping backend
docker compose exec backend ping mongodb

# Verify environment variables
docker compose exec frontend env | grep VITE
docker compose exec backend env | grep MONGODB
```

### 🔍 Debug Mode

```bash
# Run containers in debug mode
docker compose -f docker-compose.yml -f docker-compose.debug.yml up

# Access container shell
docker compose exec backend bash
docker compose exec frontend sh

# Check container logs with timestamps
docker compose logs -t backend
```

### 📞 Getting Help

If you're still having issues:

1. **Check the logs** first: `docker compose logs`
2. **Verify environment variables**: `docker compose config`
3. **Check Docker resources**: `docker system df`
4. **Create an issue** on GitHub with:
   - Error messages
   - Docker version: `docker --version`
   - Docker Compose version: `docker compose version`
   - Operating system

---

## 📊 Performance Optimization

### 🚀 Production Optimizations

```bash
# Use production Docker Compose file
docker compose -f docker-compose.prod.yml up -d

# Enable Docker BuildKit for faster builds
export DOCKER_BUILDKIT=1
docker compose build

# Optimize images
docker image prune -f
```

### 📈 Scaling Guidelines

```bash
# Monitor resource usage before scaling
docker stats

# Scale based on CPU/Memory usage
# High CPU: Scale backend
docker compose up -d --scale backend=3

# High traffic: Scale frontend
docker compose up -d --scale frontend=2
```

### 🔧 Resource Limits

Add resource limits to `docker-compose.prod.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

<div align="center">

**🐳 Docker makes deployment consistent across all environments!**

**Questions?** [Create an issue](https://github.com/himuexe/Hotel-Booking-Website/issues) | **Contribute** [Submit a PR](https://github.com/himuexe/Hotel-Booking-Website/pulls)

[🔝 Back to Top](#-docker-deployment-guide)

</div> 