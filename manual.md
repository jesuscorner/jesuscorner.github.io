
### **Archivos de Documentación**
```bash
rm RECOMENDACIONES-SOLUCIONADO.md  # Archivo temporal de documentación
```

## ✅ ARCHIVOS ESENCIALES (Mantener)

### **Jekyll Core**
- `_config.yml`, `_config_dev.yml`, `_config_prod.yml` - Configuraciones Jekyll
- `Gemfile`, `Gemfile.lock` - Dependencias Ruby/Jekyll
- `package.json` - Scripts de desarrollo

### **Contenido Principal**
- `index.md` - Página principal
- `recommendations.md` - Página de recomendaciones 
- `privacy.md`, `affiliate.md` - Páginas legales
- `products-data.json` - Datos de productos ✅
- `recommendations-script.js` - Script funcional ✅

### **Estructura Jekyll**
- `_layouts/`, `_includes/` - Templates
- `_posts/`, `_reviews/` - Contenido
- `blog/`, `reviews/` - Páginas índice

### **Assets**
- `styles.css` - Estilos principales
- `favicon/` - Iconos del sitio
- `logo.png` - Logo

---

# 🏗️ ESTRUCTURA COMPLETA DE LA WEB

## **Arquitectura Jekyll**

```
jesuscorner.github.io/
├── 🏠 PÁGINAS PRINCIPALES
│   ├── index.md                    # Página inicio
│   ├── recommendations.md          # Recomendaciones productos
│   ├── privacy.md                  # Política privacidad
│   └── affiliate.md               # Política afiliados
│
├── 📝 CONTENIDO DINÁMICO
│   ├── _posts/                    # Artículos blog
│   │   ├── 2025-06-06-rtx-4060-vs-4070-laptops.md
│   │   └── 2025-06-07-mejores-ratones-gaming-2025.md
│   ├── _reviews/                  # Reviews productos
│   │   ├── lenovo-loq-15iax9-gaming-review.md
│   │   ├── philips-273v7qdsb-monitor-review.md
│   │   └── logitech-m705-marathon-review.md
│   └── blog/index.md              # Índice blog
│
├── 🎨 TEMPLATES Y DISEÑO
│   ├── _layouts/
│   │   ├── default.html           # Layout base
│   │   ├── post.html             # Layout artículos
│   │   └── review.html           # Layout reviews
│   ├── _includes/
│   │   ├── header.html           # Cabecera común
│   │   └── footer.html           # Pie común
│   └── styles.css                # Estilos CSS
│
├── 📊 DATOS Y SCRIPTS
│   ├── products-data.json         # Base datos productos
│   └── recommendations-script.js  # Lógica productos
│
├── ⚙️ CONFIGURACIÓN
│   ├── _config.yml               # Config base Jekyll
│   ├── _config_dev.yml           # Config desarrollo  
│   ├── _config_prod.yml          # Config producción
│   ├── Gemfile                   # Dependencias Ruby
│   └── package.json              # Scripts desarrollo
│
└── 🚀 DESPLIEGUE
    └── .github/workflows/pages.yml  # CI/CD GitHub Pages
```

---

# 🔄 FLUJOS DETALLADOS

## **1. 🛍️ AÑADIR NUEVOS PRODUCTOS**

### **Paso 1: Actualizar JSON**
```json
// products-data.json
{
  "products": [
    // ... productos existentes
    {
      "id": "nuevo123",
      "title": "Nuevo Producto - Descripción",
      "image": "https://m.media-amazon.com/images/I/imagen.jpg",
      "category": "tech|peripherals|audio|wearables",
      "amazonUrl": "https://amzn.to/tu-codigo-afiliado"
    }
  ]
}
```

### **Paso 2: Verificar Funcionamiento**
```bash
# Servidor desarrollo
npm run dev     # http://localhost:4001

# Servidor producción (prueba final)
npm run prod    # http://localhost:4002
```

### **Categorías Disponibles:**
- `tech` → Badge naranja "TECH"
- `peripherals` → Badge naranja "PERIFÉRICOS" 
- `audio` → Badge naranja "AUDIO"
- `wearables` → Badge naranja "WEARABLES"

---

## **2. 📝 AÑADIR NUEVOS POSTS (Artículos Blog)**

### **Paso 1: Crear Archivo**
```bash
# Formato: YYYY-MM-DD-titulo-del-post.md
touch _posts/2025-06-27-mi-nuevo-articulo.md
```

### **Paso 2: Estructura del Post**
```yaml
---
layout: post
title: "Mi Nuevo Artículo Técnico"
date: 2025-06-27 10:00:00 +0100
categories: [gaming, reviews, comparativas]
tags: [rtx, nvidia, gaming, laptops]
author: "JesusCorner"
description: "Descripción breve del artículo"
image: "/assets/images/mi-articulo.jpg"  # Opcional
---

# Contenido del Artículo

Tu contenido en **Markdown** aquí...

## Enlaces de Afiliado
[Ver en Amazon](https://amzn.to/tu-codigo){:target="_blank"}
```

