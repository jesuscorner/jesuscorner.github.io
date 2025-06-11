/**
 * Servicio para obtener datos de productos de Amazon
 * 
 * Este servicio maneja la obtención de datos de productos desde Amazon
 * usando diferentes métodos: API oficial, scraping, o servicios de terceros
 */

class AmazonProductService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 60 * 60 * 1000; // 1 hora en milisegundos
    this.rateLimitDelay = 1000; // 1 segundo entre peticiones
    this.lastRequest = 0;
  }

  /**
   * Obtener datos de un producto desde Amazon
   */
  async getProductData(amazonUrl) {
    const asin = this.extractASIN(amazonUrl);
    if (!asin) {
      throw new Error('No se pudo extraer ASIN de la URL');
    }

    // Verificar cache
    const cached = this.getFromCache(asin);
    if (cached) {
      console.log(`📦 Datos obtenidos desde cache: ${asin}`);
      return cached;
    }

    // Rate limiting
    await this.respectRateLimit();

    console.log(`🔍 Obteniendo datos para ASIN: ${asin}`);

    try {
      // Intentar diferentes métodos en orden de preferencia
      let productData = await this.tryMultipleMethods(amazonUrl, asin);
      
      // Guardar en cache
      this.saveToCache(asin, productData);
      
      return productData;
    } catch (error) {
      console.error(`❌ Error obteniendo datos de ${asin}:`, error.message);
      return this.getFallbackData(asin, amazonUrl);
    }
  }

  /**
   * Intentar múltiples métodos para obtener datos
   */
  async tryMultipleMethods(amazonUrl, asin) {
    const methods = [
      () => this.fetchViaAPI(asin),
      () => this.fetchViaOpenGraph(amazonUrl),
      () => this.fetchViaMetadata(amazonUrl),
      () => this.fetchViaProxy(amazonUrl)
    ];

    for (const method of methods) {
      try {
        const result = await method();
        if (result && result.title) {
          console.log(`✅ Datos obtenidos exitosamente para ${asin}`);
          return result;
        }
      } catch (error) {
        console.warn(`⚠️ Método falló para ${asin}:`, error.message);
        continue;
      }
    }

    throw new Error('Todos los métodos de obtención fallaron');
  }

  /**
   * Método 1: Amazon Product Advertising API (requiere credenciales)
   */
  async fetchViaAPI(asin) {
    // TODO: Implementar con credenciales de Amazon PA API
    // Por ahora retornamos null para pasar al siguiente método
    throw new Error('Amazon PA API no configurada');
  }

  /**
   * Método 2: Extracción de metadatos OpenGraph
   */
  async fetchViaOpenGraph(url) {
    try {
      // Usar un proxy CORS para evitar problemas
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      const html = data.contents;

      return this.parseOpenGraphData(html);
    } catch (error) {
      throw new Error(`OpenGraph extraction failed: ${error.message}`);
    }
  }

  /**
   * Método 3: Extracción de metadatos usando servicio de terceros
   */
  async fetchViaMetadata(url) {
    try {
      // Usar un servicio como LinkPreview o similar
      const apiUrl = `https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return this.parseMetadataResponse(data);
    } catch (error) {
      throw new Error(`Metadata extraction failed: ${error.message}`);
    }
  }

  /**
   * Método 4: Usar proxy de scraping
   */
  async fetchViaProxy(url) {
    try {
      // Usar un servicio como ScrapingBee, ScraperAPI, etc.
      // Por ahora usamos un proxy simple
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      return this.parseHTMLContent(data.contents);
    } catch (error) {
      throw new Error(`Proxy scraping failed: ${error.message}`);
    }
  }

  /**
   * Parsear datos de OpenGraph
   */
  parseOpenGraphData(html) {
    const meta = {};
    
    // Extraer metadatos OpenGraph
    const ogMatches = html.match(/<meta[^>]+property="og:([^"]+)"[^>]+content="([^"]+)"/gi) || [];
    ogMatches.forEach(match => {
      const [, property, content] = match.match(/property="og:([^"]+)"[^>]+content="([^"]+)"/i) || [];
      if (property && content) {
        meta[property] = content;
      }
    });

    // Extraer precio
    const priceMatch = html.match(/<span[^>]*class="[^"]*price[^"]*"[^>]*>([^<]+)</i);
    const price = priceMatch ? this.cleanPrice(priceMatch[1]) : null;

    // Extraer rating
    const ratingMatch = html.match(/(\d\.\d)\s*out\s*of\s*5/i);
    const rating = ratingMatch ? ratingMatch[1] : null;

    return {
      title: meta.title || 'Producto de Amazon',
      description: meta.description || '',
      image: meta.image || this.getDefaultImage(),
      price: price || 'Consultar precio',
      rating: rating || '4.0',
      reviewCount: '100+',
      availability: 'En stock',
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Parsear respuesta de servicio de metadatos
   */
  parseMetadataResponse(data) {
    return {
      title: data.title || 'Producto de Amazon',
      description: data.description || '',
      image: data.images?.[0] || this.getDefaultImage(),
      price: 'Consultar precio',
      rating: '4.0',
      reviewCount: '100+',
      availability: 'En stock',
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Parsear contenido HTML directo
   */
  parseHTMLContent(html) {
    // Patrones para extraer información
    const titleMatch = html.match(/<title[^>]*>([^<]+)</i);
    const imageMatch = html.match(/<img[^>]+src="([^"]+amazon[^"]+)"/i);
    const priceMatch = html.match(/\$(\d+\.?\d*)/);

    return {
      title: titleMatch ? titleMatch[1].replace(' - Amazon.com', '') : 'Producto de Amazon',
      description: 'Producto disponible en Amazon',
      image: imageMatch ? imageMatch[1] : this.getDefaultImage(),
      price: priceMatch ? `$${priceMatch[1]}` : 'Consultar precio',
      rating: '4.0',
      reviewCount: '100+',
      availability: 'En stock',
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Datos de fallback cuando todo falla
   */
  getFallbackData(asin, url) {
    console.log(`🔄 Usando datos de fallback para ${asin}`);
    
    return {
      title: 'Producto de Amazon',
      description: 'Producto disponible en Amazon',
      image: this.getDefaultImage(),
      price: 'Ver precio en Amazon',
      rating: '4.0',
      reviewCount: '100+',
      availability: 'Disponible',
      lastUpdated: new Date().toISOString(),
      isFallback: true
    };
  }

  /**
   * Extraer ASIN de URL de Amazon
   */
  extractASIN(url) {
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
  }

  /**
   * Limpiar precio extraído
   */
  cleanPrice(priceText) {
    const cleaned = priceText.replace(/[^\d.,]/g, '');
    const match = cleaned.match(/\d+[.,]\d+/);
    return match ? match[0] : null;
  }

  /**
   * Imagen por defecto
   */
  getDefaultImage() {
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&auto=format';
  }

  /**
   * Gestión de cache
   */
  getFromCache(asin) {
    const cached = this.cache.get(asin);
    if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
      return cached.data;
    }
    return null;
  }

  saveToCache(asin, data) {
    this.cache.set(asin, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Rate limiting
   */
  async respectRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    
    if (timeSinceLastRequest < this.rateLimitDelay) {
      const delay = this.rateLimitDelay - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastRequest = Date.now();
  }

  /**
   * Limpiar cache
   */
  clearCache() {
    this.cache.clear();
    console.log('🧹 Cache limpiado');
  }

  /**
   * Actualizar datos de un producto (forzar nueva consulta)
   */
  async refreshProduct(amazonUrl) {
    const asin = this.extractASIN(amazonUrl);
    if (asin) {
      this.cache.delete(asin);
    }
    return this.getProductData(amazonUrl);
  }
}

// Crear instancia global
window.amazonService = new AmazonProductService();

export default AmazonProductService;
