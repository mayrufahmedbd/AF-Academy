document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Load Header
    loadComponent("header", "header.html", () => {
        // This callback runs ONLY after header is loaded
        initializeNavbar(); 
    });

    // 2. Load Footer
    loadComponent("footer", "footer.html");

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
            if (callback) callback(); // Run the extra code (like navbar logic)
        })
        .catch(error => console.error('Error:', error));
}

// 3. Move your Burger Menu Logic inside this function
function initializeNavbar() {
    const burger = document.querySelector('.burger');
    const nav = document.getElementById('navMenu');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            // Burger Animation toggle
            burger.classList.toggle('toggle');
        });
    }
}