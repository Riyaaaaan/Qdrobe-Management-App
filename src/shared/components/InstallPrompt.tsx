import { usePWAInstall } from '../hooks/usePWAInstall';
import { Button } from './Button';
import { useState, useEffect } from 'react';

export const InstallPrompt = () => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const dismissedState = localStorage.getItem('pwa-install-dismissed');
    if (dismissedState === 'true') {
      setDismissed(true);
    }
  }, []);

  const handleInstall = async () => {
    const installed = await install();
    if (installed) {
      setDismissed(true);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (isInstalled || !isInstallable || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Install Driver App
          </h3>
          <p className="text-xs text-gray-600 mb-3">
            Install this app on your device for a better experience and offline access.
          </p>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleInstall}
            >
              Install
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
            >
              Later
            </Button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-2 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};