### **Paso 3: Automático**
- ✅ **Aparece automáticamente** en `/blog/`  
- ✅ **URL generada**: `/blog/2025/06/27/mi-nuevo-articulo/`
- ✅ **RSS incluido** automáticamente

---

## **3. ⭐ AÑADIR NUEVAS REVIEWS**

### **Paso 1: Crear Review**
```bash
touch _reviews/nombre-producto-review.md
```

### **Paso 2: Estructura Review**
```yaml
---
layout: review
title: "Review Producto X - Análisis Completo"
product_name: "Nombre del Producto"
brand: "Marca"
category: "Gaming/Tech/Audio"
rating: 4.5
pros:
  - "Excelente rendimiento"
  - "Buena relación calidad-precio"
cons:
  - "Un poco ruidoso"
  - "Cable corto"
amazon_url: "https://amzn.to/codigo-afiliado"
price_range: "50-100€"
---

# Review Completa

Tu análisis detallado...
```

### **Paso 3: Automático**
- ✅ **Aparece en** `/reviews/`
- ✅ **URL**: `/reviews/nombre-producto-review/`

---

# 🎯 COMANDOS IMPORTANTES

## **Desarrollo Local**
```bash
# Desarrollo rápido
npm run dev
# → http://localhost:4001 (con livereload)

# Producción local (igual que GitHub Pages)  
npm run prod
# → http://localhost:4002 (testing final)

# Jekyll directo
bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

## **Gestión de Archivos**
```bash
# Limpiar archivos innecesarios
rm script.js amazon-service.js script-backup.js script-clean.js
rm debug-utils.js maintenance-utils.js server.js posts.js home.js
rm db.json posts-data.json package-lock.json RECOMENDACIONES-SOLUCIONADO.md

# Verificar build
bundle exec jekyll build --config _config.yml,_config_prod.yml
```

---

# 🎉 RESUMEN FINAL

## **Tu Web Actual Es:**
- ✅ **Jekyll estático** con GitHub Pages
- ✅ **Sistema de productos** funcional y limpio
- ✅ **Blog automatizado** con posts y reviews
- ✅ **Configuración dual** dev/prod perfecta
- ✅ **Cumple políticas** Amazon Afiliados

## **Flujo de Trabajo:**
1. **Desarrollo** → `npm run dev` (puerto 4001)
2. **Testing** → `npm run prod` (puerto 4002) 
3. **Deploy** → `git push main` (automático via GitHub Actions)

¿Quieres que proceda a eliminar los archivos innecesarios que identifiqué?Te ayudo a limpiar el proyecto y explicar la estructura completa. Primero voy a identificar los archivos innecesarios y luego eliminarlos. ## 🧹 Limpieza de Archivos Innecesarios

Voy a eliminar todos los archivos que no son necesarios para el funcionamiento de la web: Perfecto. Ahora voy a explicar la estructura completa y los flujos de trabajo.

## 📁 **ESTRUCTURA COMPLETA DE LA WEB**

### **🏗️ Arquitectura General**
Tu web es un **sitio estático de Jekyll** optimizado para **GitHub Pages** con sistema de **afiliados de Amazon**.

```
jesuscorner.github.io/
├── 📋 CONFIGURACIÓN
│   ├── _config.yml           # Configuración base de Jekyll
│   ├── _config_dev.yml       # Configuración para desarrollo
│   ├── _config_prod.yml      # Configuración para producción
│   ├── Gemfile              # Dependencias Ruby/Jekyll
│   └── .gitignore           # Archivos a ignorar en Git
│
├── 🎨 ESTRUCTURA JEKYLL
│   ├── _includes/           # Componentes reutilizables
│   │   ├── header.html      # Cabecera del sitio
│   │   └── footer.html      # Pie de página con aviso afiliados
│   ├── _layouts/            # Plantillas de página
│   │   ├── default.html     # Layout base
│   │   ├── post.html        # Layout para posts del blog
│   │   └── review.html      # Layout para reviews de productos
│   └── _data/               # Datos estructurados (vacío actualmente)
│
├── 📝 CONTENIDO
│   ├── _posts/              # Posts del blog (Markdown)
│   │   ├── 2025-06-06-rtx-4060-vs-4070-laptops.md
│   │   └── 2025-06-07-mejores-ratones-gaming-2025.md
│   ├── _reviews/            # Reviews de productos (Markdown)
│   │   ├── lenovo-loq-15iax9-gaming-review.md
│   │   ├── logitech-m705-marathon-review.md
│   │   └── philips-273v7qdsb-monitor-review.md
│   └── 📄 PÁGINAS
│       ├── index.md         # Página principal
│       ├── recommendations.md # Página de productos
│       ├── affiliate.md     # Política de afiliados
│       ├── privacy.md       # Política de privacidad
│       ├── blog/index.md    # Índice del blog
│       └── reviews/index.md # Índice de reviews
│
├── 💾 DATOS Y FUNCIONALIDAD
│   ├── products-data.json   # Base de datos de productos
│   ├── recommendations-script.js # JavaScript para productos
│   └── styles.css          # Estilos CSS globales
│
├── 🖼️ RECURSOS
│   ├── favicon/            # Iconos del sitio
│   ├── logo.png           # Logo principal
│   └── _site/             # Sitio generado (auto-generado)
│
└── ⚙️ AUTOMATIZACIÓN
    ├── .github/workflows/pages.yml # GitHub Actions
    └── .vscode/tasks.json  # Tareas de VS Code
