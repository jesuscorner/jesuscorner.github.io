/**
 * JesusCorner - Sistema de Recomendaciones (Versión Estática Limpia)
 * Sistema que carga productos reales desde products-data.json
 */

console.log('🚀 SCRIPT DE RECOMENDACIONES CARGADO');

// Variables globales
let currentProducts = [];
let filteredProducts = [];
let isLoading = false;
let currentCategory = 'all';
let searchTerm = '';

// Elementos del DOM
let productsGrid, loadingIndicator, noProductsMessage;
let searchInput, clearSearchBtn, categorySelect, resultsCounter;

// Inicializar cuando se carga la página
function initializeRecommendations() {
  console.log('🚀 Iniciando sistema de recomendaciones...');
  console.log('📍 URL actual:', window.location.href);
  console.log('📍 Pathname:', window.location.pathname);
  
  // Esperar a que el DOM esté completamente cargado
  setTimeout(() => {
    console.log('⏰ DOM listo, buscando elementos...');
    
    // Obtener elementos del DOM
    productsGrid = document.getElementById('productsGrid');
    loadingIndicator = document.getElementById('loadingIndicator');
    noProductsMessage = document.getElementById('noProductsMessage');
    searchInput = document.getElementById('recommendationsSearchInput');
    clearSearchBtn = document.getElementById('clearSearch');
    categorySelect = document.getElementById('categorySelect');
    resultsCounter = document.getElementById('resultsCount');
    
    console.log('📋 Elementos encontrados:', {
      productsGrid: !!productsGrid,
      loadingIndicator: !!loadingIndicator,
      noProductsMessage: !!noProductsMessage,
      searchInput: !!searchInput,
      clearSearchBtn: !!clearSearchBtn,
      categorySelect: !!categorySelect,
      resultsCounter: !!resultsCounter
    });
    
    if (!productsGrid) {
      console.error('❌ No se encontró el elemento productsGrid');
      console.log('📋 Elementos disponibles en el DOM:');
      console.log(document.querySelectorAll('[id]'));
      return;
    }
    
    // Inicializar event listeners
    initializeEventListeners();
    
    // Cargar productos
    loadProducts();
  }, 100);
}

// Inicializar event listeners para buscador y filtros
function initializeEventListeners() {
  console.log('🔗 Inicializando event listeners...');
  
  // Buscador
  if (searchInput) {
    console.log('✅ Conectando buscador');
    
    // Evento simple de input (más confiable)
    searchInput.addEventListener('input', function(e) {
      console.log('📝 Input detectado:', e.target.value);
      handleSearch(e);
    });
    
    // Evento de keyup para casos especiales
    searchInput.addEventListener('keyup', function(e) {
      console.log('⌨️ Keyup detectado:', e.target.value);
      handleSearch(e);
    });
    
    console.log('🔗 Event listeners del buscador configurados');
  } else {
    console.error('❌ No se encontró searchInput');
  }
  
  // Botón limpiar búsqueda
  if (clearSearchBtn) {
    console.log('✅ Conectando botón limpiar');
    clearSearchBtn.addEventListener('click', function() {
      console.log('🗑️ Limpiando búsqueda');
      clearSearch();
    });
  } else {
    console.error('❌ No se encontró clearSearchBtn');
  }
  
  // Desplegable de categorías
  if (categorySelect) {
    console.log('✅ Conectando dropdown de categorías');
    categorySelect.addEventListener('change', function(e) {
      const category = e.target.value;
      console.log(`🔄 Categoría seleccionada: ${category}`);
      setActiveCategory(category);
    });
  } else {
    console.error('❌ No se encontró categorySelect');
  }
}

