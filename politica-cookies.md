---
layout: default
title: "Política de Cookies"
description: "Información sobre el uso de cookies en JesusCorner, incluyendo cookies de afiliados y analíticas."
permalink: /politica-cookies/
---

<style>
/* Privacy Hero Section */
.privacy-hero {
  background: linear-gradient(135deg, #2C3E50 0%, #3498DB 100%);
  color: white;
  min-height: 50vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  text-align: center;
}

.privacy-hero .hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.privacy-hero .hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.privacy-hero .hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Content Styling */
.privacy-content {
  padding: 4rem 0;
  background: #f8f9fa;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.last-updated {
  background: #e8f4fd;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.content-wrapper h2 {
  color: #2c3e50;
  margin: 2.5rem 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
  font-size: 1.5rem;
}

.content-wrapper h3 {
  color: #34495e;
  margin: 2rem 0 1rem 0;
  font-size: 1.2rem;
}

.content-wrapper h4 {
  color: #34495e;
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1.1rem;
}

.content-wrapper p {
  line-height: 1.8;
  margin-bottom: 1.2rem;
  color: #2c3e50;
}

.content-wrapper ul {
  margin: 1rem 0 1.5rem 0;
  padding-left: 1.5rem;
}

.content-wrapper li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* Third Party Services */
.third-party-list {
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.third-party-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.third-party-item h4 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.third-party-item i {
  color: #3498db;
  font-size: 1.2rem;
}

.third-party-item p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
}

/* Rights Grid */
.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.right-item {
  background: #fff3cd;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ffeaa7;
  text-align: center;
}

.right-item h4 {
  color: #856404;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.right-item i {
  color: #f39c12;
  font-size: 1.2rem;
}

.right-item p {
  margin: 0;
  color: #856404;
  font-size: 0.9rem;
}

/* Cookie Controls */
.cookie-controls {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin: 2rem 0;
}

.cookie-controls h3 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.cookie-notice {
  background: #fff3cd;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ffeaa7;
  margin: 1.5rem 0;
}

.cookie-notice h4 {
  color: #856404;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cookie-notice p {
  margin: 0;
  color: #856404;
  font-size: 0.9rem;
}

/* Security Measures */
.security-measures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.security-item {
  text-align: center;
  padding: 1.5rem;
  background: #e8f5e8;
  border-radius: 8px;
  border: 1px solid #c3e6c3;
}

.security-item i {
  font-size: 2rem;
  color: #28a745;
  margin-bottom: 1rem;
}

.security-item h4 {
  color: #155724;
  margin: 0 0 0.5rem 0;
}

/* Contact Section */
.contact-section {
  background: #e7f3ff;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #b8daff;
  margin: 2rem 0;
}

.contact-methods {
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-method i {
  color: #0056b3;
  width: 20px;
}

/* Summary Box */
.summary-box {
  background: #d1ecf1;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #bee5eb;
  margin: 2rem 0;
}

.summary-box h3 {
  color: #0c5460;
  margin: 0 0 1rem 0;
}

.summary-box ul {
  margin: 0;
}

.summary-box li {
  color: #0c5460;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .privacy-hero .hero-title {
    font-size: 2rem;
  }
  
  .content-wrapper {
    margin: 0 1rem;
    padding: 2rem 1.5rem;
  }
  
  .rights-grid {
    grid-template-columns: 1fr;
  }
  
  .security-measures {
    grid-template-columns: 1fr;
  }
}

/* Links */
.content-wrapper a {
  color: #3498db;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.content-wrapper a:hover {
  border-bottom-color: #3498db;
}

.highlight {
  background: linear-gradient(120deg, #ff8c00 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}
</style>

<section class="privacy-hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title"><i class="fas fa-cookie-bite"></i> Política de <span class="highlight">Cookies</span></h1>
      <p class="hero-subtitle">Transparencia total sobre el uso de cookies en nuestro sitio</p>
    </div>
  </div>
</section>

<section class="privacy-content">
  <div class="container">
    <div class="content-wrapper">
      
      <div class="last-updated">
        {% assign day = 'now' | date: "%d" %}
        {% assign year = 'now' | date: "%Y" %}
        {% assign m = 'now' | date: "%-m" %}
        {% case m %}
          {% when '1' %}{% assign month = 'enero' %}
          {% when '2' %}{% assign month = 'febrero' %}
          {% when '3' %}{% assign month = 'marzo' %}
          {% when '4' %}{% assign month = 'abril' %}
          {% when '5' %}{% assign month = 'mayo' %}
          {% when '6' %}{% assign month = 'junio' %}
          {% when '7' %}{% assign month = 'julio' %}
          {% when '8' %}{% assign month = 'agosto' %}
          {% when '9' %}{% assign month = 'septiembre' %}
          {% when '10' %}{% assign month = 'octubre' %}
          {% when '11' %}{% assign month = 'noviembre' %}
          {% when '12' %}{% assign month = 'diciembre' %}
        {% endcase %}
        <strong>Última actualización:</strong> {{ day }} de {{ month }} de {{ year }}
      </div>

      <h2>🍪 ¿Qué son las Cookies?</h2>
      
      <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Actúan como una "memoria" que permite al sitio recordar información sobre tu visita, como tus preferencias de idioma o datos de inicio de sesión.</p>
      
      <div class="cookie-notice">
        <h4>⚠️ Control Total</h4>
        <p>En JesusCorner, respetamos tu decisión. <strong>Ninguna cookie no esencial se instalará sin tu consentimiento previo.</strong></p>
      </div>

      <h2>📋 Tipos de Cookies que Utilizamos</h2>
      
      <h3>🔧 Cookies Esenciales</h3>
      <p>Estas cookies son imprescindibles para el funcionamiento básico del sitio web:</p>
      <ul>
        <li><strong>Consentimiento de cookies:</strong> Recuerda tu decisión sobre el uso de cookies</li>
        <li><strong>Preferencias del sitio:</strong> Mantiene configuraciones de navegación básicas</li>
        <li><strong>Seguridad:</strong> Protegen contra ataques y mantienen la integridad del sitio</li>
      </ul>
      
      <div class="third-party-list">
        <div class="third-party-item">
          <h4><i class="fas fa-shield-alt"></i> Cookies Técnicas</h4>
          <p>Se instalan automáticamente y son necesarias para la navegación básica. No requieren consentimiento según la normativa.</p>
        </div>
      </div>

      <h3>� Cookies Publicitarias</h3>
      <p>Utilizamos servicios publicitarios para mantener el sitio web y ofrecer contenido gratuito:</p>
      
      <div class="third-party-list">
        <div class="third-party-item">
          <h4><i class="fab fa-google"></i> Google AdSense</h4>
          <p>Muestra anuncios relevantes y mide su efectividad. <strong>Solo se cargan con tu consentimiento expreso.</strong></p>
          <ul>
            <li>Personalización de anuncios basada en intereses</li>
            <li>Medición de rendimiento publicitario</li>
            <li>Prevención de fraude publicitario</li>
          </ul>
        </div>
      </div>

      <h3>�💰 Cookies de Afiliación</h3>
      <p>Como participante del Programa de Afiliados de Amazon, utilizamos cookies relacionadas con afiliación:</p>
      
      <div class="third-party-list">
        <div class="third-party-item">
          <h4><i class="fab fa-amazon"></i> Amazon Associates</h4>
          <p>Rastrea las compras realizadas a través de nuestros enlaces de afiliado para calcular comisiones. <strong>Solo se instalan con tu consentimiento.</strong></p>
        </div>
        
        <div class="third-party-item">
          <h4><i class="fas fa-chart-line"></i> Seguimiento de Conversiones</h4>
          <p>Nos ayudan a entender qué recomendaciones son más útiles para nuestros lectores y mejorar nuestro contenido.</p>
        </div>
      </div>

      <h3>📊 Cookies Analíticas (Futuras)</h3>
      <p>En el futuro podríamos implementar servicios de análisis para mejorar tu experiencia:</p>
      
      <div class="third-party-list">
        <div class="third-party-item">
          <h4><i class="fab fa-google"></i> Google Analytics</h4>
          <p>Para entender cómo los visitantes utilizan nuestro sitio y mejorar la experiencia de usuario. <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">Puedes optar por no participar aquí</a>.</p>
        </div>
        
        <div class="third-party-item">
          <h4><i class="fas fa-tachometer-alt"></i> Métricas de Rendimiento</h4>
          <p>Para optimizar la velocidad de carga y usabilidad del sitio web.</p>
        </div>
      </div>

      <h2>⚙️ Control y Gestión de Cookies</h2>
      
      <div class="rights-grid">
        <div class="right-item">
          <h4><i class="fas fa-hand-paper"></i> Aceptar/Rechazar</h4>
          <p>Puedes aceptar o rechazar cookies no esenciales en cualquier momento</p>
        </div>
        
        <div class="right-item">
          <h4><i class="fas fa-cog"></i> Configurar</h4>
          <p>Gestiona qué tipos de cookies quieres permitir</p>
        </div>
        
        <div class="right-item">
          <h4><i class="fas fa-trash"></i> Eliminar</h4>
          <p>Borra todas las cookies almacenadas en tu navegador</p>
        </div>
        
        <div class="right-item">
          <h4><i class="fas fa-ban"></i> Bloquear</h4>
          <p>Configura tu navegador para rechazar cookies automáticamente</p>
        </div>
        
        <div class="right-item">
          <h4><i class="fas fa-redo"></i> Cambiar Decisión</h4>
          <p>Modifica tu consentimiento en cualquier momento</p>
        </div>
        
        <div class="right-item">
          <h4><i class="fas fa-eye"></i> Transparencia</h4>
          <p>Ve exactamente qué cookies están activas</p>
        </div>
      </div>

      <h2>🛠️ Gestión por Navegador</h2>
      
      <div class="cookie-controls">
        <h3>Configuración en Navegadores Populares</h3>
        
        <div class="security-measures">
          <div class="security-item">
            <i class="fab fa-chrome"></i>
            <h4>Google Chrome</h4>
            <p>Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</p>
          </div>
          
          <div class="security-item">
            <i class="fab fa-firefox"></i>
            <h4>Mozilla Firefox</h4>
            <p>Opciones → Privacidad y seguridad → Cookies y datos del sitio</p>
          </div>
          
          <div class="security-item">
            <i class="fab fa-safari"></i>
            <h4>Safari</h4>
            <p>Preferencias → Privacidad → Cookies y datos de sitios web</p>
          </div>
          
          <div class="security-item">
            <i class="fab fa-edge"></i>
            <h4>Microsoft Edge</h4>
            <p>Configuración → Cookies y permisos del sitio → Cookies y datos del sitio</p>
          </div>
        </div>
        
        <div class="cookie-notice">
          <h4>⚠️ Nota Importante</h4>
          <p>Bloquear todas las cookies puede afectar la funcionalidad del sitio. Te recomendamos usar nuestro banner de consentimiento para un control más granular.</p>
        </div>
      </div>

      <h2>🎯 Finalidad y Base Legal</h2>
      
      <h3>📝 Bases Legales para el Tratamiento</h3>
      <ul>
        <li><strong>Cookies esenciales:</strong> Interés legítimo para el funcionamiento del sitio</li>
        <li><strong>Cookies de afiliación:</strong> Consentimiento explícito del usuario</li>
        <li><strong>Cookies analíticas:</strong> Consentimiento explícito del usuario</li>
        <li><strong>Cookies publicitarias:</strong> Consentimiento explícito del usuario</li>
      </ul>

      <h3>🎯 Finalidades Específicas</h3>
      <div class="third-party-list">
        <div class="third-party-item">
          <h4><i class="fas fa-bullseye"></i> Afiliación</h4>
          <p>Rastrear compras para cumplir con los programas de afiliados y generar ingresos que nos permiten mantener el contenido gratuito.</p>
        </div>
        
        <div class="third-party-item">
          <h4><i class="fas fa-chart-bar"></i> Análisis</h4>
          <p>Comprender el comportamiento de los usuarios para mejorar el contenido y la experiencia de navegación.</p>
        </div>
        
        <div class="third-party-item">
          <h4><i class="fas fa-user-cog"></i> Personalización</h4>
          <p>Recordar preferencias para ofrecer una experiencia más personalizada y relevante.</p>
        </div>
      </div>

      <h2>⏰ Tiempo de Conservación</h2>
      
      <div class="security-measures">
        <div class="security-item">
          <i class="fas fa-calendar-day"></i>
          <h4>Cookies de Sesión</h4>
          <p>Se eliminan al cerrar el navegador</p>
        </div>
        
        <div class="security-item">
          <i class="fas fa-calendar-month"></i>
          <h4>Cookies Temporales</h4>
          <p>30-90 días de duración máxima</p>
        </div>
        
        <div class="security-item">
          <i class="fas fa-calendar-year"></i>
          <h4>Cookies Persistentes</h4>
          <p>Máximo 2 años (según normativa)</p>
        </div>
      </div>

      <h2>🌍 Transferencias Internacionales</h2>
      <p>Algunos proveedores de cookies (como Amazon o Google) pueden transferir datos fuera del Espacio Económico Europeo. En estos casos, nos aseguramos de que cumplan con las salvaguardas adecuadas según el RGPD.</p>

      <h2>📞 Contacto y Más Información</h2>
      
      <div class="contact-section">
        <h3>Para consultas sobre cookies o ejercer tus derechos:</h3>
        <div class="contact-methods">
          <div class="contact-method">
            <i class="fas fa-envelope"></i>
            <strong>Email:</strong> jesuscorner@gmail.com
          </div>
          <div class="contact-method">
            <i class="fas fa-clock"></i>
            <strong>Tiempo de respuesta:</strong> Máximo 30 días
          </div>
        </div>
        
        <p><strong>Autoridad de Control:</strong> Para reclamaciones, puedes contactar con la Agencia Española de Protección de Datos (AEPD).</p>
      </div>

      <h2>🔄 Actualizaciones de esta Política</h2>
      <p>Esta política de cookies puede actualizarse ocasionalmente para reflejar cambios en nuestras prácticas o normativas aplicables. Te notificaremos de cambios significativos a través del sitio web. La fecha de última actualización aparece al inicio de esta página.</p>

      <div class="summary-box">
        <h3>📋 Resumen Ejecutivo</h3>
        <ul>
          <li>✅ Solo cookies esenciales sin consentimiento</li>
          <li>✅ Control total sobre cookies no esenciales</li>
          <li>✅ Transparencia completa en el uso</li>
          <li>✅ Cumplimiento total con RGPD y LSSI-CE</li>
          <li>✅ Fácil gestión y revocación de consentimiento</li>
          <li>✅ Información clara sobre transferencias internacionales</li>
        </ul>
      </div>

      <div class="cookie-notice">
        <h4>🔗 Enlaces Relacionados</h4>
        <ul>
          <li><a href="{{ '/privacy/' | relative_url }}">Política de Privacidad</a></li>
          <li><a href="{{ '/affiliate/' | relative_url }}">Información sobre Afiliados</a></li>
        </ul>
      </div>

    </div>
  </div>
</section>
