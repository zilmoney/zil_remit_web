#!/bin/bash

# ZilRemit Homepage Deployment Script
# This script builds and deploys the homepage to AWS S3 and invalidates CloudFront

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration (set these environment variables or modify here)
S3_BUCKET=${AWS_S3_BUCKET:-""}
CLOUDFRONT_DISTRIBUTION_ID=${AWS_CLOUDFRONT_DISTRIBUTION_ID:-""}
AWS_REGION=${AWS_REGION:-"us-east-1"}

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists aws; then
        print_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install it first."
        exit 1
    fi
    
    if ! command_exists npm && ! command_exists pnpm; then
        print_error "Neither npm nor pnpm is installed. Please install one of them."
        exit 1
    fi
    
    if [ -z "$S3_BUCKET" ]; then
        print_error "S3_BUCKET environment variable is not set."
        print_status "Set it with: export AWS_S3_BUCKET=your-bucket-name"
        exit 1
    fi
    
    if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        print_warning "CLOUDFRONT_DISTRIBUTION_ID is not set. CloudFront invalidation will be skipped."
    fi
    
    print_success "Prerequisites check passed!"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if command_exists pnpm && [ -f "pnpm-lock.yaml" ]; then
        print_status "Using pnpm..."
        pnpm install --frozen-lockfile
    elif [ -f "package-lock.json" ]; then
        print_status "Using npm..."
        npm ci
    else
        print_status "Using npm..."
        npm install
    fi
    
    print_success "Dependencies installed!"
}

# Function to build the application
build_application() {
    print_status "Building application..."
    
    if command_exists pnpm && [ -f "pnpm-lock.yaml" ]; then
        pnpm run build
    else
        npm run build
    fi
    
    if [ ! -d "dist" ]; then
        print_error "Build failed! dist directory not found."
        exit 1
    fi
    
    print_success "Application built successfully!"
}

# Function to deploy to S3
deploy_to_s3() {
    print_status "Deploying to S3 bucket: $S3_BUCKET"
    
    # Sync files to S3
    aws s3 sync ./dist s3://$S3_BUCKET --delete --exact-timestamps
    
    # Configure bucket for static website hosting
    print_status "Configuring S3 bucket for static website hosting..."
    aws s3 website s3://$S3_BUCKET --index-document index.html --error-document index.html
    
    # Set bucket policy for public read access
    print_status "Setting bucket policy for public access..."
    aws s3api put-bucket-policy --bucket $S3_BUCKET --policy '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::'$S3_BUCKET'/*"
            }
        ]
    }'
    
    print_success "Deployed to S3 successfully!"
    print_status "S3 Website URL: http://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com"
}

# Function to invalidate CloudFront
invalidate_cloudfront() {
    if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        print_status "Invalidating CloudFront distribution: $CLOUDFRONT_DISTRIBUTION_ID"
        
        INVALIDATION_ID=$(aws cloudfront create-invalidation \
            --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
            --paths "/*" \
            --query 'Invalidation.Id' \
            --output text)
        
        print_success "CloudFront invalidation created: $INVALIDATION_ID"
        
        # Get CloudFront domain name
        CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
            --id $CLOUDFRONT_DISTRIBUTION_ID \
            --query 'Distribution.DomainName' \
            --output text)
        
        print_status "CloudFront URL: https://$CLOUDFRONT_DOMAIN"
        print_status "Note: CloudFront invalidation may take 5-15 minutes to complete."
    else
        print_warning "CloudFront distribution ID not provided. Skipping invalidation."
    fi
}

# Function to run deployment
deploy() {
    print_status "Starting ZilRemit homepage deployment..."
    echo "=================================="
    
    check_prerequisites
    install_dependencies
    build_application
    deploy_to_s3
    invalidate_cloudfront
    
    echo "=================================="
    print_success "🚀 Deployment completed successfully!"
    print_status "Your ZilRemit homepage is now live!"
}

# Function to show help
show_help() {
    echo "ZilRemit Homepage Deployment Script"
    echo ""
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  deploy, -d    Deploy the application (default)"
    echo "  build, -b     Build the application only"
    echo "  help, -h      Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  AWS_S3_BUCKET                    S3 bucket name (required)"
    echo "  AWS_CLOUDFRONT_DISTRIBUTION_ID   CloudFront distribution ID (optional)"
    echo "  AWS_REGION                       AWS region (default: us-east-1)"
    echo ""
    echo "Examples:"
    echo "  export AWS_S3_BUCKET=zilremit-homepage"
    echo "  export AWS_CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC"
    echo "  $0 deploy"
}

# Main script logic
case "${1:-deploy}" in
    deploy|-d)
        deploy
        ;;
    build|-b)
        check_prerequisites
        install_dependencies
        build_application
        print_success "Build completed! Files are in ./dist directory"
        ;;
    help|-h|--help)
        show_help
        ;;
    *)
        print_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
