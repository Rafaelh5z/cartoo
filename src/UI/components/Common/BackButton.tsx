import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

/**
 * BackButton - Componente reutilizable para navegación
 * Props:
 * - label: string
 * - onClick: () => void
 * - className?: string
 */
export const BackButton = ({ label = 'Back to Products', onClick, className }: { label?: string; onClick: () => void; className?: string }) => {
    const navigate = useNavigate();
    return (
        <Button
            icon="pi pi-arrow-left"
            label={label}
            onClick={onClick || (() => navigate('/'))}
            className={className || 'p-button-text'}
        />
    );
};
