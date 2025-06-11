fetch('/api/posts')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('posts');
    if (!container) return;
    posts.slice(0, 3).forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
      container.appendChild(article);
    });
  });
