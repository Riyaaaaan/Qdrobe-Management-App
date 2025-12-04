import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './app/providers';
import { AppRouter } from './app/router';
import { ErrorBoundary } from './shared/components';
import './styles/index.css';
import 'leaflet/dist/leaflet.css';

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  // Use dynamic import to handle cases where PWA plugin might not be available
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      immediate: true,
      onRegistered(registration) {
        console.log('Service Worker registered:', registration);
      },
      onRegisterError(error) {
        console.error('Service Worker registration error:', error);
      },
    });
  }).catch(() => {
    // PWA plugin not available or not in dev mode, that's okay
    console.log('PWA registration skipped (not available in this environment)');
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Providers>
        <AppRouter />
      </Providers>
    </ErrorBoundary>
  </React.StrictMode>
);





