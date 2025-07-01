---
layout: default
title: "Blog"
description: "Guías, comparativas y artículos sobre tecnología"
---

<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">Blog de <span class="highlight">Tecnología</span></h1>
    <p class="hero-subtitle">Guías detalladas, comparativas y artículos sobre las últimas tendencias en tecnología.</p>
  </div>
</section>

<section class="content-section" style="background: white; padding: 4rem 0;">
  <div class="container">
    <div class="posts-list">
    {% for post in site.posts %}
      <article class="post-preview blog-preview">
        <div class="blog-image-container">
          <img src="{{ post.image | default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format' }}" 
               alt="{{ post.title }}" 
               class="blog-post-image"
               loading="lazy">
        </div>
        
        <div class="blog-content">
          <div class="post-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d de %B, %Y" }}</time>
          </div>
          
          <h2>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h2>
          
          <p class="post-excerpt">
            {{ post.excerpt | strip_html | truncate: 150 }}
          </p>
          
          <a href="{{ post.url | relative_url }}" class="read-more">
            Leer más <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </article>
    {% endfor %}
    </div>
  </div>
</section>