```

---

## 🔄 **FLUJOS DE TRABAJO DETALLADOS**

### **1. 🛍️ CÓMO AÑADIR NUEVOS PRODUCTOS**

#### **Paso 1: Agregar al JSON**
Edita products-data.json:

```json
{
  "products": [
    // ...productos existentes...
    {
      "id": "nuevo-id-unico",
      "title": "Nombre del Producto",
      "image": "URL_de_imagen_de_Amazon",
      "category": "tech|peripherals|audio",
      "amazonUrl": "https://amzn.to/tu-enlace-afiliado"
    }
  ]
}
```

#### **Paso 2: Obtener Datos de Amazon**
```bash
# Para obtener la imagen correcta de Amazon:
# 1. Ve al producto en Amazon
# 2. Click derecho en la imagen principal
# 3. "Copiar dirección de imagen"
# 4. Usar esa URL en el campo "image"
```

#### **Paso 3: Verificar**
- Los productos aparecen automáticamente en `/recommendations.html`
- Se organizan por categorías con badges automáticos
- Los enlaces funcionan con tu código de afiliado

### **2. 📝 CÓMO AÑADIR NUEVOS POSTS DE BLOG**

#### **Estructura del Archivo**
Crea archivo en _posts con formato: `YYYY-MM-DD-titulo-del-post.md`

```markdown
---
layout: post
title: "Título del Post"
description: "Descripción para SEO"
date: 2025-06-26
categories: [guias, gaming, laptops]
tags: [tag1, tag2, tag3]
author: "JesusCorner"
image: "https://images.unsplash.com/photo-xxx"
---

# Contenido del post aquí

Escribe tu contenido en **Markdown**.

## Subtítulos
- Listas
- Enlaces: [texto](URL)
- Imágenes: ![alt](URL)
```

#### **Categorías Recomendadas**
- `guias` - Guías de compra
- reviews - Reviews breves
- `gaming` - Contenido gaming
- `tech` - Tecnología general
- `noticias` - Noticias tech

### **3. ⭐ CÓMO AÑADIR NUEVAS REVIEWS DETALLADAS**

#### **Estructura de Review**
Crea archivo en _reviews con formato: `nombre-producto-review.md`

```markdown
---
layout: review
title: "Producto XYZ Review: Análisis Completo"
product_name: "Nombre Exacto del Producto"
description: "Descripción SEO de la review"
date: 2025-06-26
rating: 4.5
current_price: 149.99
original_price: 199.99
product_image: "URL_imagen"
amazon_url: "https://amzn.to/tu-enlace"
pros:
  - "Ventaja 1"
  - "Ventaja 2"
cons:
  - "Desventaja 1"
  - "Desventaja 2"
verdict: "Conclusión final del producto"
related_products: ["id1", "id2"]
---

## Mi Experiencia Personal

Contenido detallado de la review...
```

---

## 🚀 **FLUJO DE DESARROLLO**

### **Desarrollo Local**
```bash
# Iniciar servidor de desarrollo
npm run dev
# O directamente con Jekyll:
bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

### **Construcción y Despliegue**
```bash
# Construcción para producción
npm run build

# GitHub Actions se encarga del despliegue automático
# cuando haces push a la rama main
```

### **Estructura de URLs**
```
/ → Página principal
/recommendations.html → Productos recomendados
/blog/ → Índice del blog
/blog/YYYY/MM/DD/titulo/ → Posts individuales
/reviews/ → Índice de reviews
/reviews/nombre-producto-review/ → Reviews individuales
/affiliate/ → Política de afiliados
/privacy/ → Política de privacidad
```

---

## 🔧 **ARCHIVOS CLAVE Y SU FUNCIÓN**

| Archivo | Función |
|---------|---------|
| products-data.json | **Base de datos de productos** - Aquí añades nuevos productos |
| recommendations-script.js | **JavaScript principal** - Carga y muestra productos |
| styles.css | **Estilos globales** - Diseño y responsive |
| footer.html | **Aviso de afiliados** - Cumplimiento legal |
| _config.yml | **Configuración Jekyll** - URLs, plugins, etc. |

---

## 📊 **SISTEMAS INTEGRADOS**

### **✅ Sistema de Afiliados**
- ✅ Divulgación legal en footer
- ✅ Página de política de afiliados
- ✅ Enlaces correctamente formateados
- ✅ Sin precios para evitar problemas legales

### **✅ SEO y Performance**
- ✅ Jekyll SEO Tag plugin
- ✅ Sitemap automático
- ✅ Meta tags optimizados
- ✅ Imágenes lazy loading

### **✅ Responsive Design**
- ✅ Mobile-first CSS
- ✅ Grid layouts flexibles
- ✅ Tipografía escalable

