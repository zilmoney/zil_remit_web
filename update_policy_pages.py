#!/usr/bin/env python3
"""
Script to update policy pages to use global header/footer components
"""

import re
from pathlib import Path

def update_policy_page(filepath):
    """Update a policy page to use component placeholders"""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already using placeholders
    if 'header-placeholder' in content and 'footer-placeholder' in content:
        print(f"  ✓ Already using components\n")
        return True
    
    # Find the position after Google Tag Manager noscript
    gtm_noscript_end = content.find('<!-- End Google Tag Manager (noscript) -->')
    if gtm_noscript_end == -1:
        print(f"  ✗ Could not find GTM noscript marker\n")
        return False
    
    # Find the next closing tag after GTM (should be </noscript>)
    start_pos = content.find('>', gtm_noscript_end) + 1
    
    # Find where the main content starts (look for a section or main tag, or first h1)
    main_content_markers = ['<section', '<main', '<div class="max-w', '<h1']
    main_content_start = -1
    
    for marker in main_content_markers:
        pos = content.find(marker, start_pos)
        if pos != -1 and (main_content_start == -1 or pos < main_content_start):
            main_content_start = pos
    
    if main_content_start == -1:
        print(f"  ✗ Could not find main content start\n")
        return False
    
    # Find the last </body> tag
    body_end = content.rfind('</body>')
    if body_end == -1:
        print(f"  ✗ Could not find </body> tag\n")
        return False
    
    # Look backwards from </body> to find where footer should be
    # Find the last </div> or </section> before </body>
    footer_end = body_end
    
    # Search backwards for script tags
    last_script_start = content.rfind('<script', 0, body_end)
    if last_script_start != -1:
        # Find the closing </script> tag
        last_script_end = content.find('</script>', last_script_start)
        if last_script_end != -1:
            footer_end = last_script_end + len('</script>')
    
    # Build new content
    new_content = (
        content[:start_pos] + 
        '\n\n    <div id="header-placeholder"></div>\n\n' +
        content[start_pos:footer_end] +
        '\n\n    <div id="footer-placeholder"></div>\n'
    )
    
    # Add loader script if not present
    if 'loader.js' not in new_content:
        new_content = new_content.replace('</body>', '\n    <script src="/components/loader.js"></script>\n</body>')
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  ✓ Updated successfully\n")
    return True

def main():
    """Main function"""
    base_dir = Path('/home/ubuntu/zil_remit_web')
    
    policy_files = [
        'cookie-policy.html',
        'privacy-policy.html',
        'terms-and-condition.html'
    ]
    
    print("=" * 60)
    print("Updating Policy Pages")
    print("=" * 60)
    print()
    
    for filename in policy_files:
        filepath = base_dir / filename
        if filepath.exists():
            update_policy_page(filepath)
        else:
            print(f"File not found: {filename}\n")
    
    print("=" * 60)
    print("Completed!")
    print("=" * 60)

if __name__ == '__main__':
    main()
