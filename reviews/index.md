---
layout: default
title: "Reviews - JesusCorner"
description: "Reviews detalladas y honestas de productos tecnológicos probados personalmente"
---

<section class="hero">
  <div class="container">
    <div class="hero-content-single">
      <h1 class="hero-title">Todas las <span class="highlight">Reviews</span></h1>
      <p class="hero-subtitle">Reviews detalladas y honestas de productos tecnológicos probados personalmente.</p>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="posts-grid">
      {% for review in site.reviews %}
      <a href="{{ review.url | relative_url }}" class="post-card-link">
        <article class="post-card">
          {% if review.product_image %}
          <div class="post-image">
            <img src="{{ review.product_image }}" alt="{{ review.product_name }}" loading="lazy">
          </div>
          {% endif %}
          <div class="post-content">
            <div class="post-meta">
              <span class="post-date">{{ review.date | date: "%d de %B de %Y" | replace: "January", "enero" | replace: "February", "febrero" | replace: "March", "marzo" | replace: "April", "abril" | replace: "May", "mayo" | replace: "June", "junio" | replace: "July", "julio" | replace: "August", "agosto" | replace: "September", "septiembre" | replace: "October", "octubre" | replace: "November", "noviembre" | replace: "December", "diciembre" }}</span>
              {% if review.rating %}
              <div class="review-rating">
                {% assign rating = review.rating | plus: 0 %}
                {% for i in (1..5) %}
                  {% if i <= rating %}
                    <i class="fas fa-star"></i>
                  {% else %}
                    <i class="far fa-star"></i>
                  {% endif %}
                {% endfor %}
                <span class="rating-value">{{ review.rating }}/5</span>
              </div>
              {% endif %}
            </div>
            <h3>{{ review.product_name }}</h3>
            <p>{{ review.description | truncate: 150 }}</p>
          </div>
        </article>
      </a>
      {% endfor %}
    </div>
  </div>
</section>
