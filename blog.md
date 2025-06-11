---
layout: default
title: "Blog"
description: "Guías, comparativas y artículos sobre tecnología"
---

<div class="container">
  <h1>Blog de Tecnología</h1>
  <p>Guías detalladas, comparativas y artículos sobre las últimas tendencias en tecnología.</p>
  
  <div class="posts-list">
    {% for post in site.posts %}
      <article class="post-preview">
        <div class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%d %B %Y" }}
          </time>
          {% if post.categories %}
            <div class="post-categories">
              {% for category in post.categories %}
                <span class="category">{{ category }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>
        
        <h2>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>
        
        <p class="post-excerpt">
          {{ post.excerpt | strip_html | truncate: 200 }}
        </p>
        
        <a href="{{ post.url | relative_url }}" class="read-more">
          Leer más <i class="fas fa-arrow-right"></i>
        </a>
      </article>
    {% endfor %}
  </div>
</div>

<style>
.posts-list {
  max-width: 800px;
  margin: 2rem auto;
}

.post-preview {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-preview:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.post-categories {
  display: flex;
  gap: 0.5rem;
}

.category {
  background: #e5e7eb;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.post-preview h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.post-preview h2 a {
  text-decoration: none;
  color: #111827;
  transition: color 0.3s ease;
}

.post-preview h2 a:hover {
  color: #3b82f6;
}

.post-excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.3s ease;
}

.read-more:hover {
  gap: 0.75rem;
}
</style>
