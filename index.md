---
layout: default
title: "JesusCorner - Recomendaciones Tech"
description: "Recomendaciones honestas de tecnología con las mejores ofertas y reviews detalladas"
---

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">
        Recomendaciones <span class="highlight">Honestas</span> de Tecnología
      </h1>
      <p class="hero-subtitle">
        Reviews detalladas, guías de compra y las mejores ofertas en tecnología. 
        Todo probado personalmente para ayudarte a tomar la mejor decisión.
      </p>
    </div>
    <div class="hero-image">
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format" alt="Tecnología" loading="lazy">
    </div>
  </div>
</section>

<!-- Sección de productos destacados -->
<section class="featured-products">
  <div class="container">
    <div class="section-header">
      <h2>Productos Recomendados</h2>
      <p>Selección curada de productos probados y recomendados</p>
    </div>
    
    <div class="products-grid" id="productsGrid">
      <!-- Los productos se cargan dinámicamente -->
    </div>
    
    <div class="section-footer">
      <a href="{{ '/recommendations' | relative_url }}" class="btn btn-outline">
        Ver Todas las Recomendaciones
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- Sección de reviews recientes -->
<section class="recent-reviews">
  <div class="container">
    <div class="section-header">
      <h2>Reviews Recientes</h2>
      <p>Análisis detallados de los últimos productos probados</p>
    </div>
    
    <div class="reviews-grid">
      {% for review in site.reviews limit: 3 %}
      <article class="review-card">
        <div class="review-image">
          <img src="{{ review.product_image }}" alt="{{ review.product_name }}" loading="lazy">
        </div>
        <div class="review-content">
          <div class="review-rating">
            {% assign rating = review.rating | plus: 0 %}
            {% for i in (1..5) %}
              {% if i <= rating %}
                <i class="fas fa-star"></i>
              {% else %}
                <i class="far fa-star"></i>
              {% endif %}
            {% endfor %}
            <span>{{ review.rating }}/5</span>
          </div>
          <h3>{{ review.product_name }}</h3>
          <p>{{ review.description | truncate: 120 }}</p>
          <div class="review-meta">
            <span class="price">€{{ review.current_price }}</span>
            <a href="{{ review.url | relative_url }}" class="btn btn-small">Leer Review</a>
          </div>
        </div>
      </article>
      {% endfor %}
    </div>
    
    <div class="section-footer">
      <a href="{{ '/reviews' | relative_url }}" class="btn btn-outline">
        Ver Todas las Reviews
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- Sección de blog -->
<section class="recent-posts">
  <div class="container">
    <div class="section-header">
      <h2>Últimas Guías</h2>
      <p>Artículos y guías para ayudarte a elegir mejor</p>
    </div>
    
    <div class="posts-grid">
      {% for post in site.posts limit: 2 %}
      <article class="post-card">
        {% if post.image %}
        <div class="post-image">
          <img src="{{ post.image }}" alt="{{ post.title }}" loading="lazy">
        </div>
        {% endif %}
        <div class="post-content">
          <div class="post-meta">
            <span class="post-date">{{ post.date | date: "%d %b %Y" }}</span>
            {% if post.categories %}
            <span class="post-category">#{{ post.categories.first }}</span>
            {% endif %}
          </div>
          <h3>{{ post.title }}</h3>
          <p>{{ post.description | truncate: 150 }}</p>
          <a href="{{ post.url | relative_url }}" class="btn btn-small">Leer Más</a>
        </div>
      </article>
      {% endfor %}
    </div>
    
    <div class="section-footer">
      <a href="{{ '/blog' | relative_url }}" class="btn btn-outline">
        Ver Todas las Guías
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<style>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  margin-bottom: 3rem;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.highlight {
  color: #ffd700;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.hero-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.section-header p {
  font-size: 1.1rem;
  color: #666;
}

.section-footer {
  text-align: center;
  margin-top: 3rem;
}

.featured-products,
.recent-reviews,
.recent-posts {
  padding: 3rem 0;
}

.recent-reviews {
  background: #f8f9fa;
}

.reviews-grid,
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.review-card,
.post-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: var(--transition);
}

.review-card:hover,
.post-card:hover {
  transform: translateY(-5px);
}

.review-image,
.post-image {
  height: 200px;
  overflow: hidden;
}

.review-image img,
.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-content,
.post-content {
  padding: 1.5rem;
}

.review-rating {
  color: #ffc107;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.review-rating span {
  color: #333;
  font-weight: 600;
}

.review-content h3,
.post-content h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.review-content p,
.post-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.post-category {
  color: var(--primary-color);
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .reviews-grid,
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script src="{{ '/script.js' | relative_url }}"></script>
