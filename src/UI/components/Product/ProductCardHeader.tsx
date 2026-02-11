import noImagePlaceholder from '@/assets/no-image.webp';

interface ProductCardHeaderProps {
    title: string;
    imageUrl?: string;
    category?: { name: string };
}

export const ProductCardHeader: React.FC<ProductCardHeaderProps> = ({ title, imageUrl, category }) => (
    <div className="relative">
        <img
            alt={title}
            src={imageUrl || noImagePlaceholder}
            className="w-full h-48 object-cover"
            onError={(e) => {
                (e.target as HTMLImageElement).src = noImagePlaceholder;
            }}
        />
        {category && (
            <div className="absolute top-2 right-2">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                    {category.name}
                </span>
            </div>
        )}
    </div>
);
