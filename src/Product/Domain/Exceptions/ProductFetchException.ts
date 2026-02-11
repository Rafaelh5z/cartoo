import { CustomException } from '@/Shared/Infrastructure/Exceptions/CustomException';

/**
 * ProductFetchException - Excepción cuando falla la consulta de productos
 * 
 * Error técnico que indica que hubo un problema al intentar obtener productos
 * (error de red, servidor, GraphQL, etc.)
 */
export class ProductFetchException extends CustomException {
    constructor(message: string = 'Failed to fetch products', originalError?: Error) {
        super(
            `${message}${originalError ? `: ${originalError.message}` : ''}`,
            500
        );
        this.name = 'ProductFetchException';

        // Conservar el stack trace original si existe
        if (originalError?.stack) {
            this.stack = originalError.stack;
        }
    }
}
