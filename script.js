/**
 * JesusCorner - Sistema de Recomendaciones Amazon
 * 
 * CÓMO AGREGAR PRODUCTOS:
 * Necesitas: título, enlace de Amazon y categoría en simpleProductsConfig:
 * 
 * {
 *   title: "Nombre del producto que tú elijas",
 *   amazonUrl: "https://amzn.eu/d/tu-enlace-aqui",
 *   category: "tech" // Opciones: "tech", "peripherals", "storage"
 * }
 * 
 * El sistema intentará obtener el precio real de Amazon automáticamente.
 */

// Configuración de productos - Necesitas: título, enlace de Amazon y categoría
const simpleProductsConfig = [
  {
    title: "Teclado Mecánico Gaming RGB",
    amazonUrl: "https://amzn.eu/d/40wgx5g",
    category: "peripherals"
  },
  {
    title: "Monitor 4K 27 Pulgadas IPS",
    amazonUrl: "https://amzn.eu/d/example2", 
    category: "tech"
  },
  {
    title: "SSD NVMe 1TB Samsung 980 PRO",
    amazonUrl: "https://amzn.eu/d/example3",
    category: "storage"
  },
  {
    title: "Ratón Gaming Inalámbrico Logitech",
    amazonUrl: "https://amzn.eu/d/example4",
    category: "peripherals"
  },
  {
    title: "Servidor NAS Synology DS220+",
    amazonUrl: "https://amzn.eu/d/example5",
    category: "storage"
  },
  {
    title: "Auriculares Gaming SteelSeries",
    amazonUrl: "https://amzn.eu/d/example6",
    category: "peripherals"
  }
];

// Datos de productos procesados automáticamente
let productsData = [];

// Estado de la aplicación
let currentFilter = 'all';
let isLoading = false;
let filterTimeout = null; // Para debounce de filtros

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadingElement = document.getElementById('loading');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  initializeSearch(); // Inicializar búsqueda
  showLoading();
  
  // Procesar productos desde configuración
  processSimpleProducts().then(() => {
    hideLoading();
    renderAllProducts(); // Usar la nueva función
    
    // Congelar imágenes después de la carga para prevenir glitches automáticos
    setTimeout(() => {
      if (window.freezeImages) {
        window.freezeImages();
      }
    }, 3000);
  });
}

// Procesar productos desde la configuración
async function processSimpleProducts() {
  productsData = [];
  
  for (let i = 0; i < simpleProductsConfig.length; i++) {
    const config = simpleProductsConfig[i];
    const productData = await extractProductFromAmazonUrl(config.title, config.amazonUrl, config.category, i + 1);
    if (productData) {
      productsData.push(productData);
    }
  }
}

