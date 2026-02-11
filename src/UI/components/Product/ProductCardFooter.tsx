interface ProductCardFooterProps {
    price: number;
    onClick?: () => void;
}

export const ProductCardFooter: React.FC<ProductCardFooterProps> = ({ price, onClick }) => (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-200">
        <span className="text-xl sm:text-2xl font-bold text-blue-600">
            ${price.toFixed(2)}
        </span>
        <button
            onClick={onClick}
            className="px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200"
        >
            View Details
        </button>
    </div>
);
