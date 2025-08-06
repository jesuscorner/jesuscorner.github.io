// Enhanced Cookie Consent for Spanish GDPR Compliance
class CookieManager {
    constructor() {
        this.cookieTypes = {
            necessary: {
                name: 'Cookies Necesarias',
                description: 'Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.',
                required: true,
                enabled: true
            },
            analytics: {
                name: 'Cookies de Análisis',
                description: 'Nos ayudan a entender cómo interactúas con el sitio web para mejorarlo.',
                required: false,
                enabled: false
            },
            marketing: {
                name: 'Cookies de Marketing',
                description: 'Se utilizan para mostrar anuncios relevantes y medir la efectividad de las campañas.',
                required: false,
                enabled: false
            },
            affiliate: {
                name: 'Cookies de Afiliación',
                description: 'Necesarias para el correcto funcionamiento de los enlaces de afiliados de Amazon.',
                required: false,
                enabled: false
            }
        };
        
        this.init();
    }
    
    init() {
        this.loadSavedPreferences();
        this.createCookieBanner();
        this.createSettingsModal();
    }
    
    loadSavedPreferences() {
        const saved = localStorage.getItem('cookiePreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            Object.keys(this.cookieTypes).forEach(type => {
                if (preferences[type] !== undefined) {
                    this.cookieTypes[type].enabled = preferences[type];
                }
            });
            return true;
        }
        return false;
    }
    
    savePreferences() {
        const preferences = {};
        Object.keys(this.cookieTypes).forEach(type => {
            preferences[type] = this.cookieTypes[type].enabled;
        });
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
    }
    
    createCookieBanner() {
        if (this.loadSavedPreferences()) return; // Don't show if already consented
        
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <button class="cookie-close" onclick="cookieManager.hideBanner()">&times;</button>
                <h4><i class="fas fa-cookie-bite"></i> Configuración de Cookies</h4>
                <p>Utilizamos cookies para mejorar tu experiencia de navegación, personalizar contenido y analizar nuestro tráfico. También compartimos información sobre tu uso del sitio con nuestros socios de análisis y publicidad.</p>
                <div class="cookie-actions">
                    <button class="btn-cookie-accept" onclick="cookieManager.acceptAll()">
                        <i class="fas fa-check"></i> Aceptar Todo
                    </button>
                    <button class="btn-cookie-configure" onclick="cookieManager.showSettings()">
                        <i class="fas fa-cog"></i> Configurar
                    </button>
                    <button class="btn-cookie-reject" onclick="cookieManager.rejectAll()">
                        <i class="fas fa-times"></i> Rechazar Todo
                    </button>
                </div>
                <p class="cookie-links">
                    <a href="/politica-cookies/" target="_blank">Política de Cookies</a> | 
                    <a href="/privacy/" target="_blank">Política de Privacidad</a>
                </p>
            </div>
        `;
        
        document.body.appendChild(banner);
    }
    
    createSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-settings-modal';
        modal.id = 'cookieSettingsModal';
        
        const categoriesHTML = Object.keys(this.cookieTypes).map(type => {
            const category = this.cookieTypes[type];
            return `
                <div class="cookie-category">
                    <div class="cookie-toggle">
                        <div>
                            <strong>${category.name}</strong>
                            ${category.required ? '<span class="cookie-required">(Obligatorias)</span>' : ''}
                        </div>
                        <div class="cookie-switch ${category.enabled ? 'active' : ''}" 
                             data-type="${type}" 
                             onclick="cookieManager.toggleCookie('${type}')"
                             ${category.required ? 'data-disabled="true"' : ''}>
                        </div>
                    </div>
                    <p class="cookie-description">${category.description}</p>
                </div>
            `;
        }).join('');
        
        modal.innerHTML = `
            <div class="cookie-settings-content">
                <h3><i class="fas fa-cookie-bite"></i> Configuración de Cookies</h3>
                <p>Puedes activar o desactivar cada tipo de cookies según tus preferencias. Las cookies necesarias no se pueden desactivar ya que son imprescindibles para el funcionamiento del sitio.</p>
                
                ${categoriesHTML}
                
                <div class="cookie-modal-actions">
                    <button class="btn-cookie-save" onclick="cookieManager.saveAndClose()">
                        <i class="fas fa-save"></i> Guardar Configuración
                    </button>
                    <button class="btn-cookie-cancel" onclick="cookieManager.hideSettings()">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    showSettings() {
        const modal = document.getElementById('cookieSettingsModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    hideSettings() {
        const modal = document.getElementById('cookieSettingsModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    toggleCookie(type) {
        if (this.cookieTypes[type].required) return;
        
        this.cookieTypes[type].enabled = !this.cookieTypes[type].enabled;
        
        const toggle = document.querySelector(`[data-type="${type}"]`);
        toggle.classList.toggle('active', this.cookieTypes[type].enabled);
    }
    
    acceptAll() {
        Object.keys(this.cookieTypes).forEach(type => {
            this.cookieTypes[type].enabled = true;
        });
        this.savePreferences();
        this.applyPreferences();
        this.hideBanner();
    }
    
    rejectAll() {
        Object.keys(this.cookieTypes).forEach(type => {
            this.cookieTypes[type].enabled = this.cookieTypes[type].required;
        });
        this.savePreferences();
        this.applyPreferences();
        this.hideBanner();
    }
    
    saveAndClose() {
        this.savePreferences();
        this.applyPreferences();
        this.hideSettings();
        this.hideBanner();
    }
    
    hideBanner() {
        const banner = document.querySelector('.cookie-consent-banner');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'translateX(100%)';
            setTimeout(() => banner.remove(), 300);
        }
    }
    
    applyPreferences() {
        // Apply analytics cookies
        if (this.cookieTypes.analytics.enabled) {
            this.loadGoogleAnalytics();
        }
        
        // Apply marketing cookies
        if (this.cookieTypes.marketing.enabled) {
            this.loadMarketingScripts();
        }
        
        // Apply affiliate cookies
        if (this.cookieTypes.affiliate.enabled) {
            this.enableAffiliateTracking();
        }
        
        // Dispatch event for other scripts to listen
        window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', {
            detail: this.cookieTypes
        }));
    }
    
    loadGoogleAnalytics() {
        // Only load if not already loaded
        if (!window.gtag) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID';
            document.head.appendChild(script);
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID');
        }
    }
    
    loadMarketingScripts() {
        // Load marketing/advertising scripts here
        console.log('Loading marketing scripts...');
    }
    
    enableAffiliateTracking() {
        // Enable Amazon affiliate tracking
        console.log('Enabling affiliate tracking...');
    }
    
    // Method to check if a specific cookie type is enabled
    isEnabled(type) {
        return this.cookieTypes[type] && this.cookieTypes[type].enabled;
    }
}

