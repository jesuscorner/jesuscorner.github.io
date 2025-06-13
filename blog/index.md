---
layout: default
title: "Blog"
description: "Guías, comparativas y artículos sobre tecnología"
---

<section class="blog-hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Blog de <span class="highlight">Tecnología</span></h1>
      <p class="hero-subtitle">Guías detalladas, comparativas y artículos sobre las últimas tendencias en tecnología.</p>
    </div>
  </div>
</section>

<section class="blog-content">
  <div class="container">
    <div class="posts-list">
    {% for post in site.posts %}
      <article class="post-preview">
        <div class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%d %B %Y" }}
          </time>
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

<style>
/* Blog Hero Section */
.blog-hero {
  background: linear-gradient(135deg, #4A90E2 0%, #FF8C00 100%);
  color: white;
  min-height: calc(100vh - 42px);
  display: flex;
  align-items: center;
  padding: 4rem 0;
  text-align: center;
}

.blog-hero .hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.blog-hero .hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: white;
}

.blog-hero .highlight {
  color: #FFD700;
}

.blog-hero .hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

/* Content Section */
.blog-content {
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

.posts-list {
  max-width: 800px;
  margin: 2rem auto;
}

.post-preview {
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.post-meta time {
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
}

.post-categories {
  display: flex;
  gap: 0.5rem;
}

.category {
  background: rgba(255, 140, 0, 0.1);
  color: #FF8C00;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: lowercase;
}

.post-preview h2 {
  margin-bottom: 1rem;
  font-size: 1.6rem;
  line-height: 1.4;
}

.post-preview h2 a {
  text-decoration: none;
  color: #333;
  transition: color 0.2s ease;
}

.post-preview h2 a:hover {
  color: #FF8C00;
}

.post-excerpt {
  color: #666;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #FF8C00;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.read-more:hover {
  gap: 0.75rem;
  color: #e6790e;
}

.read-more i {
  transition: transform 0.2s ease;
}

.read-more:hover i {
  transform: translateX(2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-hero {
    min-height: calc(100vh - 50px);
    padding: 2rem 0;
  }
  
  .blog-hero .hero-title {
    font-size: 2rem;
  }
  
  .blog-hero .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .blog-content {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .blog-hero .hero-title {
    font-size: 1.8rem;
  }
  
  .blog-hero .hero-subtitle {
    font-size: 1rem;
  }
  
  .post-preview {
    padding: 1.5rem;
  }
  
  .post-preview h2 {
    font-size: 1.3rem;
  }
}
</style>

<style>
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Header - Ultra Compact */
.header {
  position: sticky;
  top: 0;
  height: 48px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

/* Container for consistent layout */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Grid Layout - 3 columns */
.header-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  height: 100%;
  gap: 1rem;
}

/* Logo Section */
.logo {
  display: flex;
  align-items: center;
  justify-self: start;
  flex-shrink: 0;
  margin-top: 5px;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
  outline-offset: 2px;
}

.logo a:hover,
.logo a:focus {
  transform: scale(1.02);
}

.logo a:focus {
  outline: 2px solid #FF8C00;
  border-radius: 6px;
}

.logo-image {
  height: 32px;
  width: auto;
  border-radius: 6px;
  display: block;
}

.logo a:hover .logo-image {
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
}

.logo-text h1 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #FF8C00;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
}

.logo-text span {
  font-size: 0.8rem;
  color: #666;
  display: block;
  margin-top: 2px;
  line-height: 1;
  font-weight: 500;
}

/* Navigation - Centered */
.nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  justify-self: center;
  margin: 0;
  margin-top: 8px;
}

.nav a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #444;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  line-height: 1;
  position: relative;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
}

.nav a span {
  transition: transform 0.2s ease;
}

.nav a i {
  font-size: 0.9rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.nav a:hover,
.nav a:focus {
  color: #FF8C00;
  background: rgba(255, 140, 0, 0.08);
}

.nav a.active {
  color: #FF8C00;
  border-bottom-color: #FF8C00;
  background: rgba(255, 140, 0, 0.08);
}

/* Header Actions */
.header-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-self: end;
  flex-shrink: 0;
}

.search-toggle,
.menu-toggle {
  background: none;
  border: none;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: none; /* Changed from flex to none to make elements invisible */
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
}

.search-toggle:hover,
.menu-toggle:hover {
  background: rgba(255, 140, 0, 0.1);
  color: #FF8C00;
}

/* Hamburger menu animation */
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 16px;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.menu-toggle.active .hamburger span:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}

.menu-toggle.active .hamburger span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .hamburger span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.menu-toggle {
  display: none;
}

/* Search Bar */
.search-bar {
  background: #f8f9fa;
  padding: 0.75rem 0;
  border-top: 1px solid #eee;
  display: none;
}

.search-bar.active {
  display: block;
}

.search-container {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-container input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  font-size: 0.9rem;
  outline: none;
  background: transparent;
  color: #333;
  font-family: inherit;
}

.search-container input::placeholder {
  color: #999;
}

.search-container button {
  background: #FF8C00;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-container button:hover {
  background: #e6790e;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav {
    gap: 1rem;
  }
  
  .nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.85rem;
    gap: 0.4rem;
  }
}

@media (max-width: 768px) {
  .header {
    height: 50px;
  }
  
  .header-content {
    grid-template-columns: auto auto auto;
    justify-content: space-between;
    gap: 0.5rem;
  }
  
  .logo-image {
    height: 28px;
  }
  
  .logo-text h1 {
    font-size: 1.2rem;
  }
  
  .logo-text span {
    font-size: 0.7rem;
  }
  
  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid #eee;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    justify-self: stretch;
    grid-column: 1 / -1;
    z-index: 100;
  }
  
  .nav.active {
    display: flex;
  }
  
  .nav a {
    padding: 1rem;
    border-radius: 0;
    border-bottom: 1px solid #f0f0f0;
    justify-content: flex-start;
    border-bottom: none;
  }
  
  .nav a.active {
    background: rgba(255, 140, 0, 0.1);
    border-left: 3px solid #FF8C00;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .search-container {
    margin: 0 0.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .logo-image {
    height: 26px;
  }
  
  .logo-text h1 {
    font-size: 1.1rem;
  }
  
  .logo-text span {
    font-size: 0.65rem;
  }
  
  .header-actions {
    gap: 0.25rem;
  }
  
  .search-toggle,
  .menu-toggle {
    padding: 0.3rem;
    min-width: 28px;
    min-height: 28px;
  }
}

/* Force consistent positioning */
@media (min-width: 769px) {
  .menu-toggle {
    display: none !important;
  }
  
  .nav {
    justify-self: center !important;
  }
}
</style>