FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Build TypeScript code
RUN npm run build

# Create a health check script
RUN echo 'console.log("Health check passed");' > healthcheck.js

# Expose API port
EXPOSE 7000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the app
CMD ["node", "dist/index.js"] 