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
            <img src="{{ review.image | default: '/favicon/android-chrome-512x512.png' }}" 
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
