/**
 * Common Components - Barrel Export
 * 
 * Exporta todos los componentes comunes reutilizables de la aplicación.
 * Estos componentes son agnósticos del dominio y pueden usarse en cualquier pantalla.
 * 
 * Principios aplicados:
 * - DRY: Componentes reutilizables evitan duplicación
 * - Single Responsibility: Cada componente tiene un propósito único
 * - Separation of Concerns: Componentes UI puros sin lógica de negocio
 */
export { LoadingSpinner } from './LoadingSpinner';
export { ErrorMessage } from './ErrorMessage';
export { EmptyState } from './EmptyState';
