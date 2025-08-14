# Vercel Deployment Guide - Sriram Portfolio

This guide provides step-by-step instructions for deploying the Sriram Portfolio project to Vercel, including configuration, optimization, and troubleshooting.

## 🚀 Prerequisites

Before deploying, ensure you have:

- **GitHub Account:** For repository hosting
- **Vercel Account:** [Sign up at vercel.com](https://vercel.com/signup)
- **Node.js:** Version 18.17 or later
- **Git:** For version control

## 📋 Pre-Deployment Checklist

### 1. Repository Preparation

Ensure your repository is properly structured:

```bash
# Check if all files are committed
git status

# Ensure you're on the main branch
git branch

# Verify package.json exists and is valid
cat package.json
```

### 2. Environment Variables

Create a `.env.local` file for local development (optional):

```env
# GitHub API Configuration (if needed)
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Note:** For Vercel deployment, you'll add these in the Vercel dashboard.

## 🔧 Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Connect GitHub Repository

1. **Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Repository:**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `sriram-portfolio` repository
   - Click "Import"

#### Step 2: Configure Project Settings

1. **Project Configuration:**
   ```
   Project Name: sriram-portfolio (or your preferred name)
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

2. **Environment Variables (if needed):**
   - Go to "Environment Variables" tab
   - Add any required variables:
     ```
     GITHUB_USERNAME=your-github-username
     GITHUB_TOKEN=your-github-token
     ```

#### Step 3: Deploy

1. **Click "Deploy":**
   - Vercel will automatically detect Next.js configuration
   - Build process will start automatically

2. **Monitor Deployment:**
   - Watch the build logs for any errors
   - Deployment typically takes 2-5 minutes

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login
```

#### Step 2: Deploy from Local Directory

```bash
# Navigate to project directory
cd sriram-portfolio

# Deploy to Vercel
vercel

# Follow the interactive prompts:
# - Set up and deploy? Y
# - Which scope? [your-account]
# - Link to existing project? N
# - Project name: sriram-portfolio
# - Directory: ./
```

#### Step 3: Production Deployment

```bash
# Deploy to production
vercel --prod
```

## ⚙️ Configuration Files

### 1. `vercel.json` (Optional)

Create a `vercel.json` file in your project root for custom configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 2. `next.config.js` Optimization

Ensure your Next.js configuration is optimized for Vercel:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

## 🔍 Post-Deployment Verification

### 1. Check Deployment Status

1. **Visit your deployment URL:**
   - Format: `https://your-project.vercel.app`
   - Check if the site loads correctly

2. **Verify Features:**
   - Desktop icons and hover effects
   - Terminal functionality
   - Firefox browser simulation
   - GitHub integration
   - Responsive design

### 2. Performance Testing

Use these tools to verify performance:

- **Lighthouse:** Built into Chrome DevTools
- **PageSpeed Insights:** [pagespeed.web.dev](https://pagespeed.web.dev)
- **WebPageTest:** [webpagetest.org](https://webpagetest.org)

### 3. Cross-Browser Testing

Test on multiple browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## 🚀 Performance Optimization

### 1. Image Optimization

```javascript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/assets/wallpaper/kali-ferrofluid.jpg"
  alt="Desktop Wallpaper"
  width={1920}
  height={1080}
  priority={true}
  quality={85}
/>
```

### 2. Code Splitting

```javascript
// Dynamic imports for better performance
import dynamic from 'next/dynamic';

const Firefox = dynamic(() => import('./Firefox'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
```

### 3. Caching Strategy

```javascript
// Implement caching for GitHub API calls
const cacheKey = `github-repos-${username}`;
const cachedData = localStorage.getItem(cacheKey);

if (cachedData && Date.now() - timestamp < cacheExpiry) {
  return JSON.parse(cachedData);
}
```

## 🔧 Custom Domain Setup

### 1. Add Custom Domain

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain

2. **DNS Configuration:**
   - Add CNAME record pointing to your Vercel deployment
   - Wait for DNS propagation (up to 48 hours)

### 2. SSL Certificate

- Vercel automatically provides SSL certificates
- HTTPS is enabled by default
- No additional configuration needed

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Build Failures

**Error:** `Module not found`
```bash
# Solution: Check dependencies
npm install
npm run build
```

**Error:** `TypeScript errors`
```bash
# Solution: Fix TypeScript issues
npm run type-check
```

#### 2. Runtime Errors

**Error:** `GitHub API rate limiting`
```bash
# Solution: Add GitHub token to environment variables
GITHUB_TOKEN=your-personal-access-token
```

**Error:** `Image loading issues`
```bash
# Solution: Check image paths and domains
# Update next.config.js with correct domains
```

#### 3. Performance Issues

**Slow loading:**
- Optimize images
- Implement lazy loading
- Use code splitting
- Enable compression

**Large bundle size:**
- Analyze with `npm run analyze`
- Remove unused dependencies
- Implement tree shaking

### Debug Commands

```bash
# Local build test
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Development server
npm run dev
```

## 📊 Monitoring and Analytics

### 1. Vercel Analytics

Enable Vercel Analytics in your project:

1. **In Vercel Dashboard:**
   - Go to project settings
   - Enable "Analytics"
   - Add tracking code to your app

### 2. Performance Monitoring

```javascript
// Add performance monitoring
export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics service
}
```

### 3. Error Tracking

Consider adding error tracking:

```javascript
// Example with Sentry
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV,
});
```

## 🔄 Continuous Deployment

### 1. Automatic Deployments

Vercel automatically deploys on:
- Push to main branch
- Pull request creation
- Manual deployment trigger

### 2. Preview Deployments

- Every PR gets a preview deployment
- Share preview URLs for testing
- Automatic cleanup after PR merge

### 3. Rollback Strategy

```bash
# Rollback to previous deployment
vercel rollback

# Or use Vercel dashboard
# Go to Deployments → Select version → Promote
```

## 📚 Additional Resources

### Vercel Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Deployment Best Practices](https://vercel.com/docs/concepts/deployments)

### Performance Resources

- [Web Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Security Resources

- [Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

---

This guide covers the complete deployment process for the Sriram Portfolio project on Vercel. For additional support, refer to the [Vercel documentation](https://vercel.com/docs) or create an issue in the project repository.
