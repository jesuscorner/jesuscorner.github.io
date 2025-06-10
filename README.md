# JesusCorner - Recomendaciones Amazon

Una página web profesional para mostrar recomendaciones de productos de Amazon con un diseño moderno y vista tipo kanban.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves
- **Vista Kanban**: Los productos se muestran en tarjetas organizadas en una grid responsiva
- **Filtros Dinámicos**: Filtra productos por categorías (Tecnología, Periféricos, Almacenamiento)
- **Responsive**: Totalmente adaptado para dispositivos móviles y desktop
- **Loading States**: Indicadores de carga para mejor experiencia de usuario
- **SEO Optimizado**: Estructura HTML semántica y meta tags apropiados

## 📁 Estructura del Proyecto

```
jesuscorner.github.io/
├── index.html          # Página principal con grid de productos
├── affiliate.html      # Página de política de afiliados
├── styles.css          # Estilos CSS modernos y responsivos
├── script.js          # JavaScript para funcionalidad dinámica
└── README.md          # Documentación del proyecto
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Flexbox, Grid, Variables CSS, Animaciones
- **JavaScript (ES6+)**: Manipulación del DOM, filtros dinámicos
- **Font Awesome**: Iconos
- **Google Fonts**: Tipografía Inter

## 📱 Responsive Design

- **Desktop**: Grid de 3-4 columnas
- **Tablet**: Grid de 2 columnas
- **Mobile**: Grid de 1 columna

## 🎨 Características de Diseño

### Colores
- **Primario**: #ff9500 (Naranja Amazon)
- **Secundario**: #232f3e (Azul oscuro)
- **Superficie**: #f7f8fa (Gris claro)
- **Texto**: #0f1111 / #565959

### Animaciones
- Aparición suave de productos (fadeInUp)
- Hover effects en tarjetas
- Transiciones suaves en filtros
- Loading spinner animado

## 📦 Estructura de Producto

Cada producto incluye:
- Imagen del producto
- Título descriptivo
- Precio actual y original (si aplica)
- Rating con estrellas
- Número de reviews
- Badge de categoría
- Enlace directo a Amazon

## 🔧 Personalización

### Agregar Nuevos Productos

Edita el array `productsData` en `script.js`:

```javascript
{
  id: 7,
  title: "Nombre del Producto",
  price: "€XX.XX",
  originalPrice: "€XX.XX", // Opcional
  image: "URL_de_la_imagen",
  amazonUrl: "https://amzn.eu/d/XXXXXX",
  category: "tech|peripherals|storage",
  rating: 4.5,
  reviewCount: 1000,
  badge: "Nuevo" // Opcional
}
```

### Modificar Categorías

Para agregar nuevas categorías:
1. Actualiza los botones de filtro en `index.html`
2. Agrega los estilos correspondientes en `styles.css`
3. Actualiza la función `filterProducts()` en `script.js`

## 🚀 Despliegue

Este sitio está diseñado para ser alojado en GitHub Pages:

1. Sube los archivos a tu repositorio
2. Activa GitHub Pages en la configuración del repositorio
3. Tu sitio estará disponible en `https://tuusuario.github.io/`

## 📈 Analytics y Tracking

El archivo `script.js` incluye preparación para Google Analytics:
- Tracking de clicks en productos
- Eventos personalizados
- Medición de conversiones

## 🔗 Enlaces de Afiliado

Recuerda actualizar todos los enlaces `https://amzn.eu/d/XXXXXX` con tus enlaces reales de afiliado de Amazon.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo y modificarlo libremente.

---

**Autor**: Jesús - Ingeniero Informático  
**Contacto**: contact@jesuscorner.com
