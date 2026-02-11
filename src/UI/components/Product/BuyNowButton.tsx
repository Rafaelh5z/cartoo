import { Button } from 'primereact/button';

/**
 * BuyNowButton - Componente para acción de compra inmediata
 * Props:
 * - onClick: () => void
 * - className?: string
 */
export const BuyNowButton = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
    <Button
        label="Buy Now"
        icon="pi pi-credit-card"
        className={className || 'flex-1'}
        onClick={onClick}
    />
);
