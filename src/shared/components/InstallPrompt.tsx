import { usePWAInstall } from '../hooks/usePWAInstall';
import { Button } from './Button';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

export const InstallPrompt = () => {
  const { isInstallable, isInstalled, install, isDesktopDevice, isIOSDevice, browserName } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    const dismissedState = localStorage.getItem('pwa-install-dismissed');
    if (dismissedState === 'true') {
      setDismissed(true);
    }
  }, []);

  const handleInstall = async () => {
    if (isIOSDevice) {
      setShowIOSInstructions(true);
      return;
    }
    
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

  const getInstallMessage = () => {
    if (isDesktopDevice) {
      const browserMsg = browserName ? ` in ${browserName}` : '';
      return `Install this app on your desktop${browserMsg} for a better experience, offline access, and quick launch from your taskbar or dock.`;
    }
    if (isIOSDevice) {
      return 'Add this app to your home screen for quick access, offline functionality, and a native app-like experience.';
    }
    return 'Install this app on your device for a better experience, offline access, and faster loading.';
  };

  const getInstallButtonText = () => {
    if (isDesktopDevice) {
      return 'Install Now';
    }
    if (isIOSDevice) {
      return 'Show Instructions';
    }
    return 'Install';
  };

  return (
    <>
      <div className={`fixed ${isDesktopDevice ? 'top-4 right-4' : 'bottom-4 left-4 right-4 md:left-auto md:right-4'} md:max-w-md bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-primary/20 p-4 z-50 animate-in ${isDesktopDevice ? 'slide-in-from-top-4' : 'slide-in-from-bottom-4'}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">
                {isDesktopDevice ? 'Install Driver App' : 'Install Driver App'}
              </h3>
            </div>
            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              {getInstallMessage()}
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleInstall}
                className="flex-1"
              >
                {getInstallButtonText()}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-gray-300 hover:text-white"
              >
                Later
              </Button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-primary transition-colors p-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* iOS Installation Instructions Dialog */}
      <Dialog open={showIOSInstructions} onOpenChange={setShowIOSInstructions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Install Driver App on iOS</DialogTitle>
            <DialogDescription>
              Follow these steps to add the app to your home screen
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                1
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-foreground mb-1">Tap the Share Button</p>
                <p className="text-xs text-muted-foreground">
                  Look for the share icon <ShareIcon /> at the bottom of your Safari browser
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                2
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-foreground mb-1">Select "Add to Home Screen"</p>
                <p className="text-xs text-muted-foreground">
                  Scroll down in the share menu and tap "Add to Home Screen"
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                3
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-foreground mb-1">Tap "Add"</p>
                <p className="text-xs text-muted-foreground">
                  Confirm by tapping the "Add" button in the top right corner
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Tip:</strong> Once installed, the app will work offline and launch like a native app!
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => {
                setShowIOSInstructions(false);
                handleDismiss();
              }}
              className="flex-1"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Share Icon Component
const ShareIcon = () => (
  <svg className="inline w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);





