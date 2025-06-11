---
layout: default
title: "Todas las Reviews"
description: "Todas nuestras reviews detalladas de productos tecnológicos"
---

<div class="container">
  <h1>Todas las Reviews</h1>
  <p>Reviews detalladas y honestas de productos tecnológicos probados personalmente.</p>
  
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

<style>
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.review-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.review-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.review-image {
  height: 200px;
  overflow: hidden;
}

.review-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-content {
  padding: 1.5rem;
}

.review-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.rating i {
  color: #fbbf24;
}

.rating-number {
  margin-left: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.review-excerpt {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #9ca3af;
}

.price {
  font-weight: 600;
  color: #059669;
}
</style>
