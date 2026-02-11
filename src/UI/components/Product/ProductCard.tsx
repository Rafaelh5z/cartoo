import { Card } from 'primereact/card';
import { ProductCardHeader } from './ProductCardHeader';
import { ProductCardFooter } from './ProductCardFooter';

/**
 * ProductCard - Componente presentacional para mostrar un producto
 * 
 * Componente tonto (dumb component) que:
 * 1. Recibe datos a través de props
 * 2. No maneja estado
 * 3. No hace llamadas a APIs o stores
 * 4. Solo se encarga de renderizar
 * 
 * Principios aplicados:
 * - Presentational Component: Solo renderiza, no maneja lógica
 * - Single Responsibility: Solo muestra la tarjeta de un producto
 * - Reusabilidad: Puede usarse en cualquier parte de la aplicación
 * 
 * @example
 * <ProductCard 
 *   product={product} 
 *   onClick={() => navigate(`/products/${product.id}`)} 
 * />
 */

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        description?: string;
        images?: string[];
        category?: {
            id: number;
            name: string;
            image: string;
        };
    };
    onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
    return (
        <Card
            header={
                <ProductCardHeader 
                    title={product.title}
                    imageUrl={product.images && product.images.length > 0 ? product.images[0] : undefined}
                    category={product.category}
                />
            }
            footer={
                <ProductCardFooter 
                    price={product.price}
                    onClick={onClick}
                />
            }
            className="cursor-pointer hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
            onClick={onClick}
        >
            <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                </h3>
                {product.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 grow">
                        {product.description}
                    </p>
                )}
            </div>
        </Card>
    );
};
