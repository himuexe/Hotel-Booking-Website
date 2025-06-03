# Vacays Hotel Booking Website - Architecture Documentation

This document describes the architecture of the Vacays Hotel Booking Website.

## System Overview

The Vacays App is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript. It follows a client-server architecture with the following components:

1. **Frontend**: React-based single-page application (SPA)
2. **Backend**: Express.js RESTful API server
3. **Database**: MongoDB for data storage
4. **External Services**: Cloudinary for image storage and Stripe for payment processing

## Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │◄────┤     Backend     │◄────┤    MongoDB      │
│    (React)      │     │   (Express.js)  │     │   (Database)    │
│                 │────►│                 │────►│                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │
│   Cloudinary    │     │     Stripe      │
│  (Image Store)  │     │   (Payments)    │
│                 │     │                 │
└─────────────────┘     └─────────────────┘
```

## Component Details

### Frontend

- **Technology**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: React Query for server state, Context API for local state
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Key Pages**:
  - `Home.tsx`: Landing page with search functionality
  - `Search.tsx`: Hotel search results with filtering
  - `Detail.tsx`: Individual hotel details page
  - `Booking.tsx`: Hotel booking and payment page
  - `SignIn.tsx` / `Register.tsx`: Authentication pages
  - `MyHotels.tsx`: Hotel management for owners
  - `AddHotel.tsx` / `EditHotel.tsx`: Hotel creation and editing
  - `MyBookings.tsx`: User's booking history
- **Key Components**:
  - Forms: `BookingForm`, `GuestInfoForm`, `ManageHotelForm`
  - Layouts: Header, Footer, navigation components
  - Shared: Reusable UI components

### Backend

- **Technology**: Express.js with TypeScript
- **API**: RESTful API endpoints
- **Authentication**: JWT-based authentication with HTTP-only cookies
- **Validation**: Express Validator
- **Architecture Pattern**: Route-based (no separate controllers)
- **Key Routes**:
  - `/api/auth/*`: Authentication endpoints (login, register, logout, validate-token)
  - `/api/users/*`: User management endpoints
  - `/api/my-hotels/*`: Hotel management for owners
  - `/api/hotels/*`: Public hotel search and booking endpoints
  - `/api/my-bookings/*`: User booking history
  - `/health`: Health check endpoint

### Database Schema

- **Technology**: MongoDB (NoSQL database)
- **ODM**: Mongoose
- **Data Model**: Embedded document structure

#### Collections

**Users Collection**
```typescript
{
  _id: ObjectId,
  email: string (unique),
  password: string (hashed),
  firstName: string,
  lastName: string
}
```

**Hotels Collection** (with embedded bookings)
```typescript
{
  _id: ObjectId,
  userId: string,
  name: string,
  city: string,
  country: string,
  description: string,
  type: string,
  adultCount: number,
  childCount: number,
  facilities: string[],
  pricePerNight: number,
  starRating: number (1-5),
  imageUrls: string[],
  lastUpdated: Date,
  bookings: [
    {
      _id: ObjectId,
      userId: string,
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

**Important**: Bookings are embedded within hotel documents, not stored as a separate collection. This design optimizes for read performance and maintains data locality.

### External Services

- **Cloudinary**: Cloud-based image management service
  - Used exclusively by the backend for storing and serving hotel images
  - Frontend does not directly interact with Cloudinary
- **Stripe**: Payment processing service
  - Backend uses Stripe secret key for payment processing
  - Frontend uses Stripe publishable key for payment forms

## API Endpoints

### Authentication (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration  
- `GET /validate-token` - Validate JWT token
- `POST /logout` - User logout

### User Management (`/api/users`)
- `GET /me` - Get current user profile
- `POST /register` - Create new user account

### Hotel Management (`/api/my-hotels`)
- `POST /` - Create new hotel
- `GET /` - Get user's hotels
- `GET /:id` - Get specific hotel for editing
- `PUT /:id` - Update hotel

### Public Hotels (`/api/hotels`)
- `GET /search` - Search hotels with filters
- `GET /` - Get all hotels
- `GET /:id` - Get hotel details
- `POST /:id/bookings/payment-intent` - Create Stripe payment intent
- `POST /:id/bookings` - Create booking

### Bookings (`/api/my-bookings`)
- `GET /` - Get user's booking history

### System
- `GET /health` - Health check endpoint

## Data Flow

### Hotel Booking Flow

1. User searches for hotels using `/api/hotels/search` with location, dates, and guest count
2. Backend queries the hotels collection for matching criteria
3. User selects a hotel and views details via `/api/hotels/:id`
4. User initiates booking and creates payment intent via `/api/hotels/:id/bookings/payment-intent`
5. Frontend processes payment using Stripe Elements
6. Backend creates booking record embedded in the hotel document via `/api/hotels/:id/bookings`
7. Confirmation is returned to the user

### Hotel Management Flow

1. Hotel owner logs in via `/api/auth/login`
2. Owner creates hotel via `/api/my-hotels` with image upload to Cloudinary
3. Backend stores hotel information with Cloudinary image URLs in MongoDB
4. Hotel becomes available for search and booking
5. Owner can view and edit hotels via `/api/my-hotels/:id`

## Deployment Architecture

The application is containerized using Docker for easy deployment and scaling:

### Development Environment (`docker-compose.yml`)
```
┌─────────────────────────────────────────────────────────────┐
│                      Docker Environment                     │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │  Frontend   │    │   Backend   │    │   MongoDB   │     │
│   │ (Port 5173) │    │ (Port 7000) │    │ (Port 27017)│     │
│   │ Hot Reload  │    │   Nodemon   │    │   Local DB  │     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Production Environment (`docker-compose.prod.yml`)
```
┌─────────────────────────────────────────────────────────────┐
│                      Docker Environment                     │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │  Frontend   │    │   Backend   │    │   MongoDB   │     │
│   │ (Port 80)   │    │ (Port 7000) │    │ (Port 27017)│     │
│   │ Nginx Prod  │    │ Prod Build  │    │ Auth Enabled│     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Environment Variables

### Backend Variables
- `MONGODB_CONNECTION_STRING`: MongoDB connection string
- `JWT_SECRET_KEY`: Secret key for JWT token signing
- `FRONTEND_URL`: Frontend application URL for CORS
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `STRIPE_API_KEY`: Stripe secret key

### Frontend Variables (must be prefixed with `VITE_`)
- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_STRIPE_PUB_KEY`: Stripe publishable key

## Security Considerations

- JWT authentication with HTTP-only cookies for secure sessions
- Password hashing using bcrypt with salt rounds
- CORS configuration to control cross-origin access
- Input validation using Express Validator
- Rate limiting to prevent abuse
- Environment variables for sensitive configuration
- Secure headers and middleware

## Performance Considerations

- React code splitting with Vite for optimized loading
- MongoDB indexes on frequently queried fields
- Cloudinary for optimized image delivery and transformation
- Caching middleware for frequently accessed endpoints
- Embedded document structure for efficient booking queries
- Connection pooling for database connections

## Testing Infrastructure

- **Frontend**: Jest + React Testing Library + @testing-library/user-event
- **Backend**: Jest + Supertest + MongoDB Memory Server
- **E2E**: Playwright for end-to-end testing
- **Test Scripts**: Available in all package.json files
- **Coverage**: Test coverage reporting enabled

## Key Architectural Decisions

1. **Embedded Bookings**: Bookings are embedded in hotel documents rather than separate collection for better read performance and data locality
2. **Route-based Backend**: Direct route handlers instead of separate controller layer for simplicity
3. **JWT with HTTP-only Cookies**: Secure authentication without localStorage vulnerabilities
4. **Vite Build Tool**: Modern build tool for faster development and optimized production builds
5. **Cloudinary Backend-only**: Image management handled exclusively by backend for security

## Future Architecture Improvements

- Implement Redis for caching frequently accessed data
- Add message queue (Bull/BullMQ) for asynchronous processing
- Consider microservices architecture for better scalability
- Add WebSockets for real-time booking notifications
- Implement server-side rendering (Next.js) for improved SEO
- Add monitoring and observability tools (Prometheus, Grafana)
- Consider database sharding for large-scale deployments 