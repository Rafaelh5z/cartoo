/**
 * Service Worker Registration
 * 
 * Este módulo se encarga de registrar el service worker para la PWA.
 * Solo se registra en producción para evitar problemas durante el desarrollo.
 * 
 * Estrategias de caché implementadas:
 * - Precache: Todos los assets generados por webpack
 * - CacheFirst: Imágenes y fuentes (máximo 30 días)
 * - NetworkFirst: APIs y navegación (con fallback a caché)
 * - StaleWhileRevalidate: CSS y JS (actualización en segundo plano)
 */

export function registerServiceWorker() {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('✅ Service Worker registered successfully:', registration);

                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60 * 60 * 1000); // Check every hour

                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        
                        newWorker?.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New service worker available
                                console.log('🔄 New version available! Refresh to update.');
                                
                                // Optional: Show update notification to user
                                if (confirm('New version available! Reload to update?')) {
                                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                                    window.location.reload();
                                }
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.error('❌ Service Worker registration failed:', error);
                });

            // Listen for messages from service worker
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'SW_ACTIVATED') {
                    console.log('✅ Service Worker activated:', event.data.message);
                }
            });

            // Handle controller change (new SW activated)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('🔄 New Service Worker activated, reloading page...');
                window.location.reload();
            });
        });
    }
}

/**
 * Unregister service worker (útil para desarrollo o rollback)
 */
export function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
                console.log('✅ Service Worker unregistered');
            })
            .catch((error) => {
                console.error('❌ Service Worker unregister failed:', error);
            });
    }
}
