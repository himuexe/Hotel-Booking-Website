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

### 🌐 System Overview

```mermaid
graph TB
    subgraph "🌐 Client Layer"
        FE[🎨 Frontend<br/>React SPA<br/>Port: 5173]
    end
    
    subgraph "🖥️ Server Layer"
        BE[🖥️ Backend<br/>Express.js<br/>Port: 7000]
    end
    
    subgraph "🗄️ Data Layer"
        DB[(🗄️ MongoDB<br/>Database<br/>Port: 27017)]
    end
    
    subgraph "☁️ External Services"
        CL[☁️ Cloudinary<br/>Image Storage]
        ST[💳 Stripe<br/>Payment Processing]
    end
    
    FE <-->|RESTful API<br/>HTTPS| BE
    BE <-->|Mongoose ODM| DB
    BE <-->|Image Upload| CL
    FE <-->|Payment Processing| ST
    
    style FE fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style BE fill:#339933,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#47A248,stroke:#333,stroke-width:2px,color:#fff
    style CL fill:#3448C5,stroke:#333,stroke-width:2px,color:#fff
    style ST fill:#008CDD,stroke:#333,stroke-width:2px,color:#fff
```

### 🔄 Communication Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant F as 🎨 Frontend
    participant B as 🖥️ Backend
    participant D as 🗄️ Database
    participant C as ☁️ Cloudinary
    participant S as 💳 Stripe
    
    Note over U,S: Hotel Booking Flow
    
    U->>F: Search Hotels
    F->>B: GET /api/hotels/search
    B->>D: Query Hotels
    D-->>B: Hotel Results
    B-->>F: JSON Response
    F-->>U: Display Hotels
    
    U->>F: Select Hotel & Book
    F->>B: POST /api/hotels/:id/bookings/payment-intent
    B->>S: Create Payment Intent
    S-->>B: Client Secret
    B-->>F: Payment Intent
    F->>S: Process Payment
    S-->>F: Payment Confirmation
    F->>B: POST /api/hotels/:id/bookings
    B->>D: Create Booking
    D-->>B: Booking Saved
    B-->>F: Booking Confirmation
    F-->>U: Success Message
```

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

```mermaid
flowchart TD
    A[👤 User Visits Site] --> B[🔍 Search Hotels]
    B --> C{🏨 Hotels Found?}
    C -->|Yes| D[📋 Browse Results]
    C -->|No| E[😔 No Results]
    D --> F[🏨 Select Hotel]
    F --> G[📅 Choose Dates]
    G --> H[👥 Enter Guest Info]
    H --> I[💳 Payment Processing]
    I --> J{💰 Payment Success?}
    J -->|Yes| K[✅ Booking Confirmed]
    J -->|No| L[❌ Payment Failed]
    K --> M[📧 Confirmation Email]
    L --> I
    E --> B
    
    style A fill:#e1f5fe
    style K fill:#c8e6c9
    style L fill:#ffcdd2
    style M fill:#f3e5f5
```

### 🏨 Hotel Management Flow

```mermaid
flowchart TD
    A[🏨 Hotel Owner] --> B[🔐 Login/Register]
    B --> C[📋 Dashboard]
    C --> D{🎯 Action?}
    D -->|Create| E[➕ Add New Hotel]
    D -->|Manage| F[📝 Edit Existing]
    D -->|View| G[📊 View Bookings]
    
    E --> H[📝 Enter Hotel Details]
    H --> I[📸 Upload Images]
    I --> J[☁️ Cloudinary Storage]
    J --> K[💾 Save to Database]
    K --> L[✅ Hotel Published]
    
    F --> M[✏️ Update Details]
    M --> N[🔄 Save Changes]
    N --> O[✅ Hotel Updated]
    
    G --> P[📋 Booking List]
    P --> Q[📊 Revenue Analytics]
    
    style A fill:#e3f2fd
    style L fill:#c8e6c9
    style O fill:#c8e6c9
    style Q fill:#fff3e0
```

### 🔄 API Data Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant F as 🎨 Frontend
    participant B as 🖥️ Backend
    participant D as 🗄️ MongoDB
    participant S as 💳 Stripe
    participant C as ☁️ Cloudinary
    
    Note over U,C: Complete Booking Journey
    
    rect rgb(240, 248, 255)
        Note over U,D: 1. Hotel Search
        U->>F: Search "Hotels in NYC"
        F->>B: GET /api/hotels/search?city=NYC
        B->>D: db.hotels.find({city: "NYC"})
        D-->>B: Hotel Results
        B-->>F: JSON Response
        F-->>U: Display Hotel Cards
    end
    
    rect rgb(248, 255, 240)
        Note over U,D: 2. Hotel Details
        U->>F: Click Hotel
        F->>B: GET /api/hotels/:id
        B->>D: db.hotels.findById(id)
        D-->>B: Hotel Details + Bookings
        B-->>F: Hotel Data
        F-->>U: Show Hotel Page
    end
    
    rect rgb(255, 248, 240)
        Note over U,S: 3. Payment Processing
        U->>F: Book Hotel
        F->>B: POST /api/hotels/:id/bookings/payment-intent
        B->>S: stripe.paymentIntents.create()
        S-->>B: Payment Intent + Client Secret
        B-->>F: Client Secret
        F->>S: Confirm Payment
        S-->>F: Payment Success
    end
    
    rect rgb(248, 240, 255)
        Note over F,D: 4. Booking Creation
        F->>B: POST /api/hotels/:id/bookings
        B->>D: Update hotel with new booking
        D-->>B: Booking Saved
        B-->>F: Booking Confirmation
        F-->>U: Success Page
    end
```

