import { Request, Response, NextFunction } from "express";

// Simple in-memory cache
const cache = new Map<string, { data: any; expiry: number }>();

// Default cache duration: 5 minutes
const DEFAULT_CACHE_DURATION = 5 * 60 * 1000;

export interface CacheOptions {
  duration?: number; // Cache duration in milliseconds
  key?: string | ((req: Request) => string); // Custom cache key or function to generate it
}

/**
 * Middleware for caching API responses
 * @param options Cache options
 */
export const cacheMiddleware = (options: CacheOptions = {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Skip caching for non-GET requests
    if (req.method !== "GET") {
      return next();
    }

    // Calculate cache key
    const cacheKey = typeof options.key === "function"
      ? options.key(req)
      : options.key || `${req.originalUrl || req.url}`;

    // Check if we have a cached response
    const cachedItem = cache.get(cacheKey);
    
    if (cachedItem && cachedItem.expiry > Date.now()) {
      // Return cached response
      return res.json(cachedItem.data);
    }

    // Store the original res.json method
    const originalJson = res.json;
    
    // Override res.json method to cache the response
    res.json = function(body) {
      // Cache the response
      const duration = options.duration || DEFAULT_CACHE_DURATION;
      cache.set(cacheKey, {
        data: body,
        expiry: Date.now() + duration,
      });
      
      // Restore the original json method
      res.json = originalJson;
      
      // Call the original json method
      return originalJson.call(this, body);
    };

    next();
  };
};

/**
 * Clear the entire cache or a specific key
 * @param key Optional specific cache key to clear
 */
export const clearCache = (key?: string) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};

/**
 * Get cache stats
 * @returns Object containing cache size and memory usage estimate
 */
export const getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}; 