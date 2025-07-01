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
      <article class="post-preview">
        <div class="post-meta">
          <time datetime="{{ review.date | date_to_xmlschema }}">{{ review.date | date: "%d de %B, %Y" }}</time>
          <div class="post-categories">
            <span class="category">{{ review.category | default: "Review" }}</span>
          </div>
        </div>
        
        <h2>
          <a href="{{ review.url | relative_url }}">{{ review.title }}</a>
        </h2>
        
        <p class="post-excerpt">
          {{ review.description | strip_html | truncate: 200 }}
        </p>
        
        <a href="{{ review.url | relative_url }}" class="read-more">
          Leer review completa <i class="fas fa-arrow-right"></i>
        </a>
      </article>
    {% endfor %}
    </div>
  </div>
</section>
