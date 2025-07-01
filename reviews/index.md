---
layout: default
title: "Todas las Reviews"
description: "Todas nuestras reviews detalladas de productos tecnológicos"
---

<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">Todas las <span class="highlight">Reviews</span></h1>
    <p class="hero-subtitle">Reviews detalladas y honestas de productos tecnológicos probados personalmente.</p>
  </div>
</section>

<section class="content-section" style="background: white; padding: 4rem 0;">
  <div class="container">
    <div class="posts-list">
    {% for review in site.reviews %}
      <article class="post-preview review-preview">
        <div class="review-image-container">
          <img src="{{ review.product_image | default: '/favicon/android-chrome-512x512.png' }}" 
               alt="{{ review.product_name }}" 
               class="review-product-image"
               loading="lazy">
        </div>
        
        <div class="review-content">
          <div class="post-meta">
            <time datetime="{{ review.date | date_to_xmlschema }}">{{ review.date | date: "%d de %B, %Y" }}</time>
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
          
          <h2>
            <a href="{{ review.url | relative_url }}">{{ review.title }}</a>
          </h2>
          
          <p class="post-excerpt">
            {{ review.description | strip_html | truncate: 150 }}
          </p>
          
          <a href="{{ review.url | relative_url }}" class="read-more">
            Leer review completa <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </article>
    {% endfor %}
    </div>
  </div>
</section>