// Manejar búsqueda
function handleSearch(e) {
  const newSearchTerm = e.target.value.trim().toLowerCase();
  console.log(`🔍 NUEVA BÚSQUEDA: "${newSearchTerm}" (anterior: "${searchTerm}")`);
  
  searchTerm = newSearchTerm;
  
  // Mostrar/ocultar botón de limpiar
  if (clearSearchBtn) {
    clearSearchBtn.style.display = searchTerm ? 'block' : 'none';
  }
  
  // Aplicar filtros inmediatamente
  console.log('🔄 APLICANDO FILTROS DESDE BÚSQUEDA...');
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
  if (searchInput) {
    searchInput.focus();
  }
}

// Establecer categoría activa
function setActiveCategory(category) {
  console.log(`🏷️ Estableciendo categoría activa: ${category}`);
  currentCategory = category;
  
  // Actualizar dropdown
  if (categorySelect) {
    categorySelect.value = category;
    console.log(`✅ Dropdown actualizado: ${category}`);
  } else {
    console.error(`❌ No se encontró dropdown para categoría: ${category}`);
  }
  
  // Aplicar filtros
  applyFilters();
}

// Aplicar filtros combinados (búsqueda + categoría)
function applyFilters() {
  if (!currentProducts || currentProducts.length === 0) {
    console.log('⚠️ No hay productos para filtrar - currentProducts:', currentProducts);
    return;
  }
  
  console.log(`🔄 Aplicando filtros - Categoría: "${currentCategory}", Búsqueda: "${searchTerm}"`);
  console.log(`📦 Productos disponibles:`, currentProducts.length);
  
  filteredProducts = currentProducts.filter(product => {
    // Filtro por categoría
    const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
    
    // Filtro por búsqueda (más amplio)
    const searchMatch = !searchTerm || 
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      getBadgeFromCategory(product.category).toLowerCase().includes(searchTerm);
    
    const result = categoryMatch && searchMatch;
    
    // Debug más detallado solo cuando hay filtros activos
    if ((searchTerm && searchTerm.length > 0) || currentCategory !== 'all') {
      console.log(`🔍 "${product.title}": cat(${product.category})=${categoryMatch}, search="${searchTerm}"=${searchMatch} → ${result}`);
    }
    
    return result;
  });
  
  console.log(`📊 Resultado: ${filteredProducts.length} productos de ${currentProducts.length}`);
  
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
    // Obtener la ruta base correcta basada en la ubicación actual
    const baseUrl = window.location.pathname.includes('/recommendations') 
      ? window.location.origin + '/' 
      : window.location.origin + '/';
    
    // Intentar rutas diferentes para asegurar la carga
    const possiblePaths = [
      'products-data.json',
      '/products-data.json', 
      './products-data.json',
      baseUrl + 'products-data.json'
    ];
    
    let data = null;
    let loadedFrom = '';
    
    for (const path of possiblePaths) {
      try {
        console.log(`🔗 Intentando cargar desde: ${path}`);
        const response = await fetch(path);
        console.log(`📡 Response status para ${path}:`, response.status);
        
        if (response.ok) {
          data = await response.json();
          loadedFrom = path;
          break;
        }
      } catch (err) {
        console.log(`❌ Error con ruta ${path}:`, err.message);
      }
    }
    
    if (!data) {
      throw new Error('No se pudo cargar products-data.json desde ninguna ruta');
    }
    
    console.log(`✅ Datos cargados exitosamente desde: ${loadedFrom}`, data);
    processProductData(data);
    
  } catch (error) {
    console.error('❌ Error cargando productos:', error);
    showLoading(false);
    showNoProducts();
  }
}

// Procesar datos de productos
function processProductData(data) {
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
}

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
  }, 500); // Aumentamos el timeout para asegurar carga completa
});

// Fallback adicional para asegurar inicialización
window.addEventListener('load', function() {
  setTimeout(() => {
    if (document.getElementById('productsGrid') && currentProducts.length === 0) {
      console.log('🔄 Fallback: reinicializando...');
      initializeRecommendations();
    }
  }, 200);
});

console.log('✅ Script de recomendaciones cargado (versión estática)');
