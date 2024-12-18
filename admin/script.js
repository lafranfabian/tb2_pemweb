document.addEventListener('DOMContentLoaded', () => {
  const SUPABASE_URL = 'https://ohwyindwhsfcnxjpwoch.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od3lpbmR3aHNmY254anB3b2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MjIxNDEsImV4cCI6MjA0ODI5ODE0MX0.AO5DNm7c0h6CTcxt-0EMyMII-sCiBl8jgiJHSx1ynpo';
  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const articlesSection = document.getElementById('articles-section');
  const articlesTableBody = document.getElementById('articles-table-body');
  const addArticleBtn = document.getElementById('add-article-btn');
  const addArticleModal = new bootstrap.Modal(document.getElementById('add-article-modal'));
  const addArticleForm = document.getElementById('add-article-form');

  const articlesLink = document.getElementById('articles-link');

  // Fetch and display articles
  async function fetchArticles() {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert('Error fetching articles: ' + error.message);
      return;
    }

    // Populate the articles table
    articlesTableBody.innerHTML = '';
    articles.forEach((article) => {
      const row = `
        <tr>
          <td>${article.id}</td>
          <td>${article.title}</td>
          <td>${article.content.substring(0, 50)}...</td>
          <td>${article.image_url ? `<img src="${article.image_url}" width="50">` : 'No Image'}</td>
          <td>${new Date(article.created_at).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteArticle(${article.id})">Delete</button>
          </td>
        </tr>`;
      articlesTableBody.insertAdjacentHTML('beforeend', row);
    });
  }

  // Add new article
  addArticleForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;
    const imageFile = document.getElementById('article-image').files[0];
    let imageUrl = null;

    if (imageFile) {
      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(`public/${Date.now()}-${imageFile.name}`, imageFile);

      if (error) {
        alert('Error uploading image: ' + error.message);
        return;
      }

      imageUrl = `${SUPABASE_URL}/storage/v1/object/public/article-images/${data.path}`;
    }

    const { error: insertError } = await supabase
      .from('articles')
      .insert([{ title, content, image_url: imageUrl }]);

    if (insertError) {
      alert('Error adding article: ' + insertError.message);
      return;
    }

    alert('Article added successfully!');
    addArticleModal.hide();
    fetchArticles(); // Reload articles
    addArticleForm.reset();
  });

  // Delete article
  window.deleteArticle = async (id) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      alert('Error deleting article: ' + error.message);
      return;
    }

    alert('Article deleted successfully!');
    fetchArticles(); // Reload articles
  };

  // Show Articles section
  articlesLink.addEventListener('click', () => {
    articlesSection.style.display = 'block';
    fetchArticles(); // Fetch articles when clicked
  });

  // Hide Articles section initially
  articlesSection.style.display = 'none';
});
