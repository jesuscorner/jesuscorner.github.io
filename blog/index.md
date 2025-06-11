---
layout: default
title: "Blog"
description: "Guías, comparativas y artículos sobre tecnología"
---

<section class="blog-hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Blog de <span class="highlight">Tecnología</span></h1>
      <p class="hero-subtitle">Guías detalladas, comparativas y artículos sobre las últimas tendencias en tecnología.</p>
    </div>
  </div>
</section>

<section class="blog-content">
  <div class="container">
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
</section>

<style>
/* Blog Hero Section */
.blog-hero {
  background: linear-gradient(135deg, #4A90E2 0%, #FF8C00 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.blog-hero .hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.blog-hero .hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.blog-hero .highlight {
  color: #FFD700;
}

.blog-hero .hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

/* Content Section */
.blog-content {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.container h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #FF8C00;
  margin-bottom: 1rem;
}

.container > p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  max-width: 600px;
}

.posts-list {
  max-width: 800px;
  margin: 2rem auto;
}

.post-preview {
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.post-meta time {
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
}

.post-categories {
  display: flex;
  gap: 0.5rem;
}

.category {
  background: rgba(255, 140, 0, 0.1);
  color: #FF8C00;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: lowercase;
}

.post-preview h2 {
  margin-bottom: 1rem;
  font-size: 1.6rem;
  line-height: 1.4;
}

.post-preview h2 a {
  text-decoration: none;
  color: #333;
  transition: color 0.2s ease;
}

.post-preview h2 a:hover {
  color: #FF8C00;
}

.post-excerpt {
  color: #666;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #FF8C00;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.read-more:hover {
  gap: 0.75rem;
  color: #e6790e;
}

.read-more i {
  transition: transform 0.2s ease;
}

.read-more:hover i {
  transform: translateX(2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-hero {
    padding: 3rem 0;
  }
  
  .blog-hero .hero-title {
    font-size: 2rem;
  }
  
  .blog-hero .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .blog-content {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .blog-hero .hero-title {
    font-size: 1.8rem;
  }
  
  .blog-hero .hero-subtitle {
    font-size: 1rem;
  }
  
  .post-preview {
    padding: 1.5rem;
  }
  
  .post-preview h2 {
    font-size: 1.3rem;
  }
}
</style>
