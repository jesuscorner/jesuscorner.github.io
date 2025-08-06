// Image Optimization and Accessibility
document.addEventListener('DOMContentLoaded', function() {
    
    // Add lazy loading to all images that don't already have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        // Skip logo and hero images that should load immediately
        if (!img.classList.contains('logo-image') && 
            !img.classList.contains('hero-logo') && 
            !img.classList.contains('hero-main-image')) {
            img.setAttribute('loading', 'lazy');
        }
    });
    
    // Add fallback alt text for images without alt attributes
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    imagesWithoutAlt.forEach(img => {
        // Try to extract meaningful alt text from context
        let altText = '';
        
        // Check parent elements for context
        const parentCard = img.closest('.product-card, .review-card, .post-card');
        if (parentCard) {
            const title = parentCard.querySelector('h2, h3, .product-title, .review-title, .post-title');
            if (title) {
                altText = title.textContent.trim();
            }
        }
        
        // Fallback to generic description
        if (!altText) {
            if (img.src.includes('amazon') || img.src.includes('product')) {
                altText = 'Imagen del producto';
            } else if (img.classList.contains('review-image') || img.closest('.review-card')) {
                altText = 'Imagen de review';
            } else if (img.classList.contains('post-image') || img.closest('.post-card')) {
                altText = 'Imagen del artículo';
            } else {
                altText = 'Imagen ilustrativa';
            }
        }
        
        img.setAttribute('alt', altText);
    });
    
    // Handle image loading errors with fallback
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            // Create fallback placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = `
                <i class="fas fa-image"></i>
                <span>Imagen no disponible</span>
            `;
            
            // Replace image with placeholder
            if (this.parentNode) {
                this.parentNode.replaceChild(placeholder, this);
            }
        });
    });
    
    // Optimize Amazon images with better parameters
    const amazonImages = document.querySelectorAll('img[src*="amazon"], img[src*="amzn"]');
    amazonImages.forEach(img => {
        const src = img.src;
        if (src.includes('amazon') && !src.includes('._SX') && !src.includes('._SY')) {
            // Add size parameters for better loading
            const optimizedSrc = src.replace(/\._.*?\./, '._SX400_SY400_.');
            img.src = optimizedSrc;
        }
    });
});

// CSS for image placeholders
const imageStyles = `
<style>
.image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    color: #6c757d;
    min-height: 200px;
    font-size: 0.9rem;
}

.image-placeholder i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    opacity: 0.5;
}

/* Improved image loading state */
img {
    transition: opacity 0.3s ease;
}

img[loading="lazy"] {
    opacity: 0;
}

img[loading="lazy"].loaded {
    opacity: 1;
}

/* Better contrast for text over images */
.hero-content, .review-content, .post-content {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
`;

// Insert the styles
document.head.insertAdjacentHTML('beforeend', imageStyles);
