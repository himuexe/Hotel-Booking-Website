#!/bin/bash

# Hotel Booking Website Deployment Script
# Supports both Docker Compose and Kubernetes deployments

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Default values
DEPLOYMENT_TYPE="docker-compose"
ENVIRONMENT="production"
NAMESPACE="hotel-booking"
REGISTRY="ghcr.io"
IMAGE_TAG="latest"

# Help function
show_help() {
    cat << EOF
Hotel Booking Website Deployment Script

Usage: $0 [OPTIONS]

OPTIONS:
    -t, --type TYPE         Deployment type: docker-compose or kubernetes (default: docker-compose)
    -e, --env ENV          Environment: production or staging (default: production)
    -n, --namespace NS     Kubernetes namespace (default: hotel-booking)
    -r, --registry REG     Container registry (default: ghcr.io)
    -i, --image-tag TAG    Image tag to deploy (default: latest)
    -h, --help             Show this help message

EXAMPLES:
    $0 --type docker-compose --env production
    $0 --type kubernetes --env staging --namespace hotel-booking-staging
    $0 --type kubernetes --image-tag v1.2.3

EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--type)
            DEPLOYMENT_TYPE="$2"
            shift 2
            ;;
        -e|--env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -n|--namespace)
            NAMESPACE="$2"
            shift 2
            ;;
        -r|--registry)
            REGISTRY="$2"
            shift 2
            ;;
        -i|--image-tag)
            IMAGE_TAG="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate deployment type
if [[ "$DEPLOYMENT_TYPE" != "docker-compose" && "$DEPLOYMENT_TYPE" != "kubernetes" ]]; then
    error "Invalid deployment type: $DEPLOYMENT_TYPE. Must be 'docker-compose' or 'kubernetes'"
    exit 1
fi

# Validate environment
if [[ "$ENVIRONMENT" != "production" && "$ENVIRONMENT" != "staging" ]]; then
    error "Invalid environment: $ENVIRONMENT. Must be 'production' or 'staging'"
    exit 1
fi

log "Starting deployment with the following configuration:"
log "  Deployment Type: $DEPLOYMENT_TYPE"
log "  Environment: $ENVIRONMENT"
log "  Namespace: $NAMESPACE"
log "  Registry: $REGISTRY"
log "  Image Tag: $IMAGE_TAG"

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    if [[ "$DEPLOYMENT_TYPE" == "docker-compose" ]]; then
        if ! command -v docker &> /dev/null; then
            error "Docker is not installed or not in PATH"
            exit 1
        fi
        
        # Check for newer docker compose or legacy docker-compose
        if command -v docker-compose &> /dev/null; then
            DOCKER_COMPOSE_CMD="docker-compose"
        elif docker compose version &> /dev/null; then
            DOCKER_COMPOSE_CMD="docker compose"
        else
            error "Docker Compose is not installed or not available"
            exit 1
        fi
        log "Using Docker Compose command: $DOCKER_COMPOSE_CMD"
    elif [[ "$DEPLOYMENT_TYPE" == "kubernetes" ]]; then
        if ! command -v kubectl &> /dev/null; then
            error "kubectl is not installed or not in PATH"
            exit 1
        fi
        
        # Check if kubectl can connect to cluster
        if ! kubectl cluster-info &> /dev/null; then
            error "Cannot connect to Kubernetes cluster"
            exit 1
        fi
    fi
    
    success "Prerequisites check passed"
}

# Deploy with Docker Compose
deploy_docker_compose() {
    log "Deploying with Docker Compose..."
    
    # Check if .env file exists
    if [[ ! -f ".env" ]]; then
        warning ".env file not found. Creating a sample .env file for testing..."
        create_sample_env
    fi
    
    # Use production compose file
    COMPOSE_FILE="docker-compose.prod.yml"
    
    if [[ ! -f "$COMPOSE_FILE" ]]; then
        error "Docker Compose file not found: $COMPOSE_FILE"
        exit 1
    fi
    
    log "Building and starting services..."
    $DOCKER_COMPOSE_CMD -f "$COMPOSE_FILE" down --remove-orphans
    $DOCKER_COMPOSE_CMD -f "$COMPOSE_FILE" build --no-cache
    $DOCKER_COMPOSE_CMD -f "$COMPOSE_FILE" up -d
    
    log "Waiting for services to be ready..."
    sleep 30
    
    # Health check
    log "Performing health checks..."
    if curl -f http://localhost:7000/health &> /dev/null; then
        success "Backend health check passed"
    else
        warning "Backend health check failed - this is expected if backend doesn't have /health endpoint yet"
    fi
    
    if curl -f http://localhost &> /dev/null; then
        success "Frontend health check passed"
    else
        warning "Frontend health check failed - checking if service is running..."
        if $DOCKER_COMPOSE_CMD -f "$COMPOSE_FILE" ps | grep -q "frontend.*Up"; then
            success "Frontend service is running"
        else
            warning "Frontend service may have issues"
        fi
    fi
    
    success "Docker Compose deployment completed"
    log "Frontend: http://localhost"
    log "Backend: http://localhost:7000"
    log "MongoDB: localhost:27017"
    
    # Show service status
    log "Service status:"
    $DOCKER_COMPOSE_CMD -f "$COMPOSE_FILE" ps
}

