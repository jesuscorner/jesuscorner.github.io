/**
 * JesusCorner - Sistema de Recomendaciones Amazon (Versión Limpia)
 * 
 * CÓMO AGREGAR PRODUCTOS:
 * Agrega productos en simpleProductsConfig con: título, enlace de Amazon y categoría
 */

// Configuración de productos - Solo necesitas: título, enlace de Amazon y categoría
const simpleProductsConfig = [
  {
    title: "Ratón Logitech M705 Marathon Inalámbrico",
    amazonUrl: "https://amzn.eu/d/e2dsva2",
    category: "tech"
  },
  {
    title: "Monitor Philips 273V7QDSB 27'' Full HD IPS",
    amazonUrl: "https://amzn.eu/d/2p8o1AC", 
    category: "peripherals"
  },
  {
    title: "Teclado Logitech K120 USB Español",
    amazonUrl: "https://amzn.eu/d/1ebvVnb",
    category: "storage"
  },
  {
    title: "Lenovo LOQ 15 RTX 4060 8GB",
    amazonUrl: "https://amzn.eu/d/aElx9R0",
    category: "tech"
  }
];

// Base de datos de productos con imágenes funcionales
const productDatabase = {
  'e2dsva2': {
    title: 'Logitech M705 Marathon - Ratón inalámbrico',
    price: '69.99',
    originalPrice: '89.99',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop&auto=format',
    rating: '4.3',
    reviewCount: '2847'
  },
  '2p8o1AC': {
    title: 'Philips 273V7QDSB - Monitor 27" Full HD IPS',
    price: '149.99',
    originalPrice: '199.99',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop&auto=format',
    rating: '4.4',
    reviewCount: '1203'
  },
  '1ebvVnb': {
    title: 'Logitech K120 - Teclado USB con diseño español',
    price: '16.99',
    originalPrice: '24.99',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop&auto=format',
    rating: '4.2',
    reviewCount: '5632'
  },
  'aElx9R0': {
    title: 'Lenovo LOQ 15IAX9 Gaming - Intel Core i5-12450HX, RTX 4060 8GB',
    price: '799.00',
    originalPrice: '949.00',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop&auto=format',
    rating: '4.3',
    reviewCount: '432'
  }
};

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

// Procesar productos desde la configuración
async function processProducts() {
  productsData = [];
  
  for (let i = 0; i < simpleProductsConfig.length; i++) {
    const config = simpleProductsConfig[i];
    const asin = extractASINFromUrl(config.amazonUrl);
    const productData = productDatabase[asin];
    
    if (productData) {
      productsData.push({
        id: `product-${i + 1}`,
        title: config.title,
        price: `€${productData.price}`,
        originalPrice: productData.originalPrice ? `€${productData.originalPrice}` : null,
        image: productData.image,
        amazonUrl: config.amazonUrl,
        category: config.category,
        rating: productData.rating,
        reviewCount: productData.reviewCount,
        badge: Math.random() > 0.7 ? ["Bestseller", "Oferta", "Nuevo", "Recomendado"][Math.floor(Math.random() * 4)] : null
      });
    } else {
      // Generar datos placeholder si no hay datos en la base
      productsData.push({
        id: `product-${i + 1}`,
        title: config.title,
        price: '€--,--',
        originalPrice: null,
        image: generatePlaceholderImage(config.title),
        amazonUrl: config.amazonUrl,
        category: config.category,
        rating: '--',
        reviewCount: '--',
        badge: null
      });
    }
  }
  
  console.log(`📦 ${productsData.length} productos procesados`);
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
  
  productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
  
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
function createProductCard(product) {
  const badgeHTML = product.badge 
    ? `<div class="product-badge">${product.badge}</div>` 
    : '';
  
  const originalPriceHTML = product.originalPrice 
    ? `<span style="text-decoration: line-through; color: #999; margin-left: 8px; font-size: 0.9rem;">${product.originalPrice}</span>` 
    : '';
  
  return `
    <div class="product-card" data-category="${product.category}">
      ${badgeHTML}
      <div class="product-image-container">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          class="product-image"
          onerror="this.src='${generatePlaceholderImage(product.title)}'"
        >
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          ${product.price}${originalPriceHTML}
        </div>
        <div class="product-rating">
          <div class="stars">${generateStars(product.rating)}</div>
          <span class="rating-text">${product.rating} (${product.reviewCount})</span>
        </div>
        <a href="${product.amazonUrl}" target="_blank" class="product-btn">
          Ver en Amazon
        </a>
      </div>
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

console.log('🎯 Sistema de recomendaciones cargado');
