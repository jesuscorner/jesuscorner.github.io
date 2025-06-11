function loadPosts(type, containerId) {
  fetch('/api/posts' + (type ? `?type=${type}` : ''))
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById(containerId);
      if (!container) return;
      posts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        container.appendChild(article);
      });
    });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('newsPosts')) {
    loadPosts('news', 'newsPosts');
  }
  if (document.getElementById('reviewPosts')) {
    loadPosts('review', 'reviewPosts');
  }
});
