import { Carousel } from 'primereact/carousel';
import { ImagePlaceholder } from '@/UI/components/Common/ImagePlaceholder';
import noImagePlaceholder from '@/assets/no-image.webp';

/**
 * ProductCarousel - Componente para mostrar imágenes de producto
 * Props:
 * - images: string[]
 */
export const ProductCarousel = ({ images }: { images: string[] }) => {
    if (!images || images.length === 0) {
        return <ImagePlaceholder />;
    }

    const imageTemplate = (image: string) => (
        <div className="flex justify-center items-center">
            <img
                src={image}
                alt="Product"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = noImagePlaceholder;
                }}
            />
        </div>
    );

    return (
        <Carousel
            value={images}
            itemTemplate={imageTemplate}
            numVisible={1}
            numScroll={1}
            showIndicators
            showNavigators
            className="custom-carousel"
        />
    );
};
