interface ProductCardFooterProps {
    price: number;
    onClick?: () => void;
}

export const ProductCardFooter: React.FC<ProductCardFooterProps> = ({ price, onClick }) => (
    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-2xl font-bold text-blue-600">
            ${price.toFixed(2)}
        </span>
        <button
            onClick={onClick}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
        >
            View Details
        </button>
    </div>
);
