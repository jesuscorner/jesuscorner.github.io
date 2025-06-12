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
        <p>Intenta con otro término de búsqueda o revisa más tarde.</p>
      </div>
    </div>
  </div>
</section>

<!-- Scripts específicos para recomendaciones -->
<script src="{{ '/script.js' | relative_url }}"></script>
<script>
// Inicializar la página de recomendaciones
document.addEventListener('DOMContentLoaded', function() {
  if (typeof loadProducts === 'function') {
    loadProducts();
  }
});
</script>

<style>
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

/* Responsive Design */
@media (max-width: 768px) {
  .recommendations-hero {
    min-height: calc(100vh - 50px);
    padding: 2rem 0;
  }
  
  .recommendations-hero .hero-title {
    font-size: 2rem;
  }
  
  .recommendations-hero .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .recommendations-content {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .recommendations-hero .hero-title {
    font-size: 1.8rem;
  }
  
  .recommendations-hero .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
