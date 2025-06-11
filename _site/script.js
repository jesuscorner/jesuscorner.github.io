/**
 * JesusCorner - Sistema de Recomendaciones Amazon (Versión Dinámica)
 * 
 * CÓMO AGREGAR PRODUCTOS:
 * Solo necesitas agregar el enlace de Amazon con tu código de afiliado
 * El sistema obtendrá automáticamente título, precio, imagen, rating, etc.
 */

// Importar servicio de Amazon
import AmazonProductService from './amazon-service.js';

// Configuración de productos - Solo necesitas: enlace de Amazon y categoría
const simpleProductsConfig = [
  {
    amazonUrl: "https://amzn.eu/d/e2dsva2", // Tu enlace de afiliado
    category: "tech"
  },
  {
    amazonUrl: "https://amzn.eu/d/2p8o1AC", 
    category: "peripherals"
  },
  {
    amazonUrl: "https://amzn.eu/d/1ebvVnb",
    category: "storage"
  },
  {
    amazonUrl: "https://amzn.eu/d/aElx9R0",
    category: "tech"
  }
];

// Servicio para obtener datos de Amazon
const amazonService = new AmazonProductService();

// Variables globales
let productsData = [];
let currentFilter = 'all';

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadingElement = document.getElementById('loading');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Iniciando aplicación...');
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  initializeSearch();
  showLoading();
  
  processProducts().then(() => {
    renderAllProducts();
    hideLoading();
    console.log('✅ Aplicación cargada correctamente');
  }).catch((error) => {
    console.error('❌ Error al cargar productos:', error);
    hideLoading();
  });
}

// Procesar productos obteniendo datos dinámicamente de Amazon
async function processProducts() {
  productsData = [];
  
  console.log(`🔄 Obteniendo datos de ${simpleProductsConfig.length} productos desde Amazon...`);
  
  for (let i = 0; i < simpleProductsConfig.length; i++) {
    const config = simpleProductsConfig[i];
    
    try {
      // Mostrar producto placeholder mientras se cargan los datos
      const placeholderProduct = createPlaceholderProduct(config, `product-${i + 1}`);
      productsData.push(placeholderProduct);
      
      // Obtener datos reales de Amazon
      console.log(`📡 Obteniendo datos del producto ${i + 1}...`);
      const amazonData = await amazonService.getProductData(config.amazonUrl);
      
      // Actualizar con datos reales
      const realProduct = {
        id: `product-${i + 1}`,
        title: amazonData.title,
        price: amazonData.price,
        originalPrice: amazonData.originalPrice || null,
        image: amazonData.image,
        amazonUrl: config.amazonUrl,
        category: config.category,
        rating: amazonData.rating,
        reviewCount: amazonData.reviewCount,
        availability: amazonData.availability,
        lastUpdated: amazonData.lastUpdated,
        isRealData: !amazonData.isFallback,
        badge: generateRandomBadge()
      };
      
      // Reemplazar placeholder con datos reales
      productsData[i] = realProduct;
      
      // Actualizar UI en tiempo real
      updateProductInUI(realProduct, i);
      
      console.log(`✅ Producto ${i + 1} actualizado: ${realProduct.title}`);
      
    } catch (error) {
      console.error(`❌ Error obteniendo datos del producto ${i + 1}:`, error);
      
      // Mantener placeholder en caso de error
      productsData[i].error = error.message;
      productsData[i].isRealData = false;
    }
    
    // Pequeña pausa para evitar sobrecarga
    if (i < simpleProductsConfig.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.log(`📦 ${productsData.length} productos procesados`);
}

// Crear producto placeholder para carga inmediata
function createPlaceholderProduct(config, id) {
  return {
    id: id,
    title: 'Cargando producto...',
    price: 'Obteniendo precio...',
    originalPrice: null,
    image: generateLoadingImage(),
    amazonUrl: config.amazonUrl,
    category: config.category,
    rating: '...',
    reviewCount: '...',
    availability: 'Verificando...',
    isLoading: true,
    isRealData: false,
    badge: null
  };
}

// Generar badge aleatorio
function generateRandomBadge() {
  const badges = ["Bestseller", "Oferta", "Nuevo", "Recomendado", "Más vendido"];
  return Math.random() > 0.7 ? badges[Math.floor(Math.random() * badges.length)] : null;
}

// Generar imagen de carga
function generateLoadingImage() {
  return 'https://via.placeholder.com/300x200/e9ecef/6c757d?text=Cargando...';
}

// Actualizar producto en la UI en tiempo real
function updateProductInUI(product, index) {
  const productCard = document.querySelector(`[data-product-index="${index}"]`);
  if (productCard) {
    // Actualizar contenido del producto
    productCard.innerHTML = createProductCardContent(product);
    productCard.classList.add('updated');
    
    // Animación de actualización
    setTimeout(() => {
      productCard.classList.remove('updated');
    }, 1000);
  }
}

// Extraer ASIN de URL de Amazon
function extractASINFromUrl(url) {
  try {
    const patterns = [
      /\/d\/([A-Z0-9]{7,10})/i,
      /\/dp\/([A-Z0-9]{10})/i,
      /\/gp\/product\/([A-Z0-9]{10})/i,
      /asin=([A-Z0-9]{10})/i
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  } catch (error) {
    console.error('Error extrayendo ASIN:', error);
    return null;
  }
}

// Generar imagen placeholder con imágenes mejoradas
function generatePlaceholderImage(title) {
  const titleLower = title.toLowerCase();
  
  // Imágenes específicas por tipo de producto
  const productImages = {
    'ratón': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop&auto=format',
    'mouse': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop&auto=format',
    'monitor': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop&auto=format',
    'pantalla': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop&auto=format',
    'teclado': 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop&auto=format',
    'keyboard': 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop&auto=format',
    'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop&auto=format',
    'portátil': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop&auto=format',
    'gaming': 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&h=200&fit=crop&auto=format'
  };
  
  // Buscar imagen específica por palabra clave
  for (const [keyword, imageUrl] of Object.entries(productImages)) {
    if (titleLower.includes(keyword)) {
      return imageUrl;
    }
  }
  
  // Fallback con placeholder personalizado
  const text = encodeURIComponent(title.substring(0, 25));
  return `https://via.placeholder.com/300x200/6366f1/ffffff?text=${text}`;
}

// Renderizar todos los productos
function renderAllProducts() {
  if (!productsGrid) return;
  
  const filteredProducts = currentFilter === 'all' 
    ? productsData 
    : productsData.filter(product => product.category === currentFilter);
  
  productsGrid.innerHTML = filteredProducts.map((product, index) => createProductCard(product, index)).join('');
  
  // Animar entrada de productos
  setTimeout(() => {
    document.querySelectorAll('.product-card').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('showing');
      }, index * 100);
    });
  }, 50);
}

