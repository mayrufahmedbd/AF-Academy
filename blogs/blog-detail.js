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
    document.getElementById("blogContent").innerHTML = post.content;

    // 👇 New: Display blog image
    const blogImage = document.getElementById("blogImage");
    if (blogImage) {
      blogImage.src = post.image;
      blogImage.alt = post.title + " (mayruf ahmed, mayruf, sylhet, af academy, af academy blog image)";
      blogImage.style.display = "block"; // show image if hidden
    }

  } else {
    document.getElementById("blogContent").textContent =
      "Blog ID is invalid. Please check the id or URL";

    // hide image if invalid
    const blogImage = document.getElementById("blogImage");
    if (blogImage) blogImage.style.display = "none";
  }
} catch (err) {
  console.error("Error loading blog:", err);
}

}

loadBlogDetail();
