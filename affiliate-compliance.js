/**
 * JesusCorner - Sistema de Identificación de Enlaces de Afiliados
 * Identifica automáticamente y marca enlaces de afiliados para cumplir con políticas de transparencia
 */

// Dominios de afiliados conocidos
const AFFILIATE_DOMAINS = [
  'amzn.to',
  'amazon.es/dp',
  'amazon.es/gp',
  'amazon.com/dp',
  'amazon.com/gp'
];

// Función para identificar enlaces de afiliados
function isAffiliateLink(url) {
  return AFFILIATE_DOMAINS.some(domain => url.includes(domain));
}

// Función para añadir badge de afiliado a un enlace
function addAffiliateBadge(linkElement) {
  // Solo añadir si no existe ya
  if (linkElement.querySelector('.inline-affiliate-badge')) {
    return;
  }
  
  const badge = document.createElement('span');
  badge.className = 'inline-affiliate-badge';
  badge.textContent = '🔗 Afiliado';
  badge.title = 'Este es un enlace de afiliado';
  
  linkElement.appendChild(badge);
}

// Función para escanear y marcar todos los enlaces de afiliados en la página
function markAffiliateLinks() {
  console.log('🔍 Escaneando enlaces de afiliados...');
  
  const allLinks = document.querySelectorAll('a[href]');
  let affiliateLinksFound = 0;
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (isAffiliateLink(href)) {
      // Marcar el enlace como afiliado
      link.classList.add('affiliate-link-detected');
      
      // Añadir badge si es un enlace en texto corrido
      if (!link.classList.contains('btn') && !link.classList.contains('affiliate-link')) {
        addAffiliateBadge(link);
      }
      
      // Añadir atributos para tracking
      link.setAttribute('rel', 'nofollow noopener');
      link.setAttribute('target', '_blank');
      
      affiliateLinksFound++;
      console.log('🔗 Enlace de afiliado detectado:', href);
    }
  });
  
  console.log(`✅ ${affiliateLinksFound} enlaces de afiliados marcados correctamente`);
}

// Función para verificar cumplimiento de política de afiliados
function verifyAffiliateCompliance() {
  console.log('📋 Verificando cumplimiento de política de afiliados...');
  
  const checks = {
    hasAffiliateDisclosure: false,
    allAffiliateLinksMarked: true,
    noHiddenAffiliateLinks: true
  };
  
  // Verificar si existe aviso de afiliados
  const disclosures = document.querySelectorAll('.affiliate-disclosure, .affiliate-notice-top');
  checks.hasAffiliateDisclosure = disclosures.length > 0;
  
  // Verificar enlaces de afiliados
  const allLinks = document.querySelectorAll('a[href]');
  const unmarkedAffiliateLinks = [];
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (isAffiliateLink(href)) {
      // Verificar si está marcado correctamente
      const hasVisibleMarking = 
        link.classList.contains('affiliate-link') ||
        link.querySelector('.affiliate-badge') ||
        link.querySelector('.inline-affiliate-badge') ||
        link.closest('.product-card'); // Enlaces en tarjetas de productos
      
      if (!hasVisibleMarking) {
        unmarkedAffiliateLinks.push(href);
        checks.allAffiliateLinksMarked = false;
      }
    }
  });
  
  // Reporte de cumplimiento
  console.log('📊 Reporte de cumplimiento:');
  console.log('✅ Aviso de afiliados presente:', checks.hasAffiliateDisclosure);
  console.log('✅ Todos los enlaces marcados:', checks.allAffiliateLinksMarked);
  console.log('✅ Sin enlaces ocultos:', checks.noHiddenAffiliateLinks);
  
  if (unmarkedAffiliateLinks.length > 0) {
    console.warn('⚠️ Enlaces de afiliados sin marcar encontrados:');
    unmarkedAffiliateLinks.forEach(link => console.warn('  - ' + link));
  }
  
  return checks;
}

// Función para añadir aviso de afiliados si no existe
function ensureAffiliateDisclosure() {
  const existingDisclosure = document.querySelector('.affiliate-disclosure, .affiliate-notice-top');
  
  if (!existingDisclosure) {
    console.log('📢 Añadiendo aviso de afiliados automático...');
    
    const disclosure = document.createElement('div');
    disclosure.className = 'affiliate-disclosure';
    disclosure.innerHTML = `
      <i class="fas fa-info-circle"></i>
      <strong>Aviso de Transparencia:</strong> Esta página contiene enlaces de afiliados marcados con 🔗. 
      Si compras a través de ellos, recibo una pequeña comisión sin coste adicional para ti. 
      Solo recomiendo productos que he probado o investigado exhaustivamente.
      <a href="/affiliate/">Más información sobre nuestra política de afiliados</a>.
    `;
    
    // Insertar después del primer párrafo o al inicio del contenido
    const content = document.querySelector('.review-body, .post-content, .content-wrapper, main');
    if (content) {
      content.insertBefore(disclosure, content.firstChild);
    }
  }
}

// Inicializar sistema de compliance al cargar la página
function initializeAffiliateCompliance() {
  console.log('🚀 Iniciando sistema de compliance de afiliados...');
  
  // Marcar enlaces existentes
  markAffiliateLinks();
  
  // Verificar cumplimiento
  const compliance = verifyAffiliateCompliance();
  
  // Mostrar resumen
  if (compliance.hasAffiliateDisclosure && compliance.allAffiliateLinksMarked) {
    console.log('✅ La página cumple con la política de afiliados');
  } else {
    console.warn('⚠️ La página necesita mejoras para cumplir con la política de afiliados');
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAffiliateCompliance);
} else {
  initializeAffiliateCompliance();
}

// Exportar funciones para uso manual
window.AffiliateCompliance = {
  markAffiliateLinks,
  verifyAffiliateCompliance,
  ensureAffiliateDisclosure,
  isAffiliateLink
};
