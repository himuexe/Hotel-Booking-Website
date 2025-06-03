# CI/CD Pipeline Setup Guide

This document explains how to configure the GitHub Actions CI/CD pipeline for the Hotel Booking Website project.

## Overview

The project includes two main workflows:
- **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`) - Handles testing, building, and deployment
- **Security Monitoring** (`.github/workflows/security-monitoring.yml`) - Handles security scans and health checks

## Prerequisites

### 1. Repository Secrets

Configure the following secrets in your GitHub repository:
**Settings > Secrets and variables > Actions > Secrets**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `GITHUB_TOKEN` | Automatically provided by GitHub | (auto-generated) |

### 2. Repository Variables

Configure the following variables in your GitHub repository:
**Settings > Secrets and variables > Actions > Variables**

| Variable Name | Description | Example |
|---------------|-------------|---------|
| `PRODUCTION_URL` | Production deployment URL | `https://hotel-booking.yourdomain.com` |
| `STAGING_URL` | Staging deployment URL | `https://staging.hotel-booking.yourdomain.com` |

## Workflow Features

### CI/CD Pipeline

#### 1. Test & Quality Checks
- **Components**: Tests frontend, backend, and e2e-tests
- **Checks**: Linting, type checking, unit tests, security audit
- **Artifacts**: Frontend build artifacts

#### 2. Security Scanning
- **Tool**: Trivy vulnerability scanner
- **Scope**: Filesystem scan for vulnerabilities
- **Output**: SARIF format uploaded to GitHub Security tab

#### 3. Docker Image Building
- **Registry**: GitHub Container Registry (ghcr.io)
- **Images**: Separate images for frontend and backend
- **Platforms**: linux/amd64, linux/arm64
- **Caching**: GitHub Actions cache for faster builds

#### 4. Deployment
- **Staging**: Triggered on `develop` branch pushes
- **Production**: Triggered on `main` branch pushes
- **Method**: Currently placeholder - ready for actual deployment setup

#### 5. E2E Testing
- **Tool**: Playwright
- **Trigger**: After staging deployment
- **Environment**: Configurable via `BASE_URL`

### Security Monitoring

#### 1. Daily Security Audit
- **Schedule**: Daily at 2 AM UTC
- **Scope**: All npm dependencies
- **Output**: JSON audit results

#### 2. Dependency Updates Check
- **Tool**: npm outdated
- **Scope**: All components
- **Output**: Dependency update report

#### 3. Docker Security Scanning
- **Tool**: Trivy
- **Scope**: Built Docker images
- **Output**: JSON and SARIF formats

#### 4. Performance Monitoring
- **Tool**: vite-bundle-analyzer (when available)
- **Scope**: Frontend bundle analysis
- **Fallback**: Basic bundle size reporting

#### 5. Health Monitoring
- **Frequency**: Daily (production only)
- **Endpoints**: `/health` on configured URLs
- **Requirements**: `PRODUCTION_URL` and `STAGING_URL` variables

## Setup Instructions

### 1. Enable Workflows

1. Fork or clone the repository
2. Workflows are automatically enabled for the repository owner
3. For forks, go to **Actions** tab and enable workflows

### 2. Configure Repository Variables

1. Go to **Settings > Secrets and variables > Actions**
2. Click **Variables** tab
3. Add the following variables:

```bash
# Production URL (when deployed)
PRODUCTION_URL=https://your-production-domain.com

# Staging URL (when deployed)  
STAGING_URL=https://staging.your-domain.com
```

### 3. Container Registry Setup

The workflows automatically use GitHub Container Registry (ghcr.io) with the `GITHUB_TOKEN`. No additional setup required.

### 4. Environment Protection (Optional)

For production deployments, consider setting up environment protection:

1. Go to **Settings > Environments**
2. Create `production` environment
3. Add protection rules:
   - Required reviewers
   - Wait timer
   - Deployment branches (main only)

## Deployment Options

### Docker Compose Deployment

The project includes a deployment script that supports Docker Compose:

```bash
# Deploy to production
./scripts/deploy.sh --type docker-compose --env production

# Deploy to staging
./scripts/deploy.sh --type docker-compose --env staging
```

### Kubernetes Deployment

Basic Kubernetes configurations are provided in the `k8s/` directory:

```bash
# Deploy to Kubernetes
./scripts/deploy.sh --type kubernetes --env production --namespace hotel-booking
```

**Required Kubernetes Secrets:**
```bash
kubectl create secret generic hotel-booking-secrets \
  --from-literal=jwt-secret=your-jwt-secret \
  --from-literal=mongodb-connection-string=your-mongodb-url \
  --namespace=hotel-booking
```

## Monitoring and Alerts

### Security Monitoring

- **Vulnerability Scans**: Daily Trivy scans
- **Dependency Audits**: Daily npm audit
- **SARIF Upload**: Results appear in GitHub Security tab

### Health Monitoring

- **Production Health**: Daily checks when `PRODUCTION_URL` is configured
- **Staging Health**: Daily checks when `STAGING_URL` is configured
- **Endpoints**: Expects `/health` endpoint returning 200 OK

### Performance Monitoring

- **Bundle Analysis**: Frontend bundle size tracking
- **Build Artifacts**: Stored for 7-30 days depending on type

## Troubleshooting

### Common Issues

1. **Missing Bundle Analyzer**
   - Install: `cd frontend && npm install --save-dev vite-bundle-analyzer`
   - The workflow includes fallback bundle size reporting

2. **Health Check Failures**
   - Ensure `/health` endpoint exists and returns 200 OK
   - Verify `PRODUCTION_URL` and `STAGING_URL` variables are correct

3. **Docker Build Failures**
   - Check Dockerfile syntax
   - Verify all dependencies are properly installed
   - Review build logs in Actions tab

4. **Test Failures**
   - Ensure all test scripts exist in package.json
   - Check test dependencies are installed
   - Review test output in Actions tab

### Getting Help

1. Check the **Actions** tab for detailed logs
2. Review the **Security** tab for vulnerability reports
3. Check **Issues** tab for known problems
4. Review this documentation for configuration requirements

## Security Best Practices

1. **Never commit secrets** to the repository
2. **Use environment variables** for all sensitive configuration
3. **Enable branch protection** for main and develop branches
4. **Review security scan results** regularly
5. **Keep dependencies updated** based on security monitoring reports
6. **Use environment protection** for production deployments

## Next Steps

1. Configure repository variables for your deployment URLs
2. Set up actual deployment infrastructure (servers, Kubernetes cluster, etc.)
3. Replace placeholder deployment commands with actual deployment logic
4. Configure monitoring and alerting for production systems
5. Set up proper secret management for production environments 