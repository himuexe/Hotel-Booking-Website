# Vacays App Testing Documentation

This document provides a comprehensive guide to testing the Vacays Hotel Booking Website, covering unit tests, integration tests, and end-to-end tests.

## Testing Strategy

The Vacays App follows a comprehensive testing strategy that includes:

1. **Unit Tests** - Testing individual components and functions in isolation
2. **Integration Tests** - Testing interactions between components and services
3. **End-to-End Tests** - Testing complete user flows from start to finish
4. **Accessibility Tests** - Ensuring the application is accessible to all users
5. **Performance Tests** - Validating the application's performance under load

## Testing Tools

The following tools are used for testing the Vacays App:

- **Jest** - JavaScript testing framework for unit and integration tests
- **React Testing Library** - For testing React components
- **Playwright** - For end-to-end testing
- **Supertest** - For testing HTTP endpoints
- **Lighthouse** - For performance and accessibility testing

## Unit Testing

### Frontend Unit Tests

Frontend unit tests focus on testing individual React components, hooks, and utility functions.

#### Component Tests

Component tests verify that components render correctly with different props and respond appropriately to user interactions.

Example component test:

```typescript
// HotelCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import HotelCard from '../components/HotelCard';

const mockHotel = {
  _id: '1',
  name: 'Test Hotel',
  city: 'Test City',
  country: 'Test Country',
  description: 'Test Description',
  type: 'Budget',
  adultCount: 2,
  childCount: 1,
  facilities: ['Wifi', 'Parking'],
  pricePerNight: 100,
  starRating: 4,
  imageUrls: ['test.jpg'],
  lastUpdated: new Date(),
};

describe('HotelCard', () => {
  test('renders hotel information correctly', () => {
    render(
      <BrowserRouter>
        <HotelCard hotel={mockHotel} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Hotel')).toBeInTheDocument();
    expect(screen.getByText('Test City, Test Country')).toBeInTheDocument();
    expect(screen.getByText('$100 per night')).toBeInTheDocument();
    expect(screen.getByText('★★★★☆')).toBeInTheDocument();
  });

  test('navigates to hotel details page when clicked', async () => {
    render(
      <BrowserRouter>
        <HotelCard hotel={mockHotel} />
      </BrowserRouter>
    );

    const viewDetailsButton = screen.getByText('View Details');
    await userEvent.click(viewDetailsButton);
    
    // Check if navigated to the correct URL
    // In a more complete test, you'd use a mock router to verify navigation
  });
});
```

#### Hook Tests

Hook tests verify custom React hooks work as expected.

Example hook test:

```typescript
// useAuth.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext';

jest.mock('../api', () => ({
  loginUser: jest.fn().mockResolvedValue({ token: 'test-token', firstName: 'Test' }),
  registerUser: jest.fn().mockResolvedValue({ token: 'test-token', firstName: 'Test' }),
  logoutUser: jest.fn().mockResolvedValue({}),
}));

describe('useAuth', () => {
  test('login updates auth state correctly', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.userInfo).toEqual({ firstName: 'Test' });
  });

  // Additional tests for register, logout, etc.
});
```

#### Utility Function Tests

Tests for utility functions verify they produce the expected outputs for given inputs.

Example utility function test:

```typescript
// formatDate.test.ts
import { formatDate } from '../utils/formatDate';

describe('formatDate', () => {
  test('formats date correctly', () => {
    const date = new Date('2023-01-15T12:00:00Z');
    expect(formatDate(date)).toBe('January 15, 2023');
  });

  test('handles invalid date', () => {
    expect(formatDate(null)).toBe('Invalid Date');
    expect(formatDate(undefined)).toBe('Invalid Date');
  });
});
```

### Backend Unit Tests

Backend unit tests focus on testing individual functions, models, and utilities.

#### Model Tests

Model tests verify that MongoDB models behave as expected.

Example model test:

```typescript
// UserModel.test.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Model', () => {
  test('create & save user successfully', async () => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'Password123!'
    };
    
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.email).toBe(userData.email);
    // Password should be hashed
    expect(savedUser.password).not.toBe(userData.password);
  });
  
  // Additional tests for validation, methods, etc.
});
```

#### Route Handler Tests

Route handler tests verify that API endpoints behave as expected.

Example route handler test:

```typescript
// authRoutes.test.ts
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import authRoutes from '../routes/auth';
import User from '../models/User';

let app: express.Application;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  
  app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  test('register user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Password123!'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('firstName', 'Test');
  });
  
  // Additional tests for login, logout, etc.
});
```

## Integration Tests

Integration tests verify that different parts of the application work together correctly.

### API Integration Tests

API integration tests verify that the API endpoints correctly interact with the database and other services.

Example API integration test:

```typescript
// bookingAPI.test.ts
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bookingRoutes from '../routes/booking';
import authMiddleware from '../middleware/auth';
import User from '../models/User';
import Hotel from '../models/Hotel';
import Booking from '../models/Booking';

let app: express.Application;
let mongoServer: MongoMemoryServer;
let authToken: string;
let userId: string;
let hotelId: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  
  app = express();
  app.use(express.json());
  app.use(authMiddleware);
  app.use('/api/bookings', bookingRoutes);
  
  // Create test user
  const user = await User.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'Password123!'
  });
  userId = user._id.toString();
  
  // Create test hotel
  const hotel = await Hotel.create({
    name: 'Test Hotel',
    city: 'Test City',
    country: 'Test Country',
    description: 'Test Description',
    type: 'Budget',
    adultCount: 2,
    childCount: 1,
    facilities: ['Wifi', 'Parking'],
    pricePerNight: 100,
    starRating: 4,
    imageUrls: ['test.jpg'],
    lastUpdated: new Date(),
  });
  hotelId = hotel._id.toString();
  
  // Generate auth token
  authToken = 'Bearer ' + generateToken(userId);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Booking API', () => {
  beforeEach(async () => {
    await Booking.deleteMany({});
  });
  
  test('create booking successfully', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', authToken)
      .send({
        hotelId,
        checkIn: '2023-12-01',
        checkOut: '2023-12-05',
        adultCount: 2,
        childCount: 1,
        totalCost: 400
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.hotel).toBe(hotelId);
    expect(res.body.user).toBe(userId);
  });
  
  // Additional tests for other booking endpoints
});
```

