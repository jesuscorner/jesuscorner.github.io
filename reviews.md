---
layout: default
title: "Reviews"
description: "Todas nuestras reviews detalladas de productos tecnológicos"
---

<section class="hero" style="padding: 2rem 0;">
  <div class="container">
    <div class="hero-content-single">
      <h1 class="hero-title">Todas las <span class="highlight">Reviews</span></h1>
      <p class="hero-subtitle">Reviews detalladas y honestas de productos tecnológicos probados personalmente.</p>
    </div>
  </div>
</section>

<section class="content-section" style="background: white;">
  <div class="container">
    
    <div class="reviews-grid">
      {% for review in site.reviews %}
        <article class="review-card" data-rating="{{ review.rating }}">
          <a href="{{ review.url | relative_url }}" class="review-link">
            <div class="review-image">
              <img src="{{ review.product_image | default: '/favicon/android-chrome-512x512.png' }}" 
                   alt="{{ review.product_name }}" loading="lazy">
            </div>
            <div class="review-content">
              <h3>{{ review.product_name }}</h3>
              <p class="review-excerpt">{{ review.excerpt | strip_html | truncate: 120 }}</p>
              <div class="review-meta">
                {% assign day = review.date | date: "%d" %}
                {% assign year = review.date | date: "%Y" %}
                {% assign m = review.date | date: "%-m" %}
                {% case m %}
                  {% when '1' %}{% assign month = 'enero' %}
                  {% when '2' %}{% assign month = 'febrero' %}
                  {% when '3' %}{% assign month = 'marzo' %}
                  {% when '4' %}{% assign month = 'abril' %}
                  {% when '5' %}{% assign month = 'mayo' %}
                  {% when '6' %}{% assign month = 'junio' %}
                  {% when '7' %}{% assign month = 'julio' %}
                  {% when '8' %}{% assign month = 'agosto' %}
                  {% when '9' %}{% assign month = 'septiembre' %}
                  {% when '10' %}{% assign month = 'octubre' %}
                  {% when '11' %}{% assign month = 'noviembre' %}
                  {% when '12' %}{% assign month = 'diciembre' %}
                {% endcase %}
                <span class="date">{{ day }} de {{ month }} de {{ year }}</span>
              </div>
            </div>
          </a>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<style>
/* Reviews grid specific styles */

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
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
  position: relative;
}

.review-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f8f9fa;
}

.review-content {
  padding: 1.5rem;
}

.review-content h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.review-excerpt {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.review-meta {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9rem;
  color: #9ca3af;
}

.date {
  font-size: 0.85rem;
  color: #6b7280;
}
</style>
