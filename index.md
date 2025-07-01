---
layout: default
title: "JesusCorner - Recomendaciones Tech"
description: "Recomendaciones honestas de tecnología con las mejores ofertas y reviews detalladas"
---

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          Recomendaciones <span class="highlight">Honestas</span> de Tecnología
        </h1>
        <p class="hero-subtitle">
          Reviews detalladas, guías de compra y las mejores ofertas en tecnología. 
          Todo probado personalmente para ayudarte a tomar la mejor decisión.
        </p>
        <div class="hero-buttons">
          <a href="{{ '/reviews' | relative_url }}" class="btn-primary">
            <i class="fas fa-star"></i>
            Ver Reviews
          </a>
          <a href="{{ '/blog' | relative_url }}" class="btn-secondary">
            <i class="fas fa-newspaper"></i>
            Leer Blog
          </a>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop&auto=format" alt="Espacio de trabajo tech moderno" class="hero-main-image">
      </div>
    </div>
  </div>
</section>

<!-- Anuncio superior responsivo -->
<section class="ad-section">
  <div class="container">
    <div class="ad-container ad-header">
      <div class="ad-label">Publicidad</div>
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-5711459217670244"
           data-ad-slot="1234567890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  </div>
</section>

<!-- Sección de productos destacados -->
<section class="featured-products">
  <div class="container">
    <div class="section-header">
      <h2>Productos Recomendados</h2>
      <p>Selección curada de productos probados y recomendados</p>
    </div>
    
    <div class="affiliate-notice-top">
      <h4><i class="fas fa-info-circle"></i> Aviso de Transparencia</h4>
      <p><strong>Los enlaces marcados con 🔗 son enlaces de afiliado.</strong> Si compras a través de ellos, recibo una pequeña comisión sin coste adicional para ti. Solo recomiendo productos que he probado personalmente o investigado exhaustivamente. <a href="/affiliate/">Más información sobre nuestra política de afiliados</a>.</p>
    </div>
    
    <!-- Ruleta horizontal infinita de productos -->
    <div class="products-carousel-container">
      <div class="carousel-loading" id="carouselLoading">
        <div class="loading-spinner"></div>
        <p>Cargando productos recomendados...</p>
      </div>
      
      <div class="infinite-carousel-wrapper" id="carouselWrapper" style="display: none;">
        <div class="infinite-carousel" id="productsCarousel">
          <!-- Los productos se duplicarán automáticamente para efecto infinito -->
        </div>
      </div>
      
      <!-- Overlay gradients para efecto fade -->
      <div class="carousel-gradient carousel-gradient-left"></div>
      <div class="carousel-gradient carousel-gradient-right"></div>
    </div>
    
    <div class="section-footer">
      <a href="{{ '/recommendations' | relative_url }}" class="btn btn-outline">
        Ver Todas las Recomendaciones
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- Anuncio entre secciones -->
<section class="ad-section">
  <div class="container">
    <div class="ad-container ad-middle">
      <div class="ad-label">Publicidad</div>
      <ins class="adsbygoogle"
           style="display:block; text-align:center;"
           data-ad-layout="in-article"
           data-ad-format="fluid"
           data-ad-client="ca-pub-5711459217670244"
           data-ad-slot="0987654321"></ins>
    </div>
  </div>
</section>

