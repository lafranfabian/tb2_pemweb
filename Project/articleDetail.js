document.addEventListener("DOMContentLoaded", async () => {
    const articleId = new URLSearchParams(window.location.search).get("id");
  
    if (!articleId) {
      alert("Article ID is missing!");
      return;
    }
  
    try {
      const response = await fetch(`/article-detail/${articleId}`);
      const { article, error } = await response.json();
  
      if (error) {
        alert("Error fetching article: " + error);
        return;
      }
  
      // Populate the article details on the page
      document.getElementById("article-title").textContent = article.title;
      document.getElementById("article-category").textContent = `Category: ${article.category}`;
      document.getElementById("article-image").src = `/uploads/${article.image_url}`;
      document.getElementById("article-content").textContent = article.content;
    } catch (err) {
      console.error("Error fetching article:", err);
      alert("Failed to load article.");
    }
  });
  