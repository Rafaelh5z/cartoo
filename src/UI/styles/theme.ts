/**
 * Colores globales de la aplicación
 * Mantén la consistencia visual usando estas variables
 */
export const colors = {
    // Colores primarios
    primary: {
        main: '#3B82F6',      // blue-500
        light: '#60A5FA',     // blue-400
        dark: '#2563EB',      // blue-600
        contrast: '#FFFFFF',
    },

    // Colores secundarios
    secondary: {
        main: '#8B5CF6',      // violet-500
        light: '#A78BFA',     // violet-400
        dark: '#7C3AED',      // violet-600
        contrast: '#FFFFFF',
    },

    // Estados
    success: '#10B981',     // green-500
    warning: '#F59E0B',     // amber-500
    error: '#EF4444',       // red-500
    info: '#3B82F6',        // blue-500

    // Grises
    neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },

    // Fondos
    background: {
        primary: '#FFFFFF',
        secondary: '#F9FAFB',
        dark: '#111827',
    },

    // Texto
    text: {
        primary: '#111827',
        secondary: '#6B7280',
        disabled: '#9CA3AF',
        contrast: '#FFFFFF',
    },
} as const;

/**
 * Espaciado consistente basado en múltiplos de 4px
 */
export const spacing = {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
} as const;

/**
 * Tipografía
 */
export const typography = {
    fontFamily: {
        sans: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },

    fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
    },

    fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

/**
 * Bordes y sombras
 */
export const effects = {
    borderRadius: {
        none: '0',
        sm: '0.25rem',   // 4px
        md: '0.5rem',    // 8px
        lg: '0.75rem',   // 12px
        xl: '1rem',      // 16px
        full: '9999px',
    },

    boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
} as const;

/**
 * Breakpoints para responsive design
 */
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;
