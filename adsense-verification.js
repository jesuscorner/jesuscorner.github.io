/**
 * Script de verificación de AdSense
 * Verifica que los anuncios se carguen correctamente tras consentimiento
 */

function verifyAdSenseSetup() {
  console.log('🔍 Verificando configuración AdSense...');
  
  const checks = {
    scriptLoaded: false,
    adsPresent: false,
    consentRequired: false,
    adsInitialized: false
  };
  
  // Verificar si el script AdSense está cargado
  const adSenseScript = document.querySelector('script[src*="googlesyndication.com"]');
  checks.scriptLoaded = !!adSenseScript;
  
  // Verificar anuncios en la página
  const ads = document.querySelectorAll('.adsbygoogle');
  checks.adsPresent = ads.length > 0;
  
  // Verificar sistema de consentimiento
  checks.consentRequired = typeof(window.loadAdSense) === 'function';
  
  // Verificar si AdSense está disponible
  checks.adsInitialized = typeof(window.adsbygoogle) !== 'undefined';
  
  console.log('📊 Estado AdSense:');
  console.log('✅ Script cargado:', checks.scriptLoaded);
  console.log('✅ Anuncios presentes:', checks.adsPresent, `(${ads.length} encontrados)`);
  console.log('✅ Consentimiento requerido:', checks.consentRequired);
  console.log('✅ AdSense inicializado:', checks.adsInitialized);
  
  if (ads.length > 0) {
    console.log('📺 Anuncios encontrados:');
    ads.forEach((ad, index) => {
      const slot = ad.dataset.adSlot;
      const format = ad.dataset.adFormat;
      const layout = ad.dataset.adLayout;
      console.log(`  ${index + 1}. Slot: ${slot}, Format: ${format}, Layout: ${layout}`);
    });
  }
  
  // Verificar compliance
  if (checks.adsPresent && !checks.consentRequired) {
    console.warn('⚠️ ADVERTENCIA: Anuncios presentes sin verificación de consentimiento');
  }
  
  if (checks.scriptLoaded && checks.consentRequired) {
    console.log('✅ Configuración compatible con compliance');
  }
  
  return checks;
}

// Función para probar inicialización de anuncios
function testAdInitialization() {
  console.log('🧪 Probando inicialización de anuncios...');
  
  if (typeof(window.initializeAds) === 'function') {
    try {
      window.initializeAds();
      console.log('✅ Función de inicialización ejecutada');
    } catch (e) {
      console.error('❌ Error en inicialización:', e);
    }
  } else {
    console.warn('⚠️ Función initializeAds no encontrada');
  }
}

// Función para simular consentimiento (solo para testing)
function simulateConsent() {
  console.log('🎭 Simulando consentimiento de cookies...');
  
  if (typeof(window.loadAffiliateScripts) === 'function') {
    window.loadAffiliateScripts();
    console.log('✅ Scripts de afiliados y anuncios cargados');
  } else {
    console.warn('⚠️ Función loadAffiliateScripts no encontrada');
  }
}

// Auto-ejecutar verificación al cargar la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(verifyAdSenseSetup, 1000);
  });
} else {
  setTimeout(verifyAdSenseSetup, 1000);
}

// Exponer funciones para testing manual
window.AdSenseVerification = {
  verify: verifyAdSenseSetup,
  testInit: testAdInitialization,
  simulateConsent: simulateConsent
};

console.log('🔧 AdSense Verification cargado. Usa AdSenseVerification.verify() para verificar configuración.');