### 📸 Image Upload Flow

```mermaid
flowchart LR
    A[🏨 Hotel Owner] --> B[📝 Create/Edit Hotel]
    B --> C[📸 Select Images]
    C --> D[📤 Upload to Frontend]
    D --> E[🔄 Send to Backend]
    E --> F[☁️ Upload to Cloudinary]
    F --> G[🔗 Get Image URLs]
    G --> H[💾 Save URLs to MongoDB]
    H --> I[✅ Hotel Saved]
    
    style A fill:#e3f2fd
    style F fill:#e8f5e8
    style I fill:#c8e6c9
```

---

## 🐳 Deployment Architecture

The application is containerized using Docker for consistent deployment across environments:

### 🛠️ Development Environment

```mermaid
graph TB
    subgraph "🐳 Docker Development Environment"
        subgraph "Frontend Container"
            FE[🎨 Frontend<br/>Vite Dev Server<br/>Port: 5173<br/>Hot Reload ⚡]
        end
        
        subgraph "Backend Container"
            BE[🖥️ Backend<br/>Nodemon<br/>Port: 7000<br/>TypeScript 🔄]
        end
        
        subgraph "Database Container"
            DB[(🗄️ MongoDB<br/>Port: 27017<br/>Local Development<br/>Auth Enabled 🔒)]
        end
        
        subgraph "External Services"
            CL[☁️ Cloudinary<br/>Image Storage]
            ST[💳 Stripe<br/>Test Mode]
        end
    end
    
    FE <-->|API Calls| BE
    BE <-->|Mongoose| DB
    BE <-->|Image Upload| CL
    FE <-->|Payment| ST
    
    style FE fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style BE fill:#339933,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#47A248,stroke:#333,stroke-width:2px,color:#fff
    style CL fill:#3448C5,stroke:#333,stroke-width:2px,color:#fff
    style ST fill:#008CDD,stroke:#333,stroke-width:2px,color:#fff
```

### 🏭 Production Environment

```mermaid
graph TB
    subgraph "🏭 Docker Production Environment"
        subgraph "Frontend Container"
            FE[🎨 Frontend<br/>Nginx<br/>Port: 80<br/>Optimized Build 🚀]
        end
        
        subgraph "Backend Container"
            BE[🖥️ Backend<br/>Node.js<br/>Port: 7000<br/>Production Build 📦]
        end
        
        subgraph "Database Container"
            DB[(🗄️ MongoDB<br/>Port: 27017<br/>Persistent Storage<br/>Replica Set 🔄)]
        end
        
        subgraph "External Services"
            CL[☁️ Cloudinary<br/>CDN Delivery]
            ST[💳 Stripe<br/>Live Mode]
        end
        
        subgraph "Monitoring"
            LOG[📊 Logging<br/>Health Checks]
        end
    end
    
    FE <-->|HTTPS API| BE
    BE <-->|Mongoose| DB
    BE <-->|Image CDN| CL
    FE <-->|Secure Payment| ST
    BE --> LOG
    FE --> LOG
    DB --> LOG
    
    style FE fill:#61DAFB,stroke:#333,stroke-width:3px,color:#000
    style BE fill:#339933,stroke:#333,stroke-width:3px,color:#fff
    style DB fill:#47A248,stroke:#333,stroke-width:3px,color:#fff
    style CL fill:#3448C5,stroke:#333,stroke-width:2px,color:#fff
    style ST fill:#008CDD,stroke:#333,stroke-width:2px,color:#fff
    style LOG fill:#FF6B6B,stroke:#333,stroke-width:2px,color:#fff
```

### 🚀 Deployment Pipeline

```mermaid
flowchart LR
    A[👨‍💻 Developer] --> B[📝 Code Commit]
    B --> C[🔄 GitHub Actions]
    C --> D[🧪 Run Tests]
    D --> E{✅ Tests Pass?}
    E -->|Yes| F[🐳 Build Docker Images]
    E -->|No| G[❌ Build Failed]
    F --> H[📦 Push to Registry]
    H --> I[🚀 Deploy to Production]
    I --> J[🏥 Health Check]
    J --> K{🔍 Healthy?}
    K -->|Yes| L[✅ Deployment Success]
    K -->|No| M[🔄 Rollback]
    G --> N[📧 Notify Developer]
    M --> O[📧 Alert Team]
    
    style A fill:#e3f2fd
    style L fill:#c8e6c9
    style G fill:#ffcdd2
    style M fill:#ffcdd2
```

---

<div align="center">

**🏗️ Well-architected systems enable scalable, maintainable applications!**

**Questions?** [Create an issue](https://github.com/himuexe/Hotel-Booking-Website/issues) | **Contribute** [Submit a PR](https://github.com/himuexe/Hotel-Booking-Website/pulls)

[🔝 Back to Top](#️-vacays-hotel-booking-website---architecture-documentation)

</div> 