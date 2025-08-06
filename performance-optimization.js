// Performance Optimization Script
(function() {
    'use strict';
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalResources = [
            '/styles.css',
            '/logo.png',
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ];
        
        criticalResources.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = href.endsWith('.css') ? 'style' : 'image';
            if (href.includes('fonts.googleapis.com')) {
                link.as = 'style';
                link.crossOrigin = 'anonymous';
            }
            document.head.appendChild(link);
        });
    }
    
    // Lazy load images with Intersection Observer
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Critical CSS optimization
    function optimizeCriticalCSS() {
        // Move non-critical CSS to load after initial render
        const nonCriticalCSS = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        ];
        
        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
            document.head.appendChild(link);
        });
    }
    
    // Service Worker for caching
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    // Resource hints
    function addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
            { rel: 'dns-prefetch', href: '//images.unsplash.com' },
            { rel: 'dns-prefetch', href: '//m.media-amazon.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' }
        ];
        
        hints.forEach(hint => {
            const link = document.createElement('link');
            Object.keys(hint).forEach(key => {
                if (key === 'crossOrigin') {
                    link.crossOrigin = hint[key];
                } else {
                    link.setAttribute(key, hint[key]);
                }
            });
            document.head.appendChild(link);
        });
    }
    
    // Defer non-critical JavaScript
    function deferNonCriticalJS() {
        const scripts = [
            '/cookie-manager.js',
            '/image-optimization.js'
        ];
        
        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            document.head.appendChild(script);
        });
    }
    
    // Optimize font loading
    function optimizeFontLoading() {
        // Use font-display: swap for better perceived performance
        const fontCSS = `
            @font-face {
                font-family: 'Inter';
                font-display: swap;
                src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
                font-weight: 300 700;
                font-style: normal;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = fontCSS;
        document.head.appendChild(style);
    }
    
    // Initialize performance optimizations
    function init() {
        // Add resource hints early
        addResourceHints();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setupLazyLoading();
                preloadCriticalResources();
                optimizeFontLoading();
            });
        } else {
            setupLazyLoading();
            preloadCriticalResources();
            optimizeFontLoading();
        }
        
        // Initialize after window load
        window.addEventListener('load', () => {
            // Defer heavy operations
            setTimeout(() => {
                registerServiceWorker();
                deferNonCriticalJS();
            }, 1000);
        });
    }
    
    // Start optimization
    init();
    
})();

// Web Vitals monitoring
(function() {
    // Basic Web Vitals tracking
    function trackWebVitals() {
        if ('PerformanceObserver' in window) {
            // Track LCP (Largest Contentful Paint)
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Track FID (First Input Delay)
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            }).observe({ entryTypes: ['first-input'] });
            
            // Track CLS (Cumulative Layout Shift)
            let clsValue = 0;
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                console.log('CLS:', clsValue);
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }
    
    // Track after page load
    window.addEventListener('load', trackWebVitals);
})();
