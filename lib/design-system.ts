// Sistema de Diseño - Estilo iOS/Flutter Premium
// Medidas, espaciados y estilos consistentes para toda la app

export const DesignSystem = {
  // Espaciados consistentes (múltiplos de 4)
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
  },

  // Radios de borde consistentes
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    full: '9999px',   // circular
  },

  // Sombras consistentes
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },

  // Colores de la marca
  colors: {
    primary: '#FF6B35',      // Naranja principal
    primaryDark: '#E85A2A',  // Naranja oscuro
    secondary: '#F7931E',    // Naranja secundario
    success: '#10B981',      // Verde
    error: '#EF4444',        // Rojo
    warning: '#F59E0B',      // Amarillo
    info: '#3B82F6',         // Azul
    
    // Grises
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },

  // Tipografía
  typography: {
    // Tamaños de fuente
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    
    // Pesos de fuente
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Transiciones
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Medidas de componentes
  components: {
    // Botones
    button: {
      height: {
        sm: '2rem',      // 32px
        md: '2.5rem',    // 40px
        lg: '3rem',      // 48px
        xl: '3.5rem',    // 56px
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
      },
    },
    
    // Inputs
    input: {
      height: '2.75rem',  // 44px (iOS standard)
      padding: '0.75rem 1rem',
    },
    
    // Cards
    card: {
      padding: '1rem',
      borderRadius: '0.75rem',
    },
    
    // Headers
    header: {
      height: '3.5rem',   // 56px
      padding: '0.75rem 1rem',
    },
    
    // Bottom nav
    bottomNav: {
      height: '4rem',     // 64px
      padding: '0.5rem',
    },
  },

  // Clases CSS reutilizables
  classes: {
    // Botón primario
    buttonPrimary: 'bg-primary hover:bg-primaryDark text-white font-semibold rounded-lg shadow-md active:scale-95 transition-all',
    
    // Botón secundario
    buttonSecondary: 'bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 active:scale-95 transition-all',
    
    // Card
    card: 'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden',
    
    // Input
    input: 'w-full h-11 px-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors',
    
    // Badge
    badge: 'px-2 py-1 text-xs font-bold rounded-full',
    
    // Botón flotante circular
    floatingButton: 'w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-95 transition-transform',
  },
}

// Utilidades para aplicar el sistema de diseño
export const ds = DesignSystem
