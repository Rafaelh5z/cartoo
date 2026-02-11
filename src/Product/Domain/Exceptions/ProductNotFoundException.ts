import { CustomException } from '@/Shared/Infrastructure/Exceptions/CustomException';

/**
 * ProductNotFoundException - Excepción cuando un producto no se encuentra
 * 
 * Error de negocio que indica que se buscó un producto por ID y no existe.
 * Status code 404 (Not Found)
 */
export class ProductNotFoundException extends CustomException {
    constructor(productId: number) {
        super(
            `Product with ID ${productId} not found`,
            404
        );
        this.name = 'ProductNotFoundException';
    }
}
