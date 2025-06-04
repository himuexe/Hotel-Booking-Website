# 🏗️ Vacays Hotel Booking Website - Architecture Documentation

> **Comprehensive architecture overview of the Vacays Hotel Booking Platform**  
> MERN stack implementation with modern development practices and scalable design

<div align="center">

[![Architecture](https://img.shields.io/badge/Architecture-MERN_Stack-brightgreen?style=for-the-badge&logo=mongodb)](https://github.com/himuexe/Hotel-Booking-Website)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

</div>

---

## 📋 Table of Contents

1. [🎯 System Overview](#-system-overview)
2. [🏗️ Architecture Diagram](#️-architecture-diagram)
3. [🧩 Component Details](#-component-details)
4. [🗄️ Database Schema](#️-database-schema)
5. [🌐 API Endpoints](#-api-endpoints)
6. [📊 Data Flow](#-data-flow)
7. [🐳 Deployment Architecture](#-deployment-architecture)

---

## 🎯 System Overview

The Vacays App is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with TypeScript. It follows a modern **client-server architecture** with clear separation of concerns:

<div align="center">

| Component | Technology | Purpose | Status |
|-----------|------------|---------|--------|
| **🎨 Frontend** | React 18 + TypeScript | Single-page application (SPA) | [![Frontend](https://img.shields.io/badge/Status-Active-brightgreen?style=flat&logo=react)](https://github.com/himuexe/Hotel-Booking-Website) |
| **🖥️ Backend** | Express.js + TypeScript | RESTful API server | [![Backend](https://img.shields.io/badge/Status-Active-brightgreen?style=flat&logo=node.js)](https://github.com/himuexe/Hotel-Booking-Website) |
| **🗄️ Database** | MongoDB + Mongoose | NoSQL data storage | [![Database](https://img.shields.io/badge/Status-Active-brightgreen?style=flat&logo=mongodb)](https://github.com/himuexe/Hotel-Booking-Website) |
| **☁️ External Services** | Cloudinary + Stripe | Image storage & payments | [![Services](https://img.shields.io/badge/Status-Integrated-blue?style=flat&logo=cloud)](https://github.com/himuexe/Hotel-Booking-Website) |

</div>

### 🎯 Key Architectural Principles

- **🔄 Separation of Concerns**: Clear boundaries between frontend, backend, and data layers
- **📱 Responsive Design**: Mobile-first approach with progressive enhancement
- **🔒 Security First**: JWT authentication, input validation, and secure communication
- **⚡ Performance Optimized**: Efficient data fetching, caching, and bundle optimization
- **🧪 Testable**: Comprehensive testing strategy across all layers

---

## 🏗️ Architecture Diagram

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 Client Layer                          │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │  Frontend   │    │   Backend   │    │   MongoDB   │     │
│   │ (React SPA) │◄──►│ (Express.js)│◄──►│ (Database)  │     │
│   │ Port: 5173  │    │ Port: 7000  │    │ Port: 27017 │     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                       │                           │
│         │                       │                           │
│         ▼                       ▼                           │
│   ┌─────────────┐    ┌─────────────┐                       │
│   │ Cloudinary  │    │   Stripe    │                       │
│   │(Image Store)│    │ (Payments)  │                       │
│   └─────────────┘    └─────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

</div>

### 🔄 Communication Flow

1. **🎨 Frontend** ↔️ **🖥️ Backend**: RESTful API calls over HTTPS
2. **🖥️ Backend** ↔️ **🗄️ Database**: Mongoose ODM for data operations
3. **🖥️ Backend** ↔️ **☁️ Cloudinary**: Image upload and management
4. **🎨 Frontend** ↔️ **💳 Stripe**: Payment processing (client-side)

---

## 🧩 Component Details

### 🎨 Frontend Architecture

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

</div>

#### 🏗️ Frontend Structure

```
frontend/src/
├── 📁 components/          # Reusable UI components
├── 📁 pages/              # Route-based page components
├── 📁 layouts/            # Layout components (Header, Footer)
├── 📁 forms/              # Complex form components
├── 📁 contexts/           # React Context providers
├── 📁 shared/             # Shared utilities and types
└── 📁 config/             # Configuration files
```

#### 🎯 Key Frontend Features

- **🔧 Build Tool**: Vite for fast development and optimized builds
- **🎨 Styling**: Tailwind CSS for utility-first styling
- **🔄 State Management**: React Query for server state, Context API for local state
- **🛣️ Routing**: React Router for client-side navigation
- **📝 Forms**: React Hook Form for efficient form handling

#### 📄 Key Pages & Components

| Page/Component | Purpose | Key Features |
|----------------|---------|--------------|
| **🏠 Home.tsx** | Landing page | Search functionality, hero section |
| **🔍 Search.tsx** | Hotel search results | Filtering, pagination, sorting |
| **🏨 Detail.tsx** | Hotel details | Image gallery, amenities, booking |
| **💳 Booking.tsx** | Booking & payment | Guest info, payment processing |
| **🔐 SignIn/Register.tsx** | Authentication | User login and registration |
| **🏨 MyHotels.tsx** | Hotel management | CRUD operations for hotel owners |
| **📋 MyBookings.tsx** | Booking history | User's past and upcoming bookings |

### 🖥️ Backend Architecture

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-000000?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Mongoose-8.5.1-880000?style=flat&logo=mongoose)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat&logo=jsonwebtokens)](https://jwt.io/)

</div>

#### 🏗️ Backend Structure

```
backend/src/
├── 📁 routes/             # API route handlers
├── 📁 models/             # Mongoose data models
├── 📁 middleware/         # Custom middleware functions
├── 📁 shared/             # Shared utilities and types
└── 📄 index.ts           # Application entry point
```

#### 🔒 Security & Authentication

- **🔐 JWT Authentication**: HTTP-only cookies for secure token storage
- **✅ Input Validation**: Express Validator for request validation
- **🛡️ Rate Limiting**: Protection against brute force attacks
- **🔒 CORS Configuration**: Secure cross-origin resource sharing

#### 🎯 API Design Principles

- **📋 RESTful Design**: Standard HTTP methods and status codes
- **📊 Consistent Response Format**: Uniform API response structure
- **🔍 Error Handling**: Comprehensive error handling and logging
- **📖 Documentation**: Swagger/OpenAPI documentation

---

## 🗄️ Database Schema

> **Database**: MongoDB with Mongoose ODM for schema validation and data modeling

### 👤 Users Collection

```typescript
{
  _id: ObjectId,
  email: string (unique),
  password: string (hashed),
  firstName: string,
  lastName: string
}
```

### 🏨 Hotels Collection (with Embedded Bookings)

```typescript
{
  _id: ObjectId,
  userId: string,                    // Hotel owner reference
  name: string,
  city: string,
  country: string,
  description: string,
  type: string,                      // Hotel category
  adultCount: number,
  childCount: number,
  facilities: string[],              // Amenities array
  pricePerNight: number,
  starRating: number (1-5),
  imageUrls: string[],               // Cloudinary URLs
  lastUpdated: Date,
  bookings: [                        // Embedded bookings
    {
      _id: ObjectId,
      userId: string,                // Guest reference
      firstName: string,
      lastName: string,
      email: string,
      adultCount: number,
      childCount: number,
      checkIn: Date,
      checkOut: Date,
      totalCost: number
    }
  ]
}
```

### 🎯 Schema Design Decisions

- **📦 Embedded Bookings**: Bookings are embedded within hotel documents for:
  - ⚡ **Performance**: Faster read operations for hotel details with bookings
  - 🔗 **Data Locality**: Related data stored together
  - 📊 **Simplified Queries**: Single query to get hotel with all bookings

- **🔍 Indexing Strategy**:
  - `email` field in Users collection (unique index)
  - `city` and `country` fields in Hotels collection (search optimization)
  - `userId` field in Hotels collection (owner queries)

---

## 🌐 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| `POST` | `/login` | User login | ❌ |
| `POST` | `/register` | User registration | ❌ |
| `GET` | `/validate-token` | Validate JWT token | ✅ |
| `POST` | `/logout` | User logout | ✅ |

### 👤 User Management (`/api/users`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| `GET` | `/me` | Get current user profile | ✅ |
| `POST` | `/register` | Create new user account | ❌ |

### 🏨 Hotel Management (`/api/my-hotels`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| `POST` | `/` | Create new hotel | ✅ |
| `GET` | `/` | Get user's hotels | ✅ |
| `GET` | `/:id` | Get specific hotel for editing | ✅ |
| `PUT` | `/:id` | Update hotel | ✅ |

### 🔍 Public Hotels (`/api/hotels`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| `GET` | `/search` | Search hotels with filters | ❌ |
| `GET` | `/` | Get all hotels | ❌ |
| `GET` | `/:id` | Get hotel details | ❌ |
| `POST` | `/:id/bookings/payment-intent` | Create Stripe payment intent | ✅ |
| `POST` | `/:id/bookings` | Create booking | ✅ |

### 📋 Bookings (`/api/my-bookings`)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| `GET` | `/` | Get user's booking history | ✅ |

### 🏥 System

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| `GET` | `/health` | Health check endpoint | ❌ |

---

## 📊 Data Flow

### 🏨 Hotel Booking Flow

<div align="center">

```
🔍 Search Hotels → 🏨 Select Hotel → 💳 Payment → ✅ Confirmation
     │                  │              │           │
     ▼                  ▼              ▼           ▼
  Filter by:        View Details    Stripe       Booking
  • Location        • Images        Payment      Created
  • Dates          • Amenities     Processing    in DB
  • Guests         • Price
  • Price Range
```

</div>

#### 📋 Detailed Booking Process

1. **🔍 Hotel Search**:
   ```
   Frontend → GET /api/hotels/search?location=NYC&checkIn=2024-01-01
   Backend → Query MongoDB with filters
   Database → Return matching hotels
   ```

2. **🏨 Hotel Selection**:
   ```
   Frontend → GET /api/hotels/:id
   Backend → Fetch hotel details with embedded bookings
   Database → Return hotel document
   ```

3. **💳 Payment Processing**:
   ```
   Frontend → POST /api/hotels/:id/bookings/payment-intent
   Backend → Create Stripe payment intent
   Stripe → Return client secret
   Frontend → Process payment with Stripe Elements
   ```

4. **✅ Booking Creation**:
   ```
   Frontend → POST /api/hotels/:id/bookings
   Backend → Validate payment and create booking
   Database → Embed booking in hotel document
   ```

### 🏨 Hotel Management Flow

1. **🔐 Authentication**: Hotel owner logs in via `/api/auth/login`
2. **📤 Hotel Creation**: Owner creates hotel via `/api/my-hotels` with image upload
3. **☁️ Image Storage**: Backend uploads images to Cloudinary
4. **💾 Data Storage**: Hotel information stored in MongoDB with Cloudinary URLs
5. **🔍 Availability**: Hotel becomes searchable and bookable
6. **✏️ Management**: Owner can view and edit hotels via `/api/my-hotels/:id`

---

## 🐳 Deployment Architecture

The application is containerized using Docker for consistent deployment across environments:

### 🛠️ Development Environment (`docker-compose.yml`)

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                    🐳 Docker Environment                    │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │  Frontend   │    │   Backend   │    │   MongoDB   │     │
│   │ Port: 5173  │    │ Port: 7000  │    │ Port: 27017 │     │
│   │ Hot Reload  │    │   Nodemon   │    │  Local DB   │     │
│   │   + Vite    │    │ + TypeScript│    │ + Auth      │     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

</div>

### 🏭 Production Environment (`docker-compose.prod.yml`)

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                  🏭 Production Environment                  │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │  Frontend   │    │   Backend   │    │   MongoDB   │     │
│   │  Port: 80   │    │ Port: 7000  │    │ Port: 27017 │     │
│   │ Optimized   │    │ Production  │    │   Storage   │     │
│   │   Build     │    │   Build     │    │ Persistent  │     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐                       │
│   │ Cloudinary  │    │   Stripe    │                       │
│   │ (External)  │    │ (External)  │                       │
│   └─────────────┘    └─────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

</div>

### 🚀 Deployment Features

- **🐳 Multi-stage Builds**: Optimized Docker images for production
- **🔄 Health Checks**: Built-in health monitoring for all services
- **📊 Logging**: Centralized logging for debugging and monitoring
- **🔒 Security**: Non-root containers and minimal attack surface
- **⚡ Performance**: Optimized builds and efficient resource usage

### 🌐 Scaling Considerations

- **📈 Horizontal Scaling**: Frontend and backend can be scaled independently
- **🗄️ Database Scaling**: MongoDB supports replica sets and sharding
- **☁️ Cloud Deployment**: Ready for deployment on AWS, GCP, or Azure
- **🔄 Load Balancing**: Can be deployed behind load balancers for high availability

---

<div align="center">

**🏗️ Well-architected systems enable scalable, maintainable applications!**

**Questions?** [Create an issue](https://github.com/himuexe/Hotel-Booking-Website/issues) | **Contribute** [Submit a PR](https://github.com/himuexe/Hotel-Booking-Website/pulls)

[🔝 Back to Top](#️-vacays-hotel-booking-website---architecture-documentation)

</div> 