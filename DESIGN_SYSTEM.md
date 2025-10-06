# Sistema de Diseño - San Felipe Express

## 🎨 Paleta de Colores Yaracuy

Inspirado en los colores representativos de San Felipe, Yaracuy, Venezuela:

### Colores Principales

- **Verde Yaracuy** (`--primary`): `hsl(145, 65%, 45%)` 
  - Representa la naturaleza y agricultura de la región
  - Uso: Botones principales, enlaces importantes, elementos de acción

- **Azul Cielo** (`--secondary`): `hsl(205, 85%, 55%)`
  - Representa los cielos y aguas del estado
  - Uso: Botones secundarios, badges informativos

- **Dorado Sol** (`--accent`): `hsl(45, 95%, 55%)`
  - Representa el sol y la riqueza cultural
  - Uso: Destacados, promociones especiales

- **Terracota** (`--terracota`): `hsl(15, 65%, 55%)`
  - Representa la tierra y tradición
  - Uso: Elementos decorativos, categorías especiales

### Colores de Estado

- **Success**: Verde (`hsl(145, 65%, 45%)`)
- **Warning**: Ámbar (`hsl(38, 92%, 50%)`)
- **Info**: Azul (`hsl(205, 85%, 55%)`)
- **Destructive**: Rojo (`hsl(0, 72%, 51%)`)

## 🎯 Estilo iOS Moderno

### Características Principales

1. **Bordes Redondeados**
   - Radius base: `0.75rem` (12px)
   - Botones: `rounded-xl` (12px)
   - Cards: `rounded-2xl` (16px)
   - Inputs: `rounded-xl` (12px)

2. **Sombras Suaves**
   - `.ios-shadow`: Sombra sutil para elevación básica
   - `.ios-shadow-lg`: Sombra pronunciada para elementos flotantes

3. **Animaciones Spring**
   - `.ios-spring`: Transición con efecto rebote suave
   - `.ios-smooth`: Transición suave estándar
   - `.active-press`: Efecto de presión al tocar

4. **Glass Morphism**
   - `.glass`: Efecto de vidrio esmerilado claro
   - `.glass-dark`: Efecto de vidrio esmerilado oscuro
   - Usado en headers y navegación

## 📱 Responsive Design

### Mobile First
- Diseño optimizado para pantallas móviles
- Navegación inferior fija con blur effect
- Header superior con backdrop blur
- Gestos táctiles intuitivos

### Desktop
- Layout de dos columnas con sidebar
- Header superior con búsqueda prominente
- Espaciado generoso y cards más grandes

### Breakpoints
- Mobile: `< 768px`
- Desktop: `>= 768px`

## 🎭 Componentes Principales

### Buttons
```tsx
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="success">Success</Button>
<Button variant="outline">Outline</Button>
```

### Cards
- Bordes redondeados grandes (`rounded-2xl`)
- Sombra iOS suave
- Transiciones smooth
- Overflow hidden para imágenes

### Inputs
- Altura: `h-12` (48px)
- Bordes: `border-2`
- Focus state con ring de color primario
- Placeholder en color muted

### Badges
- Redondeados completos (`rounded-full`)
- Padding: `px-3 py-1`
- Font weight: `font-bold`
- Variantes de color según estado

## 🌊 Animaciones

### Keyframes Disponibles
- `fadeIn`: Aparición suave
- `slideUp`: Deslizamiento desde abajo
- `slideDown`: Deslizamiento desde arriba
- `slideLeft`: Deslizamiento desde derecha
- `slideRight`: Deslizamiento desde izquierda
- `scaleIn`: Escala con aparición
- `bounceIn`: Rebote al aparecer

### Timing Functions
- **iOS Spring**: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **iOS Smooth**: `cubic-bezier(0.4, 0, 0.2, 1)`

## 🎨 Utilidades CSS

### Scrollbar
```css
.scrollbar-hide /* Oculta scrollbar manteniendo funcionalidad */
```

### Transiciones
```css
.ios-spring /* Transición con rebote */
.ios-smooth /* Transición suave */
.active-press /* Efecto de presión al tocar */
```

### Sombras
```css
.ios-shadow /* Sombra sutil */
.ios-shadow-lg /* Sombra pronunciada */
```

## 🚀 Mejores Prácticas

1. **Usa colores semánticos**: Prefiere `bg-primary` sobre colores hardcoded
2. **Animaciones sutiles**: No abuses de las animaciones, úsalas con propósito
3. **Accesibilidad**: Mantén contraste adecuado (WCAG AA mínimo)
4. **Performance**: Usa `backdrop-filter` con moderación
5. **Touch targets**: Mínimo 44x44px para elementos táctiles

## 🌙 Dark Mode

El sistema incluye soporte completo para modo oscuro:
- Colores ajustados automáticamente
- Contraste optimizado
- Transiciones suaves entre modos

## 📦 Componentes Actualizados

- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Badge
- ✅ Mobile Bottom Navigation
- ✅ Mobile Header
- ✅ Desktop Header
- ✅ Search Bar
- ✅ Promotional Banner
- ✅ Page Transition

## 🎯 Próximos Pasos

- [ ] Actualizar componentes de productos
- [ ] Mejorar animaciones de transición entre páginas
- [ ] Implementar gestos de swipe
- [ ] Optimizar rendimiento de animaciones
- [ ] Agregar micro-interacciones adicionales
