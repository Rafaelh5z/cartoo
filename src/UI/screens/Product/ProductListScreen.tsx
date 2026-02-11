import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/Product/Application/Stores/ProductStore';
import { ProductCard } from '@/UI/components/Product/ProductCard';
import { ProductListHeader } from '@/UI/components/Product/ProductListHeader';
import { LoadingSpinner, ErrorMessage, EmptyState } from '@/UI/components/Common';

/**
 * ProductListScreen - Pantalla de listado de productos
 * 
 * Componente inteligente que:
 * 1. Consume el store de productos (Zustand)
 * 2. Carga los productos al montar el componente
 * 3. Maneja estados de loading y error
 * 4. Navega al detalle cuando se hace clic en un producto
 * 
 * Principios aplicados:
 * - Smart Component: Maneja lógica y estado
 * - Single Responsibility: Solo controla la vista de listado
 * - Separation of Concerns: No contiene lógica de negocio
 * 
 * @example
 * <ProductListScreen />
 */
export const ProductListScreen = () => {

    const navigate = useNavigate();
    const { products, isLoading, error, fetchProducts } = useProductStore();

    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    /**
     * Navega al detalle del producto seleccionado
     */
    const handleProductClick = (productId: number) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ProductListHeader 
                    totalProducts={!isLoading && !error ? products.length : undefined}
                />

                {/* Loading State */}
                {isLoading && (
                    <LoadingSpinner message="Loading products..." />
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <ErrorMessage 
                        title="Failed to load products"
                        message={error}
                        onRetry={fetchProducts}
                    />
                )}

                {/* Products Grid */}
                {!isLoading && !error && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => handleProductClick(product.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && products.length === 0 && (
                    <EmptyState 
                        title="No products found"
                        message="We couldn't find any products at the moment. Please try again later."
                        icon="pi pi-shopping-cart"
                    />
                )}
            </div>
        </div>
    );
};
