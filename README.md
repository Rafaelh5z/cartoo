# Products App - Arquitectura Hexagonal

Aplicación web para gestionar productos implementando **Arquitectura Hexagonal** (Clean Architecture / Ports & Adapters) con React, TypeScript, GraphQL y principios SOLID.

## 🏗️ Arquitectura

### Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────┐
│                    UI Layer (React)                         │
│  - Screens: ProductListScreen, ProductDetailScreen         │
│  - Components: ProductCard                                  │
│  - Navigation: react-router-dom                            │
└──────────────────────┬──────────────────────────────────────┘
                       │ consume
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Application Layer (Orchestration)              │
│  - UseCases: GetAllProductsUseCase, GetProductByIdUseCase │
│  - Stores: ProductStore (Zustand)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │ usa contratos (DI)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   Domain Layer (Core)                       │
│  - Entities: Product                                        │
│  - Contracts: ProductRepositoryContract                     │
│  - Exceptions: ProductNotFoundException, etc.              │
└──────────────────────┬──────────────────────────────────────┘
                       │ implementa
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            Infrastructure Layer (Technical)                 │
│  - Repositories: ProductRepository                          │
│  - Services: GraphQLService                                │
│  - Controllers: ProductController                          │
└─────────────────────────────────────────────────────────────┘
```

## 📂 Estructura de Carpetas

```
src/
├── Product/                         # Módulo de productos
│   ├── Domain/                      # Capa de dominio (lógica de negocio)
│   │   ├── Product.ts              # Entidad Product
│   │   ├── Contracts/
│   │   │   └── ProductRepositoryContract.ts
│   │   └── Exceptions/
│   │       ├── ProductNotFoundException.ts
│   │       └── ProductFetchException.ts
│   │
│   ├── Application/                 # Capa de aplicación (orquestación)
│   │   ├── UseCases/
│   │   │   └── Get/
│   │   │       ├── GetAllProductsUseCase.ts
│   │   │       └── GetProductByIdUseCase.ts
│   │   └── Stores/
│   │       └── ProductStore.ts     # Estado global (Zustand)
│   │
│   └── Infrastructure/              # Capa de infraestructura (detalles técnicos)
│       ├── Services/
│       │   └── GraphQLService.ts   # Wrapper de Apollo Client
│       ├── Repositories/
│       │   └── ProductRepository.ts # Implementación del contrato
│       └── Controllers/
│           └── ProductController.ts
│
├── Shared/                          # Código compartido entre módulos
│   └── Infrastructure/
│       ├── ServiceProvider.ts      # Inyección de dependencias
│       └── Exceptions/
│           └── CustomException.ts  # Clase base para excepciones
│
├── UI/                              # Capa de presentación
│   ├── screens/
│   │   └── Product/
│   │       ├── ProductListScreen.tsx   # Listado de productos
│   │       └── ProductDetailScreen.tsx # Detalle de producto
│   ├── components/
│   │   └── Product/
│   │       └── ProductCard.tsx     # Componente presentacional
│   ├── navigation/
│   │   └── AppRouter.tsx          # Configuración de rutas
│   └── styles/
│       └── theme.ts               # Variables de estilos globales
│
├── bootstrap/
│   └── index.ts                   # Registro de dependencias
├── main.tsx                       # Punto de entrada
└── App.tsx                        # Componente raíz
```

## 🎯 Principios Aplicados

### SOLID

1. **Single Responsibility Principle (SRP)**
   - Cada clase tiene una única razón para cambiar
   - `Product.ts`: Solo maneja la lógica de un producto
   - `ProductRepository.ts`: Solo obtiene datos de GraphQL
   - `ProductStore.ts`: Solo maneja estado global

2. **Open/Closed Principle (OCP)**
   - Abierto a extensión, cerrado a modificación
   - Puedes agregar nuevas implementaciones de `ProductRepositoryContract` sin modificar el código existente

3. **Liskov Substitution Principle (LSP)**
   - Cualquier implementación de `ProductRepositoryContract` puede usarse sin afectar el comportamiento

4. **Interface Segregation Principle (ISP)**
   - Los contratos tienen solo los métodos necesarios
   - `ProductRepositoryContract` solo expone `findAll()` y `findById()`

5. **Dependency Inversion Principle (DIP)**
   - Las capas superiores dependen de abstracciones, no de implementaciones
   - Los casos de uso dependen de `ProductRepositoryContract`, no de `ProductRepository`

### Otros Principios

- **DRY (Don't Repeat Yourself)**: Reutilización de código a través de `ServiceProvider`
- **KISS (Keep It Simple)**: Cada componente hace una sola cosa de forma clara
- **Separation of Concerns**: Cada capa tiene responsabilidades bien definidas
- **Inmutabilidad**: Las entidades son inmutables (getters sin setters)

## 🔄 Flujo de Datos

### Ejemplo: Listar Productos

```typescript
// 1. UI solicita datos
const { products, fetchProducts } = useProductStore();
useEffect(() => {
  fetchProducts(); // Llamada al store
}, []);

