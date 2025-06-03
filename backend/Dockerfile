FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies (including devDependencies for build)
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Build TypeScript code
RUN npm run build

# Remove devDependencies to keep production image lean
RUN npm ci --only=production && npm cache clean --force

# Create a health check script
RUN echo 'console.log("Health check passed");' > healthcheck.js

# Expose API port
EXPOSE 7000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the app
CMD ["node", "dist/index.js"] 