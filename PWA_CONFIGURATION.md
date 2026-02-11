# Progressive Web App (PWA) Configuration

## 📱 Overview

Esta aplicación ha sido configurada como una **Progressive Web App (PWA)** completa, lo que permite instalarla en dispositivos móviles y de escritorio, trabajar offline, y ofrecer una experiencia similar a una aplicación nativa.

## 🎯 Características PWA Implementadas

### 1. **Manifest (public/manifest.json)**
Define los metadatos de la aplicación:
- **Nombre**: Products App - Hexagonal Architecture
- **Nombre corto**: Products App
- **Tema**: Azul (#3b82f6)
- **Display**: Standalone (pantalla completa)
- **Iconos**: 8 tamaños diferentes (72x72 hasta 512x512)

### 2. **Service Worker (src/service-worker.js)**
Gestiona el caché y funcionalidad offline con estrategias Workbox:

#### Estrategias de Caché:
- **Precache**: Todos los assets generados por Webpack (JS, CSS, HTML)
- **CacheFirst**: 
  - Imágenes (máximo 60 imágenes, 30 días)
  - Fuentes de Google (máximo 30 fuentes, 1 año)
- **NetworkFirst**: 
  - APIs (máximo 50 entradas, 5 minutos)
  - Navegación (páginas)
- **StaleWhileRevalidate**:
  - CSS y JavaScript (actualización en segundo plano)
  - Hojas de estilo de Google Fonts

### 3. **Registro de Service Worker**
Ubicación: `src/Shared/Infrastructure/ServiceWorkerRegistration.ts`

Funcionalidades:
- Solo se registra en **producción**
- Actualización automática cada hora
- Notificación al usuario cuando hay nueva versión
- Manejo de eventos de activación y actualización

### 4. **Meta Tags PWA**
En `index.html`:
- Theme color
- Apple Touch Icons
- iOS meta tags
- Microsoft Tiles
- Viewport optimizado

### 5. **Iconos PWA**
Generados automáticamente en 8 tamaños:
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

Script de generación: `scripts/generate-icons.js`

## 🚀 Cómo Usar

### Desarrollo
```bash
yarn dev
```
El Service Worker NO se registra en desarrollo para facilitar el debugging.

### Producción
```bash
# Build
yarn build

# Preview (test PWA locally)
npx serve dist -s -p 5173
```

### Instalación
1. Abre la aplicación en un navegador compatible
2. Busca el botón "Instalar" o "Agregar a pantalla de inicio"
3. Sigue las instrucciones del navegador

## 📊 Estrategias de Caché Detalladas

### Precache
```javascript
precacheAndRoute(self.__WB_MANIFEST)
```
- Cachea automáticamente todos los archivos generados por Webpack
- Assets con hash para cache busting
- Actualización automática cuando cambia el código

### CacheFirst (Imágenes)
```javascript
new CacheFirst({
  cacheName: 'images',
  maxEntries: 60,
  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
})
```
- Prioriza el caché sobre la red
- Ideal para recursos que no cambian frecuentemente
- Expira automáticamente después de 30 días

### NetworkFirst (API)
```javascript
new NetworkFirst({
  cacheName: 'api-cache',
  maxEntries: 50,
  maxAgeSeconds: 5 * 60 // 5 minutos
})
```
- Intenta red primero, caché como fallback
- Perfecto para datos dinámicos
- Expira rápido (5 minutos) para datos frescos

### StaleWhileRevalidate (CSS/JS)
```javascript
new StaleWhileRevalidate({
  cacheName: 'static-resources'
})
```
- Responde con caché inmediatamente
- Actualiza en segundo plano
- Balance entre velocidad y frescura

## 🔧 Configuración Webpack

### Plugins Agregados
```javascript
// Copy manifest e iconos
new CopyWebpackPlugin({
  patterns: [
    { from: 'public/manifest.json', to: 'manifest.json' },
    { from: 'public/icons', to: 'icons' },
    { from: 'public/favicon.svg', to: 'favicon.svg' },
  ],
})

// Generar Service Worker
new InjectManifest({
  swSrc: './src/service-worker.js',
  swDest: 'service-worker.js',
})
```

## 📱 Compatibilidad

### Navegadores con Soporte Completo
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS 11.3+)
- ✅ Firefox (Desktop & Android)
- ✅ Samsung Internet
- ✅ Opera

