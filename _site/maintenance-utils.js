/**
 * Utilidades de Mantenimiento para JesusCorner
 * 
 * Este archivo contiene funciones para actualizar precios e imágenes
 * de productos. Estas funciones NO están en el script principal para
 * mantenerlo limpio y enfocado.
 */

// Función para verificar URLs de imágenes
async function verifyImageUrls() {
  console.log('🔍 Verificando URLs de imágenes...');
  
  const urls = [
    'https://m.media-amazon.com/images/I/61mp7QtpJjL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71S4VCjcHnL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71QeVbFjcKL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71vqHMhYdcL._AC_SL1500_.jpg'
  ];
  
  for (const url of urls) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      console.log(`${response.ok ? '✅' : '❌'} ${url} - ${response.status}`);
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
}

// Función para actualizar datos de productos desde archivo JSON
async function loadProductsFromJSON() {
  try {
    const response = await fetch('./products-data.json');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error cargando datos de productos:', error);
    return null;
  }
}

// Función para generar imágenes placeholder consistentes
function generateProductImage(title, category) {
  const colors = {
    'tech': { bg: '4f46e5', text: 'ffffff' },
    'peripherals': { bg: '059669', text: 'ffffff' },
    'storage': { bg: 'dc2626', text: 'ffffff' },
    'default': { bg: 'f8f9fa', text: '495057' }
  };
  
  const color = colors[category] || colors.default;
  const text = encodeURIComponent(title.substring(0, 20));
  
  return `https://via.placeholder.com/300x200/${color.bg}/${color.text}?text=${text}`;
}

// Función para actualizar precios (placeholder para futura implementación)
async function updatePrices() {
  console.log('💰 Para actualizar precios reales, implementa una API de Amazon o servicio de terceros');
  console.log('Opciones sugeridas:');
  console.log('- Amazon Product Advertising API');
  console.log('- Keepa API');
  console.log('- RainforestAPI');
  console.log('- ScrapingBee');
}

// Función para limpiar datos antiguos
function cleanOldData() {
  console.log('🧹 Limpiando datos antiguos del localStorage...');
  
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('jesuscorner_')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  console.log(`✅ ${keysToRemove.length} elementos limpiados`);
}

// Función para exportar configuración actual
function exportConfiguration() {
  const config = {
    products: simpleProductsConfig,
    timestamp: new Date().toISOString(),
    version: '2.0'
  };
  
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'jesuscorner-config-export.json';
  a.click();
  
  URL.revokeObjectURL(url);
  console.log('📁 Configuración exportada');
}

// Función para validar enlaces de Amazon
function validateAmazonUrls() {
  console.log('🔗 Validando enlaces de Amazon...');
  
  simpleProductsConfig.forEach((product, index) => {
    const url = product.amazonUrl;
    const isValid = url.includes('amzn.eu') || url.includes('amazon.es') || url.includes('amazon.com');
    console.log(`${isValid ? '✅' : '❌'} Producto ${index + 1}: ${product.title}`);
    if (!isValid) {
      console.log(`   URL problemática: ${url}`);
    }
  });
}

// Exportar funciones para uso en consola
window.maintenanceUtils = {
  verifyImageUrls,
  loadProductsFromJSON,
  generateProductImage,
  updatePrices,
  cleanOldData,
  exportConfiguration,
  validateAmazonUrls
};

console.log('🔧 Utilidades de mantenimiento cargadas');
console.log('Usa window.maintenanceUtils para acceder a las funciones');