// Crear tarjeta HTML para un producto
function createProductCard(product, index = 0) {
  return `
    <div class="product-card ${product.isLoading ? 'loading' : ''}" 
         data-category="${product.category}" 
         data-product-index="${index}">
      ${createProductCardContent(product)}
    </div>
  `;
}

// Crear contenido de la tarjeta (separado para actualizaciones)
function createProductCardContent(product) {
  const badgeHTML = product.badge 
    ? `<div class="product-badge">${product.badge}</div>` 
    : '';
  
  const originalPriceHTML = product.originalPrice 
    ? `<span class="original-price">€${product.originalPrice}</span>` 
    : '';
  
  const loadingClass = product.isLoading ? 'loading' : '';
  const realDataClass = product.isRealData ? 'real-data' : '';
  
  return `
    ${badgeHTML}
    <div class="product-image-container ${loadingClass}">
      <img 
        src="${product.image}" 
        alt="${product.title}" 
        class="product-image ${loadingClass}"
        onerror="this.src='${generatePlaceholderImage(product.title)}'"
      >
      ${product.isLoading ? '<div class="loading-spinner"></div>' : ''}
    </div>
    <div class="product-content ${realDataClass}">
      <h3 class="product-title ${loadingClass}">${product.title}</h3>
      <div class="product-price ${loadingClass}">
        ${product.price}${originalPriceHTML}
      </div>
      <div class="product-rating ${loadingClass}">
        <div class="stars">${generateStars(product.rating)}</div>
        <span class="rating-text">${product.rating} (${product.reviewCount})</span>
      </div>
      ${product.availability ? `<div class="availability">${product.availability}</div>` : ''}
      <a href="${product.amazonUrl}" target="_blank" class="product-btn ${loadingClass}">
        Ver en Amazon
      </a>
      ${product.lastUpdated ? `<div class="last-updated">Actualizado: ${new Date(product.lastUpdated).toLocaleTimeString()}</div>` : ''}
    </div>
  `;
}

// Configurar event listeners
function setupEventListeners() {
  // Filtros de categoría
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      filterProducts(category);
    });
  });
}

// Filtrar productos por categoría
function filterProducts(category) {
  currentFilter = category;
  renderAllProducts();
}

