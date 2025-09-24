async function loadBlogDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("blogContent").textContent = "No blog selected.";
    return;
  }

  try {
    let response = await fetch("blog.json?_=" + new Date().getTime());
    let blogs = await response.json();

    let post = blogs.find(b => b.id == id);

    if (post) {
      document.getElementById("blogTitle").textContent = post.title;
      document.getElementById("blogMeta").textContent = `${post.date} | ${post.match}`;

      // 👇 change here
      document.getElementById("blogContent").innerHTML = post.content;

    } else {
      document.getElementById("blogContent").textContent = 
        "Blog ID is invalid. Please check the id or URL";
    }
  } catch (err) {
    console.error("Error loading blog:", err);
  }
}

loadBlogDetail();
