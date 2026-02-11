import { AppRouter } from '@/UI/navigation/AppRouter';
import './App.css';

/**
 * App - Componente raíz de la aplicación
 * 
 * Responsabilidades:
 * - Configurar el router principal
 * - Aplicar layouts globales si existen
 * - Manejar configuración global de la UI
 * 
 * Principios aplicados:
 * - Single Responsibility: Solo configura la estructura principal de la app
 * - Separation of Concerns: Delega el routing a AppRouter
 */
function App() {
    return (
        <div className="app min-h-screen w-full">
            <AppRouter />
        </div>
    );
}

export default App;
