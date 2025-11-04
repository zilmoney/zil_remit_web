#!/usr/bin/env python3
"""
Script to update all blog pages and blog.html to use global header/footer components
"""

import os
import re
from pathlib import Path

def extract_header_footer(html_content):
    """Extract and remove header and footer from HTML, return cleaned content"""
    
    # Pattern to match header nav section
    header_pattern = r'<!-- Common Header -->.*?</nav>'
    
    # Pattern to match footer section
    footer_pattern = r'<!-- Footer -->.*?</footer>'
    
    # Remove header
    cleaned = re.sub(header_pattern, '<div id="header-placeholder"></div>', html_content, flags=re.DOTALL)
    
    # Remove footer
    cleaned = re.sub(footer_pattern, '<div id="footer-placeholder"></div>', cleaned, flags=re.DOTALL)
    
    return cleaned

def add_loader_script(html_content):
    """Add loader.js script before closing body tag if not present"""
    
    # Check if loader script already exists
    if '/components/loader.js' in html_content or 'loader.js' in html_content:
        return html_content
    
    # Add script before </body>
    script_tag = '    <script src="/components/loader.js"></script>\n</body>'
    html_content = html_content.replace('</body>', script_tag)
    
    return html_content

def process_html_file(file_path):
    """Process a single HTML file"""
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already using placeholders
        if 'header-placeholder' in content and 'footer-placeholder' in content:
            print(f"  ✓ Already using components")
            return True
        
        # Extract header and footer
        updated_content = extract_header_footer(content)
        
        # Add loader script
        updated_content = add_loader_script(updated_content)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"  ✓ Updated successfully")
        return True
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    """Main function to process all blog files"""
    
    base_dir = Path('/home/ubuntu/zil_remit_web')
    
    # Files to process
    files_to_process = []
    
    # Add blog.html
    blog_html = base_dir / 'blog.html'
    if blog_html.exists():
        files_to_process.append(blog_html)
    
    # Add all blog articles in blogs/ directory
    blogs_dir = base_dir / 'blogs'
    if blogs_dir.exists():
        for html_file in blogs_dir.glob('*.html'):
            files_to_process.append(html_file)
    
    # Add blogs.html if it exists
    blogs_html = base_dir / 'blogs.html'
    if blogs_html.exists():
        files_to_process.append(blogs_html)
    
    print(f"\nFound {len(files_to_process)} files to process\n")
    print("=" * 60)
    
    success_count = 0
    for file_path in files_to_process:
        if process_html_file(file_path):
            success_count += 1
        print()
    
    print("=" * 60)
    print(f"\nCompleted: {success_count}/{len(files_to_process)} files updated successfully")
    
    # Also update public/ and static/ directories if they exist
    print("\n" + "=" * 60)
    print("Updating public/ directory...")
    print("=" * 60)
    
    public_blogs_dir = base_dir / 'public' / 'blogs'
    if public_blogs_dir.exists():
        public_files = list(public_blogs_dir.glob('*.html'))
        print(f"\nFound {len(public_files)} files in public/blogs/\n")
        
        for file_path in public_files:
            process_html_file(file_path)
            print()
    
    # Update static/ directory
    print("\n" + "=" * 60)
    print("Updating static/ directory...")
    print("=" * 60)
    
    static_blogs_dir = base_dir / 'static' / 'blogs'
    if static_blogs_dir.exists():
        static_files = list(static_blogs_dir.glob('*.html'))
        print(f"\nFound {len(static_files)} files in static/blogs/\n")
        
        for file_path in static_files:
            process_html_file(file_path)
            print()

if __name__ == '__main__':
    main()
