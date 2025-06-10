// Datos de productos - Aquí puedes agregar tus productos reales
const productsData = [
  {
    id: 1,
    title: "Teclado Mecánico Gaming RGB",
    price: "€89.99",
    originalPrice: "€129.99",
    image: "https://images-na.ssl-images-amazon.com/images/I/71b2QzKz%2BjL._AC_SL1500_.jpg",
    amazonUrl: "https://amzn.eu/d/40wgx5g",
    category: "peripherals",
    rating: 4.5,
    reviewCount: 1248,
    badge: "Bestseller"
  },
  {
    id: 2,
    title: "Monitor 4K 27 Pulgadas IPS",
    price: "€349.99",
    originalPrice: "€449.99",
    image: "https://images-na.ssl-images-amazon.com/images/I/71EzW7TxdoL._AC_SL1500_.jpg",
    amazonUrl: "https://amzn.eu/d/example2",
    category: "tech",
    rating: 4.7,
    reviewCount: 856,
    badge: "Oferta"
  },
  {
    id: 3,
    title: "SSD NVMe 1TB Samsung 980 PRO",
    price: "€129.99",
    originalPrice: "€179.99",
    image: "https://images-na.ssl-images-amazon.com/images/I/51EzF-dN4fL._AC_SL1024_.jpg",
    amazonUrl: "https://amzn.eu/d/example3",
    category: "storage",
    rating: 4.8,
    reviewCount: 2341,
    badge: "Nuevo"
  },
  {
    id: 4,
    title: "Ratón Gaming Inalámbrico Logitech",
    price: "€79.99",
    originalPrice: "€99.99",
    image: "https://images-na.ssl-images-amazon.com/images/I/61VDk6Q2d8L._AC_SL1500_.jpg",
    amazonUrl: "https://amzn.eu/d/example4",
    category: "peripherals",
    rating: 4.6,
    reviewCount: 967,
    badge: "Recomendado"
  },
  {
    id: 5,
    title: "Servidor NAS Synology DS220+",
    price: "€299.99",
    originalPrice: "€349.99",
    image: "https://images-na.ssl-images-amazon.com/images/I/61WG7d3BZQL._AC_SL1500_.jpg",
    amazonUrl: "https://amzn.eu/d/example5",
    category: "storage",
    rating: 4.9,
    reviewCount: 534,
    badge: "Top Rated"
  },
  {
    id: 6,
    title: "Auriculares Gaming Steelseries",
    price: "€159.99",
    originalPrice: "€199.99",
    image: "https://images-na.ssl-images-amazon.com/images/I/61aLg3vHq4L._AC_SL1500_.jpg",
    amazonUrl: "https://amzn.eu/d/example6",
    category: "peripherals",
    rating: 4.4,
    reviewCount: 1653,
    badge: "Oferta"
  }
];

// Estado de la aplicación
let currentFilter = 'all';
let isLoading = false;

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
  showLoading();
  
  // Simular carga de productos con un pequeño delay para mostrar el loading
  setTimeout(() => {
    hideLoading();
    renderProducts(productsData);
  }, 1000);
}

function setupEventListeners() {
  // Event listeners para los filtros
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.dataset.category;
      setActiveFilter(category);
      filterProducts(category);
    });
  });
}

function setActiveFilter(category) {
  currentFilter = category;
  
  // Actualizar estilos de botones activos
  filterButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  const activeButton = document.querySelector(`[data-category="${category}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

function filterProducts(category) {
  const filteredProducts = category === 'all' 
    ? productsData 
    : productsData.filter(product => product.category === category);
  
  // Animación de salida
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-20px)';
    }, index * 50);
  });
  
  // Renderizar nuevos productos después de la animación
  setTimeout(() => {
    renderProducts(filteredProducts);
  }, productCards.length * 50 + 200);
}

function renderProducts(products) {
  productsGrid.innerHTML = '';
  
  products.forEach((product, index) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
    
    // Animación de entrada escalonada
    setTimeout(() => {
      productCard.style.animationDelay = `${index * 0.1}s`;
    }, 50);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
    <img src="${product.image}" alt="${product.title}" class="product-image" 
         onerror="this.src='https://via.placeholder.com/300x240?text=Imagen+no+disponible'">
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
  
  // Agregar evento de click para analytics (opcional)
  card.addEventListener('click', () => {
    trackProductClick(product);
  });
  
  return card;
}

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

// Función para agregar productos dinámicamente (útil para el futuro)
function addProduct(productData) {
  productsData.push(productData);
  
  // Re-renderizar si el producto coincide con el filtro actual
  if (currentFilter === 'all' || productData.category === currentFilter) {
    const productCard = createProductCard(productData);
    productsGrid.appendChild(productCard);
  }
}

// Función para extraer información de enlaces de Amazon (funcionalidad futura)
async function extractAmazonProductInfo(amazonUrl) {
  try {
    // Esta función podría expandirse para extraer información real de Amazon
    // Por ahora retorna datos de ejemplo
    return {
      title: "Producto de Amazon",
      price: "€XX.XX",
      image: "https://via.placeholder.com/300x240",
      rating: 4.0,
      reviewCount: 100
    };
  } catch (error) {
    console.error('Error al extraer información del producto:', error);
    return null;
  }
}

// Utilidades para manejar errores de imágenes
function handleImageError(img) {
  img.src = 'https://via.placeholder.com/300x240?text=Imagen+no+disponible';
  img.alt = 'Imagen no disponible';
}

// Función para scroll suave (si agregas navegación interna)
function smoothScrollTo(targetId) {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
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

// Exportar funciones para uso global si es necesario
window.addProduct = addProduct;
window.extractAmazonProductInfo = extractAmazonProductInfo;
window.copyProductLink = copyProductLink;
