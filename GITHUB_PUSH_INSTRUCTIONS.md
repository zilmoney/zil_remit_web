# How to Push ZilRemit Homepage to GitHub

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Repository name: `zilremit-homepage`
4. Description: `ZilRemit International Payment App Homepage with AWS S3 + CloudFront deployment`
5. Make it **Public**
6. **DO NOT** initialize with README, .gitignore, or license (we already have files)
7. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

Copy the commands from GitHub's "push an existing repository" section, or use these (replace `YOUR_USERNAME`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/zilremit-homepage.git
git branch -M main
git push -u origin main
```

## Step 3: Set Up GitHub Secrets for Deployment

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** and add each of these:

| Secret Name | Value | Notes |
|-------------|-------|-------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key | From IAM user |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret key | From IAM user |
| `AWS_REGION` | `us-east-1` | Or your preferred region |
| `AWS_S3_BUCKET` | `your-bucket-name` | S3 bucket for hosting |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `E1234567890ABC` | CloudFront distribution ID |

## Step 4: Test Deployment

1. Make any small change to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test deployment pipeline"
   git push
   ```
3. Go to **Actions** tab in GitHub to watch the deployment
4. Your site will be live at the CloudFront URL!

## Current Status

✅ **Files Ready**: All deployment files are committed and ready to push  
✅ **Workflow**: GitHub Actions pipeline configured for NPM + React  
✅ **Documentation**: Setup guides and deployment instructions included  

## What's Included in This Push

- `.github/workflows/deploy.yml` - GitHub Actions deployment pipeline
- `DEPLOYMENT_README.md` - Quick deployment setup guide  
- `deploy.sh` - Manual deployment script
- Complete React application with ZilRemit homepage
- Built files ready for deployment

## Next Steps After Push

1. Set up AWS resources (S3 bucket + CloudFront)
2. Add GitHub secrets
3. Push a change to trigger first deployment
4. Your ZilRemit homepage will be live!

---

**Note**: The deployment pipeline will automatically trigger on every push to the `main` branch.