## End-to-End Tests

End-to-end (E2E) tests verify complete user flows through the application. The Vacays App uses Playwright for E2E testing.

### Example E2E Test

```typescript
// auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should allow user to register', async ({ page }) => {
    await page.goto('/register');
    
    // Fill in registration form
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'Password123!');
    await page.fill('input[name="confirmPassword"]', 'Password123!');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check if redirected to home page
    await expect(page).toHaveURL('/');
    
    // Check if user is logged in
    await expect(page.locator('text=My Bookings')).toBeVisible();
    await expect(page.locator('text=My Account')).toBeVisible();
  });
  
  test('should allow user to login', async ({ page }) => {
    // Create a test user first (could be done via API directly)
    
    await page.goto('/login');
    
    // Fill in login form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check if redirected to home page
    await expect(page).toHaveURL('/');
    
    // Check if user is logged in
    await expect(page.locator('text=My Bookings')).toBeVisible();
    await expect(page.locator('text=My Account')).toBeVisible();
  });
});
```

### Running E2E Tests

```bash
# In the e2e-tests directory
npm run test

# Run in UI mode
npm run test:ui

# Run specific test
npm run test -- auth.spec.ts

# Run on specific browser
npm run test -- --project=chromium
```

## Test Coverage

The Vacays App aims for high test coverage, with the following targets:

- Unit Tests: >80% coverage
- Integration Tests: >70% coverage
- E2E Tests: All critical user flows covered

### Checking Test Coverage

```bash
# Frontend test coverage
cd frontend
npm run test:coverage

# Backend test coverage
cd backend
npm run test:coverage
```

## Continuous Integration

Tests are automatically run as part of the CI/CD pipeline in GitHub Actions. The workflow includes:

1. Running unit and integration tests for frontend and backend
2. Running E2E tests against a test environment
3. Generating and storing test coverage reports

## Test Data Management

### Test Database

The application uses MongoDB Memory Server for unit and integration tests to create an isolated database for testing.

### Seed Data

For E2E tests, the test environment is seeded with consistent test data.

Example seed script:

```typescript
// seed.ts
import mongoose from 'mongoose';
import User from './models/User';
import Hotel from './models/Hotel';
import Booking from './models/Booking';

const seedDatabase = async () => {
  // Clear existing data
  await User.deleteMany({});
  await Hotel.deleteMany({});
  await Booking.deleteMany({});
  
  // Create test users
  const user1 = await User.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'Password123!'
  });
  
  // Create test hotels
  const hotel1 = await Hotel.create({
    name: 'Beachfront Resort',
    city: 'Miami',
    country: 'USA',
    description: 'Luxury beachfront resort with stunning views.',
    type: 'Resort',
    adultCount: 4,
    childCount: 2,
    facilities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'Beach Access'],
    pricePerNight: 350,
    starRating: 5,
    imageUrls: ['beach1.jpg', 'beach2.jpg', 'beach3.jpg'],
    lastUpdated: new Date()
  });
  
  // Create test bookings
  await Booking.create({
    user: user1._id,
    hotel: hotel1._id,
    checkIn: new Date('2023-12-01'),
    checkOut: new Date('2023-12-05'),
    adultCount: 2,
    childCount: 1,
    totalCost: 1400
  });
  
  console.log('Database seeded successfully');
};

// Run the seed function
seedDatabase()
  .then(() => mongoose.disconnect())
  .catch(error => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
```

## Accessibility Testing

The Vacays App ensures accessibility by following WCAG 2.1 guidelines. Accessibility testing includes:

1. Automated tests using Lighthouse and axe-core
2. Manual testing with screen readers and keyboard navigation

Example accessibility test:

```typescript
// accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('home page should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  
  test('hotel details page should not have accessibility violations', async ({ page }) => {
    // Go to a hotel details page
    await page.goto('/hotel/1');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

## Performance Testing

Performance testing ensures the application performs well under various conditions. Performance testing includes:

1. Load testing using k6 or JMeter
2. Frontend performance testing using Lighthouse
3. API response time testing

Example load test script (k6):

```javascript
// load-test.js
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:7000/api/hotels');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
```

## Test Best Practices

1. **Isolation** - Tests should be independent and not rely on the state from other tests
2. **Readability** - Test names should clearly describe what they're testing
3. **Maintainability** - Tests should be easy to maintain and update
4. **Speed** - Tests should run quickly to encourage frequent testing
5. **Reliability** - Tests should be deterministic and not produce flaky results

## Troubleshooting Common Test Issues

### Common Issues

1. **Flaky Tests** - Tests that pass and fail inconsistently
   - Solution: Add retry logic, improve test isolation, use stable selectors

2. **Slow Tests** - Tests that take too long to run
   - Solution: Mock external dependencies, use test parallelization

3. **Database Connection Issues**
   - Solution: Use MongoDB Memory Server for tests, verify connection strings

4. **Authentication Issues in Tests**
   - Solution: Mock authentication or create test-specific auth tokens 