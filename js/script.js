// main.js

document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }
    
    // Smooth Scrolling (Updated for Dynamic Header)
    // We listen to the Body to catch clicks on links that load later
    document.body.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        
        if (anchor) {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust offset (80px) for fixed header if needed
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Loader Functionality
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    if(loader && content) {
        loader.style.display = 'none';
        content.style.display = 'block';
    }
});