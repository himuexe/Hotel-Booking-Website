<div align="center">

# 🏨 Vacays - Hotel Booking Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=github-actions)](https://github.com/himuexe/Hotel-Booking-Website/actions)
[![Docker](https://img.shields.io/badge/docker-ready-blue?style=for-the-badge&logo=docker)](https://hub.docker.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge&logo=opensourceinitiative)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge&logo=github)](https://github.com/himuexe/Hotel-Booking-Website/issues)

**A modern, full-stack hotel booking platform built with React, TypeScript, Node.js, and MongoDB**

[🚀 Quick Start](#-quick-start-30-seconds) • [🐳 Docker Setup](#-docker-deployment) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ Features

### 🎯 Feature Matrix

```mermaid
mindmap
  root((🏨 Vacays Platform))
    🔐 Authentication
      👤 User Registration
      🔑 JWT Login
      🍪 Secure Cookies
      🔒 Password Hashing
    🏨 Hotel Management
      ➕ Create Hotels
      ✏️ Edit Properties
      📸 Image Upload
      📊 Analytics
    🔍 Search & Discovery
      🌍 Location Search
      📅 Date Filtering
      💰 Price Range
      ⭐ Star Rating
      🏷️ Amenities Filter
    💳 Booking System
      📋 Guest Information
      💰 Price Calculation
      💳 Stripe Payment
      📧 Confirmation
    👤 User Experience
      📱 Mobile Responsive
      ⚡ Fast Loading
      ♿ Accessibility
      🎨 Modern UI
```

<div align="center">

| 🎨 **Modern UI/UX** | 🔐 **Secure Authentication** | 💳 **Payment Integration** |
|:---:|:---:|:---:|
| Responsive design with Tailwind CSS | JWT-based auth with HTTP-only cookies | Stripe payment processing |
| **🔍 Advanced Search** | **📱 Mobile Optimized** | **🐳 Docker Ready** |
| Filter by location, dates, price | Works seamlessly on all devices | One-command deployment |

</div>

### 🎯 Core Functionality

- **🏨 Hotel Management**: Complete CRUD operations for hotels with image uploads
- **📅 Booking System**: Real-time availability checking and reservation management  
- **👤 User Profiles**: Registration, authentication, and profile management
- **🔍 Smart Search**: Advanced filtering by location, dates, price range, and amenities
- **💰 Payment Processing**: Secure Stripe integration for seamless transactions
- **📊 Admin Dashboard**: Comprehensive hotel and booking management
- **🔒 Security**: Rate limiting, input validation, and secure authentication
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS

---

## 🛠️ Technology Stack

### 🏗️ Architecture Overview

```mermaid
graph TB
    subgraph "🎨 Frontend Layer"
        FE[React 18.3.1<br/>TypeScript 5.2.2<br/>Vite 5.3.4<br/>Tailwind CSS 3.4.10]
    end
    
    subgraph "🖥️ Backend Layer"
        BE[Node.js 20+<br/>Express 4.19.2<br/>TypeScript<br/>JWT Auth]
    end
    
    subgraph "🗄️ Data Layer"
        DB[MongoDB 6.8.0<br/>Mongoose 8.5.1<br/>Schema Validation]
    end
    
    subgraph "☁️ External Services"
        CL[Cloudinary<br/>Image Storage & CDN]
        ST[Stripe 17.1.0<br/>Payment Processing]
    end
    
    subgraph "🛠️ DevOps & Tools"
        DO[Docker<br/>GitHub Actions<br/>Swagger API Docs<br/>ESLint & Prettier]
    end
    
    FE <--> BE
    BE <--> DB
    BE <--> CL
    FE <--> ST
    DO -.-> FE
    DO -.-> BE
    DO -.-> DB
    
    style FE fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style BE fill:#339933,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#47A248,stroke:#333,stroke-width:2px,color:#fff
    style CL fill:#3448C5,stroke:#333,stroke-width:2px,color:#fff
    style ST fill:#008CDD,stroke:#333,stroke-width:2px,color:#fff
    style DO fill:#FF6B6B,stroke:#333,stroke-width:2px,color:#fff
```

<div align="center">

### Frontend
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-3.39.3-FF4154?style=flat&logo=react-query)](https://tanstack.com/query)

### Backend
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-000000?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.8.0-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.5.1-880000?style=flat&logo=mongoose)](https://mongoosejs.com/)
[![Stripe](https://img.shields.io/badge/Stripe-17.1.0-008CDD?style=flat&logo=stripe)](https://stripe.com/)

### DevOps & Tools
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=flat&logo=github-actions)](https://github.com/features/actions)
[![Swagger](https://img.shields.io/badge/Swagger-API_Docs-85EA2D?style=flat&logo=swagger)](https://swagger.io/)
[![ESLint](https://img.shields.io/badge/ESLint-Code_Quality-4B32C3?style=flat&logo=eslint)](https://eslint.org/)

</div>

---

## 🚀 Quick Start (30 seconds)

> 💡 **Prerequisites**: Docker and Docker Compose installed on your system

### 🐳 One-Command Deployment

```bash
# Clone the repository
git clone https://github.com/himuexe/Hotel-Booking-Website.git
cd Hotel-Booking-Website

# Create environment file
touch .env
# Edit .env with your configuration (see Environment Setup below)

# 🚀 Deploy with Docker (Production Ready)
docker compose -f docker-compose.prod.yml up -d --build

# ✅ Access your application
# Frontend: http://localhost
# Backend API: http://localhost:7000
# API Documentation: http://localhost:7000/api-docs
```

### 🛠️ Development Mode (with hot reloading)

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Start development servers
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2

# Access at http://localhost:5173
```

---

## 🔧 Environment Setup

Create a `.env` file in the project root:

```env
# Database Configuration
MONGODB_CONNECTION_STRING=mongodb://admin:password123@mongodb:27017/vacays?authSource=admin
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123

# Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-at-least-32-characters-long

# Application URLs
FRONTEND_URL=http://localhost:5173

# Cloudinary (Backend Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Stripe (Backend Payment Processing)
STRIPE_API_KEY=sk_test_your-stripe-secret-key
```

Create `frontend/.env` file:

```env
# Frontend API Configuration
VITE_API_BASE_URL=http://localhost:7000
VITE_STRIPE_PUB_KEY=pk_test_your-stripe-publishable-key
```

> 🔐 **Security Note**: Never commit your `.env` file to version control

---

## 🐳 Docker Deployment

### 🚀 Production Deployment

```bash
# Build and start all services
docker compose -f docker-compose.prod.yml up -d --build

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Scale services (if needed)
docker compose -f docker-compose.prod.yml up -d --scale backend=3

# Stop services
docker compose -f docker-compose.prod.yml down
```

### 🛠️ Using Deployment Script

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy with Docker Compose
./scripts/deploy.sh --type docker-compose --env production

# View deployment status
docker compose -f docker-compose.prod.yml ps
```

### 🔍 Health Checks

```bash
# Check backend health
curl http://localhost:7000/health

# Check frontend
curl http://localhost

# View container status
docker compose -f docker-compose.prod.yml ps
```

---

## 📖 Documentation

<div align="center">

| 📋 **Development** | 🏗️ **Architecture** | 🐳 **Deployment** | 🧪 **Testing** |
|:---:|:---:|:---:|:---:|
| [Development Setup](docs/setup-guides.md) | [Architecture Overview](docs/architecture.md) | [Docker Deployment](docs/docker-deployment.md) | [Testing Guide](docs/testing.md) |
| Local development environment | System design and components | Complete containerized deployment | Comprehensive testing strategy |

</div>

### 📚 Documentation Hub

**[📖 Documentation Hub](docs/README.md)** - Centralized access to all project documentation with role-based guides

### 🔧 Additional Resources

- **[🚀 CI/CD Setup](docs/ci-cd-setup.md)** - Automated deployment pipelines
- **[📊 API Documentation](http://localhost:7000/api-docs)** - Interactive Swagger API docs
- **[📄 License](LICENSE)** - MIT License details

---

## 🧪 Testing

### Run All Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests  
cd frontend && npm test

# E2E tests
cd e2e-tests && npm test

# Docker test script
./docker-test.sh
```

### Test Coverage

- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user journey testing with Playwright
- **Performance Tests**: Load testing and optimization
- **Accessibility Tests**: WCAG compliance testing

---

## 💰 Free Production Deployment

Deploy Vacays to production using **Docker-compatible free services**:

<div align="center">

| Service | Cost | Docker Support | Database | Best For |
|---------|------|----------------|----------|----------|
| **Railway** | $5 credit/month | ✅ Full Docker | MongoDB Atlas Free | **Recommended** |
| **Render** | Free tier | ✅ Dockerfile | MongoDB Atlas Free | Simplicity |
| **DigitalOcean** | $4/month | ✅ Full Docker | Self-hosted MongoDB | Full Control |

</div>

### 🚀 Quick Deploy to Railway

```bash
# 1. Push your code to GitHub
git add . && git commit -m "Deploy to Railway"
git push origin main

# 2. Connect to Railway
# - Visit railway.app
# - Connect GitHub repo
# - Deploy with Docker

# 3. Set environment variables in Railway dashboard
# 4. Your app is live! 🎉
```

> 🐳 **Docker Advantage**: Your app runs the same everywhere - local, staging, production!

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 🐛 Found a Bug?

1. Check [existing issues](https://github.com/himuexe/Hotel-Booking-Website/issues)
2. Create a [new issue](https://github.com/himuexe/Hotel-Booking-Website/issues/new) with details
3. Include steps to reproduce and expected behavior

### 💡 Want to Contribute?

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📋 Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting
- Test with Docker before submitting

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/himuexe/Hotel-Booking-Website?style=social)
![GitHub forks](https://img.shields.io/github/forks/himuexe/Hotel-Booking-Website?style=social)
![GitHub issues](https://img.shields.io/github/issues/himuexe/Hotel-Booking-Website)
![GitHub pull requests](https://img.shields.io/github/issues-pr/himuexe/Hotel-Booking-Website)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[React](https://reactjs.org/)** - Frontend framework
- **[Express](https://expressjs.com/)** - Backend framework  
- **[MongoDB](https://www.mongodb.com/)** - Database
- **[Stripe](https://stripe.com/)** - Payment processing
- **[Cloudinary](https://cloudinary.com/)** - Image management
- **[Docker](https://www.docker.com/)** - Containerization
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

[🔝 Back to Top](#-vacays---hotel-booking-platform)

</div>
