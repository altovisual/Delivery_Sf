# Changelog - San Felipe Express

## [2.0.0] - 2025-10-05

### 🎨 Rediseño Completo del Sistema de Diseño

#### Nuevo Sistema de Colores - Paleta Yaracuy
- ✨ **Verde Yaracuy** como color primario (naturaleza y agricultura)
- 🌊 **Azul Cielo** como color secundario (aguas y cielos)
- ☀️ **Dorado Sol** como color de acento (cultura y tradición)
- 🏺 **Terracota** como color complementario (tierra y raíces)
- Soporte completo para modo oscuro con ajustes automáticos

#### Estilo iOS Moderno
- Implementación de animaciones spring (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- Glass morphism en navegación y headers
- Sombras sutiles estilo iOS (`.ios-shadow`, `.ios-shadow-lg`)
- Bordes redondeados más pronunciados (12px-16px)
- Efectos de presión táctil (`.active-press`)

#### Componentes Actualizados

**Buttons**
- Nuevas variantes: `success`, `warning`, `info`, `accent`
- Bordes redondeados: `rounded-xl` (12px)
- Altura aumentada: `h-11` (44px) para mejor accesibilidad
- Sombras iOS y transiciones suaves
- Font weight: `font-semibold`

**Cards**
- Bordes redondeados: `rounded-2xl` (16px)
- Sombras sutiles con `.ios-shadow`
- Transiciones suaves con `.ios-smooth`
- Overflow hidden para imágenes

**Inputs**
- Altura: `h-12` (48px)
- Bordes: `border-2` para mejor visibilidad
- Focus state con ring de color primario
- Placeholder en color muted
- Bordes redondeados: `rounded-xl`

**Badges**
- Padding aumentado: `px-3 py-1`
- Font weight: `font-bold`
- Nuevas variantes de color
- Sombras iOS

**Navigation**
- Mobile bottom nav con backdrop blur
- Iconos con escala animada en estado activo
- Badges de notificación mejorados
- Transiciones spring

**Headers**
- Backdrop blur effect (`backdrop-blur-lg`)
- Fondo semi-transparente (`bg-white/95`)
- Sombras iOS
- Búsqueda con diseño mejorado

#### Animaciones y Transiciones

**Nuevas Animaciones**
- `fadeIn`: Aparición suave
- `slideUp`, `slideDown`, `slideLeft`, `slideRight`: Deslizamientos direccionales
- `scaleIn`: Escala con aparición
- `bounceIn`: Rebote al aparecer
- `pulse-subtle`: Pulsación sutil

**Timing Functions**
- iOS Spring: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- iOS Smooth: `cubic-bezier(0.4, 0, 0.2, 1)`

**Utilidades CSS**
- `.ios-spring`: Transición con rebote
- `.ios-smooth`: Transición suave
- `.active-press`: Efecto de presión al tocar
- `.glass`: Glass morphism claro
- `.glass-dark`: Glass morphism oscuro
- `.scrollbar-hide`: Ocultar scrollbar

#### Mejoras de UX

**Mobile**
- Padding ajustado para headers fijos
- Navegación inferior con blur effect
- Animaciones escalonadas en home
- Scroll horizontal mejorado para listas

**Desktop**
- Hero section rediseñado con gradientes
- Búsqueda más prominente
- Espaciado generoso
- Hover states mejorados

#### Responsive Design
- Background: `bg-muted/30` para mejor contraste
- Scrollbar oculto pero funcional
- Transiciones de página mejoradas
- Safe areas para dispositivos con notch

#### Accesibilidad
- Touch targets mínimo 44x44px
- Contraste mejorado (WCAG AA)
- Focus states más visibles
- Animaciones respetan `prefers-reduced-motion`

### 📝 Documentación
- Nuevo archivo `DESIGN_SYSTEM.md` con guía completa
- README actualizado con características principales
- Ejemplos de uso de componentes
- Mejores prácticas documentadas

### 🐛 Correcciones
- Fix: Conversión de tipos en favoritos (number a string)
- Fix: Action type en desktop header search
- Fix: Padding en layouts responsive

### 🔧 Configuración
- Tailwind config actualizado con nuevos colores
- Nuevas animaciones en config
- Variables CSS organizadas por categoría
- Font family iOS-style

---

## Próximas Mejoras Planeadas

- [ ] Implementar gestos de swipe para navegación
- [ ] Agregar más micro-interacciones
- [ ] Optimizar performance de animaciones
- [ ] Implementar skeleton loaders
- [ ] Mejorar transiciones entre páginas
- [ ] Agregar haptic feedback (vibración)
- [ ] Implementar pull-to-refresh
- [ ] Mejorar estados de carga
