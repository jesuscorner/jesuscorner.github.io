/**
 * JesusCorner - Sistema de Recomendaciones (Versión Estática Limpia)
 * Sistema que carga productos reales desde products-data.json
 */

// Variables globales
let currentProducts = [];
let isLoading = false;

// Elementos del DOM
let productsGrid, loadingIndicator, noProductsMessage;

// Inicializar cuando se carga la página
function initializeRecommendations() {
  console.log('🚀 Iniciando sistema de recomendaciones...');
  
  // Obtener elementos del DOM
  productsGrid = document.getElementById('productsGrid');
  loadingIndicator = document.getElementById('loadingIndicator');
  noProductsMessage = document.getElementById('noProductsMessage');
  
  console.log('📋 Elementos encontrados:', {
    productsGrid: !!productsGrid,
    loadingIndicator: !!loadingIndicator,
    noProductsMessage: !!noProductsMessage
  });
  
  if (!productsGrid) {
    console.error('❌ No se encontró el elemento productsGrid');
    return;
  }
  
  // Cargar productos
  loadProducts();
}

// Cargar productos desde products-data.json
async function loadProducts() {
  console.log('📦 Cargando productos desde JSON...');
  showLoading(true);
  
  try {
    const response = await fetch('/products-data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Convertir datos del JSON (formato simplificado)
    currentProducts = data.products.map(product => ({
      id: product.id,
      title: product.title,
      image: product.image,
      amazonUrl: product.amazonUrl,
      category: product.category,
      badge: getBadgeFromCategory(product.category)
    }));
    
    renderProducts();
    showLoading(false);
    console.log('✅ Productos cargados:', currentProducts.length);
    
  } catch (error) {
    console.error('❌ Error cargando productos:', error);
    showLoading(false);
    showNoProducts();
  }
}

// Calcular descuento - ELIMINADO (no necesario para versión estática)

// Obtener badge basado en categoría
function getBadgeFromCategory(category) {
  const badges = {
    'tech': 'Tech',
    'audio': 'Audio',
    'peripherals': 'Periféricos',
    'wearables': 'Wearables'
  };
  return badges[category] || 'Recomendado';
}

// Generar descripción basada en el título y categoría
function generateDescription(title, category) {
  const descriptions = {
    'tech': 'Tecnología de última generación con excelente rendimiento y calidad.',
    'audio': 'Sonido de alta calidad con la mejor tecnología del mercado.',
    'peripherals': 'Periférico de alta precisión diseñado para profesionales.',
    'wearables': 'Dispositivo inteligente con funciones avanzadas.',
    'storage': 'Solución de almacenamiento confiable y de alta velocidad.'
  };
  
  // Usar descripción específica o genérica
  return descriptions[category] || 'Producto de alta calidad recomendado por expertos.';
}

// Mostrar/ocultar indicador de carga
function showLoading(show) {
  if (loadingIndicator) {
    loadingIndicator.style.display = show ? 'block' : 'none';
  }
  if (productsGrid) {
    productsGrid.style.display = show ? 'none' : 'grid';
  }
}

// Renderizar productos
function renderProducts() {
  if (!productsGrid) return;
  
  if (currentProducts.length === 0) {
    showNoProducts();
    return;
  }
  
  const productsHTML = currentProducts.map(product => createProductCard(product)).join('');
  productsGrid.innerHTML = productsHTML;
  
  // Añadir event listeners para los botones de compra
  addProductEventListeners();
}

// Mostrar mensaje de no productos
function showNoProducts() {
  if (noProductsMessage) {
    noProductsMessage.style.display = 'block';
  }
  if (productsGrid) {
    productsGrid.style.display = 'none';
  }
}

// Crear tarjeta de producto (versión compacta sin descripciones)
function createProductCard(product) {
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-badge ${product.badge.toLowerCase().replace(' ', '-')}">${product.badge}</div>
      
      <div class="product-image">
        <img src="${product.image}" 
             alt="${product.title}" 
             loading="lazy" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="image-fallback" style="display:none;">
          <i class="fas fa-image"></i>
          <span>Imagen no disponible</span>
        </div>
      </div>
      
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        
        <button class="buy-button" data-amazon-url="${product.amazonUrl}">
          <i class="fab fa-amazon"></i>
          Ver en Amazon
        </button>
      </div>
    </div>
  `;
}

// Funciones de generación eliminadas (estrellas, fallbacks complejos, etc.)
// Ya no necesitamos precios ni ratings falsos

// Añadir event listeners a los productos
function addProductEventListeners() {
  const buyButtons = document.querySelectorAll('.buy-button');
  
  buyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const amazonUrl = this.getAttribute('data-amazon-url');
      
      // Abrir en nueva pestaña
      window.open(amazonUrl, '_blank', 'noopener,noreferrer');
      
      // Analytics (opcional)
      console.log('🛒 Click en producto:', amazonUrl);
    });
  });
}

// Funciones de actualización eliminadas (eran simuladas)

// Función global para ser llamada desde recommendations.md
window.loadProducts = loadProducts;
window.initializeRecommendations = initializeRecommendations;

// Auto-inicializar si estamos en la página de recomendaciones
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔄 DOM cargado, buscando página de recomendaciones...');
  
  if (document.getElementById('productsGrid')) {
    console.log('✅ Página de recomendaciones detectada');
    initializeRecommendations();
  } else {
    console.log('ℹ️ No es la página de recomendaciones');
  }
});

console.log('✅ Script de recomendaciones cargado (versión estática)');
