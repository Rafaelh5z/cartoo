# Módulo Product - Documentación

Este documento describe todas las operaciones disponibles en el módulo Product y cómo funciona cada una.

## 📋 Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Operaciones](#operaciones)
  - [Obtener todos los productos](#obtener-todos-los-productos)
  - [Obtener producto por ID](#obtener-producto-por-id)
- [Entidades](#entidades)
- [Contratos](#contratos)
- [Excepciones](#excepciones)

## 🏗️ Arquitectura

El módulo Product sigue la arquitectura hexagonal con 4 capas:

```
Product/
├── Domain/           # Lógica de negocio pura
├── Application/      # Casos de uso y estado
├── Infrastructure/   # Implementaciones técnicas
└── UI/              # Componentes visuales (en src/UI/)
```

## 📌 Operaciones

### Obtener todos los productos

**Caso de uso:** `GetAllProductsUseCase`

#### Descripción
Obtiene el listado completo de productos disponibles desde la API GraphQL.

#### Flujo
1. El Store (`ProductStore`) llama al caso de uso
2. El caso de uso resuelve `ProductRepository` desde el `ServiceProvider`
3. El repositorio ejecuta la query GraphQL `GET_ALL_PRODUCTS_QUERY`
4. La respuesta GraphQL se mapea a entidades `Product`
5. Las entidades se validan (constructor de Product)
6. Se retornan las entidades al caso de uso
7. El Store convierte las entidades a objetos planos
8. El estado global se actualiza
9. La UI se re-renderiza

#### Query GraphQL
```graphql
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
```

#### Código de ejemplo
```typescript
// En el componente
const { products, isLoading, fetchProducts } = useProductStore();

useEffect(() => {
  fetchProducts();
}, []);

// Internamente (Store)
fetchProducts: async () => {
  const useCase = new GetAllProductsUseCase();
  const products = await useCase.execute();
  // ...actualizar estado
}
```

#### Manejo de errores
- **ProductFetchException**: Si falla la comunicación con GraphQL
- **Error de validación**: Si algún producto no cumple las reglas de negocio

#### Reglas de negocio aplicadas
- `id` debe ser mayor que 0
- `title` no puede estar vacío
- `price` no puede ser negativo

---

### Obtener producto por ID

**Caso de uso:** `GetProductByIdUseCase`

#### Descripción
Obtiene los detalles de un producto específico dado su ID.

#### Flujo
1. El Store (`ProductStore`) llama al caso de uso con el ID
2. El caso de uso valida que el ID sea válido (> 0)
3. Se resuelve `ProductRepository` desde el `ServiceProvider`
4. El repositorio ejecuta la query GraphQL `GET_PRODUCT_BY_ID_QUERY`
5. La respuesta se mapea a una entidad `Product`
6. Si el producto no existe, se retorna `null`
7. El caso de uso valida que el producto exista
8. Si no existe, lanza `ProductNotFoundException`
9. Si existe, retorna la entidad
10. El Store actualiza `selectedProduct`
11. La UI muestra los detalles

#### Query GraphQL
```graphql
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
```

#### Código de ejemplo
```typescript
// En el componente
const { selectedProduct, isLoading, fetchProductById } = useProductStore();

useEffect(() => {
  fetchProductById(productId);
}, [productId]);

// Internamente (Store)
fetchProductById: async (id: number) => {
  const useCase = new GetProductByIdUseCase();
  const product = await useCase.execute(id);
  // ...actualizar estado
}
```

#### Manejo de errores
- **Error de validación**: Si el ID es <= 0
- **ProductNotFoundException**: Si el producto no existe en la API
- **ProductFetchException**: Si falla la comunicación con GraphQL

#### Reglas de negocio aplicadas
- El ID debe ser un número positivo
- Si el producto no existe, es un error de negocio (ProductNotFoundException)
- Mismas validaciones que en la entidad Product

---

## 🎯 Entidades

### Product

**Ubicación:** `Product/Domain/Product.ts`

#### Propiedades

| Propiedad | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| id | number | Sí | Identificador único del producto |
| title | string | Sí | Nombre del producto |
| price | number | Sí | Precio del producto |
| description | string | No | Descripción detallada |
| images | string[] | No | URLs de las imágenes |
| category | object | No | Categoría del producto |

#### Validaciones

✅ `id > 0`: ID debe ser positivo  
✅ `title` no vacío: El título es obligatorio  
✅ `price >= 0`: El precio no puede ser negativo  

#### Métodos

**`getFormattedPrice(currency?: string): string`**
- Formatea el precio como moneda
- Por defecto usa USD
- Ejemplo: `product.getFormattedPrice('USD')` → `"$99.99"`

**`toPlainObject(): object`**
- Convierte la entidad a objeto plano
- Usado por el Store para almacenar en estado
- Retorna todas las propiedades como objeto simple

#### Ejemplo de uso
```typescript
const product = new Product({
  id: 1,
  title: "Laptop",
  price: 999.99,
  description: "High performance laptop",
  images: ["https://..."],
  category: { id: 1, name: "Electronics", image: "..." }
});

console.log(product.getFormattedPrice()); // "$999.99"
```

---

## 📝 Contratos

### ProductRepositoryContract

**Ubicación:** `Product/Domain/Contracts/ProductRepositoryContract.ts`

Define las operaciones que debe implementar cualquier repositorio de productos.

#### Métodos

**`findAll(): Promise<Product[]>`**
- Obtiene todos los productos
- Retorna array de entidades Product
- Puede lanzar `ProductFetchException`

**`findById(id: number): Promise<Product | null>`**
- Obtiene un producto por su ID
- Retorna la entidad o null si no existe
- Puede lanzar `ProductFetchException`

#### Implementaciones actuales

1. **ProductRepository** (`Infrastructure/Repositories/ProductRepository.ts`)
   - Implementa el contrato usando GraphQL
   - Usa `GraphQLService` para ejecutar queries
   - Mapea respuestas GraphQL a entidades

---

## ⚠️ Excepciones

### ProductNotFoundException

**Ubicación:** `Product/Domain/Exceptions/ProductNotFoundException.ts`

**Status Code:** 404

**Cuándo se lanza:**
- Cuando se busca un producto por ID y no existe en la API

**Ejemplo:**
```typescript
throw new ProductNotFoundException(42);
// Error: "Product with ID 42 not found"
```

---

### ProductFetchException

**Ubicación:** `Product/Domain/Exceptions/ProductFetchException.ts`

**Status Code:** 500

**Cuándo se lanza:**
- Error de red al comunicarse con GraphQL
- Error del servidor (500, 503, etc.)
- Query GraphQL inválido
- Timeout de conexión

**Ejemplo:**
```typescript
throw new ProductFetchException(
  "Failed to fetch products from API",
  originalError
);
```

---

## 🔄 Flujo completo de datos

```
┌─────────────────────────────────────────────┐
│ 1. UI (ProductListScreen)                  │
│    - Usuario carga la pantalla             │
│    - Se ejecuta fetchProducts()            │
└────────────────┬────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────┐
│ 2. Store (ProductStore)                    │
│    - Marca isLoading = true                │
│    - Instancia GetAllProductsUseCase       │
│    - Ejecuta useCase.execute()             │
└────────────────┬────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────┐
│ 3. UseCase (GetAllProductsUseCase)         │
│    - Resuelve ProductRepository            │
│    - Llama a repository.findAll()          │
└────────────────┬────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────┐
│ 4. Repository (ProductRepository)          │
│    - Ejecuta query GraphQL                 │
│    - Recibe respuesta del servidor         │
│    - Mapea a entidades Product             │
└────────────────┬────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────┐
│ 5. Entity (Product)                        │
│    - Constructor valida reglas             │
│    - Crea entidades inmutables             │
│    - Retorna array de productos            │
└────────────────┬────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────┐
│ 6. Store (ProductStore)                    │
│    - Convierte entidades a plain objects   │
│    - Actualiza estado con set()            │
│    - Marca isLoading = false               │
└────────────────┬────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────┐
│ 7. UI (ProductListScreen)                  │
│    - React detecta cambio en estado        │
│    - Re-renderiza con nuevos productos     │
│    - Muestra grid de ProductCards          │
└─────────────────────────────────────────────┘
```

---

## 🧪 Testing

Para testear el módulo Product:

```typescript
// Mock del repositorio
const mockProductRepository: ProductRepositoryContract = {
  findAll: jest.fn().mockResolvedValue([
    new Product({ id: 1, title: "Test", price: 10 })
  ]),
  findById: jest.fn().mockResolvedValue(null),
};

// Registrar mock
ServiceProvider.register('ProductRepository', mockProductRepository);

// Testear caso de uso
const useCase = new GetAllProductsUseCase();
const products = await useCase.execute();

expect(products).toHaveLength(1);
expect(mockProductRepository.findAll).toHaveBeenCalled();
```

---

## 📚 Referencias

- [Arquitectura Hexagonal](https://alistair.cockburn.us/hexagonal-architecture/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
