# Products App - Hexagonal Architecture

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Webpack](https://img.shields.io/badge/Webpack-5.x-8dd6f9?logo=webpack)](https://webpack.js.org/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)

Una aplicación moderna de catálogo de productos construida con React, TypeScript y Arquitectura Hexagonal (Clean Architecture), implementando principios de Domain-Driven Design (DDD), SOLID, DRY y KISS.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Comandos Disponibles](#-comandos-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Arquitectura](#-arquitectura)
- [PWA Features](#-pwa-features)
- [Mejoras Futuras](#-mejoras-futuras)
- [Recursos Adicionales](#-recursos-adicionales)

## ✨ Características

- 🏗️ **Arquitectura Hexagonal** con Domain-Driven Design
- 📱 **Progressive Web App (PWA)** con funcionalidad offline
- 🎨 **Diseño Responsive** optimizado para mobile, tablet y desktop
- ⚡ **Performance Optimizada** con code splitting y lazy loading
- 🔄 **State Management** con Zustand
- 🎯 **Type Safety** con TypeScript estricto
- 🎨 **UI Components** con PrimeReact y Tailwind CSS
- 🔌 **GraphQL Client** con Apollo Client
- 🧪 **Dependency Injection** con Service Provider pattern
- 📦 **Module Bundling** con Webpack 5

## 🔧 Requisitos Previos

- **Node.js**: >= 20.x
- **Yarn**: >= 1.22.x (o npm >= 10.x)
- **Navegador moderno** con soporte para ES6+

## 📥 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd test-front

# Instalar dependencias
yarn install

# Generar iconos PWA (opcional, ya están generados)
yarn generate-icons

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración
```

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_GRAPHQL_API_URL=https://api.escuelajs.co/graphql
```

## 🚀 Comandos Disponibles

```bash
# Desarrollo
yarn dev                  # Inicia el servidor de desarrollo en http://localhost:5173

# Producción
yarn build                # Compila la aplicación para producción en /dist
yarn serve                # Sirve la build de producción localmente

# Utilidades
yarn lint                 # Ejecuta ESLint para verificar código
yarn generate-icons       # Genera iconos PWA en todos los tamaños requeridos
```

## 📁 Estructura del Proyecto

```
test-front/
├── public/                          # Assets estáticos
│   ├── manifest.json                # PWA manifest
│   ├── icons/                       # Iconos PWA (8 tamaños)
│   └── favicon.svg                  # Favicon
├── scripts/
│   └── generate-icons.js            # Script para generar iconos PWA
├── src/
│   ├── Product/                     # Módulo Product (Bounded Context)
│   │   ├── Domain/                  # Capa de Dominio
│   │   │   ├── Product.ts           # Entidad Product
│   │   │   └── Contracts/           # Interfaces/Contratos
│   │   │       └── ProductRepositoryContract.ts
│   │   ├── Application/             # Capa de Aplicación
│   │   │   ├── UseCases/            # Casos de uso
│   │   │   │   ├── GetAllProductsUseCase.ts
│   │   │   │   └── GetProductByIdUseCase.ts
│   │   │   └── Stores/              # State management (Zustand)
│   │   │       └── ProductStore.ts
│   │   └── Infrastructure/          # Capa de Infraestructura
│   │       ├── Services/            # Servicios externos
│   │       │   └── GraphQLService.ts
│   │       ├── Repositories/        # Implementaciones de repositorios
│   │       │   └── ProductRepository.ts
│   │       └── Controllers/         # Controladores
│   │           └── ProductController.ts
│   ├── Shared/                      # Código compartido
│   │   └── Infrastructure/
│   │       ├── ServiceProvider.ts   # Dependency Injection Container
│   │       └── ServiceWorkerRegistration.ts
│   ├── UI/                          # Capa de Presentación
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── Common/              # Componentes comunes
│   │   │   │   ├── BackButton.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── ErrorMessage.tsx
│   │   │   │   ├── ImagePlaceholder.tsx
│   │   │   │   └── LoadingSpinner.tsx
│   │   │   └── Product/             # Componentes específicos de Product
│   │   │       ├── ProductCard.tsx
│   │   │       ├── ProductCardHeader.tsx
│   │   │       ├── ProductCardFooter.tsx
│   │   │       ├── ProductCarousel.tsx
│   │   │       ├── ProductInfoColumn.tsx
│   │   │       ├── ProductListHeader.tsx
│   │   │       ├── AddToCartButton.tsx
│   │   │       └── BuyNowButton.tsx
│   │   ├── screens/                 # Pantallas/Vistas
│   │   │   └── Product/
│   │   │       ├── ProductListScreen.tsx
│   │   │       └── ProductDetailScreen.tsx
│   │   └── navigation/              # Configuración de rutas
│   │       └── AppRouter.tsx
│   ├── bootstrap/                   # Inicialización de la app
│   │   └── index.ts                 # Registro de dependencias
│   ├── assets/                      # Assets de la aplicación
│   │   └── no-image.webp
│   ├── service-worker.js            # Service Worker (Workbox)
│   ├── webpack-env.d.ts             # Declaraciones TypeScript
│   ├── App.tsx                      # Componente raíz
│   └── main.tsx                     # Entry point
├── .babelrc                         # Configuración Babel
├── .env                             # Variables de entorno
├── eslint.config.js                 # Configuración ESLint
├── postcss.config.js                # Configuración PostCSS
├── tailwind.config.js               # Configuración Tailwind CSS
├── tsconfig.json                    # Configuración TypeScript
├── webpack.config.js                # Configuración Webpack
├── package.json                     # Dependencias y scripts
├── PWA_CONFIGURATION.md             # Documentación PWA detallada
└── README.md                        # Este archivo
```

## 🎯 Decisiones Técnicas

### Arquitectura

#### Hexagonal Architecture (Clean Architecture)

Elegimos la Arquitectura Hexagonal para:

- **Independencia de frameworks**: La lógica de negocio no depende de React, Apollo, o cualquier framework UI
- **Testabilidad**: Cada capa puede ser testeada de forma aislada
- **Mantenibilidad**: Separación clara de responsabilidades
- **Escalabilidad**: Fácil agregar nuevos bounded contexts (User, Cart, Orders, etc.)

**Capas implementadas**:

1. **Domain**: Entidades y contratos puros, sin dependencias externas
2. **Application**: Casos de uso y lógica de aplicación
3. **Infrastructure**: Implementaciones concretas (GraphQL, Repositories)
4. **UI**: Presentación (React components, screens)

#### Domain-Driven Design (DDD)

- **Bounded Context**: `Product` como contexto acotado
- **Entities**: `Product.ts` con validación y serialización
- **Value Objects**: Implícitos en la estructura de Product
- **Repository Pattern**: Abstracción del acceso a datos
- **Use Cases**: Lógica de aplicación encapsulada

#### Dependency Injection

Implementamos un **Service Provider** custom en lugar de usar bibliotecas pesadas:

```typescript
ServiceProvider.register<ProductRepositoryContract>(
    'ProductRepository',
    productRepository
);

const repo = ServiceProvider.resolve<ProductRepositoryContract>('ProductRepository');
```

**Ventajas**:
- Lightweight (sin dependencias adicionales)
- Type-safe con TypeScript
- Inversión de control explícita
- Fácil testing con mocks

### Stack Tecnológico

#### React 19 + TypeScript

- **React 19**: Última versión con mejoras de performance
- **TypeScript estricto**: Type safety completo, reduce bugs en runtime
- **Functional Components**: Hooks para state management

#### State Management: Zustand

Elegimos Zustand sobre Redux/Context API por:

- ✅ Más ligero (~1KB vs 10KB+ de Redux)
- ✅ Menos boilerplate
- ✅ API simple e intuitiva
- ✅ TypeScript-first
- ✅ No requiere providers/wrappers

```typescript
const useProductStore = create<ProductStore>((set) => ({
    products: [],
    fetchProducts: async () => { /* ... */ }
}));
```

#### GraphQL + Apollo Client

- **GraphQL**: Queries precisas, sin over-fetching
- **Apollo Client**: Cache automático, optimistic UI
- **Type generation**: Types generados desde el schema

#### UI: PrimeReact + Tailwind CSS

**PrimeReact**:
- Componentes enterprise-ready
- Accesibilidad (WCAG)
- Temas personalizables

**Tailwind CSS**:
- Utility-first CSS
- Responsive design fácil
- Tree-shaking automático
- Sin CSS no utilizado en producción

#### Build: Webpack 5 (migrado desde Vite)

**¿Por qué Webpack?**:
- Mayor control sobre el proceso de build
- Mejor soporte para PWA (Workbox integration)
- Configuración explícita y predecible
- Amplio ecosistema de plugins

**Optimizaciones**:
- Code splitting automático
- Tree shaking
- Minificación con Terser
- CSS extraction en producción
- Asset optimization (imágenes, fuentes)

### Patrones de Diseño

#### 1. Repository Pattern
```typescript
interface ProductRepositoryContract {
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
}
```

#### 2. Use Case Pattern
```typescript
export class GetAllProductsUseCase {
    execute(): Promise<Product[]> {
        return this.repository.findAll();
    }
}
```

#### 3. Facade Pattern
```typescript
export class ProductController {
    async getAllProducts(): Promise<Product[]> {
        return this.getAllProductsUseCase.execute();
    }
}
```

#### 4. Service Provider (DI Container)
```typescript
ServiceProvider.register('ProductRepository', productRepository);
const repo = ServiceProvider.resolve('ProductRepository');
```

### Principios SOLID

- **S**ingle Responsibility: Cada clase/módulo tiene una única razón para cambiar
- **O**pen/Closed: Abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Las implementaciones pueden sustituir sus contratos
- **I**nterface Segregation: Interfaces específicas y focalizadas
- **D**ependency Inversion: Dependemos de abstracciones, no de concreciones

### Performance

#### Code Splitting
```typescript
// Lazy loading de rutas
const ProductDetailScreen = lazy(() => import('./screens/ProductDetailScreen'));
```

#### Image Optimization
- Formato WebP para menor tamaño
- Placeholder images
- Lazy loading con `loading="lazy"`

#### Caching Strategy (PWA)
- **Precache**: Assets críticos (HTML, CSS, JS)
- **CacheFirst**: Imágenes y fuentes (30 días)
- **NetworkFirst**: APIs (5 minutos)
- **StaleWhileRevalidate**: Assets dinámicos

## 🏛️ Arquitectura

### Flujo de Datos

```
User Interaction
    ↓
UI Component (React)
    ↓
Controller (Facade)
    ↓
Use Case (Application Logic)
    ↓
Repository (Contract)
    ↓
Repository Implementation (Infrastructure)
    ↓
External Service (GraphQL API)
```

### Dependency Flow

```
Domain (Core)
    ↑
Application
    ↑
Infrastructure
    ↑
UI (React Components)
```

**Regla**: Las capas internas NO conocen las externas.

### Ejemplo Completo: Listar Productos

```typescript
// 1. Usuario hace click en "Products"
<ProductListScreen />

// 2. Screen usa el store (Zustand)
const { products, fetchProducts } = useProductStore();
useEffect(() => { fetchProducts(); }, []);

// 3. Store usa el Controller
const controller = new ProductController();
const products = await controller.getAllProducts();

// 4. Controller ejecuta Use Case
return this.getAllProductsUseCase.execute();

// 5. Use Case usa Repository (contrato)
return this.repository.findAll();

// 6. Repository usa GraphQL Service
const { data } = await this.graphQLService.query(GET_PRODUCTS);

// 7. Datos fluyen de vuelta hasta el UI
```

## 📱 PWA Features

Ver [PWA_CONFIGURATION.md](PWA_CONFIGURATION.md) para documentación detallada.

### Características Implementadas

- ✅ **Instalable**: En dispositivos móviles y desktop
- ✅ **Offline**: Funciona sin conexión a internet
- ✅ **Cache Strategies**: 4 estrategias diferentes de caché
- ✅ **Auto-update**: Actualización automática con notificación
- ✅ **Manifest**: Metadata completa de la aplicación
- ✅ **Icons**: 8 tamaños para todas las plataformas
- ✅ **Service Worker**: Workbox con precaching inteligente

### Testing PWA

```bash
# 1. Build de producción
yarn build

# 2. Servir localmente
yarn serve

# 3. Abrir http://localhost:5173
# 4. Chrome DevTools > Application > Manifest
# 5. Click "Install" para probar instalación
```

### Lighthouse Score

Para auditar la PWA:

1. Abrir Chrome DevTools (F12)
2. Ir a pestaña "Lighthouse"
3. Seleccionar "Progressive Web App"
4. Ejecutar audit

**Targets**:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
- PWA: 100

## 🚧 Mejoras Futuras

Si tuviera más tiempo, implementaría las siguientes mejoras:

### 1. Refinamiento de Arquitectura Hexagonal

#### Separación Completa de UI de Infraestructura

**Problema actual**:
Los componentes de UI están fuera de la arquitectura hexagonal, cuando deberían ser parte de la capa de Infraestructura como **Adapters**.

**Mejora propuesta**:
```
src/
├── Product/
│   ├── Domain/
│   ├── Application/
│   └── Infrastructure/
│       ├── Adapters/           # NUEVO
│       │   └── UI/
│       │       ├── React/      # Implementación React
│       │       │   ├── ProductListAdapter.tsx
│       │       │   └── ProductDetailAdapter.tsx
│       │       └── Vue/        # Posible implementación Vue
│       ├── Services/
│       └── Repositories/
```

**Beneficios**:
- UI como detalle de implementación intercambiable
- Posibilidad de cambiar React por Vue/Angular sin tocar Domain/Application
- Mejor aislamiento de responsabilidades

#### Ports & Adapters Explícitos

**Mejora**:
```typescript
// Domain/Ports/Output/ProductRepositoryPort.ts
export interface ProductRepositoryPort {
    findAll(): Promise<Product[]>;
}

// Infrastructure/Adapters/Persistence/GraphQLProductRepository.ts
export class GraphQLProductRepository implements ProductRepositoryPort {
    // Implementación con GraphQL
}

// Infrastructure/Adapters/Persistence/RESTProductRepository.ts
export class RESTProductRepository implements ProductRepositoryPort {
    // Implementación alternativa con REST
}
```

### 2. Separación de Bibliotecas de UI

#### Problema Actual
PrimeReact, iconos (PrimeIcons) y estilos están mezclados en componentes individuales.

#### Mejora Propuesta: Design System Independiente

```
src/
├── UI/
│   └── DesignSystem/
│       ├── primitives/         # Componentes base
│       │   ├── Button/
│       │   ├── Input/
│       │   └── Card/
│       ├── icons/              # Sistema de iconos unificado
│       │   ├── IconProvider.tsx
│       │   ├── icons.registry.ts
│       │   └── index.ts
│       ├── typography/         # Manejo de fuentes
│       │   ├── fonts.config.ts
│       │   └── Typography.tsx
│       └── theme/              # Tema centralizado
│           ├── colors.ts
│           ├── spacing.ts
│           └── index.ts
```

**Sistema de Iconos**:
```typescript
// icons/IconProvider.tsx
export const IconProvider = {
    get(name: IconName): JSX.Element {
        return iconRegistry[name];
    }
};

// Uso en componentes
<Icon name="shopping-cart" size="lg" />
```

**Beneficios**:
- Fácil cambio de biblioteca de iconos (PrimeIcons → Heroicons → FontAwesome)
- Lazy loading de iconos
- Tree shaking automático de iconos no usados
- Tema consistente en toda la app

### 3. Testing Completo

#### Unit Tests
```typescript
// Product/Domain/Product.test.ts
describe('Product', () => {
    it('should validate price is positive', () => {
        expect(() => Product.create({ price: -1 }))
            .toThrow('Price must be positive');
    });
});

// Product/Application/UseCases/GetAllProductsUseCase.test.ts
describe('GetAllProductsUseCase', () => {
    it('should return all products', async () => {
        const mockRepo = createMockRepository();
        const useCase = new GetAllProductsUseCase(mockRepo);
        const products = await useCase.execute();
        expect(products).toHaveLength(10);
    });
});
```

#### Integration Tests
```typescript
// Test con GraphQL mock
describe('ProductRepository', () => {
    it('should fetch products from GraphQL API', async () => {
        // Mock Apollo Client
        // Test repository
    });
});
```

#### E2E Tests (Playwright/Cypress)
```typescript
test('should display product list and navigate to detail', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.product-card')).toHaveCount(10);
    await page.click('.product-card:first-child');
    await expect(page).toHaveURL(/\/products\/\d+/);
});
```

### 4. Advanced Features

#### Optimistic UI
```typescript
const addToCart = async (product: Product) => {
    // Update UI immediately
    set({ cart: [...cart, product] });
    
    try {
        await api.addToCart(product);
    } catch (e) {
        // Rollback on error
        set({ cart: cart.filter(p => p.id !== product.id) });
    }
};
```

#### Infinite Scroll / Pagination
```typescript
const { products, hasMore, loadMore } = useInfiniteProducts();
```

#### Advanced Caching
- Implementar cache invalidation strategies
- Stale-while-revalidate para datos críticos
- Background sync para operaciones offline

#### Error Boundary Global
```typescript
<ErrorBoundary fallback={<ErrorScreen />}>
    <App />
</ErrorBoundary>
```

### 5. Developer Experience

#### Storybook
Para documentar y desarrollar componentes en aislamiento.

#### Husky + Lint-staged
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

#### Conventional Commits
Commits semánticos para changelog automático.

#### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
- name: Install
  run: yarn install
- name: Lint
  run: yarn lint
- name: Test
  run: yarn test
- name: Build
  run: yarn build
- name: Deploy
  run: yarn deploy
```

### 6. Monitoring & Analytics

#### Error Tracking (Sentry)
```typescript
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
});
```

#### Performance Monitoring
- Web Vitals tracking
- Custom performance marks
- Bundle size monitoring

#### User Analytics
- Google Analytics 4
- Event tracking
- User journey analysis

### 7. Accessibility (A11Y)

- ARIA labels completos
- Keyboard navigation
- Screen reader testing
- Contraste de colores WCAG AA/AAA
- Focus management

### 8. Internacionalización (i18n)

```typescript
// i18n/translations/es.ts
export const es = {
    'product.list.title': 'Productos',
    'product.list.empty': 'No hay productos disponibles',
};

// Uso
const { t } = useTranslation();
<h1>{t('product.list.title')}</h1>
```

### 9. Backend for Frontend (BFF)

Implementar un BFF en Node.js/NestJS para:
- Agregar múltiples fuentes de datos
- Transformar datos para el frontend
- Autenticación y autorización
- Rate limiting
- Caching server-side

### 10. Micro-Frontends

Para escalar la aplicación, dividir en micro-frontends:
- `@products/catalog` (este proyecto)
- `@products/cart`
- `@products/checkout`
- `@products/user-profile`

## 📚 Recursos Adicionales

### Documentación del Proyecto
- [PWA Configuration](PWA_CONFIGURATION.md) - Documentación completa de PWA

### Arquitectura y Patrones
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

### Tecnologías Utilizadas
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [PrimeReact](https://primereact.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Workbox](https://developers.google.com/web/tools/workbox)

---

## 📄 Licencia

Este proyecto es un ejercicio técnico demostrativo.

## 👥 Autor

[Tu Nombre]

---

**Última actualización**: Febrero 2026
