import { gql } from '@apollo/client';
import type { ProductRepositoryContract } from '@/Product/Domain/Contracts/ProductRepositoryContract';
import { Product } from '@/Product/Domain/Product';
import { ProductFetchException } from '@/Product/Domain/Exceptions/ProductFetchException';
import { GraphQLService } from '../Services/GraphQLService';

/**
 * ProductRepository - Implementación del repositorio usando GraphQL
 * 
 * IMPLEMENTA ProductRepositoryContract definido en el dominio.
 * Se encarga de:
 * 1. Ejecutar queries GraphQL
 * 2. Mapear respuestas GraphQL a entidades del dominio
 * 3. Manejar errores y convertirlos en excepciones del dominio
 * 
 * Principios aplicados:
 * - Dependency Inversion: Implementa el contrato del dominio
 * - Single Responsibility: Solo se encarga de obtener productos desde GraphQL
 * - Adapter Pattern: Adapta la respuesta de GraphQL al formato del dominio
 * 
 * @example
 * const repository = new ProductRepository(graphQLService);
 * const products = await repository.findAll();
 */

// Tipos para las respuestas de GraphQL
interface GraphQLProductResponse {
    id: number;
    title: string;
    price: number;
    description?: string;
    images?: string[];
    category?: {
        id: number;
        name: string;
        image: string;
    };
}

interface GetAllProductsResponse {
    products: GraphQLProductResponse[];
}

interface GetProductByIdResponse {
    product: GraphQLProductResponse;
}

export class ProductRepository implements ProductRepositoryContract {
    private graphQLService: GraphQLService;

    // Queries GraphQL como constantes
    private readonly GET_ALL_PRODUCTS_QUERY = gql`
        query GetAllProducts {
            products {
                id
                title
                price
                description
                images
                category {
                    id
                    name
                    image
                }
            }
        }
    `;

    private readonly GET_PRODUCT_BY_ID_QUERY = gql`
        query GetProductById($id: ID!) {
            product(id: $id) {
                id
                title
                price
                description
                images
                category {
                    id
                    name
                    image
                }
            }
        }
    `;

    constructor(graphQLService: GraphQLService) {
        this.graphQLService = graphQLService;
    }

    /**
     * Obtiene todos los productos desde GraphQL
     * Mapea la respuesta a entidades del dominio
     */
    async findAll(): Promise<Product[]> {
        try {
            const response = await this.graphQLService.query<GetAllProductsResponse>(
                this.GET_ALL_PRODUCTS_QUERY
            );

            // Mapear respuesta GraphQL a entidades del dominio
            return response.products.map(productData =>
                new Product({
                    id: productData.id,
                    title: productData.title,
                    price: productData.price,
                    description: productData.description,
                    images: productData.images,
                    category: productData.category,
                })
            );
        } catch (error) {
            throw new ProductFetchException(
                'Failed to fetch products from API',
                error instanceof Error ? error : undefined
            );
        }
    }

    /**
     * Obtiene un producto específico por ID
     * Retorna null si no existe (el caso de uso lanzará la excepción)
     */
    async findById(id: number): Promise<Product | null> {
        try {
            const response = await this.graphQLService.query<GetProductByIdResponse>(
                this.GET_PRODUCT_BY_ID_QUERY,
                { id: id.toString() } // El API espera ID como string
            );

            if (!response.product) {
                return null;
            }

            // Mapear respuesta GraphQL a entidad del dominio
            return new Product({
                id: response.product.id,
                title: response.product.title,
                price: response.product.price,
                description: response.product.description,
                images: response.product.images,
                category: response.product.category,
            });
        } catch (error) {
            throw new ProductFetchException(
                `Failed to fetch product with ID ${id}`,
                error instanceof Error ? error : undefined
            );
        }
    }
}
