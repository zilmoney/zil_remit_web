# Quick Reference: Global Header & Footer

## 🎯 How to Update Header or Footer for ALL Pages

### Update Header (Navigation, Logo, Menu)
```bash
# Edit this file:
/public/components/header.html

# Then commit and push:
git add public/components/header.html
git commit -m "Update header navigation"
git push
```

### Update Footer (Links, Social Media, Contact Info)
```bash
# Edit this file:
/public/components/footer.html

# Then commit and push:
git add public/components/footer.html
git commit -m "Update footer links"
git push
```

## 📝 Common Changes

### Add a New Navigation Link
**File:** `/public/components/header.html`

Find the desktop navigation section and add:
```html
<a href="/your-page.html" class="text-gray-700 hover:text-green-500 px-3 py-2 text-sm font-medium transition-colors">
    Your Link
</a>
```

Also add to mobile menu:
```html
<a href="/your-page.html" class="text-gray-700 hover:text-green-500 block px-3 py-2 text-base font-medium">
    Your Link
</a>
```

### Update Social Media Links
**File:** `/public/components/footer.html`

Find the social media section and update URLs:
```html
<a href="https://facebook.com/yourpage" class="text-gray-400 hover:text-white transition-colors">
    <!-- Icon SVG -->
</a>
```

### Change Contact Email
**File:** `/public/components/footer.html`

Find the Contact section:
```html
<li><a href="mailto:newemail@zilremit.com">newemail@zilremit.com</a></li>
```

### Update Copyright Year
**File:** `/public/components/footer.html`

Find the copyright section:
```html
<p class="text-gray-400">&copy; 2025 ZilRemit. All rights reserved.</p>
```

## ✅ What Pages Are Affected?

When you edit header.html or footer.html, changes appear on:
- ✅ All blog articles (18+ pages)
- ✅ Blog listing page (blog.html)
- ✅ Cookie policy page
- ✅ Privacy policy page
- ✅ Terms and conditions page
- ✅ Disclaimer page
- ❌ Homepage (uses React components - edit separately)

## 🚀 Testing Your Changes

1. Make your edit to header.html or footer.html
2. Save the file
3. Open any blog page in your browser
4. Refresh the page (Ctrl+F5 or Cmd+Shift+R)
5. Verify your changes appear

## 📂 File Locations

```
zil_remit_web/
├── public/
│   └── components/
│       ├── header.html    ← Edit this for header changes
│       ├── footer.html    ← Edit this for footer changes
│       ├── loader.js      ← Don't edit (loads components)
│       └── README.md      ← Full documentation
│
├── GLOBAL_COMPONENTS_UPDATE.md  ← Complete implementation guide
└── QUICK_REFERENCE.md           ← This file
```

## ⚠️ Important Notes

- **Don't edit individual blog pages** - they load from components automatically
- **Homepage is separate** - it uses React, edit `/src/components/layout/Footer.jsx`
- **Always test** - Open a blog page after making changes
- **Commit your changes** - Don't forget to push to GitHub

## 🆘 Troubleshooting

### Changes not appearing?
1. Clear browser cache (Ctrl+F5)
2. Check you edited `/public/components/header.html` or `footer.html`
3. Verify the file was saved
4. Make sure you pushed to GitHub

### Mobile menu not working?
- The `loader.js` file handles this automatically
- Don't modify `loader.js` unless necessary

### Need help?
- Read `/public/components/README.md` for detailed docs
- Read `GLOBAL_COMPONENTS_UPDATE.md` for implementation details

---

**Last Updated:** November 4, 2025  
**System Status:** ✅ Active and Working
