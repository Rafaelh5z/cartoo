import { Product } from '../Product';

/**
 * ProductRepositoryContract - Contrato de repositorio
 * 
 * Define las operaciones que debe implementar cualquier repositorio de productos.
 * NO especifica CÓMO se implementan (GraphQL, REST, localStorage, etc).
 * 
 * Principios aplicados:
 * - Dependency Inversion: El dominio define el contrato, la infraestructura lo implementa
 * - Interface Segregation: Solo métodos que realmente necesitamos
 * - Open/Closed: Abierto a extensión (nuevas implementaciones), cerrado a modificación
 * 
 * @example
 * // La infraestructura implementará este contrato:
 * export class GraphQLProductRepository implements ProductRepositoryContract {
 *   async findAll(): Promise<Product[]> { ... }
 * }
 */
export interface ProductRepositoryContract {
    /**
     * Obtiene todos los productos
     * @returns Promise con array de productos
     * @throws ProductFetchException si hay error en la consulta
     */
    findAll(): Promise<Product[]>;

    /**
     * Obtiene un producto por su ID
     * @param id - ID del producto
     * @returns Promise con el producto o null si no existe
     * @throws ProductNotFoundException si el producto no existe
     * @throws ProductFetchException si hay error en la consulta
     */
    findById(id: number): Promise<Product | null>;
}