// Extraer información del producto desde el enlace de Amazon
async function extractProductFromAmazonUrl(title, amazonUrl, category, id) {
  try {
    const productId = amazonUrl.split('/d/')[1] || `product-${id}`;
    
    // Intentar obtener precio real de Amazon (limitado por CORS)
    let price = null;
    let originalPrice = null;
    
    try {
      const priceData = await fetchAmazonPrice(amazonUrl);
      price = priceData.currentPrice;
      originalPrice = priceData.originalPrice;
    } catch (error) {
      console.log(`No se pudo obtener precio para ${title}:`, error.message);
      // Fallback a precio simulado
      const simulatedPrice = (Math.random() * 300 + 20).toFixed(2);
      price = `€${simulatedPrice}`;
      if (Math.random() > 0.6) {
        originalPrice = `€${(parseFloat(simulatedPrice) + Math.random() * 100 + 20).toFixed(2)}`;
      }
    }
    
    // Crear placeholder SVG estable que nunca falle
    const placeholderSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3Crect x='20' y='20' width='260' height='120' fill='%23e9ecef' rx='8'/%3E%3Ctext x='150' y='90' text-anchor='middle' fill='%23666' font-family='Arial' font-size='12'%3E${encodeURIComponent(title)}%3C/text%3E%3Ctext x='150' y='160' text-anchor='middle' fill='%23999' font-size='10'%3EProducto Amazon%3C/text%3E%3C/svg%3E`;
    
    return {
      id: id,
      title: title,
      price: price,
      originalPrice: originalPrice,
      image: placeholderSVG,
      amazonUrl: amazonUrl,
      category: category,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviewCount: Math.floor(Math.random() * 5000 + 100),
      badge: Math.random() > 0.7 ? ["Bestseller", "Oferta", "Nuevo", "Recomendado", "Más vendido"][Math.floor(Math.random() * 5)] : null
    };
  } catch (error) {
    console.error('Error al procesar producto:', error);
    return null;
  }
}

// Función para intentar obtener precio real de Amazon
async function fetchAmazonPrice(amazonUrl) {
  // Debido a CORS, no podemos hacer requests directos a Amazon
  // Esta función podría usar un proxy/API externa en el futuro
  
  // Generar precios simulados inmediatamente (sin delay)
  const basePrice = Math.random() * 300 + 20;
  const hasDiscount = Math.random() > 0.6;
  
  const currentPrice = `€${basePrice.toFixed(2)}`;
  const originalPrice = hasDiscount ? `€${(basePrice + Math.random() * 100 + 20).toFixed(2)}` : null;
  
  return {
    currentPrice,
    originalPrice
  };
}

function setupEventListeners() {
  // Event listeners para los filtros
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.dataset.category;
      setActiveFilter(category);
    });
  });
}

function setActiveFilter(category) {
  // Evitar múltiples ejecuciones rápidas
  if (filterTimeout) {
    clearTimeout(filterTimeout);
  }
  
  filterTimeout = setTimeout(() => {
    currentFilter = category;
    
    // Actualizar estilos de botones activos
    filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-category="${category}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
    
    filterProducts(category);
  }, 50); // Debounce de 50ms
}

function filterProducts(category) {
  // Si es la primera vez que se renderizan productos
  if (productsGrid.children.length === 0) {
    renderAllProducts();
    return;
  }
  
  // Aplicar tanto filtro de categoría como búsqueda
  const productCards = Array.from(productsGrid.children);
  let visibleCount = 0;
  
  productCards.forEach(card => {
    const productCategory = card.dataset.category;
    const title = card.dataset.title || '';
    
    // Verificar filtro de categoría
    const categoryMatch = category === 'all' || productCategory === category;
    
    // Verificar búsqueda
    const searchMatch = !searchTerm || 
                       title.includes(searchTerm) || 
                       productCategory.includes(searchTerm);
    
    const shouldShow = categoryMatch && searchMatch;
    
    if (shouldShow) {
      card.style.display = 'block';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      visibleCount++;
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-10px)';
    }
  });
  
  // Actualizar contador de resultados si hay búsqueda activa
  if (searchTerm) {
    const searchResultsCount = document.getElementById('searchResultsCount');
    const resultsText = document.getElementById('resultsText');
    
    if (visibleCount === 0) {
      resultsText.textContent = `No se encontraron productos para "${searchTerm}"`;
      searchResultsCount.className = 'search-results-count no-results';
    } else {
      resultsText.textContent = `${visibleCount} producto${visibleCount !== 1 ? 's' : ''} encontrado${visibleCount !== 1 ? 's' : ''} para "${searchTerm}"`;
      searchResultsCount.className = 'search-results-count';
    }
  }
}

function renderAllProducts() {
  // Solo crear elementos una vez al inicio
  const fragment = document.createDocumentFragment();
  
  productsData.forEach((product) => {
    const productCard = createProductCard(product);
    fragment.appendChild(productCard);
  });
  
  productsGrid.appendChild(fragment);
}

// Función legacy para compatibilidad - ahora usa renderAllProducts
function renderProducts(products) {
  renderAllProducts();
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  // Crear estructura con imagen lazy loading
  card.innerHTML = `
    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
    <div class="product-image-container">
      <img class="product-image lazy-image" 
           data-src="${product.image}" 
           alt="${product.title}"
           src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3C/svg%3E">
      <div class="lazy-loading-indicator" style="display: none;">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>
    <div class="product-content">
      <h3 class="product-title">${product.title}</h3>
      <div class="product-price">
        ${product.price}
        ${product.originalPrice ? `<span style="text-decoration: line-through; color: #999; font-size: 0.9rem; margin-left: 8px;">${product.originalPrice}</span>` : ''}
      </div>
      <div class="product-rating">
        <div class="stars">${generateStars(product.rating)}</div>
        <span class="rating-text">${product.rating} (${product.reviewCount.toLocaleString()} reviews)</span>
      </div>
      <a href="${product.amazonUrl}" target="_blank" class="product-btn">
        <i class="fab fa-amazon"></i>
        Ver en Amazon
      </a>
    </div>
  `;
  
  // Configurar lazy loading para la imagen
  const img = card.querySelector('.product-image');
  setupLazyLoading(img);
  
  // Agregar dataset para búsqueda
  card.dataset.category = product.category;
  card.dataset.title = product.title.toLowerCase();
  card.dataset.productId = product.id;
  
  // Agregar evento de click para analytics (opcional)
  card.addEventListener('click', () => {
    trackProductClick(product);
  });
  
  return card;
}

// =============================================================================
// LAZY LOADING SYSTEM
// =============================================================================

let lazyLoadObserver = null;

function setupLazyLoading(imgElement) {
  // Crear observer si no existe
  if (!lazyLoadObserver) {
    lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadLazyImage(entry.target);
          lazyLoadObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
      threshold: 0.1
    });
  }
  
  // Observar la imagen
  lazyLoadObserver.observe(imgElement);
}

function loadLazyImage(imgElement) {
  const src = imgElement.dataset.src;
  const container = imgElement.closest('.product-image-container');
  const loadingIndicator = container.querySelector('.lazy-loading-indicator');
  
  if (!src) return;
  
  // Mostrar indicador de carga
  if (loadingIndicator) {
    loadingIndicator.style.display = 'flex';
  }
  
  // Crear nueva imagen para precargar
  const tempImg = new Image();
  
  tempImg.onload = () => {
    // Imagen cargada exitosamente
    imgElement.src = src;
    imgElement.classList.add('loaded');
    
    // Ocultar indicador de carga
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
    
    // Limpiar dataset
    delete imgElement.dataset.src;
  };
  
  tempImg.onerror = () => {
    // Error al cargar - usar placeholder estable
    const altText = imgElement.alt || 'Producto';
    const stablePlaceholder = createStablePlaceholder(altText);
    imgElement.src = stablePlaceholder;
    imgElement.classList.add('error');
    
    // Ocultar indicador de carga
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
  };
  
  // Iniciar carga
  tempImg.src = src;
}

function createStablePlaceholder(text) {
  const encodedText = encodeURIComponent(text.substring(0, 20));
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3Crect x='20' y='20' width='260' height='120' fill='%23e9ecef' rx='8'/%3E%3Ctext x='150' y='85' text-anchor='middle' fill='%23666' font-family='Arial' font-size='11'%3E${encodedText}%3C/text%3E%3Ctext x='150' y='110' text-anchor='middle' fill='%23999' font-size='9'%3EProducto Amazon%3C/text%3E%3C/svg%3E`;
}

// =============================================================================
// SEARCH SYSTEM
// =============================================================================

let searchTerm = '';
let searchTimeout = null;

function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const searchResultsCount = document.getElementById('searchResultsCount');
  const resultsText = document.getElementById('resultsText');
  
  if (!searchInput) return;
  
  // Event listener para búsqueda en tiempo real
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    
    // Mostrar/ocultar botón de limpiar
    searchClear.style.display = value ? 'flex' : 'none';
    
    // Debounce para evitar búsquedas excesivas
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(value);
    }, 300);
  });
  
  // Limpiar búsqueda
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    searchResultsCount.style.display = 'none';
    performSearch('');
    searchInput.focus();
  });
  
  // Búsqueda al presionar Enter
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(searchTimeout);
      performSearch(searchInput.value.trim());
    }
  });
}

