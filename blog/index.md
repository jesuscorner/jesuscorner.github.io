---
layout: default
title: "Blog"
description: "Guías, comparativas y artículos sobre tecnología"
---

<section class="hero">
  <div class="container">
    <div class="hero-content-single">
      <h1 class="hero-title">Blog de <span class="highlight">Tecnología</span></h1>
      <p class="hero-subtitle">Guías detalladas, comparativas y artículos sobre las últimas tendencias en tecnología.</p>
    </div>
  </div>
</section>

<section class="content-section" style="background: white; padding: 4rem 0;">
  <div class="container">
    <div class="posts-grid">
      {% for post in site.posts %}
      <a href="{{ post.url | relative_url }}" class="post-card-link">
        <article class="post-card">
          {% if post.image %}
          <div class="post-image">
            <img src="{{ post.image }}" alt="{{ post.title }}" loading="lazy">
          </div>
          {% else %}
          <div class="post-image">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format" alt="{{ post.title }}" loading="lazy">
          </div>
          {% endif %}
          <div class="post-content">
            <div class="post-meta">
              <span class="post-date">{{ post.date | date: "%d de %B de %Y" | replace: "January", "enero" | replace: "February", "febrero" | replace: "March", "marzo" | replace: "April", "abril" | replace: "May", "mayo" | replace: "June", "junio" | replace: "July", "julio" | replace: "August", "agosto" | replace: "September", "septiembre" | replace: "October", "octubre" | replace: "November", "noviembre" | replace: "December", "diciembre" }}</span>
            </div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.description | default: post.excerpt | strip_html | truncate: 150 }}</p>
          </div>
        </article>
      </a>
      {% endfor %}
    </div>
  </div>
</section>
