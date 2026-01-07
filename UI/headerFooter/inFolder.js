// components.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Header
    loadComponent("header", "../UI/headerFooter/header.html", () => {
        // Run navbar logic ONLY after header HTML is injected
        initializeNavbar(); 
    });

    // 2. Load Footer
    loadComponent("footer", "../UI/headerFooter/footer.html");
});

// Generic function to fetch and insert HTML
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
        .catch(error => console.error('Error:', error));
}

// 3. Merged Navbar Logic (Toggle + Animation)
function initializeNavbar() {
    // Select elements AFTER they are in the DOM
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links'); 
    const navItems = document.querySelectorAll('.nav-links li');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');
            
            // Toggle Burger Animation
            burger.classList.toggle('toggle');
            
            // Animate Links (From your main.js)
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
}