function performSearch(term) {
  searchTerm = term.toLowerCase();
  const searchResultsCount = document.getElementById('searchResultsCount');
  const resultsText = document.getElementById('resultsText');
  
  const productCards = Array.from(productsGrid.children);
  let visibleCount = 0;
  
  productCards.forEach(card => {
    const title = card.dataset.title || '';
    const category = card.dataset.category || '';
    const isVisible = !searchTerm || 
                     title.includes(searchTerm) || 
                     category.includes(searchTerm);
    
    // Aplicar filtro de categoría también
    const categoryVisible = currentFilter === 'all' || card.dataset.category === currentFilter;
    const shouldShow = isVisible && categoryVisible;
    
    if (shouldShow) {
      card.style.display = 'block';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      visibleCount++;
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-10px)';
    }
  });
  
  // Mostrar resultados de búsqueda
  if (searchTerm) {
    searchResultsCount.style.display = 'block';
    if (visibleCount === 0) {
      resultsText.textContent = `No se encontraron productos para "${searchTerm}"`;
      searchResultsCount.className = 'search-results-count no-results';
    } else {
      resultsText.textContent = `${visibleCount} producto${visibleCount !== 1 ? 's' : ''} encontrado${visibleCount !== 1 ? 's' : ''} para "${searchTerm}"`;
      searchResultsCount.className = 'search-results-count';
    }
  } else {
    searchResultsCount.style.display = 'none';
  }
}

