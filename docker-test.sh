#!/bin/bash

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔍 Testing Docker setup for Hotel Booking Website..."

# Check if Docker is running
echo -n "Checking if Docker is running... "
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    echo "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start containers
echo "Building and starting containers..."
docker-compose up -d --build

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Test MongoDB connection
echo -n "Testing MongoDB connection... "
if docker-compose exec mongodb mongosh --quiet --eval "db.runCommand({ping: 1})" > /dev/null 2>&1; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    echo "MongoDB connection failed."
fi

# Test backend connection
echo -n "Testing backend connection... "
if curl -s http://localhost:7000 > /dev/null 2>&1; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    echo "Backend connection failed."
fi

# Test frontend connection
echo -n "Testing frontend connection... "
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    echo "Frontend connection failed."
fi

echo "Tests completed."

# Uncomment to automatically stop containers after testing
# echo "Stopping containers..."
# docker-compose down

exit 0 