import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import App from './App';
import { initializeApp } from './bootstrap';
import { registerServiceWorker } from '@/Shared/Infrastructure/ServiceWorkerRegistration';
import './index.css';

// Importar estilos de PrimeReact
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

/**
 * Punto de entrada de la aplicación
 * 
 * Flujo de inicialización:
 * 1. Inicializar bootstrap (registrar dependencias)
 * 2. Configurar providers (PrimeReact, Router)
 * 3. Renderizar App
 */

// Inicializar la aplicación (registro de dependencias)
initializeApp();

// Obtener el elemento root del DOM
const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

// Crear root de React 19
const root = createRoot(rootElement);

// Renderizar la aplicación
root.render(
    <StrictMode>
        <PrimeReactProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PrimeReactProvider>
    </StrictMode>
);

// Registrar Service Worker para PWA (solo en producción)
registerServiceWorker();