// 2. Store ejecuta caso de uso
const useCase = new GetAllProductsUseCase();
const products = await useCase.execute();

// 3. Caso de uso resuelve repositorio
this.productRepository = ServiceProvider.resolve<ProductRepositoryContract>(
  'ProductRepository'
);
const products = await this.productRepository.findAll();

// 4. Repositorio ejecuta query GraphQL
const response = await this.graphQLService.query<GetAllProductsResponse>(
  this.GET_ALL_PRODUCTS_QUERY
);

// 5. Repositorio mapea a entidades
return response.products.map(data => new Product({...}));

// 6. Store convierte a datos planos
const plainProducts = products.map(p => p.toPlainObject());
set({ products: plainProducts });

// 7. UI se re-renderiza automáticamente
```

## 🚀 Inyección de Dependencias

El proyecto usa **ServiceProvider** para gestionar las dependencias:

### Registro (bootstrap)

```typescript
// src/bootstrap/index.ts
const graphQLService = new GraphQLService(API_URL);
const productRepository = new ProductRepository(graphQLService);

ServiceProvider.register<ProductRepositoryContract>(
  'ProductRepository',
  productRepository
);
```

### Resolución (casos de uso)

```typescript
// src/Product/Application/UseCases/Get/GetAllProductsUseCase.ts
constructor() {
  this.productRepository = ServiceProvider.resolve<ProductRepositoryContract>(
    'ProductRepository'
  );
}
```

### Beneficios

✅ Desacoplamiento entre capas  
✅ Facilita testing (inyectar mocks)  
✅ Flexibilidad para cambiar implementaciones  
✅ Respeta inversión de dependencias (SOLID)  

## 🛠️ Stack Tecnológico

- **React 19** + **TypeScript**: UI y tipado estático
- **Vite**: Build tool y desarrollo rápido
- **react-router-dom**: Navegación entre pantallas
- **Zustand**: Estado global (más ligero que Redux)
- **Apollo Client**: Cliente GraphQL
- **PrimeReact**: Componentes UI
- **Tailwind CSS**: Estilos utility-first

## 📦 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🔌 API GraphQL

Endpoint: `https://api.escuelajs.co/graphql`

### Query: Todos los productos

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

### Query: Producto por ID

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

## 🎨 Rutas de la Aplicación

- `/` - Listado de productos
- `/products/:id` - Detalle de un producto

## 🧪 Testing

Para agregar tests:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Ejemplo de test de caso de uso:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { ServiceProvider } from '@/Shared/Infrastructure/ServiceProvider';
import { GetAllProductsUseCase } from '@/Product/Application/UseCases/Get/GetAllProductsUseCase';

// Mock del repositorio
const mockRepository = {
  findAll: async () => [/* productos mock */],
  findById: async (id: number) => null,
};

describe('GetAllProductsUseCase', () => {
  beforeEach(() => {
    ServiceProvider.clear();
    ServiceProvider.register('ProductRepository', mockRepository);
  });

  it('should return products', async () => {
    const useCase = new GetAllProductsUseCase();
    const products = await useCase.execute();
    
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
  });
});
```

## 🔮 Próximos Pasos

- [ ] Agregar filtros y búsqueda de productos
- [ ] Implementar paginación
- [ ] Agregar carrito de compras
- [ ] Implementar autenticación
- [ ] Agregar tests unitarios e integración
- [ ] Implementar PWA (Service Workers)
- [ ] Agregar i18n (internacionalización)
- [ ] Implementar error tracking (Sentry)

## 📚 Recursos

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 📄 Licencia

MIT
