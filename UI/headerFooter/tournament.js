// components.js (inFolder.js)

document.addEventListener("DOMContentLoaded", () => {
    const headerPlaceholder = document.getElementById("header");

    // SCENARIO 1: Normal Pages (Dynamic Header)
    if (headerPlaceholder) {
        loadComponent("header", "../../UI/headerFooter/header.html", () => {
            console.log("Header loaded dynamically, initializing navbar...");
            initializeNavbar(); 
        });
    } 
    // SCENARIO 2: Tournament Page (Hardcoded Header)
    else {
        console.log("Hardcoded header detected, initializing navbar immediately...");
        initializeNavbar();
    }

    // Load Footer (Logic remains the same)
    const footerPlaceholder = document.getElementById("footer");
    if (footerPlaceholder) {
        loadComponent("footer", "../../UI/headerFooter/footer.html");
    }
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
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links'); 
    const navItems = document.querySelectorAll('.nav-links li');

    if (burger && navLinks) {
        // Remove any existing event listeners to prevent duplicates (optional safety)
        const newBurger = burger.cloneNode(true);
        burger.parentNode.replaceChild(newBurger, burger);

        newBurger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('active'); // Ensure your CSS has .nav-links.active
            
            // Burger Animation
            newBurger.classList.toggle('toggle'); // Ensure your CSS has .burger.toggle
            
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
        console.error("Burger or Nav Links not found!");
    }
}