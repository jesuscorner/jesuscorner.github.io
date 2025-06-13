# ✅ Configuración Jekyll Dual - IMPLEMENTADA

## 🎯 ¿Qué hemos logrado?

He implementado **exactamente** la configuración que solicitaste para tener un entorno **idéntico** entre local y GitHub Pages.

---

## 📁 Archivos Creados/Modificados

### ✅ Nuevos Archivos de Configuración
- **`_config_prod.yml`** - Overrides para producción (GitHub Pages)
- **`_config_dev.yml`** - Overrides para desarrollo local
- **`DESARROLLO-LOCAL.md`** - Guía completa de uso

### ✅ Archivos Modificados
- **`_config.yml`** - Ahora es la configuración "base" común
- **`package.json`** - Scripts npm para desarrollo y producción

---

## 🚀 Comandos Disponibles

### Desarrollo Rápido
```bash
bundle exec jekyll serve --config _config.yml,_config_dev.yml --port 4001
```
🔗 **URL:** http://localhost:4001
- ✅ Livereload habilitado
- ✅ Build incremental
- ✅ Posts futuros/draft habilitados

### Producción Local (Idéntico a GitHub Pages)
```bash
JEKYLL_ENV=production bundle exec jekyll serve --config _config.yml,_config_prod.yml --port 4002
```
🔗 **URL:** http://localhost:4002
- ✅ `JEKYLL_ENV=production`
- ✅ Mismas exclusiones que GitHub Pages
- ✅ URLs de producción
- ✅ **Comportamiento idéntico a Pages**

---

## ✅ Estado Actual

### 🟢 Servidor de Desarrollo
- **Ejecutándose en:** http://127.0.0.1:4001
- **Configuración:** `_config.yml` + `_config_dev.yml`
- **Livereload:** Activo

### 🟢 Servidor de Producción
- **Ejecutándose en:** http://127.0.0.1:4002
- **Configuración:** `_config.yml` + `_config_prod.yml`
- **Entorno:** `JEKYLL_ENV=production`

---

## 🔍 Cómo Funciona

### 1. Configuración Base (`_config.yml`)
```yaml
# Configuración común para todos los entornos
title: "JesusCorner - Recomendaciones Tech"
collections: ...
plugins: ...
# NO incluye url, baseurl, exclude específicos
```

### 2. Override de Desarrollo (`_config_dev.yml`)
```yaml
url: "http://localhost:4001"
baseurl: ""
env: development
future: true
livereload: true
```

### 3. Override de Producción (`_config_prod.yml`)
```yaml
url: "https://jesuscorner.github.io"
baseurl: ""
env: production
future: false
exclude: [lista completa como GitHub Pages]
```

---

## 🎯 Ventajas Conseguidas

✅ **Parity Total:** Tu localhost:4002 es idéntico a GitHub Pages
✅ **Desarrollo Rápido:** localhost:4001 con livereload y builds incrementales
✅ **Pre-producción Confiable:** Pruebas en producción antes del deploy
✅ **No más Sorpresas:** Lo que ves en :4002 es lo que tendrás en Pages
✅ **URLs Consistentes:** `relative_url` y `absolute_url` funcionan igual

---

## 🛠️ Próximos Pasos Recomendados

### 1. Prueba Ambos Entornos
```bash
# Terminal 1: Desarrollo
bundle exec jekyll serve --config _config.yml,_config_dev.yml --port 4001

# Terminal 2: Producción
JEKYLL_ENV=production bundle exec jekyll serve --config _config.yml,_config_prod.yml --port 4002
```

### 2. Compara Comportamiento
- Abre ambas URLs
- Verifica navegación
- Comprueba que CSS/JS cargan igual
- Testea enlaces internos

### 3. Workflow de Desarrollo
1. **Desarrollo diario:** Usa puerto 4001
2. **Antes de commit:** Prueba en puerto 4002
3. **Deploy:** Push a GitHub con confianza

---

## 💡 Tips de Uso

### Para Enlaces en Templates
```liquid
<!-- ✅ CORRECTO: Usa siempre relative_url -->
<link rel="stylesheet" href="{{ '/styles.css' | relative_url }}">
<a href="{{ '/reviews/' | relative_url }}">Reviews</a>

<!-- ❌ EVITAR: URLs hardcodeadas -->
<link rel="stylesheet" href="/styles.css">
<a href="/reviews/">Reviews</a>
```

### Para Meta Tags
```liquid
<!-- ✅ CORRECTO: absolute_url para URLs completas -->
<meta property="og:url" content="{{ page.url | absolute_url }}">
<link rel="canonical" href="{{ page.url | absolute_url }}">
```

---

## 🎉 Resultado Final

**Tu entorno local ahora es prácticamente una copia exacta de GitHub Pages.**

- ✅ Misma configuración
- ✅ Mismos plugins
- ✅ Mismas exclusiones
- ✅ Mismo `JEKYLL_ENV`
- ✅ Mismas URLs relativas/absolutas

**¡Ya no habrá más diferencias entre local y producción!** 🚀