// Additional CSS for the enhanced cookie banner
const cookieStyles = `
<style>
.cookie-consent-banner {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 400px;
    max-width: calc(100vw - 40px);
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    border: 1px solid rgba(255, 140, 0, 0.2);
    z-index: 10000;
    transition: all 0.3s ease;
}

.cookie-banner-content {
    padding: 1.5rem;
    position: relative;
}

.cookie-close {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #666;
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    transition: all 0.2s ease;
}

.cookie-close:hover {
    background: #f8f9fa;
    color: #333;
}

.cookie-banner-content h4 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.cookie-banner-content h4 i {
    color: #FF8C00;
}

.cookie-banner-content p {
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #555;
}

.cookie-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.cookie-actions button {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-cookie-accept {
    background: #FF8C00;
    color: white;
}

.btn-cookie-accept:hover {
    background: #e6790e;
    transform: translateY(-1px);
}

.btn-cookie-configure {
    background: #f8f9fa;
    color: #495057;
    border: 1px solid #dee2e6;
}

.btn-cookie-configure:hover {
    background: #e9ecef;
}

.btn-cookie-reject {
    background: transparent;
    color: #6c757d;
    border: 1px solid #6c757d;
}

.btn-cookie-reject:hover {
    background: #6c757d;
    color: white;
}

.cookie-links {
    font-size: 0.8rem;
    text-align: center;
    margin: 0;
    padding-top: 0.5rem;
    border-top: 1px solid #f1f3f5;
}

.cookie-links a {
    color: #FF8C00;
    text-decoration: none;
    font-weight: 500;
}

.cookie-links a:hover {
    text-decoration: underline;
}

.cookie-required {
    font-size: 0.75rem;
    color: #dc3545;
    font-weight: normal;
}

.cookie-modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
}

.btn-cookie-save {
    background: #FF8C00;
    color: white;
    flex: 1;
}

.btn-cookie-save:hover {
    background: #e6790e;
}

.btn-cookie-cancel {
    background: #6c757d;
    color: white;
    flex: 1;
}

.btn-cookie-cancel:hover {
    background: #5a6268;
}

@media (max-width: 768px) {
    .cookie-consent-banner {
        bottom: 10px;
        right: 10px;
        left: 10px;
        width: auto;
        max-width: none;
    }
    
    .cookie-banner-content {
        padding: 1rem;
    }
    
    .cookie-banner-content h4 {
        font-size: 1rem;
    }
    
    .cookie-banner-content p {
        font-size: 0.85rem;
    }
    
    .cookie-actions button {
        font-size: 0.8rem;
        padding: 0.5rem 0.8rem;
    }
    
    .cookie-modal-actions {
        flex-direction: column;
    }
}
</style>
`;

// Insert styles and initialize
document.head.insertAdjacentHTML('beforeend', cookieStyles);

// Initialize cookie manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.cookieManager = new CookieManager();
});

// Export for global access
window.CookieManager = CookieManager;