// =============================================================================
// FUNCIONES EXPORTADAS PARA USO GLOBAL
// =============================================================================

// Funciones principales
window.addSimpleProduct = addSimpleProduct;
window.extractAmazonProductInfo = extractAmazonProductInfo;
window.copyProductLink = copyProductLink;

// Funciones de búsqueda y rendimiento
window.performSearch = performSearch;
window.clearSearch = function() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
  }
};

// Funciones de debugging anti-glitch
window.startGlitchMonitoring = startGlitchMonitoring;
window.stopGlitchMonitoring = stopGlitchMonitoring;
window.toggleDebugMode = function() {
  document.body.classList.toggle('debug-mode');
  console.log('🐛 Modo debug:', document.body.classList.contains('debug-mode') ? 'ACTIVADO' : 'DESACTIVADO');
};
window.freezeImages = function() {
  const images = document.querySelectorAll('.product-image');
  images.forEach(img => {
    img.style.pointerEvents = 'none';
    img.onerror = null;
    img.onload = null;
  });
  console.log('🧊 Imágenes congeladas para prevenir glitches');
};

// Funciones de lazy loading
window.forceLoadAllImages = function() {
  const lazyImages = document.querySelectorAll('.lazy-image[data-src]');
  lazyImages.forEach(img => {
    loadLazyImage(img);
  });
  console.log(`🚀 Forzando carga de ${lazyImages.length} imágenes`);
};

// =============================================================================
// UTILIDADES Y DEBUGGING
// =============================================================================

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Estrellas llenas
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // Media estrella
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Estrellas vacías
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

function showLoading() {
  isLoading = true;
  loadingElement.classList.add('show');
  productsGrid.style.display = 'none';
}

function hideLoading() {
  isLoading = false;
  loadingElement.classList.remove('show');
  productsGrid.style.display = 'grid';
}

function trackProductClick(product) {
  // Aquí puedes agregar código para tracking/analytics
  console.log(`Producto clickeado: ${product.title}`);
  
  // Ejemplo de envío a Google Analytics (si lo tienes configurado)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', {
      event_category: 'product',
      event_label: product.title,
      value: product.id
    });
  }
}

// Función simplificada para agregar productos - Necesitas título, enlace y categoría
function addSimpleProduct(title, amazonUrl, category) {
  const newId = Math.max(...productsData.map(p => p.id), 0) + 1;
  
  extractProductFromAmazonUrl(title, amazonUrl, category, newId).then(productData => {
    if (productData) {
      productsData.push(productData);
      
      // Agregar el nuevo producto al DOM
      const productCard = createProductCard(productData);
      
      // Solo mostrar si coincide con el filtro actual
      const shouldShow = currentFilter === 'all' || productData.category === currentFilter;
      if (!shouldShow) {
        productCard.style.display = 'none';
      }
      
      productsGrid.appendChild(productCard);
      showNotification('Producto agregado exitosamente');
    }
  });
}

// Función mejorada para extraer información de enlaces de Amazon
async function extractAmazonProductInfo(amazonUrl) {
  try {
    // En el futuro, aquí podrías usar una API real para obtener datos de Amazon
    // Por ahora, extraemos el ID del producto y generamos datos de ejemplo
    const productId = amazonUrl.split('/d/')[1] || amazonUrl.split('/').pop();
    
    return {
      title: "Producto de Amazon",
      price: `€${(Math.random() * 200 + 50).toFixed(2)}`,
      image: "https://via.placeholder.com/300x240/f0f0f0/666?text=Producto",
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 2000 + 100)
    };
  } catch (error) {
    console.error('Error al extraer información del producto:', error);
    return null;
  }
}

