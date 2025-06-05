# 🚀 Vacays Hotel Booking Website - Development Setup Guide

> **Quick development environment setup for the Vacays Hotel Booking Platform**  
> Get your local development environment running in minutes

<div align="center">

[![Setup Guide](https://img.shields.io/badge/Setup-Guide-brightgreen?style=for-the-badge&logo=rocket)](https://github.com/himuexe/Hotel-Booking-Website)
[![Development](https://img.shields.io/badge/Development-Ready-blue?style=for-the-badge&logo=code)](https://github.com/himuexe/Hotel-Booking-Website)

</div>

---

## 📋 Quick Navigation

| 🎯 Goal | 📖 Guide | ⏱️ Time |
|---------|----------|---------|
| **🛠️ Local Development** | [Development Setup](#️-development-environment-setup) | 10 min |
| **🐳 Docker Development** | [Docker Deployment Guide](docker-deployment.md) | 5 min |
| **🧪 Testing Setup** | [Testing Guide](testing.md) | 15 min |
| **🚀 Production Deploy** | [Docker Deployment Guide](docker-deployment.md#-production-deployment) | 5 min |

---

## 🛠️ Development Environment Setup

### 🎯 Setup Process Overview

```mermaid
flowchart TD
    A[🚀 Start Setup] --> B[📋 Check Prerequisites]
    B --> C{✅ All Prerequisites Met?}
    C -->|No| D[📥 Install Missing Tools]
    C -->|Yes| E[📂 Clone Repository]
    D --> E
    E --> F[📦 Install Dependencies]
    F --> G[🔧 Configure Environment]
    G --> H[🗄️ Setup Database]
    H --> I[▶️ Start Development Servers]
    I --> J[🌐 Access Application]
    J --> K[✅ Development Ready!]
    
    style A fill:#e3f2fd
    style K fill:#c8e6c9
    style D fill:#fff3e0
    style G fill:#f3e5f5
```

### 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+) - [Download here](https://nodejs.org/)
- **npm** (v8+) - Comes with Node.js
- **MongoDB** (v6+) - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

### ⚡ Quick Start

```bash
# 1. Clone and install
git clone https://github.com/himuexe/Hotel-Booking-Website.git
cd Hotel-Booking-Website

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Set up environment (see Environment Configuration below)
# 4. Start development servers
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2
```

### 🔧 Environment Configuration

```mermaid
graph LR
    A[🔧 Environment Setup] --> B[📄 Create .env Files]
    B --> C[🖥️ Backend .env<br/>Project Root]
    B --> D[🎨 Frontend .env<br/>frontend/ folder]
    C --> E[🗄️ Database Config]
    C --> F[🔐 JWT Secret]
    C --> G[☁️ Cloudinary Keys]
    C --> H[💳 Stripe Keys]
    D --> I[🌐 API Base URL]
    D --> J[💳 Stripe Public Key]
    E --> K[✅ Configuration Complete]
    F --> K
    G --> K
    H --> K
    I --> K
    J --> K
    
    style A fill:#e3f2fd
    style K fill:#c8e6c9
    style C fill:#fff3e0
    style D fill:#e8f5e8
```

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

### 🎯 Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:7000
- **API Documentation**: http://localhost:7000/api-docs

---

## 🔧 Development Workflow

### 📊 Development Process Flow

```mermaid
flowchart TD
    A[👨‍💻 Start Development] --> B[🔄 Make Code Changes]
    B --> C[🧪 Run Tests]
    C --> D{✅ Tests Pass?}
    D -->|Yes| E[🔍 Code Review]
    D -->|No| F[🐛 Fix Issues]
    F --> C
    E --> G[📝 Commit Changes]
    G --> H[🚀 Push to Repository]
    H --> I[🔄 CI/CD Pipeline]
    I --> J[✅ Deployment]
    
    style A fill:#e3f2fd
    style J fill:#c8e6c9
    style F fill:#ffcdd2
    style C fill:#fff3e0
```

### 📝 Code Quality

```bash
# Frontend linting
cd frontend && npm run lint

# Backend linting
cd backend && npm run lint

# Run tests
npm test  # In respective directories
```

### 🔄 Development Tips

- **Hot Reload**: Both frontend and backend support hot reloading
- **API Docs**: Interactive Swagger docs at http://localhost:7000/api-docs
- **Database**: Use MongoDB Compass for database visualization
- **Debugging**: VS Code debugging configurations included

---

## 🚀 Next Steps

<div align="center">

| 🎯 Next Action | 📖 Guide | 📝 Description |
|----------------|----------|----------------|
| **🐳 Docker Setup** | [Docker Deployment](docker-deployment.md) | Containerized development |
| **🧪 Run Tests** | [Testing Guide](testing.md) | Comprehensive testing |
| **🏗️ Understand Architecture** | [Architecture Guide](architecture.md) | System design overview |
| **🚀 Deploy** | [Docker Deployment](docker-deployment.md#-production-deployment) | Production deployment |

</div>

---

## 🔧 Troubleshooting

### 🚨 Troubleshooting Decision Tree

```mermaid
flowchart TD
    A[🚨 Issue Encountered] --> B{🔍 What's the Problem?}
    B -->|Database| C[🗄️ MongoDB Issues]
    B -->|Port| D[🔌 Port Conflicts]
    B -->|Environment| E[🔧 Environment Variables]
    B -->|Dependencies| F[📦 Package Issues]
    
    C --> C1[✅ Check MongoDB Status]
    C1 --> C2[✅ Verify Connection String]
    C2 --> C3[✅ Check Network/Firewall]
    
    D --> D1[✅ Kill Process on Port]
    D1 --> D2[✅ Use Different Port]
    D2 --> D3[✅ Restart Servers]
    
    E --> E1[✅ Check .env File Location]
    E1 --> E2[✅ Verify Variable Names]
    E2 --> E3[✅ Restart Development Servers]
    
    F --> F1[✅ Clear npm Cache]
    F1 --> F2[✅ Delete node_modules]
    F2 --> F3[✅ Reinstall Dependencies]
    
    C3 --> G[✅ Issue Resolved]
    D3 --> G
    E3 --> G
    F3 --> G
    
    style A fill:#ffcdd2
    style G fill:#c8e6c9
    style C fill:#fff3e0
    style D fill:#e8f5e8
    style E fill:#f3e5f5
    style F fill:#e1f5fe
```

### 🚨 Common Issues

**MongoDB Connection Issues**
- ✅ Ensure MongoDB is running locally or Atlas connection string is correct
- ✅ Check firewall settings and network connectivity

**Port Already in Use**
- ✅ Kill processes using ports 5173 or 7000: `lsof -ti:5173 | xargs kill -9`

**Environment Variables Not Loading**
- ✅ Verify `.env` file location and format
- ✅ Restart development servers after changes

**Package Installation Issues**
- ✅ Clear npm cache: `npm cache clean --force`
- ✅ Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### 📞 Need More Help?

1. **📋 Check Issues**: [GitHub Issues](https://github.com/himuexe/Hotel-Booking-Website/issues)
2. **🆕 Create Issue**: [Report a problem](https://github.com/himuexe/Hotel-Booking-Website/issues/new)
3. **📖 Full Documentation**: [Documentation Hub](README.md)

---

<div align="center">

**🚀 Ready to build amazing hotel booking experiences!**

[🔝 Back to Top](#-vacays-hotel-booking-website---development-setup-guide)

</div> 