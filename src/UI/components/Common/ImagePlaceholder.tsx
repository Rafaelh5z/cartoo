import noImagePlaceholder from '@/assets/no-image.webp';

/**
 * ImagePlaceholder - Componente para mostrar imagen de placeholder
 */
export const ImagePlaceholder = () => (
    <img
        src={noImagePlaceholder}
        alt="No product"
        className="w-full h-96 object-cover rounded-lg"
    />
);
