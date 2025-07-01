/**
 * JesusCorner - Sistema de Recomendaciones (Versión Estática Limpia)
 * Sistema que carga productos reales desde products-data.json
 */

// Variables globales
let currentProducts = [];
let filteredProducts = [];
let isLoading = false;
let currentCategory = 'all';
let searchTerm = '';

// Elementos del DOM
let productsGrid, loadingIndicator, noProductsMessage;
let searchInput, clearSearchBtn, categoryFilters, resultsCounter;

// Inicializar cuando se carga la página
function initializeRecommendations() {
  console.log('🚀 Iniciando sistema de recomendaciones...');
  
  // Obtener elementos del DOM
  productsGrid = document.getElementById('productsGrid');
  loadingIndicator = document.getElementById('loadingIndicator');
  noProductsMessage = document.getElementById('noProductsMessage');
  searchInput = document.getElementById('searchInput');
  clearSearchBtn = document.getElementById('clearSearch');
  categoryFilters = document.querySelectorAll('.filter-btn');
  resultsCounter = document.getElementById('resultsCount');
  
  console.log('📋 Elementos encontrados:', {
    productsGrid: !!productsGrid,
    loadingIndicator: !!loadingIndicator,
    noProductsMessage: !!noProductsMessage,
    searchInput: !!searchInput,
    clearSearchBtn: !!clearSearchBtn,
    categoryFilters: categoryFilters.length,
    resultsCounter: !!resultsCounter
  });
  
  if (!productsGrid) {
    console.error('❌ No se encontró el elemento productsGrid');
    return;
  }
  
  // Inicializar event listeners
  initializeEventListeners();
  
  // Cargar productos
  loadProducts();
}

// Inicializar event listeners para buscador y filtros
function initializeEventListeners() {
  console.log('🔗 Inicializando event listeners...');
  
  // Buscador
  if (searchInput) {
    console.log('✅ Conectando buscador');
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  } else {
    console.error('❌ No se encontró searchInput');
  }
  
  // Botón limpiar búsqueda
  if (clearSearchBtn) {
    console.log('✅ Conectando botón limpiar');
    clearSearchBtn.addEventListener('click', clearSearch);
  } else {
    console.error('❌ No se encontró clearSearchBtn');
  }
  
  // Filtros de categoría
  if (categoryFilters && categoryFilters.length > 0) {
    console.log(`✅ Conectando ${categoryFilters.length} filtros de categoría`);
    categoryFilters.forEach((btn, index) => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        console.log(`🔄 Filtro clickeado: ${category}`);
        setActiveCategory(category);
      });
    });
  } else {
    console.error('❌ No se encontraron filtros de categoría');
  }
}

// Manejar búsqueda
function handleSearch(e) {
  searchTerm = e.target.value.trim().toLowerCase();
  console.log(`🔍 Búsqueda: "${searchTerm}"`);
  
  // Mostrar/ocultar botón de limpiar
  if (clearSearchBtn) {
    clearSearchBtn.style.display = searchTerm ? 'block' : 'none';
  }
  
  // Aplicar filtros
  applyFilters();
}

// Limpiar búsqueda
function clearSearch() {
  if (searchInput) {
    searchInput.value = '';
    searchTerm = '';
  }
  if (clearSearchBtn) {
    clearSearchBtn.style.display = 'none';
  }
  applyFilters();
  searchInput.focus();
}

// Establecer categoría activa
function setActiveCategory(category) {
  console.log(`🏷️ Estableciendo categoría activa: ${category}`);
  currentCategory = category;
  
  // Actualizar botones activos
  categoryFilters.forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.querySelector(`[data-category="${category}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    console.log(`✅ Botón activado: ${category}`);
  } else {
    console.error(`❌ No se encontró botón para categoría: ${category}`);
  }
  
  // Aplicar filtros
  applyFilters();
}

// Aplicar filtros combinados (búsqueda + categoría)
function applyFilters() {
  if (!currentProducts.length) {
    console.log('⚠️ No hay productos para filtrar');
    return;
  }
  
  console.log(`🔄 Aplicando filtros - Categoría: "${currentCategory}", Búsqueda: "${searchTerm}"`);
  
  filteredProducts = currentProducts.filter(product => {
    // Filtro por categoría
    const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
    
    // Filtro por búsqueda
    const searchMatch = !searchTerm || 
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      getBadgeFromCategory(product.category).toLowerCase().includes(searchTerm);
    
    return categoryMatch && searchMatch;
  });
  
  console.log(`📊 Productos filtrados: ${filteredProducts.length} de ${currentProducts.length}`);
  
  // Renderizar productos filtrados
  renderFilteredProducts();
  updateResultsCounter();
}

// Renderizar productos filtrados
function renderFilteredProducts() {
  if (!productsGrid) return;
  
  if (filteredProducts.length === 0) {
    showNoProducts();
    return;
  }
  
  // Ocultar mensaje de no productos
  if (noProductsMessage) {
    noProductsMessage.style.display = 'none';
  }
  
  // Mostrar grid
  productsGrid.style.display = 'grid';
  
  const productsHTML = filteredProducts.map(product => createProductCard(product)).join('');
  productsGrid.innerHTML = productsHTML;
  
  // Añadir event listeners para los botones de compra
  addProductEventListeners();
}

// Actualizar contador de resultados
function updateResultsCounter() {
  if (!resultsCounter) return;
  
  const total = currentProducts.length;
  const filtered = filteredProducts.length;
  
  let message = '';
  if (searchTerm || currentCategory !== 'all') {
    message = `Mostrando <strong>${filtered}</strong> de <strong>${total}</strong> productos`;
    if (searchTerm) {
      message += ` para "<strong>${searchTerm}</strong>"`;
    }
    if (currentCategory !== 'all') {
      const categoryName = getBadgeFromCategory(currentCategory);
      message += ` en <strong>${categoryName}</strong>`;
    }
  } else {
    message = `Mostrando <strong>${total}</strong> productos recomendados`;
  }
  
  resultsCounter.innerHTML = message;
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
    
    // Inicializar productos filtrados con todos los productos
    filteredProducts = [...currentProducts];
    
    renderFilteredProducts();
    updateResultsCounter();
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

// Renderizar productos (función legacy - ahora usa renderFilteredProducts)
function renderProducts() {
  renderFilteredProducts();
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
  
  // Usar setTimeout para asegurar que todos los elementos estén disponibles
  setTimeout(() => {
    if (document.getElementById('productsGrid')) {
      console.log('✅ Página de recomendaciones detectada');
      initializeRecommendations();
    } else {
      console.log('ℹ️ No es la página de recomendaciones');
    }
  }, 100);
});

console.log('✅ Script de recomendaciones cargado (versión estática)');
