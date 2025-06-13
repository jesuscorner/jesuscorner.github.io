/**
 * Utilidades de Debug para JesusCorner
 * 
 * Este archivo contiene funciones de depuración que no deben estar
 * en el script principal para mantener el código limpio.
 */

// Función para mostrar estadísticas del sistema
function showSystemStats() {
  console.log('📊 ESTADÍSTICAS DEL SISTEMA');
  console.log('===============================');
  
  if (typeof simpleProductsConfig !== 'undefined') {
    console.log(`Productos configurados: ${simpleProductsConfig.length}`);
  }
  
  if (typeof productsData !== 'undefined') {
    console.log(`Productos procesados: ${productsData.length}`);
    
    // Estadísticas por categoría
    const stats = productsData.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('Productos por categoría:', stats);
    
    // Mostrar tabla con información básica
    console.table(productsData.map(p => ({
      Título: p.title.substring(0, 30) + '...',
      Precio: p.price,
      Categoría: p.category,
      Rating: p.rating
    })));
  } else {
    console.log('No hay datos de productos disponibles');
  }
  
  if (typeof currentFilter !== 'undefined') {
    console.log(`Filtro actual: ${currentFilter}`);
  }
}

// Función para forzar recarga de datos
function refreshProductData() {
  console.log('🔄 Forzando recarga de datos...');
  
  if (typeof location !== 'undefined') {
    location.reload();
  } else {
    console.log('No se puede recargar desde este contexto');
  }
}

// Función para verificar URLs de imágenes
async function verifyCurrentImages() {
  console.log('🔍 Verificando imágenes actuales...');
  
  if (typeof productsData === 'undefined') {
    console.log('No hay productos para verificar');
    return;
  }
  
  for (const product of productsData) {
    try {
      const response = await fetch(product.image, { method: 'HEAD' });
      const status = response.ok ? '✅' : '❌';
      console.log(`${status} ${product.title}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${product.title}: Error - ${error.message}`);
    }
  }
}

// Función para activar/desactivar modo debug
function toggleDebugMode() {
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('debug-mode');
    const isActive = document.body.classList.contains('debug-mode');
    console.log('🐛 Modo debug:', isActive ? 'ACTIVADO' : 'DESACTIVADO');
  } else {
    console.log('Modo debug no disponible en este contexto');
  }
}

// Función para analizar el rendimiento
function analyzePerformance() {
  console.log('⚡ ANÁLISIS DE RENDIMIENTO');
  console.log('==========================');
  
  if (typeof performance !== 'undefined') {
    const navigation = performance.getEntriesByType('navigation')[0];
    
    console.log(`Tiempo de carga del DOM: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
    console.log(`Tiempo total de carga: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
    console.log(`Tiempo hasta el primer byte: ${navigation.responseStart - navigation.requestStart}ms`);
  }
  
  if (typeof productsData !== 'undefined') {
    console.log(`Productos renderizados: ${productsData.length}`);
    
    // Verificar imágenes cargadas
    const images = document.querySelectorAll('.product-image');
    const loadedImages = Array.from(images).filter(img => img.complete);
    console.log(`Imágenes cargadas: ${loadedImages.length}/${images.length}`);
  }
}

// Función para exportar configuración actual
function exportConfiguration() {
  console.log('📋 CONFIGURACIÓN ACTUAL');
  console.log('=======================');
  
  if (typeof simpleProductsConfig !== 'undefined') {
    console.log('Configuración de productos:');
    console.log(JSON.stringify(simpleProductsConfig, null, 2));
  }
  
  if (typeof productDatabase !== 'undefined') {
    console.log('\nBase de datos de productos:');
    console.log(JSON.stringify(productDatabase, null, 2));
  }
}

// Función de ayuda
function debugHelp() {
  console.log(`
🔧 FUNCIONES DE DEBUG DISPONIBLES:
===================================

debugUtils.showSystemStats()        - Estadísticas del sistema
debugUtils.refreshProductData()     - Recargar página
debugUtils.verifyCurrentImages()    - Verificar URLs de imágenes
debugUtils.toggleDebugMode()        - Activar/desactivar modo debug
debugUtils.analyzePerformance()     - Análisis de rendimiento
debugUtils.exportConfiguration()    - Exportar configuración
debugUtils.debugHelp()              - Mostrar esta ayuda

EJEMPLOS:
---------
debugUtils.showSystemStats()
debugUtils.verifyCurrentImages()
debugUtils.analyzePerformance()
  `);
}

// Exportar funciones para uso en consola
window.debugUtils = {
  showSystemStats,
  refreshProductData,
  verifyCurrentImages,
  toggleDebugMode,
  analyzePerformance,
  exportConfiguration,
  debugHelp
};

console.log('🔧 Debug utilities cargadas');
console.log('Usa debugUtils.debugHelp() para ver las funciones disponibles');
