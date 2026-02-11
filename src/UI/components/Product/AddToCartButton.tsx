import { Button } from 'primereact/button';

/**
 * AddToCartButton - Componente para agregar producto al carrito
 * Props:
 * - onClick: () => void
 * - className?: string
 */
export const AddToCartButton = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
    <Button
        label="Add to Cart"
        icon="pi pi-shopping-cart"
        className={className || 'flex-1'}
        severity="success"
        onClick={onClick}
    />
);
