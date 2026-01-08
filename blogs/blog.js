document.addEventListener('DOMContentLoaded', function() {

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