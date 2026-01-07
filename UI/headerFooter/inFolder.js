// components.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Header
    loadComponent("header", "../UI/headerFooter/header.html", () => {
        // Run this ONLY after the header is successfully loaded
        console.log("Header loaded, initializing navbar...");
        initializeNavbar(); 
    });

    // 2. Load Footer
    loadComponent("footer", "../UI/headerFooter/footer.html");
});

// Helper function to fetch HTML
function loadComponent(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            return response.text();
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            if (callback) callback();
        })
        .catch(error => console.error('Error loading component:', error));
}

// 3. Burger Menu Logic (Unified)
function initializeNavbar() {
    // We use the classes from your original main.js
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links'); 
    const navItems = document.querySelectorAll('.nav-links li');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            // Toggle Nav (Check your CSS: it should style .nav-links.active)
            navLinks.classList.toggle('active');
            
            // Burger Animation
            burger.classList.toggle('toggle');
            
            // Animate Links
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
        console.log("Navbar initialized successfully.");
    } else {
        console.error("Burger or Nav Links not found in header.html!");
    }
}