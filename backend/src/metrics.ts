import { register, collectDefaultMetrics, Counter, Histogram, Gauge } from 'prom-client';
import Hotel from './models/hotel';

// Collect default metrics (CPU, memory, etc.)
collectDefaultMetrics({ register });

// Custom application metrics
export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register]
});

export const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register]
});

// Hotel-specific metrics
export const hotelsTotal = new Gauge({
  name: 'hotels_total',
  help: 'Total number of hotels in the system',
  registers: [register]
});

export const bookingsTotal = new Counter({
  name: 'bookings_total',
  help: 'Total number of bookings created',
  labelNames: ['status'],
  registers: [register]
});

export const bookingValue = new Histogram({
  name: 'booking_value_dollars',
  help: 'Value of bookings in dollars',
  buckets: [50, 100, 200, 500, 1000, 2000, 5000],
  registers: [register]
});

// Authentication metrics
export const authAttempts = new Counter({
  name: 'auth_attempts_total',
  help: 'Total number of authentication attempts',
  labelNames: ['type', 'status'],
  registers: [register]
});

// Database metrics
export const dbOperations = new Counter({
  name: 'db_operations_total',
  help: 'Total number of database operations',
  labelNames: ['operation', 'collection', 'status'],
  registers: [register]
});

export const dbOperationDuration = new Histogram({
  name: 'db_operation_duration_seconds',
  help: 'Duration of database operations in seconds',
  labelNames: ['operation', 'collection'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2],
  registers: [register]
});

// Utility function to update hotel count
export const updateHotelCount = async () => {
  try {
    const count = await Hotel.countDocuments();
    hotelsTotal.set(count);
  } catch (error) {
    console.error('Error updating hotel count metric:', error);
  }
};

// Update hotel count every 5 minutes
setInterval(updateHotelCount, 5 * 60 * 1000);

// Initial update
updateHotelCount();

export { register }; 