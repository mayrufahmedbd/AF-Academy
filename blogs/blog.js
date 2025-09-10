document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        
        // Animate links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Load blogs
    async function loadBlogs() {
        try {
            let response = await fetch("blog.json?_=" + new Date().getTime());
            let blogs = await response.json();

            let container = document.getElementById("blogList");
            if (!container) return;
            container.innerHTML = "";

            blogs.forEach(post => {
                let card = document.createElement("div");
                card.className = "blog-post";
                card.innerHTML = `
                    <h3>${post.title}</h3>
                    <div class="meta">${post.date} | ${post.match}</div>
                    <p>${post.content.substring(0, 120)}...</p>
                    <a href="blog-detail.html?id=${post.id}" class="read-more">Read More →</a>
                `;
                container.appendChild(card);
            });
        } catch (err) {
            console.error("Error loading blogs:", err);
        }
    }

    loadBlogs();
});





// Loader functionality
        // Wait for the page to fully load
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    // Hide the loader
    loader.style.display = 'none';

    // Show the content
    content.style.display = 'block';
});