<!-- Sección de reviews recientes -->
<section class="recent-reviews">
  <div class="container">
    <div class="section-header">
      <h2>Reviews Recientes</h2>
      <p>Análisis detallados de los últimos productos probados</p>
    </div>
    
    <div class="reviews-grid">
      {% for review in site.reviews limit: 3 %}
      <a href="{{ review.url | relative_url }}" class="review-card-link">
        <article class="review-card" data-rating="{{ review.rating }}">
          <div class="review-image">
            <img src="{{ review.product_image }}" alt="{{ review.product_name }}" loading="lazy">
          </div>
          <div class="review-content">
            <h3>{{ review.product_name }}</h3>
            <p>{{ review.description | truncate: 120 }}</p>
          </div>
        </article>
      </a>
      {% endfor %}
    </div>
    
    <div class="section-footer">
      <a href="{{ '/reviews' | relative_url }}" class="btn btn-outline">
        Ver Todas las Reviews
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- Sección de blog -->
<section class="recent-posts">
  <div class="container">
    <div class="section-header">
      <h2>Últimos artículos</h2>
      <p>Artículos y guías para ayudarte a elegir mejor</p>
    </div>
    
    <div class="posts-grid">
      {% for post in site.posts limit: 2 %}
      <a href="{{ post.url | relative_url }}" class="post-card-link">
        <article class="post-card">
          {% if post.image %}
          <div class="post-image">
            <img src="{{ post.image }}" alt="{{ post.title }}" loading="lazy">
          </div>
          {% endif %}
          <div class="post-content">
            <div class="post-meta">
              <span class="post-date">{{ post.date | date: "%d de %B de %Y" | replace: "January", "enero" | replace: "February", "febrero" | replace: "March", "marzo" | replace: "April", "abril" | replace: "May", "mayo" | replace: "June", "junio" | replace: "July", "julio" | replace: "August", "agosto" | replace: "September", "septiembre" | replace: "October", "octubre" | replace: "November", "noviembre" | replace: "December", "diciembre" }}</span>
            </div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.description | truncate: 150 }}</p>
          </div>
        </article>
      </a>
      {% endfor %}
    </div>
    
    <div class="section-footer">
      <a href="{{ '/blog' | relative_url }}" class="btn btn-outline">
        Ver Todos los Artículos
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<style>
.hero {
  background: linear-gradient(135deg, #4A90E2 0%, #FF8C00 100%);
  color: white;
  min-height: calc(100vh - 42px);
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  width: 100%;
}

.hero-text {
  max-width: 500px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.highlight {
  color: #FFD700;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-primary {
  background: #FF8C00;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-image {
  display: flex;
  justify-content: center;
}

.hero-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #FF8C00;
  font-weight: 700;
}

.section-header p {
  font-size: 1.1rem;
  color: #666;
}

.section-footer {
  text-align: center;
  margin-top: 3rem;
}

.featured-products,
.recent-reviews,
.recent-posts {
  padding: 3rem 0;
}

.recent-reviews {
  background: #f8f9fa;
}

.reviews-grid,
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.review-card,
.post-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 140, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  backdrop-filter: blur(10px);
}

.review-card:hover,
.post-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
  border-color: rgba(255, 140, 0, 0.4);
}

.post-card:hover::before {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 6px 16px rgba(255, 140, 0, 0.4);
}

.review-image,
.post-image {
  height: 240px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px 12px 0 0;
}

.review-image img,
.post-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f8f9fa;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px 12px 0 0;
  filter: brightness(0.95) contrast(1.1);
}

.review-card:hover .review-image img,
.post-card:hover .post-image img {
  transform: scale(1.08);
  filter: brightness(1.05) contrast(1.15);
}

/* Overlay gradient for better text readability */
.post-image::after,
.review-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.1) 50%,
    rgba(0,0,0,0.3) 100%
  );
  pointer-events: none;
  border-radius: 12px 12px 0 0;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.post-card:hover .post-image::after,
.review-card:hover .review-image::after {
  opacity: 1;
}

/* Category badge on image */
.post-image {
  position: relative;
}

.post-card {
  position: relative;
}

/* Rating badge for reviews */
.review-card::before {
  content: '★ ' attr(data-rating) '/5';
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 193, 7, 0.95);
  color: #1a1a1a;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.review-card:hover::before {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 6px 16px rgba(255, 193, 7, 0.5);
}

.review-content,
.post-content {
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.review-content h3,
.post-content h3 {
  margin-bottom: 1rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.4;
}

.review-content p,
.post-content p {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  flex-grow: 1;
}

.review-meta {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 140, 0, 0.1);
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
}

.post-category {
  color: #FF8C00;
  font-weight: 600;
  background: rgba(255, 140, 0, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* Botones mejorados para las secciones */
.btn-outline {
  background: transparent;
  color: #FF8C00;
  border: 2px solid #FF8C00;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background: #FF8C00;
  color: white;
  transform: translateY(-2px);
}

.btn-small {
  background: linear-gradient(135deg, #FF8C00, #FF6B00);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-small:hover {
  background: linear-gradient(135deg, #e6790e, #e65a00);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 140, 0, 0.4);
}

@media (max-width: 768px) {
  .hero {
    min-height: calc(100vh - 42px);
    padding: 2rem 0;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .reviews-grid,
  .posts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
  }
}

/* Estilos del carrusel infinito de productos */
.products-carousel-container {
  position: relative;
  margin: 3rem 0;
  min-height: 320px;
  overflow: hidden;
}

.carousel-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 320px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #FF8C00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.infinite-carousel-wrapper {
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
  mask-image: linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent);
}

.infinite-carousel {
  display: flex;
  gap: 2rem;
  animation: infiniteScroll 40s linear infinite;
  will-change: transform;
  width: fit-content;
}

.infinite-carousel:hover {
  animation-play-state: paused;
}

@keyframes infiniteScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.carousel-item {
  flex: 0 0 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.carousel-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  z-index: 10;
}

.carousel-item .product-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
}

.carousel-item .product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  transition: transform 0.3s ease;
}