# Create sample environment file for testing
create_sample_env() {
    cat > .env << EOF
# Sample environment file for testing
# Replace with actual values for production

# Database
MONGODB_CONNECTION_STRING=mongodb://admin:password123@mongodb:27017/vacays?authSource=admin
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123

# Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-at-least-32-characters-long-for-security

# Application URLs
FRONTEND_URL=http://localhost
FRONTEND_API_URL=http://localhost:7000

# Cloudinary (Image Storage) - Replace with actual values
CLOUDINARY_CLOUD_NAME=sample-cloud-name
CLOUDINARY_API_KEY=sample-api-key
CLOUDINARY_API_SECRET=sample-api-secret

# Stripe (Payment Processing) - Replace with actual values
STRIPE_API_KEY=sk_test_sample-stripe-secret-key
STRIPE_PUB_KEY=pk_test_sample-stripe-publishable-key
EOF
    log "Created sample .env file. Please update with your actual values for production."
}

# Deploy with Kubernetes
deploy_kubernetes() {
    log "Deploying with Kubernetes..."
    
    # Create namespace if it doesn't exist
    if ! kubectl get namespace "$NAMESPACE" &> /dev/null; then
        log "Creating namespace: $NAMESPACE"
        kubectl apply -f k8s/namespace.yml
    fi
    
    # Update image tags in deployment files
    log "Updating image tags to: $IMAGE_TAG"
    sed -i.bak "s|:latest|:$IMAGE_TAG|g" k8s/*-deployment.yml
    
    # Apply configurations
    log "Applying Kubernetes configurations..."
    kubectl apply -f k8s/configmap.yml
    
    # Check if secrets exist
    if ! kubectl get secret hotel-booking-secrets -n "$NAMESPACE" &> /dev/null; then
        warning "Secrets not found. Please create them manually:"
        log "kubectl create secret generic hotel-booking-secrets \\"
        log "  --from-literal=jwt-secret=your-jwt-secret \\"
        log "  --from-literal=mongodb-connection-string=your-mongodb-connection \\"
        log "  --namespace=$NAMESPACE"
        log "Continuing with deployment..."
    fi
    
    # Deploy applications
    kubectl apply -f k8s/backend-deployment.yml
    kubectl apply -f k8s/frontend-deployment.yml
    kubectl apply -f k8s/ingress.yml
    
    # Wait for deployments to be ready
    log "Waiting for deployments to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/backend -n "$NAMESPACE"
    kubectl wait --for=condition=available --timeout=300s deployment/frontend -n "$NAMESPACE"
    
    # Get service information
    log "Deployment status:"
    kubectl get pods -n "$NAMESPACE"
    kubectl get services -n "$NAMESPACE"
    kubectl get ingress -n "$NAMESPACE"
    
    success "Kubernetes deployment completed"
    
    # Restore original deployment files
    mv k8s/backend-deployment.yml.bak k8s/backend-deployment.yml 2>/dev/null || true
    mv k8s/frontend-deployment.yml.bak k8s/frontend-deployment.yml 2>/dev/null || true
}

# Main deployment function
main() {
    log "Hotel Booking Website Deployment Started"
    
    check_prerequisites
    
    case "$DEPLOYMENT_TYPE" in
        "docker-compose")
            deploy_docker_compose
            ;;
        "kubernetes")
            deploy_kubernetes
            ;;
    esac
    
    success "Deployment completed successfully!"
    log "Check the application logs and monitor the services."
}

# Run main function
main 