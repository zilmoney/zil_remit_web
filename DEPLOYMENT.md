# ZilRemit Homepage Deployment Guide

This guide provides step-by-step instructions for deploying the ZilRemit homepage to GitHub Pages and other platforms.

## GitHub Pages Deployment

### Method 1: Manual Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Create GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `zilremit-homepage` or your preferred name
   - Make it public for GitHub Pages to work

3. **Upload Files**
   - Upload all project files to the repository
   - Ensure the `dist` folder is included (contains built files)

4. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` or `master`
   - Folder: `/dist`
   - Save the settings

5. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/zilremit-homepage`

### Method 2: GitHub Actions (Automated)

1. **Create Workflow File**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Push to Repository**
   - The workflow will automatically build and deploy on every push to main

## Alternative Deployment Options

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite project
3. Deploy with default settings

### Netlify
1. **Drag and Drop**: Build locally and drag the `dist` folder to Netlify
2. **Git Integration**: Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### Custom Server
1. Build the project: `npm run build`
2. Upload the `dist` folder contents to your web server
3. Configure your server to serve the files

## Environment Variables

If you need to add environment variables for production:

1. Create `.env.production` file:
   ```
   VITE_API_URL=https://api.zilremit.com
   VITE_EXCHANGE_RATE_API=https://api.exchangerate.com
   ```

2. Update your build process to use these variables

## Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public` folder with your domain:
   ```
   zilremit.com
   ```

2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `yourusername.github.io`

3. Enable HTTPS in GitHub Pages settings

## Performance Optimization

Before deployment, consider these optimizations:

1. **Image Optimization**
   - Compress images using tools like TinyPNG
   - Use WebP format for better compression

2. **Bundle Analysis**
   ```bash
   npm run build -- --analyze
   ```

3. **Caching Headers**
   Configure your server to cache static assets:
   ```
   Cache-Control: public, max-age=31536000
   ```

## Troubleshooting

### Common Issues

1. **404 Errors on Refresh**
   - Add a `_redirects` file to `public` folder:
     ```
     /*    /index.html   200
     ```

2. **Assets Not Loading**
   - Check the base URL in `vite.config.js`
   - For GitHub Pages, set: `base: '/repository-name/'`

3. **Build Failures**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

### GitHub Pages Specific

1. **Repository Settings**
   - Ensure repository is public (for free GitHub accounts)
   - Check Pages settings are correctly configured

2. **Branch Issues**
   - Make sure you're deploying from the correct branch
   - Verify the folder path is correct (`/dist` or `/`)

## Monitoring

After deployment, monitor your site:

1. **Google Analytics**: Add tracking code to index.html
2. **Performance**: Use Lighthouse for regular audits
3. **Uptime**: Set up monitoring with services like UptimeRobot

## Security

For production deployment:

1. **HTTPS**: Always use HTTPS (GitHub Pages provides this automatically)
2. **Content Security Policy**: Add CSP headers if using a custom server
3. **Regular Updates**: Keep dependencies updated for security patches

---

For additional help, refer to the platform-specific documentation:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
