# 🔧 GitHub Actions Troubleshooting Guide

> **Quick fixes for common GitHub Actions issues in the Vacays project**

## 🚨 CodeQL/SARIF Upload Error

### Problem
```
Error: Resource not accessible by integration - https://docs.github.com/rest
Warning: Resource not accessible by integration
```

### Root Cause
The `github/codeql-action/upload-sarif@v3` action requires specific permissions to upload security scan results to GitHub's Code Scanning feature.

### ✅ Solution Applied

**1. Added Required Permissions**
```yaml
permissions:
  contents: read
  security-events: write  # Required for SARIF uploads
  actions: read
```

**2. Enhanced Error Handling**
- Added `continue-on-error: true` to prevent workflow failure
- Added fallback artifact upload for scan results
- Added category labels for better organization

**3. Improved Security Scanning**
- Separate JSON and SARIF outputs
- Better error handling and reporting
- Artifact backup for all scan results

### 🔍 How to Verify the Fix

1. **Check Workflow Permissions**
   ```bash
   # Your workflows now have proper permissions
   cat .github/workflows/ci-cd.yml | grep -A 5 "permissions:"
   ```

2. **Enable Code Scanning (if needed)**
   - Go to your GitHub repository
   - Navigate to **Settings** → **Code security and analysis**
   - Enable **Code scanning** if not already enabled

3. **Test the Workflow**
   ```bash
   git add .
   git commit -m "Fix: Add security-events permissions for CodeQL"
   git push origin main
   ```

### 📊 Expected Results

After the fix:
- ✅ Security scans run without permission errors
- ✅ SARIF results upload to GitHub Security tab
- ✅ Fallback artifacts available if upload fails
- ✅ Workflow continues even if SARIF upload fails

---

## 🛠️ Other Common GitHub Actions Issues

### Issue: Docker Registry 403 Forbidden

**Problem**: Docker push fails with permission error
```
ERROR: failed to push ghcr.io/username/repo:tag: unexpected status from POST request: 403 Forbidden
```

**Root Cause**: Missing `packages: write` permission for GitHub Container Registry

**✅ Solution**:
```yaml
permissions:
  contents: read
  packages: write  # Required for pushing to GHCR
  security-events: write

jobs:
  build:
    permissions:
      contents: read
      packages: write  # Also add to specific job
```

**Additional Steps**:
1. **Enable Package Registry** (if needed):
   - Go to repository **Settings** → **Actions** → **General**
   - Under "Workflow permissions", ensure "Read and write permissions" is selected

2. **Verify Registry URL**:
   ```yaml
   env:
     REGISTRY: ghcr.io
     IMAGE_NAME: ${{ github.repository }}  # Should be lowercase
   ```

3. **Check Repository Visibility**:
   - Private repos: Ensure GITHUB_TOKEN has package permissions
   - Public repos: May need to enable package inheritance

4. **Alternative: Use Docker Hub** (if GHCR issues persist):
   ```yaml
   env:
     REGISTRY: docker.io
     IMAGE_NAME: your-dockerhub-username/hotel-booking-website
   
   - name: Log in to Docker Hub
     uses: docker/login-action@v3
     with:
       username: ${{ secrets.DOCKERHUB_USERNAME }}
       password: ${{ secrets.DOCKERHUB_TOKEN }}
   ```

5. **Test Registry Access**:
   ```bash
   # Test locally with GitHub token
   echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin
   ```

### Issue: Docker Build Failures

**Problem**: Docker builds fail with context errors
```yaml
# Fix: Ensure correct build context
- name: Build Docker image
  run: |
    docker build -t myapp:latest ./frontend  # Correct context
```

### Issue: Node.js Cache Misses

**Problem**: Dependencies reinstall every time
```yaml
# Fix: Proper cache configuration
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
    cache-dependency-path: frontend/package-lock.json  # Specific path
```

### Issue: Artifact Upload Failures

**Problem**: Artifacts not found or too large
```yaml
# Fix: Check paths and add retention
- name: Upload artifacts
  uses: actions/upload-artifact@v4
  with:
    name: build-results
    path: |
      dist/
      build/
    retention-days: 7  # Manage storage
    if-no-files-found: warn  # Don't fail if missing
```

---

## 🔐 Security Best Practices

### 1. Minimal Permissions
```yaml
permissions:
  contents: read          # Read repository contents
  security-events: write  # Upload security scan results
  actions: read          # Read workflow information
  # Don't add unnecessary permissions
```

### 2. Secret Management
```yaml
env:
  # Use secrets for sensitive data
  API_KEY: ${{ secrets.API_KEY }}
  # Never hardcode secrets in workflows
```

### 3. Error Handling
```yaml
- name: Security scan
  run: npm audit
  continue-on-error: true  # Don't fail entire workflow
```

---

## 📞 Getting Help

### 🔍 Debugging Steps

1. **Check Workflow Logs**
   - Go to **Actions** tab in your repository
   - Click on the failed workflow run
   - Expand the failing step to see detailed logs

2. **Verify Permissions**
   ```bash
   # Check if your repository has required features enabled
   # Settings → Code security and analysis
   ```

3. **Test Locally**
   ```bash
   # Test Docker builds locally
   docker build -t test ./frontend
   
   # Test security scans locally
   npx audit-ci --moderate
   ```

### 📚 Resources

- [GitHub Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
- [Code Scanning Setup](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/setting-up-code-scanning-for-a-repository)
- [SARIF Upload Documentation](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/uploading-a-sarif-file-to-github)

---

## ✅ Verification Checklist

After applying fixes:

- [ ] Workflow runs without permission errors
- [ ] Security scan results appear in **Security** tab
- [ ] Artifacts are uploaded successfully
- [ ] Build processes complete without failures
- [ ] No sensitive data exposed in logs

---

<div align="center">

**🔧 Issue Fixed!** Your GitHub Actions should now work properly.

[🔝 Back to Documentation](README.md) | [🐛 Report New Issue](https://github.com/himuexe/Hotel-Booking-Website/issues)

</div> 