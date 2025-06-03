# Vacays App Setup Guides

This document provides detailed setup instructions for different environments (development, testing, and production) for the Vacays Hotel Booking Website.

## Prerequisites

- Node.js (v18+)
- npm (v8+)
- MongoDB Atlas account (cloud database)
- Docker and Docker Compose (for containerized setup)
- Git

## Development Environment Setup

### Option 1: Local Setup (Without Docker)

#### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/himuexe/Hotel-Booking-Website.git
   cd Hotel-Booking-Website
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```
   VITE_API_BASE_URL=http://localhost:7000
   VITE_STRIPE_PUB_KEY=pk_test_your_stripe_publishable_key
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_CONNECTION_STRING=mongodb://admin:password123@mongodb:27017/vacays?authSource=admin
   MONGO_INITDB_ROOT_USERNAME=admin
   MONGO_INITDB_ROOT_PASSWORD=password123
   JWT_SECRET_KEY=your-super-secret-jwt-key-at-least-32-characters-long
   FRONTEND_URL=http://localhost:5173
   STRIPE_API_KEY=sk_test_your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=7000
   ```

4. Ensure your MongoDB Atlas connection is configured in backend/.env:
   ```bash
   # Linux
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```

### Option 2: Docker Setup (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/himuexe/Hotel-Booking-Website.git
   cd Hotel-Booking-Website
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_CONNECTION_STRING=mongodb://admin:password123@mongodb:27017/vacays?authSource=admin
   MONGO_INITDB_ROOT_USERNAME=admin
   MONGO_INITDB_ROOT_PASSWORD=password123
   JWT_SECRET_KEY=your-super-secret-jwt-key-at-least-32-characters-long
   FRONTEND_URL=http://localhost:5173
   STRIPE_API_KEY=sk_test_your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   VITE_API_BASE_URL=http://localhost:7000
   VITE_STRIPE_PUB_KEY=pk_test_your_stripe_publishable_key
   ```

3. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:7000
   - API Documentation: http://localhost:7000/api-docs

## Testing Environment Setup

### E2E Testing Setup

1. Navigate to the e2e-tests directory:
   ```bash
   cd e2e-tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

4. Create a `.env.test` file in the root directory:
   ```
   # Note: For testing, use a separate test database in your MongoDB Atlas cluster
   JWT_SECRET_KEY=test_jwt_secret
   FRONTEND_URL=http://localhost:5173
   STRIPE_API_KEY=your_test_stripe_api_key
   ```

5. Start the application in test mode:
   ```bash
   # Without Docker
   cd ../backend
   npm run dev
   
   # In another terminal
   cd ../frontend
   npm run dev
   
   # With Docker
   # Note: Use your existing MongoDB Atlas connection for testing
   ```

6. Run the E2E tests:
   ```bash
   npm run test
   ```

### Unit Testing Setup

#### Frontend Unit Tests

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Run the unit tests:
   ```bash
   npm run test
   ```

#### Backend Unit Tests

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the unit tests:
   ```bash
   npm run test
   ```

## Production Environment Setup

### Option 1: Containerized Deployment

1. Build the production Docker images:
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. Start the production containers:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. The application will be available at:
   - Frontend: http://localhost (port 80)
   - Backend API: http://localhost:7000

### Option 2: Cloud Deployment

#### Prerequisites

- AWS, GCP, or Azure account
- MongoDB Atlas account (for managed MongoDB)
- Domain name (optional)

#### MongoDB Atlas Setup

1. Create a new MongoDB Atlas cluster
2. Create a database user with appropriate permissions
3. Whitelist the IP addresses for your application servers
4. Get the connection string for your application

#### Frontend Deployment (Vercel/Netlify)

1. Build the frontend for production:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Vercel/Netlify:
   - Connect your GitHub repository to Vercel/Netlify
   - Set up the build settings:
     - Build command: `npm run build`
     - Output directory: `dist`
   - Configure environment variables:
     - `VITE_API_BASE_URL`: Your backend API URL
     - `VITE_STRIPE_PUB_KEY`: Your Stripe publishable key

#### Backend Deployment (AWS EC2/ECS)

1. Create an EC2 instance or ECS service
2. Install Docker on the instance
3. Pull the backend Docker image from your container registry
4. Run the container with the following environment variables:
   - `MONGODB_CONNECTION_STRING`: MongoDB Atlas connection string
   - `JWT_SECRET_KEY`: JWT secret key
   - `FRONTEND_URL`: Frontend URL
   - `STRIPE_API_KEY`: Stripe API key
   - `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Troubleshooting

### Common Issues

1. **Connection refused to MongoDB**
   - Ensure MongoDB is running
   - Check the connection string
   - Verify network connectivity
   - Check firewall settings

2. **Docker containers not starting**
   - Check Docker logs: `docker-compose logs`
   - Ensure ports are not already in use
   - Verify environment variables

3. **Frontend cannot connect to backend**
   - Check the `VITE_API_BASE_URL` environment variable
   - Ensure backend is running
   - Check CORS configuration

4. **Authentication issues**
   - Verify JWT_SECRET_KEY is set correctly
   - Check token expiration settings
   - Clear browser cookies and try again

5. **Port already in use**
   ```bash
   # Kill processes on ports 5173 and 7000
   npx kill-port 5173 7000
   ```

6. **Docker permission issues**
   ```bash
   sudo usermod -aG docker $USER
   # Log out and log back in
   ```

7. **Environment variables not loading**
   - Ensure `.env` files are in the correct directories
   - Check that frontend variables are prefixed with `VITE_`
   - Restart development servers after changing environment variables

8. **Database connection issues**
   - Verify MongoDB is running
   - Check the `MONGODB_CONNECTION_STRING` format
   - Ensure database credentials are correct

9. **API connection issues**
   - Verify the `VITE_API_BASE_URL` matches your backend URL
   - Check CORS configuration in backend
   - Ensure backend is running on the specified port

### Getting Help

If you encounter any issues not covered here, please:
1. Check the project's GitHub issues
2. Contact the development team
3. Refer to the troubleshooting guides in the project wiki 