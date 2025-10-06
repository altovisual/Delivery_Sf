# 📱 Funcionalidad de Historias (Stories)

## 🎯 Descripción General

Sistema de historias estilo Instagram/Facebook que permite a los restaurantes mostrar videos e imágenes de sus productos en tiempo real, aumentando el engagement y las conversiones de compra.

## ✨ Características Principales

### 1. **Visualización Inmersiva**
- Pantalla completa con fondo negro
- Soporte para videos y imágenes
- Barra de progreso automática
- Transiciones suaves entre historias

### 2. **Controles Interactivos**
- **Tap izquierdo**: Historia anterior
- **Tap derecho**: Siguiente historia
- **Tap centro**: Pausar/Reproducir
- **Botón de silencio**: Control de audio para videos
- **Botón de pausa**: Control manual de reproducción

### 3. **Integración con Productos**
- Vinculación de historias con productos específicos
- Card flotante con información del producto
- Botón de "Agregar al carrito" directo desde la historia
- Precio, descuentos y descripción visible

### 4. **Navegación entre Restaurantes**
- Swipe automático al terminar las historias de un restaurante
- Navegación circular (vuelve al inicio al llegar al final)
- Indicador visual de restaurante actual

### 5. **Carrusel de Historias**
- Scroll horizontal en la página principal
- Anillo de gradiente para indicar historias activas
- Contador de historias por restaurante
- Indicador de video (ícono de play)
- Thumbnails de restaurantes

## 🏗️ Arquitectura

### Componentes Creados

#### 1. `story-viewer.tsx`
Componente principal de visualización de historias.

**Props:**
```typescript
interface StoryViewerProps {
  restaurant: Restaurant
  initialStoryIndex?: number
  onClose: () => void
  onNavigateRestaurant?: (direction: "prev" | "next") => void
}
```

**Características:**
- Manejo de progreso automático
- Soporte para videos con controles
- Overlay de información de producto
- Navegación por tap/click

#### 2. `stories-carousel.tsx`
Carrusel horizontal de historias en la página principal.

**Props:**
```typescript
interface StoriesCarouselProps {
  restaurants: Restaurant[]
}
```

**Características:**
- Filtrado automático de restaurantes con historias activas
- Anillos de gradiente estilo Instagram
- Contador de historias
- Indicador de contenido de video

### Tipos de Datos

#### Story Interface
```typescript
export interface Story {
  id: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  duration?: number // en segundos
  createdAt: Date
  productId?: string // opcional, para vincular con un producto
}
```

#### Restaurant Interface (actualizado)
```typescript
export interface Restaurant {
  // ... propiedades existentes
  stories?: Story[]
  hasActiveStories?: boolean
}
```

## 📊 Datos de Ejemplo

Se agregaron historias a 3 restaurantes:

### 1. Burger Master (r1)
- 2 historias (1 video, 1 imagen)
- Vinculadas a productos p1 y p2

### 2. Gourmet Burgers (r3)
- 2 historias (1 video, 1 imagen)
- Vinculada a producto p4

### 3. Pizza Napoli (r6)
- 3 historias (2 videos, 1 imagen)
- Vinculadas a productos p7 y p8

## 🎨 Diseño y UX

### Elementos Visuales
- **Anillo de gradiente**: `from-red-500 via-pink-500 to-orange-400`
- **Barra de progreso**: Blanca con fondo semi-transparente
- **Overlay de producto**: Glass morphism con backdrop blur
- **Controles**: Botones circulares con fondo semi-transparente

### Animaciones
- Transición suave de progreso (100ms)
- Escala al agregar al carrito
- Hover effects en desktop
- Transiciones de entrada/salida

## 📍 Ubicaciones de las Historias

### 1. Página Principal (Home)
- Carrusel horizontal en la parte superior
- Anillos de gradiente para restaurantes con historias activas
- Badge "NUEVO" para historias recientes
- Contador de historias por restaurante

### 2. Página del Restaurante (Perfil)
- Sección destacada después del banner hero
- Grid horizontal de miniaturas con preview
- Botón CTA "Ver todas las historias"
- Anillos de gradiente individuales por historia
- Indicadores de tipo (Video/Foto)
- Badge "NUEVO" para contenido reciente

## 🚀 Uso

### Para Desarrolladores

1. **Agregar historias a un restaurante:**
```typescript
{
  id: "r1",
  name: "Mi Restaurante",
  // ... otras propiedades
  hasActiveStories: true,
  stories: [
    {
      id: "s1",
      type: "video",
      url: "https://example.com/video.mp4",
      thumbnail: "https://example.com/thumb.jpg",
      duration: 8,
      createdAt: new Date(),
      productId: "p1", // opcional
    },
    {
      id: "s2",
      type: "image",
      url: "https://example.com/image.jpg",
      duration: 5,
      createdAt: new Date(),
    },
  ],
}
```

2. **Integrar en una página:**
```tsx
import StoriesCarousel from "@/components/ui/stories-carousel"

<StoriesCarousel restaurants={restaurants} />
```

### Para Usuarios

1. Tocar el avatar de un restaurante con el anillo de gradiente
2. Ver las historias en pantalla completa
3. Navegar con taps o flechas (desktop)
4. Agregar productos directamente desde las historias
5. Cerrar con el botón X o swipe down (mobile)

## 🎯 Beneficios de Negocio

### Para Restaurantes
- ✅ Mayor visibilidad de productos
- ✅ Mostrar calidad en tiempo real
- ✅ Aumentar conversiones de compra
- ✅ Engagement directo con clientes
- ✅ Destacar ofertas y promociones

### Para Usuarios
- ✅ Ver productos antes de comprar
- ✅ Experiencia visual atractiva
- ✅ Compra rápida desde historias
- ✅ Descubrir nuevos productos
- ✅ Verificar calidad del producto

## 📈 Métricas Sugeridas

Para implementación futura:
- Vistas por historia
- Tasa de conversión desde historias
- Tiempo promedio de visualización
- Productos más agregados desde historias
- Tasa de abandono por historia

## 🔧 Mejoras Futuras

1. **Funcionalidad Avanzada**
   - Respuestas/reacciones a historias
   - Compartir historias
   - Historias destacadas permanentes
   - Filtros y stickers para crear historias

2. **Analytics**
   - Dashboard de métricas
   - A/B testing de contenido
   - Insights de engagement

3. **Contenido**
   - Subida de historias por restaurantes
   - Programación de historias
   - Historias patrocinadas
   - Colaboraciones entre restaurantes

4. **Interactividad**
   - Encuestas en historias
   - Preguntas y respuestas
   - Links a menú completo
   - Cupones exclusivos en historias

## 🐛 Consideraciones Técnicas

### Performance
- Videos se cargan bajo demanda
- Thumbnails para preview rápido
- Lazy loading de historias no visibles
- Optimización de imágenes

### Compatibilidad
- Funciona en mobile y desktop
- Controles adaptativos según dispositivo
- Fallback para navegadores sin soporte de video
- Touch events para mobile

### Accesibilidad
- Controles de teclado (flechas, ESC)
- Aria labels en botones
- Contraste adecuado en overlays
- Soporte para lectores de pantalla

## 📝 Notas de Implementación

- Los videos de ejemplo usan URLs públicas de Google
- En producción, usar CDN propio para videos
- Implementar compresión de videos
- Considerar límites de tamaño y duración
- Implementar moderación de contenido
