# 🚀 JesusCorner - Guía de Desarrollo Local/Producción

## 📋 Configuración Implementada

He implementado un sistema de configuración dual que garantiza **entorno idéntico** entre local y GitHub Pages.

> **Nota:** La carpeta `_site/` se genera automáticamente al hacer `npm run build` o al desplegar en GitHub Pages. No edites archivos dentro de esa carpeta; todos los cambios deben realizarse en los archivos Markdown y en las plantillas de `_layouts/` y `_includes/`.

### 📁 Archivos de Configuración

1. **`_config.yml`** - Configuración base común
2. **`_config_prod.yml`** - Overrides para producción (GitHub Pages)
3. **`_config_dev.yml`** - Overrides para desarrollo local

### 🛠️ Scripts NPM Disponibles

```bash
# Desarrollo rápido (modo development)
npm run dev
# → Comando: bundle exec jekyll serve --config _config.yml,_config_dev.yml --incremental --livereload

# Producción local (idéntico a GitHub Pages)
npm run prod
# → Comando: JEKYLL_ENV=production bundle exec jekyll serve --config _config.yml,_config_prod.yml --incremental

# Build de producción
npm run build
# → Comando: JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config_prod.yml

# Build de desarrollo
npm run build-dev
# → Comando: bundle exec jekyll build --config _config.yml,_config_dev.yml
```

---

## 🎯 Cómo Usar

### Para Desarrollo Normal
```bash
npm run dev
```
✅ **Ventajas:**
- Livereload automático
- Build incremental rápido
- Future posts habilitados
- URLs locales (`localhost:4000`)

### Para Pruebas Pre-Producción
```bash
npm run prod
```
✅ **Ventajas:**
- **Idéntico a GitHub Pages**
- Mismo `JEKYLL_ENV=production`
- Mismas exclusiones
- Mismas URLs de producción
- Permite detectar errores antes del deploy

---

## 🔧 Configuraciones Específicas

### _config.yml (Base)
```yaml
# Configuración común para todos los entornos
title: "JesusCorner - Recomendaciones Tech"
description: "Recomendaciones honestas de tecnología..."
collections: ...
plugins: ...
```

### _config_dev.yml (Desarrollo)
```yaml
url: "http://localhost:4000"
baseurl: ""
env: development
future: true          # Permite posts con fecha futura
unpublished: true     # Permite posts draft
incremental: true
livereload: true
```

### _config_prod.yml (Producción)
```yaml
url: "https://jesuscorner.github.io"
baseurl: ""
env: production
future: false         # Como GitHub Pages
unpublished: false    # Como GitHub Pages
exclude:             # Lista completa de exclusiones de Pages
  - vendor/
  - node_modules/
  - *.log
  # ... etc
```

---

## 🔗 URLs y Enlaces

### En tus plantillas, usa siempre:

```liquid
<!-- Para CSS, JS, imágenes -->
<link rel="stylesheet" href="{{ '/styles.css' | relative_url }}">
<script src="{{ '/script.js' | relative_url }}"></script>
<img src="{{ '/logo.png' | relative_url }}" alt="Logo">

<!-- Para enlaces internos -->
<a href="{{ '/reviews/' | relative_url }}">Reviews</a>
<a href="{{ '/blog/' | relative_url }}">Blog</a>

<!-- Para URLs completas (schema.org, meta tags) -->
<meta property="og:url" content="{{ page.url | absolute_url }}">
<link rel="canonical" href="{{ page.url | absolute_url }}">
```

### ✅ Resultado:
- **Desarrollo:** `http://localhost:4000/styles.css`
- **Producción:** `https://jesuscorner.github.io/styles.css`

---

## 🧪 Flujo de Trabajo Recomendado

### 1. Desarrollo Diario
```bash
npm run dev
```
- Edita contenido
- Comprueba cambios en tiempo real
- Desarrollo rápido e iterativo

### 2. Antes de Commit
```bash
npm run prod
```
- Prueba en modo producción
- Verifica que todo funciona igual que Pages
- Comprueba enlaces, CSS, JS

### 3. Deploy
```bash
git add .
git commit -m "Update content"
git push origin main
```
- GitHub Actions se encarga del resto
- Build automático con configuración idéntica

---

## 🚨 Troubleshooting

### Problema: Enlaces rotos en producción
**Solución:** Siempre usa `| relative_url` o `| absolute_url`

### Problema: CSS/JS no carga
**Solución:** Verifica rutas con `npm run prod` antes del deploy

### Problema: Contenido no aparece
**Solución:** Revisa exclusiones en `_config_prod.yml`

---

## 🎉 Beneficios de Esta Configuración

✅ **Parity total** entre local y Pages
✅ **Pre-producción confiable** con `npm run prod`
✅ **Desarrollo rápido** con `npm run dev`
✅ **Debugging eficaz** antes del deploy
✅ **No más sorpresas** en producción
✅ **Configuración mantenible** y clara

---

## 📝 Próximos Pasos

1. **Prueba ambos modos:**
   ```bash
   npm run dev    # Verifica desarrollo
   npm run prod   # Verifica producción
   ```

2. **Comprueba que ambos cargan igual:**
   - Navegación
   - Enlaces
   - CSS/JS
   - Imágenes

3. **Haz cambios y verifica:**
   - Edita contenido
   - Prueba en `dev`
   - Valida en `prod`
   - Deploy con confianza

🎯 **Tu localhost ahora es prácticamente una copia exacta de GitHub Pages.**
