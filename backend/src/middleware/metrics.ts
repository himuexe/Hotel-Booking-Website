import { Request, Response, NextFunction } from 'express';
import { httpRequestsTotal, httpRequestDuration, activeConnections } from '../metrics';

// Track active connections
let currentConnections = 0;

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Increment active connections
  currentConnections++;
  activeConnections.set(currentConnections);

  // Start timer for request duration
  const startTime = Date.now();

  // Get route pattern for better grouping
  const route = req.route?.path || req.path;
  const method = req.method;

  // Override res.end to capture metrics when response is sent
  const originalEnd = res.end.bind(res);
  
  res.end = function(chunk?: any, encoding?: BufferEncoding | (() => void), cb?: () => void): Response {
    // Calculate duration
    const duration = (Date.now() - startTime) / 1000;
    const statusCode = res.statusCode.toString();

    // Record metrics
    httpRequestsTotal.inc({ method, route, status_code: statusCode });
    httpRequestDuration.observe({ method, route, status_code: statusCode }, duration);

    // Decrement active connections
    currentConnections--;
    activeConnections.set(currentConnections);

    // Call original end method with proper arguments
    if (typeof encoding === 'function') {
      return originalEnd(chunk, encoding);
    } else if (encoding !== undefined) {
      return originalEnd(chunk, encoding, cb);
    } else {
      return originalEnd(chunk, cb);
    }
  };

  next();
}; 