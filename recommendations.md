---
layout: default
title: "Recomendaciones"
description: "Las mejores ofertas y productos recomendados en tecnología"
---

<section class="hero">
  <div class="container">
    <div class="hero-content-single">
      <h1 class="hero-title">Recomendaciones <span class="highlight">TOP</span></h1>
      <p class="hero-subtitle">Las mejores ofertas que he encontrado y probado personalmente</p>
    </div>
  </div>
</section>

<section class="content-section" style="background: white; padding: 4rem 0;">
  <div class="container">
    
    <div class="affiliate-notice-top">
      <h4><i class="fas fa-info-circle"></i> Aviso de Transparencia</h4>
      <p><strong>Los enlaces marcados con 🔗 son enlaces de afiliado.</strong> Si compras a través de ellos, recibo una pequeña comisión sin coste adicional para ti. Solo recomiendo productos que he probado personalmente o investigado exhaustivamente. <a href="/affiliate/">Más información sobre nuestra política de afiliados</a>.</p>
    </div>
    
    <!-- Sección de buscador y filtros -->
    <div class="search-filter-container">
      <div class="search-filter-row">
        <!-- Buscador -->
        <div class="search-box">
          <div class="search-input-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input 
              type="text" 
              id="recommendationsSearchInput" 
              placeholder="Buscar productos..." 
              class="search-input"
              autocomplete="off"
            >
            <button id="clearSearch" class="clear-search" style="display: none;">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Filtro desplegable -->
        <div class="category-dropdown">
          <div class="select-wrapper">
            <select id="categorySelect" class="category-select">
              <option value="all">Todas las categorías</option>
              <option value="tech">💻 Tech</option>
              <option value="peripherals">⌨️ Periféricos</option>
              <option value="audio">🎧 Audio</option>
              <option value="wearables">⌚ Wearables</option>
            </select>
            <div class="select-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contador de resultados -->
    <div class="results-section">
      <div class="results-counter">
        <span id="resultsCount">Cargando productos...</span>
      </div>
    </div>

    <div class="products-container">
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
  </div>
</section>

<!-- Scripts específicos para recomendaciones -->
<script src="{{ '/recommendations-script.js' | relative_url }}?v={{ 'now' | date: '%s' }}"></script>