### Funcionalidades por Plataforma

#### Android
- ✅ Instalación completa
- ✅ Splash screen
- ✅ Notificaciones push (implementable)
- ✅ Funcionamiento offline completo

#### iOS
- ✅ Instalación (Add to Home Screen)
- ✅ Splash screen básico
- ⚠️ Notificaciones push limitadas
- ✅ Funcionamiento offline

#### Desktop
- ✅ Instalación en Chrome/Edge
- ✅ Ventana independiente
- ✅ Funcionamiento offline

## 🧪 Testing PWA

### Chrome DevTools - Lighthouse
1. Abre DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Selecciona "Progressive Web App"
4. Ejecuta el análisis

### Chrome DevTools - Application
1. Abre DevTools (F12)
2. Ve a la pestaña "Application"
3. Inspecciona:
   - **Manifest**: Verifica configuración
   - **Service Workers**: Estado y caché
   - **Storage**: Cache Storage, IndexedDB

### Testing Offline
1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Selecciona "Offline" en el dropdown
4. Recarga la página
5. La app debe funcionar sin conexión

## 📈 Optimizaciones Implementadas

### Performance
- ✅ Code splitting por rutas
- ✅ Lazy loading de imágenes
- ✅ Compresión gzip automática
- ✅ Assets con hash para cache busting
- ✅ Minificación de JS/CSS

### Offline Experience
- ✅ Cache de páginas navegadas
- ✅ Cache de imágenes vistas
- ✅ Cache de API responses (5 min)
- ✅ Fallback para navegación

### Update Strategy
- ✅ Actualización automática cada hora
- ✅ Prompt al usuario para actualizar
- ✅ Skip waiting para updates inmediatos
- ✅ Reload automático después de update

## 🔍 Debugging

### Ver Service Worker Activo
```javascript
navigator.serviceWorker.getRegistration().then(reg => {
  console.log('Service Worker:', reg);
});
```

### Ver Caches
```javascript
caches.keys().then(keys => {
  console.log('Cache keys:', keys);
});
```

### Desinstalar Service Worker (Development)
```javascript
import { unregisterServiceWorker } from '@/Shared/Infrastructure/ServiceWorkerRegistration';
unregisterServiceWorker();
```

## 📚 Recursos Adicionales

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Web.dev: PWA Checklist](https://web.dev/pwa-checklist/)
- [Can I Use: Service Workers](https://caniuse.com/serviceworkers)

## 🎓 Arquitectura PWA en el Proyecto

### Principios Aplicados
- **Separation of Concerns**: Service Worker separado de la lógica de negocio
- **Progressive Enhancement**: La app funciona sin PWA features
- **Offline First**: Prioridad a la experiencia offline
- **Clean Architecture**: PWA features en Shared/Infrastructure

### Estructura de Archivos
```
project/
├── public/
│   ├── manifest.json          # Manifest PWA
│   └── icons/                 # Iconos de la app
│       ├── icon-72x72.png
│       ├── icon-192x192.png
│       └── ...
├── scripts/
│   └── generate-icons.js      # Script para generar iconos
├── src/
│   ├── service-worker.js      # Service Worker con Workbox
│   ├── Shared/
│   │   └── Infrastructure/
│   │       └── ServiceWorkerRegistration.ts  # Registro de SW
│   └── main.tsx               # Entry point con registro de SW
└── webpack.config.js          # Config con plugins PWA
```

## ✅ Checklist PWA Completo

- [x] Manifest.json configurado
- [x] Service Worker implementado
- [x] Iconos en todos los tamaños
- [x] Meta tags PWA
- [x] HTTPS (requerido en producción)
- [x] Responsive design
- [x] Offline functionality
- [x] Cache strategies
- [x] Update mechanism
- [x] Install prompt
- [x] Splash screen
- [x] Theme color
- [x] Display standalone

---

**Última actualización**: Febrero 2026
**Versión**: 1.0.0
