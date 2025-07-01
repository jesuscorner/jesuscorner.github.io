---
layout: default
title: "Recomendaciones"
description: "Las mejores ofertas y productos recomendados en tecnología"
---

<section class="recommendations-hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Recomendaciones <span class="highlight">TOP</span></h1>
      <p class="hero-subtitle">Las mejores ofertas que he encontrado y probado personalmente</p>
    </div>
  </div>
</section>

<!-- Sección de buscador y filtros -->
<section class="search-filters">
  <div class="container">
    <div class="search-filter-container">
      <!-- Buscador -->
      <div class="search-box">
        <div class="search-input-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Buscar productos..." 
            class="search-input"
            autocomplete="off"
          >
          <button id="clearSearch" class="clear-search" style="display: none;">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Filtros por categoría -->
      <div class="category-filters">
        <button class="filter-btn active" data-category="all">
          <i class="fas fa-th-large"></i>
          Todos
        </button>
        <button class="filter-btn" data-category="tech">
          <i class="fas fa-laptop"></i>
          Tech
        </button>
        <button class="filter-btn" data-category="peripherals">
          <i class="fas fa-keyboard"></i>
          Periféricos
        </button>
        <button class="filter-btn" data-category="audio">
          <i class="fas fa-headphones"></i>
          Audio
        </button>
        <button class="filter-btn" data-category="wearables">
          <i class="fas fa-watch"></i>
          Wearables
        </button>
      </div>

      <!-- Contador de resultados -->
      <div class="results-counter">
        <span id="resultsCount">Cargando productos...</span>
      </div>
    </div>
  </div>
</section>

<section class="recommendations-content">
  <div class="container">
    <div class="products-grid" id="productsGrid">
      <!-- Los productos se cargarán dinámicamente -->
    </div>

    <div class="loading-indicator" id="loadingIndicator">
      <div class="spinner"></div>
      <p>Cargando las mejores ofertas...</p>
    </div>

    <div class="no-products-message" id="noProductsMessage" style="display: none;">
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h3>No se encontraron productos</h3>
        <p>Intenta con otro término de búsqueda o filtro diferente.</p>
      </div>
    </div>
  </div>
</section>

<!-- Scripts específicos para recomendaciones -->
<script src="{{ '/recommendations-script.js' | relative_url }}"></script>

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

/* Recommendations Hero Section */
.recommendations-hero {
  background: linear-gradient(135deg, #4A90E2 0%, #FF8C00 100%);
  color: white;
  min-height: calc(100vh - 42px);
  display: flex;
  align-items: center;
  padding: 4rem 0;
  text-align: center;
}

.recommendations-hero .hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.recommendations-hero .hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.recommendations-hero .highlight {
  color: #FFD700;
}

.recommendations-hero .hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

/* Content Section */
.recommendations-content {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.container > p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  max-width: 600px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.loading-indicator {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #FF8C00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  color: #FF8C00;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.5rem;
}

.empty-state p {
  color: #666;
  font-size: 1rem;
}

/* Estilos para las tarjetas de productos */
.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #e5e7eb;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  z-index: 2;
  color: white;
}

.product-badge.bestseller {
  background: #FF6B6B;
}

.product-badge.recomendado {
  background: #4ECDC4;
}

.product-badge.mejor-precio {
  background: #45B7D1;
}

.discount-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #FF8C00;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars i {
  color: #FFD700;
  font-size: 0.9rem;
}

.rating-text {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.review-count {
  color: #666;
  font-size: 0.85rem;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF8C00;
}

.original-price {
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
}

.buy-button {
  width: 100%;
  background: #FF8C00;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.buy-button:hover {
  background: #e6790e;
  transform: translateY(-1px);
}

.buy-button:active {
  transform: translateY(0);
}

.buy-button i {
  font-size: 1.1rem;
}

/* Estilos para buscador y filtros */
.search-filters {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.search-filter-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

/* Buscador */
.search-box {
  width: 100%;
  max-width: 500px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(255, 140, 0, 0.2);
  border-radius: 50px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-input:focus {
  outline: none;
  border-color: #FF8C00;
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.2);
  transform: translateY(-2px);
}

.search-icon {
  position: absolute;
  left: 1.2rem;
  color: #FF8C00;
  font-size: 1.1rem;
  z-index: 10;
}

.clear-search {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-search:hover {
  background: rgba(255, 140, 0, 0.1);
  color: #FF8C00;
}

/* Filtros por categoría */
.category-filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  background: white;
  border: 2px solid rgba(255, 140, 0, 0.2);
  color: #666;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  min-width: 100px;
  justify-content: center;
}

.filter-btn:hover {
  background: rgba(255, 140, 0, 0.1);
  border-color: rgba(255, 140, 0, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2);
}

.filter-btn.active {
  background: linear-gradient(135deg, #FF8C00, #FF6B00);
  color: white;
  border-color: #FF8C00;
  box-shadow: 0 4px 16px rgba(255, 140, 0, 0.3);
}

.filter-btn.active:hover {
  background: linear-gradient(135deg, #e6790e, #e65a00);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4);
}

/* Contador de resultados */
.results-counter {
  color: #666;
  font-size: 0.95rem;
  text-align: center;
  margin-top: 0.5rem;
}

.results-counter strong {
  color: #FF8C00;
  font-weight: 700;
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

/* Responsive para las tarjetas */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .product-info {
    padding: 1rem;
  }
  
  .product-title {
    font-size: 1rem;
  }
  
  .current-price {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .product-image {
    height: 180px;
  }
}
</style>
