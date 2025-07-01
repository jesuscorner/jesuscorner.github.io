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
      <article class="post-preview">
        <div class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d de %B, %Y" }}</time>
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
