---
layout: default
title: "Todas las Reviews"
description: "Todas nuestras reviews detalladas de productos tecnológicos"
---

<section class="reviews-hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Todas las <span class="highlight">Reviews</span></h1>
      <p class="hero-subtitle">Reviews detalladas y honestas de productos tecnológicos probados personalmente.</p>
    </div>
  </div>
</section>

<section class="reviews-content">
  <div class="container">
    <div class="reviews-grid">
    {% for review in site.reviews %}
      <article class="review-card">
        <a href="{{ review.url | relative_url }}" class="review-link">
          <div class="review-image">
            <img src="{{ review.product_image | default: '/favicon/android-chrome-512x512.png' }}" 
                 alt="{{ review.product_name }}" loading="lazy">
          </div>
          <div class="review-content">
            <h3>{{ review.product_name }}</h3>
            <div class="rating">
              {% assign rating = review.rating %}
              {% for i in (1..5) %}
                {% if i <= rating %}
                  <i class="fas fa-star"></i>
                {% else %}
                  <i class="far fa-star"></i>
                {% endif %}
              {% endfor %}
              <span class="rating-number">{{ review.rating }}/5</span>
            </div>
            <p class="review-excerpt">{{ review.excerpt | strip_html | truncate: 120 }}</p>
            <div class="review-meta">
              <span class="price">{{ review.price }}</span>
              <span class="date">{{ review.date | date: "%d %B %Y" }}</span>
            </div>
          </div>
        </a>
      </article>
    {% endfor %}
    </div>
  </div>
</section>

<style>
/* Reviews Hero Section */
.reviews-hero {
  background: linear-gradient(135deg, #4A90E2 0%, #FF8C00 100%);
  color: white;
  min-height: calc(100vh - 42px);
  display: flex;
  align-items: center;
  padding: 4rem 0;
  text-align: center;
}

.reviews-hero .hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.reviews-hero .hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.reviews-hero .highlight {
  color: #FFD700;
}

.reviews-hero .hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

/* Content Section */
.reviews-content {
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

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.review-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.review-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.review-image {
  height: 200px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.review-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.review-content {
  padding: 1.5rem;
}

.review-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: #333;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rating i {
  color: #FFD700;
  font-size: 1rem;
}

.rating-number {
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
}

.review-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #FF8C00;
}

.date {
  color: #999;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .reviews-hero {
    min-height: calc(100vh - 50px);
    padding: 2rem 0;
  }
  
  .reviews-hero .hero-title {
    font-size: 2rem;
  }
  
  .reviews-hero .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .reviews-content {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .reviews-hero .hero-title {
    font-size: 1.8rem;
  }
  
  .reviews-hero .hero-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }
  
  .container h1 {
    font-size: 2rem;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .review-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