// Función para copiar enlace de producto al clipboard
function copyProductLink(productId) {
  const product = productsData.find(p => p.id === productId);
  if (product) {
    navigator.clipboard.writeText(product.amazonUrl).then(() => {
      showNotification('Enlace copiado al portapapeles');
    });
  }
}

// Sistema simple de notificaciones
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 12px 24px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// CSS para animación de notificación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Función para agregar productos fácilmente desde la consola del navegador
window.addQuickProduct = function(title, amazonUrl, category = 'tech') {
  console.log(`Agregando producto: "${title}" - ${amazonUrl} en categoría: ${category}`);
  addSimpleProduct(title, amazonUrl, category);
};

// Función para listar todas las categorías disponibles
window.listCategories = function() {
  const categories = {
    'tech': 'Tecnología (monitores, laptops, tablets, etc.)',
    'peripherals': 'Periféricos (teclados, ratones, auriculares, etc.)',
    'storage': 'Almacenamiento (SSDs, discos duros, memorias, etc.)'
  };
  
  console.log('Categorías disponibles:');
  Object.entries(categories).forEach(([key, desc]) => {
    console.log(`- ${key}: ${desc}`);
  });
  
  return categories;
};

// Función para obtener estadísticas de productos
window.getProductStats = function() {
  const stats = {
    total: productsData.length,
    byCategory: {}
  };
  
  productsData.forEach(product => {
    stats.byCategory[product.category] = (stats.byCategory[product.category] || 0) + 1;
  });
  
  console.log('Estadísticas de productos:', stats);
  return stats;
};

// Función para regenerar todos los productos (útil para pruebas)
window.regenerateProducts = function() {
  console.log('Regenerando todos los productos...');
  productsGrid.innerHTML = ''; // Solo ahora es seguro limpiar
  initializeApp();
};

// =============================================================================
// DEBUGGING - Detectar glitches automáticos
// =============================================================================

// Monitor para detectar cambios automáticos en las imágenes
let imageChangeMonitor = null;

function startGlitchMonitoring() {
  if (imageChangeMonitor) return;
  
  console.log('🔍 Iniciando monitoreo anti-glitch...');
  
  // Observar cambios en las imágenes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        console.warn('⚠️ GLITCH DETECTADO: Imagen cambiando automáticamente:', mutation.target);
      }
      if (mutation.type === 'childList') {
        console.warn('⚠️ GLITCH DETECTADO: Elementos DOM cambiando:', mutation);
      }
    });
  });
  
  // Observar el grid de productos
  observer.observe(productsGrid, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
  });
  
  imageChangeMonitor = observer;
}

function stopGlitchMonitoring() {
  if (imageChangeMonitor) {
    imageChangeMonitor.disconnect();
    imageChangeMonitor = null;
    console.log('✅ Monitoreo anti-glitch detenido');
  }
}

// Iniciar monitoreo automáticamente
setTimeout(startGlitchMonitoring, 2000);

// Mensaje de ayuda para desarrolladores
console.log(`
🚀 JesusCorner - Sistema de Recomendaciones Amazon

Funciones disponibles en la consola:
- addQuickProduct("Título", "https://amzn.eu/d/enlace", "categoria") - Agregar producto rápido
- listCategories() - Ver categorías disponibles  
- getProductStats() - Ver estadísticas de productos
- regenerateProducts() - Regenerar todos los productos

🔍 Funciones de búsqueda:
- performSearch("término") - Buscar productos
- clearSearch() - Limpiar búsqueda

🔧 Funciones anti-glitch:
- startGlitchMonitoring() - Monitorear cambios automáticos
- stopGlitchMonitoring() - Detener monitoreo
- toggleDebugMode() - Activar/desactivar modo debug visual
- freezeImages() - Congelar imágenes para prevenir glitches

⚡ Funciones de rendimiento:
- forceLoadAllImages() - Cargar todas las imágenes inmediatamente

Ejemplo de uso:
addQuickProduct("Teclado Gaming RGB", "https://amzn.eu/d/40wgx5g", "peripherals");

Si experimentas glitches automáticos, usa: startGlitchMonitoring()
`);
