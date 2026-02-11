import { Button } from 'primereact/button';

/**
 * BackButton - Componente reutilizable para navegación
 * Props:
 * - label: string
 * - onClick: () => void
 * - className?: string
 */
export const BackButton = ({ label = 'Back to Products', onClick, className }: { label?: string; onClick: () => void; className?: string }) => {
    return (
        <Button
            icon="pi pi-arrow-left"
            label={label}
            onClick={onClick}
            className={className || 'p-button-text'}
        />
    );
};
