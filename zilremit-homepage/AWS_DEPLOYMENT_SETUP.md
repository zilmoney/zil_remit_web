# AWS S3 + CloudFront Deployment Setup Guide

This guide will help you set up automatic deployment of your ZilRemit homepage to AWS S3 with CloudFront CDN using GitHub Actions.

## Prerequisites

- AWS Account with appropriate permissions
- GitHub repository for your ZilRemit homepage
- Basic understanding of AWS S3 and CloudFront

## Step 1: AWS Setup

### 1.1 Create S3 Bucket

```bash
# Replace 'your-zilremit-bucket' with your desired bucket name
aws s3 mb s3://your-zilremit-bucket --region us-east-1
```

Or via AWS Console:
1. Go to AWS S3 Console
2. Click "Create bucket"
3. Enter bucket name (e.g., `zilremit-homepage-prod`)
4. Choose region (recommend `us-east-1` for CloudFront)
5. Uncheck "Block all public access" (we'll set specific permissions)
6. Create bucket

### 1.2 Create CloudFront Distribution

Via AWS Console:
1. Go to CloudFront Console
2. Click "Create Distribution"
3. **Origin Settings:**
   - Origin Domain: `your-bucket-name.s3-website-region.amazonaws.com`
   - Protocol: HTTP only (for S3 website endpoint)
4. **Default Cache Behavior:**
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD, OPTIONS
   - Cache Policy: Managed-CachingOptimized
5. **Settings:**
   - Price Class: Use all edge locations (or choose based on your needs)
   - Default Root Object: `index.html`
6. Create Distribution
7. **Note the Distribution ID** - you'll need this for GitHub secrets

### 1.3 Create IAM User for GitHub Actions

1. Go to IAM Console → Users → Create User
2. User name: `github-actions-zilremit`
3. Attach policies directly:
   - Create custom policy with the following JSON:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket",
                "s3:PutBucketPolicy",
                "s3:PutBucketWebsite"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetDistribution"
            ],
            "Resource": "*"
        }
    ]
}
```

4. Create Access Key for this user
5. **Save the Access Key ID and Secret Access Key** - you'll need these for GitHub secrets

## Step 2: GitHub Repository Setup

### 2.1 Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `AWS_ACCESS_KEY_ID` | Your IAM user access key ID | AWS credentials |
| `AWS_SECRET_ACCESS_KEY` | Your IAM user secret access key | AWS credentials |
| `AWS_REGION` | `us-east-1` (or your chosen region) | AWS region |
| `AWS_S3_BUCKET` | `your-bucket-name` | S3 bucket name |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `E1234567890ABC` | CloudFront distribution ID |

### 2.2 Choose Your Workflow

The repository includes two workflow files:

1. **`deploy.yml`** - For NPM-based projects
2. **`deploy-pnpm.yml`** - For PNPM-based projects (recommended for this project)

**Delete the one you don't need** to avoid conflicts.

### 2.3 Update Package.json Scripts

Ensure your `package.json` has the build script:

```json
{
  "scripts": {
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## Step 3: Deployment Process

### 3.1 How It Works

1. **Trigger**: Push to `main` or `master` branch
2. **Build**: Install dependencies and build the React app
3. **Deploy**: Sync built files to S3 bucket
4. **Configure**: Set S3 bucket for static website hosting
5. **Invalidate**: Clear CloudFront cache for immediate updates
6. **Report**: Display deployment URLs

### 3.2 First Deployment

1. Commit and push your changes:
```bash
git add .
git commit -m "Add GitHub Actions deployment pipeline"
git push origin main
```

2. Go to GitHub → Actions tab to monitor the deployment
3. Once complete, your site will be available at:
   - S3 URL: `http://your-bucket-name.s3-website-region.amazonaws.com`
   - CloudFront URL: `https://your-distribution-domain.cloudfront.net`

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain to CloudFront

1. Go to CloudFront Console → Your Distribution → Edit
2. **Alternate Domain Names (CNAMEs)**: Add your domain (e.g., `zilremit.com`)
3. **SSL Certificate**: Request or import SSL certificate via AWS Certificate Manager
4. Save changes

### 4.2 Update DNS

Add CNAME record in your DNS provider:
- **Type**: CNAME
- **Name**: `www` (or `@` for root domain)
- **Value**: Your CloudFront distribution domain

## Step 5: Monitoring and Troubleshooting

### 5.1 GitHub Actions Logs

- Go to GitHub → Actions → Select workflow run
- Click on job steps to see detailed logs
- Common issues: AWS permissions, bucket names, region mismatches

### 5.2 AWS CloudWatch

- Monitor CloudFront metrics and S3 access logs
- Set up alarms for error rates or unusual traffic

### 5.3 Common Issues

**Build Fails:**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check for TypeScript/ESLint errors

**Deployment Fails:**
- Verify AWS credentials and permissions
- Check S3 bucket name and region
- Ensure CloudFront distribution ID is correct

**Site Not Loading:**
- Check S3 bucket policy and website configuration
- Verify CloudFront distribution settings
- Check for CORS issues

## Step 6: Advanced Configuration

### 6.1 Environment-Specific Deployments

Create separate workflows for staging and production:

```yaml
# .github/workflows/deploy-staging.yml
on:
  push:
    branches: [ develop ]
env:
  S3_BUCKET: ${{ secrets.AWS_S3_BUCKET_STAGING }}
  CLOUDFRONT_DISTRIBUTION_ID: ${{ secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID_STAGING }}
```

### 6.2 Performance Optimizations

Add to your workflow:

```yaml
- name: Optimize images
  run: |
    npm install -g imagemin-cli imagemin-webp
    imagemin dist/**/*.{jpg,png} --out-dir=dist --plugin=webp

- name: Compress assets
  run: |
    find dist -name "*.js" -o -name "*.css" -o -name "*.html" | xargs gzip -k
```

### 6.3 Security Headers

Add CloudFront response headers policy:

```json
{
  "SecurityHeadersPolicy": {
    "StrictTransportSecurity": {
      "AccessControlMaxAgeSec": 31536000,
      "IncludeSubdomains": true
    },
    "ContentTypeOptions": {
      "Override": true
    },
    "FrameOptions": {
      "FrameOption": "DENY",
      "Override": true
    },
    "ReferrerPolicy": {
      "ReferrerPolicy": "strict-origin-when-cross-origin",
      "Override": true
    }
  }
}
```

## Cost Optimization

### S3 Costs
- Use S3 Intelligent Tiering for automatic cost optimization
- Enable S3 Transfer Acceleration only if needed

### CloudFront Costs
- Choose appropriate price class based on your audience
- Monitor usage and adjust caching policies

### Estimated Monthly Costs (Low Traffic)
- S3: $1-5/month
- CloudFront: $1-10/month
- Total: $2-15/month for a typical business website

## Security Best Practices

1. **Least Privilege**: IAM user has minimal required permissions
2. **Secrets Management**: All sensitive data in GitHub secrets
3. **HTTPS Only**: CloudFront redirects HTTP to HTTPS
4. **Regular Updates**: Keep dependencies updated
5. **Monitoring**: Set up CloudWatch alarms for unusual activity

## Support and Maintenance

### Regular Tasks
- Monitor GitHub Actions for failed deployments
- Update dependencies monthly
- Review AWS costs and usage
- Check CloudFront cache hit ratios

### Backup Strategy
- S3 versioning is enabled by default
- GitHub repository serves as source backup
- Consider cross-region replication for critical sites

---

## Quick Start Checklist

- [ ] Create S3 bucket
- [ ] Create CloudFront distribution
- [ ] Create IAM user with appropriate permissions
- [ ] Add GitHub secrets
- [ ] Choose and configure workflow file
- [ ] Push to trigger first deployment
- [ ] Verify site is accessible
- [ ] (Optional) Configure custom domain
- [ ] Set up monitoring and alerts

Your ZilRemit homepage will now automatically deploy to AWS whenever you push changes to your main branch!
