---
layout: default
title: "Recomendaciones"
description: "Las mejores ofertas y productos recomendados en tecnología"
---

<div class="container">
  <div class="section-header">
    <h1 class="main-title">
      <i class="fas fa-star"></i>
      Recomendaciones TOP
    </h1>
    <p class="section-subtitle">Las mejores ofertas que he encontrado y probado personalmente</p>
  </div>

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
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.main-title i {
  color: #f59e0b;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
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
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
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
  color: #6b7280;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #374151;
}

/* Responsive */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