.carousel-item:hover .product-image img {
  transform: scale(1.05);
}

.carousel-item .product-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #FF8C00, #FF6B00);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.3);
}

.carousel-item .product-info {
  padding: 1.25rem;
}

.carousel-item .product-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8rem;
}

.carousel-item .buy-button {
  width: 100%;
  background: linear-gradient(135deg, #FF8C00, #FF6B00);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.carousel-item .buy-button:hover {
  background: linear-gradient(135deg, #e6790e, #e65a00);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4);
}

.carousel-item .buy-button i {
  font-size: 1.1rem;
}

/* Gradientes para efecto fade en los bordes */
.carousel-gradient {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  pointer-events: none;
  z-index: 5;
}

.carousel-gradient-left {
  left: 0;
  background: linear-gradient(to right, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0));
}

.carousel-gradient-right {
  right: 0;
  background: linear-gradient(to left, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0));
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-item {
    flex: 0 0 240px;
  }
  
  .infinite-carousel {
    gap: 1.5rem;
    animation-duration: 30s;
  }
  
  .carousel-gradient {
    width: 60px;
  }
}

@media (max-width: 480px) {
  .carousel-item {
    flex: 0 0 200px;
  }
  
  .infinite-carousel {
    gap: 1rem;
    animation-duration: 25s;
  }
  
  .carousel-item .product-image {
    height: 140px;
  }
  
  .carousel-item .product-info {
    padding: 1rem;
  }
  
  .carousel-item .product-title {
    font-size: 0.85rem;
  }
  
  .carousel-gradient {
    width: 40px;
  }
}
</style>

<!-- Script del carrusel -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  initializeInfiniteCarousel();
});

async function initializeInfiniteCarousel() {
  const carousel = document.getElementById('productsCarousel');
  const carouselWrapper = document.getElementById('carouselWrapper');
  const loading = document.getElementById('carouselLoading');
  
  try {
    // Cargar productos desde el JSON
    const response = await fetch('/products-data.json');
    const data = await response.json();
    const products = data.products;
    
    if (!carousel || !products.length) {
      if (loading) loading.innerHTML = '<p>No hay productos disponibles</p>';
      return;
    }
    
    // Crear items del carrusel y duplicarlos para efecto infinito
    const productItems = products.map(product => createCarouselItem(product)).join('');
    
    // Duplicar los productos para scroll infinito suave
    carousel.innerHTML = productItems + productItems;
    
    // Ocultar loading y mostrar carrusel
    if (loading) loading.style.display = 'none';
    if (carouselWrapper) {
      carouselWrapper.style.display = 'block';
      carouselWrapper.style.opacity = '0';
    }
    
    // Añadir event listeners a los botones de compra
    setupBuyButtons();
    
    // Animación de entrada suave
    setTimeout(() => {
      if (carouselWrapper) {
        carouselWrapper.style.transition = 'opacity 0.5s ease';
        carouselWrapper.style.opacity = '1';
      }
    }, 100);
    
  } catch (error) {
    console.error('Error loading infinite carousel:', error);
    if (loading) {
      loading.innerHTML = `
        <div style="text-align: center;">
          <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #e74c3c; margin-bottom: 1rem;"></i>
          <p>Error cargando productos. Inténtalo más tarde.</p>
        </div>
      `;
    }
  }
}

function createCarouselItem(product) {
  const badge = getBadgeFromCategory(product.category);
  
  return `
    <div class="carousel-item" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" 
             alt="${product.title}" 
             loading="lazy" 
             onerror="this.style.display='none';">
        <div class="product-badge">${badge}</div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <button class="buy-button affiliate-link" data-amazon-url="${product.amazonUrl}">
          <div class="button-main-content">
            <i class="fab fa-amazon"></i>
            <span>Ver en Amazon</span>
          </div>
          <span class="affiliate-badge">🔗 Enlace de afiliado</span>
        </button>
      </div>
    </div>
  `;
}

function getBadgeFromCategory(category) {
  const badges = {
    'tech': 'TECH',
    'audio': 'AUDIO',
    'peripherals': 'PERIFÉRICOS',
    'wearables': 'WEARABLES'
  };
  return badges[category] || 'RECOMENDADO';
}

function setupBuyButtons() {
  const buyButtons = document.querySelectorAll('.carousel-item .buy-button');
  
  buyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const amazonUrl = this.getAttribute('data-amazon-url');
      
      // Abrir en nueva pestaña
      window.open(amazonUrl, '_blank', 'noopener,noreferrer');
      
      // Analytics opcional
      console.log('🛒 Click en producto del carrusel:', amazonUrl);
    });
  });
}
</script>
