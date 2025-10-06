# ZilRemit Homepage - Deployment Setup

## GitHub Actions CI/CD Pipeline

This repository includes an automated deployment pipeline that deploys to AWS S3 + CloudFront on every push to the main branch.

### Required GitHub Secrets

Add these secrets in your repository settings (Settings → Secrets and variables → Actions):

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS IAM user access key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM user secret key | `wJalrXUtnFEMI/K7MDENG/...` |
| `AWS_REGION` | AWS region for S3 bucket | `us-east-1` |
| `AWS_S3_BUCKET` | S3 bucket name | `zilremit-homepage` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID | `E1234567890ABC` |

### AWS Setup Required

1. **S3 Bucket**: Create a bucket for static website hosting
2. **CloudFront Distribution**: Create distribution pointing to S3 bucket
3. **IAM User**: Create user with S3 and CloudFront permissions

### Deployment Process

1. Push code to `main` or `master` branch
2. GitHub Actions automatically:
   - Installs dependencies with `npm ci`
   - Builds the React app with `npm run build`
   - Deploys files to S3 bucket
   - Configures S3 for static website hosting
   - Invalidates CloudFront cache
3. Your site is live!

### Manual Deployment

You can also deploy manually using the included script:

```bash
export AWS_S3_BUCKET=your-bucket-name
export AWS_CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
./deploy.sh
```

For detailed setup instructions, see `AWS_DEPLOYMENT_SETUP.md`.
