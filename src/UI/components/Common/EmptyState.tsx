/**
 * EmptyState - Componente reutilizable para estado vacío
 * 
 * Muestra un mensaje cuando no hay datos disponibles.
 * 
 * Principios aplicados:
 * - Single Responsibility: Solo muestra estado vacío
 * - Reusability: Componente genérico reutilizable en toda la app
 * - DRY: Evita duplicar código de empty state
 * - UX: Proporciona feedback claro al usuario
 * 
 * @param title - Título del estado vacío
 * @param message - Mensaje descriptivo
 * @param icon - Icono opcional (clase de PrimeIcons)
 * @param action - Elemento opcional con acción (botón, link, etc.)
 * 
 * @example
 * <EmptyState 
 *   title="No products found"
 *   message="Try adjusting your filters"
 * />
 * 
 * <EmptyState 
 *   title="No favorites yet"
 *   message="Start adding products to your favorites"
 *   icon="pi pi-heart"
 *   action={<button>Browse Products</button>}
 * />
 */
interface EmptyStateProps {
    title: string;
    message?: string;
    icon?: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    icon = 'pi pi-inbox',
    action
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            {/* Icon */}
            <div className="mb-4">
                <i
                    className={`${icon} text-6xl text-gray-300`}
                    aria-hidden="true"
                />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {title}
            </h3>

            {/* Message */}
            {message && (
                <p className="text-gray-500 text-center max-w-md mb-6">
                    {message}
                </p>
            )}

            {/* Action */}
            {action && (
                <div className="mt-4">
                    {action}
                </div>
            )}
        </div>
    );
};
