// Component Loader - Loads header and footer from components directory
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Toggle mobile menu function (needed for header)
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}
