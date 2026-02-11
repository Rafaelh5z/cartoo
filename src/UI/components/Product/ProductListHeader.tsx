/**
 * ProductListHeader - Header específico para la pantalla de listado de productos
 * 
 * Componente presentacional que muestra el título y descripción de la lista de productos.
 * Este componente es específico del dominio Product y no está pensado para ser reutilizable.
 * 
 * Principios aplicados:
 * - Single Responsibility: Solo muestra el header de la lista
 * - Dumb Component: No maneja estado ni lógica
 * - Separation of Concerns: Separa la presentación de la lógica
 * 
 * @param title - Título principal del header
 * @param subtitle - Subtítulo o descripción
 * @param totalProducts - Número opcional de productos para mostrar en el header
 * 
 * @example
 * <ProductListHeader 
 *   title="Products"
 *   subtitle="Browse our collection"
 *   totalProducts={42}
 * />
 */
interface ProductListHeaderProps {
    title?: string;
    subtitle?: string;
    totalProducts?: number;
}

export const ProductListHeader: React.FC<ProductListHeaderProps> = ({
    title = 'Products',
    subtitle = 'Browse our collection of amazing products',
    totalProducts,
}) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {title}
                        {totalProducts !== undefined && totalProducts > 0 && (
                            <span className="ml-3 text-2xl font-normal text-gray-500">
                                ({totalProducts})
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-600">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};
