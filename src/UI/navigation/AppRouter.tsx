import { Routes, Route } from 'react-router-dom';
import { ProductListScreen } from '@/UI/screens/Product/ProductListScreen';
import { ProductDetailScreen } from '@/UI/screens/Product/ProductDetailScreen';

/**
 * AppRouter - Configuración de rutas de la aplicación
 * 
 * Define todas las rutas de la aplicación usando react-router-dom v6.
 * 
 * Rutas disponibles:
 * - / : Listado de productos
 * - /products/:id : Detalle de un producto específico
 * 
 * @example
 * <BrowserRouter>
 *   <AppRouter />
 * </BrowserRouter>
 */
export const AppRouter = () => {
    return (
        <Routes>
            {/* Home - Lista de productos */}
            <Route path="/" element={<ProductListScreen />} />

            {/* Detalle de producto */}
            <Route path="/products/:id" element={<ProductDetailScreen />} />

            {/* Ruta 404 - Redirect a home */}
            <Route path="*" element={<ProductListScreen />} />
        </Routes>
    );
};
