import { formatPrice } from '@/Shared/Utils/formatPrice';

interface ProductInfoColumnProps {
    product: {
        id: number;
        title: string;
        price: number;
        description?: string;
        category?: {
            id: number;
            name: string;
            image: string;
        };
    };
}

/**
 * ProductInfoColumn - Componente para mostrar información del producto
 * Props:
 * - product: Product
 */
export const ProductInfoColumn: React.FC<ProductInfoColumnProps> = ({ product }) => (
    <div className="flex flex-col">
        <div className="mb-4">
            {product.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                    {product.category.name}
                </span>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {product.title}
            </h1>
        </div>

        <div className="mb-4 sm:mb-6">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
                {formatPrice(product.price)}
            </p>
        </div>

        {product.description && (
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {product.description}
                </p>
            </div>
        )}
    </div>
);
