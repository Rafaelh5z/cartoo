/**
 * ProductInfoColumn - Componente para mostrar información del producto
 * Props:
 * - product: Product
 */
export const ProductInfoColumn = ({ product }: { product: any }) => (
    <div className="flex flex-col">
        <div className="mb-4">
            {product.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    {product.category.name}
                </span>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
            </h1>
        </div>

        <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
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
