async function loadBlogDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("blogContent").textContent = "No blog selected.";
        return;
    }

    try {
        // Fetching with timestamp to avoid cache issues
        let response = await fetch("blog.json?_=" + new Date().getTime());
        let blogs = await response.json();

        let post = blogs.find(b => b.id == id);

        if (post) {
            // Populate Title and Meta
            document.getElementById("blogTitle").textContent = post.title;
            document.getElementById("blogMeta").innerHTML = `<i class="fa-regular fa-calendar"></i> ${post.date} | <i class="fa-solid fa-ranking-star"></i> ${post.match}`;
            
            // Populate Content (using innerHTML to support <a> and <br> tags)
            document.getElementById("blogContent").innerHTML = post.content;

            // Handle Image
            const blogImage = document.getElementById("blogImage");
            if (blogImage) {
                blogImage.src = post.image;
                blogImage.alt = post.keywords ? post.keywords.join(", ") : "Tournament Recap";
                
                // Add click event for the image viewer
                blogImage.style.cursor = "zoom-in";
                blogImage.onclick = () => openImageViewer(post.image);
            }

        } else {
            document.getElementById("blogContent").textContent = "Blog post not found.";
        }
    } catch (err) {
        console.error("Error loading blog:", err);
        document.getElementById("blogContent").textContent = "Error loading content. Please try again later.";
    }
}

/**
 * Function to view the image in full screen
 */
function openImageViewer(src) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "imageViewerOverlay";
    overlay.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: flex; align-items: center;
        justify-content: center; z-index: 10000; cursor: zoom-out;
    `;

    // Create image
    const fullImg = document.createElement("img");
    fullImg.src = src;
    fullImg.style = "max-width: 95%; max-height: 95%; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.5);";

    overlay.appendChild(fullImg);
    document.body.appendChild(overlay);

    // Close when clicking anywhere
    overlay.onclick = () => {
        document.body.removeChild(overlay);
    };
}

// Start the process
loadBlogDetail();