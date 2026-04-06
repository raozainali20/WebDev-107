// Mobile Menu Toggle Functionality

// Get elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navButtons = document.getElementById('navButtons');

// Toggle menu on hamburger click
hamburger.addEventListener('click', function() {
    // Toggle active class on hamburger (for animation)
    hamburger.classList.toggle('active');
    
    // Toggle active class on nav links and buttons
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Close menu when a nav link is clicked
const navLinkItems = navLinks.querySelectorAll('a');
navLinkItems.forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = hamburger.contains(event.target) || 
                              navLinks.contains(event.target) || 
                              navButtons.contains(event.target);
    
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
    }
});