// Inicializar búsqueda
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const searchResults = document.getElementById('searchResults');
  
  if (!searchInput) return;
  
  // Función de búsqueda
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // Mostrar todos los productos filtrados por categoría
      renderAllProducts();
      if (searchResults) {
        searchResults.textContent = '';
        searchResults.classList.remove('no-results');
      }
      if (searchClear) searchClear.style.display = 'none';
      return;
    }
    
    // Filtrar productos por término de búsqueda
    const filteredProducts = productsData.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm);
      const matchesCategory = currentFilter === 'all' || product.category === currentFilter;
      return matchesSearch && matchesCategory;
    });
    
    // Renderizar resultados
    if (filteredProducts.length > 0) {
      productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
      if (searchResults) {
        searchResults.textContent = `${filteredProducts.length} producto(s) encontrado(s)`;
        searchResults.classList.remove('no-results');
      }
    } else {
      productsGrid.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 40px;"><h3>No se encontraron productos</h3><p>Intenta con otros términos de búsqueda</p></div>';
      if (searchResults) {
        searchResults.textContent = 'No se encontraron productos';
        searchResults.classList.add('no-results');
      }
    }
    
    if (searchClear) searchClear.style.display = 'block';
    
    // Animar entrada de productos
    setTimeout(() => {
      document.querySelectorAll('.product-card').forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('showing');
        }, index * 50);
      });
    }, 50);
  }
  
  // Event listeners para búsqueda
  searchInput.addEventListener('input', performSearch);
  
  if (searchClear) {
    searchClear.addEventListener('click', function() {
      searchInput.value = '';
      performSearch();
    });
  }
  
  // Exportar función globalmente
  window.performSearch = performSearch;
}

// Generar HTML de estrellas para rating
function generateStars(rating) {
  if (rating === '--' || !rating) return '★★★★★';
  
  const numRating = parseFloat(rating);
  const fullStars = Math.floor(numRating);
  const hasHalfStar = numRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
}

// Mostrar/ocultar indicador de carga
function showLoading() {
  if (loadingElement) {
    loadingElement.classList.add('show');
  }
}

function hideLoading() {
  if (loadingElement) {
    loadingElement.classList.remove('show');
  }
}

// Funciones adicionales útiles
function addSimpleProduct(title, amazonUrl, category) {
  console.log('Para agregar un producto, añádelo a simpleProductsConfig y recarga la página');
  console.log('Formato: { title: "' + title + '", amazonUrl: "' + amazonUrl + '", category: "' + category + '" }');
}

// Función para copiar enlace de producto
function copyProductLink(productId) {
  const product = productsData.find(p => p.id === productId);
  if (product) {
    navigator.clipboard.writeText(product.amazonUrl).then(() => {
      showNotification('Enlace copiado al portapapeles');
    });
  }
}

// Sistema de notificaciones
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

// Exportar funciones útiles
window.addSimpleProduct = addSimpleProduct;
window.copyProductLink = copyProductLink;
window.refreshAllProducts = refreshAllProducts;
window.refreshSingleProduct = refreshSingleProduct;

// Funciones de actualización
async function refreshAllProducts() {
  console.log('🔄 Actualizando todos los productos...');
  showLoading();
  
  // Limpiar cache
  amazonService.clearCache();
  
  // Reprocesar productos
  await processProducts();
  renderAllProducts();
  
  hideLoading();
  showNotification('Todos los productos han sido actualizados');
}

async function refreshSingleProduct(index) {
  const config = simpleProductsConfig[index];
  if (!config) return;
  
  console.log(`🔄 Actualizando producto ${index + 1}...`);
  
  try {
    const amazonData = await amazonService.refreshProduct(config.amazonUrl);
    
    const updatedProduct = {
      id: `product-${index + 1}`,
      title: amazonData.title,
      price: amazonData.price,
      originalPrice: amazonData.originalPrice || null,
      image: amazonData.image,
      amazonUrl: config.amazonUrl,
      category: config.category,
      rating: amazonData.rating,
      reviewCount: amazonData.reviewCount,
      availability: amazonData.availability,
      lastUpdated: amazonData.lastUpdated,
      isRealData: !amazonData.isFallback,
      badge: generateRandomBadge()
    };
    
    productsData[index] = updatedProduct;
    updateProductInUI(updatedProduct, index);
    
    showNotification(`Producto actualizado: ${updatedProduct.title}`);
  } catch (error) {
    console.error('Error actualizando producto:', error);
    showNotification('Error al actualizar el producto');
  }
}

// Configurar actualizaciones automáticas
function setupAutoRefresh() {
  // Actualizar cada 30 minutos
  setInterval(() => {
    console.log('🕐 Actualización automática programada...');
    refreshAllProducts();
  }, 30 * 60 * 1000);
}

// Inicializar actualizaciones automáticas al cargar
document.addEventListener('DOMContentLoaded', function() {
  setupAutoRefresh();
});

console.log('🎯 Sistema de recomendaciones dinámico cargado');
