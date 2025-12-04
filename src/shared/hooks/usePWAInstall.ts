import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Detect iOS with improved detection
const isIOS = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  const isIPad = /ipad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isIPhone = /iphone/.test(ua);
  const isIPod = /ipod/.test(ua);
  
  return isIPad || isIPhone || isIPod;
};

// Detect Android
const isAndroid = (): boolean => {
  return /android/i.test(navigator.userAgent);
};

// Detect desktop with improved detection
const isDesktop = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isTablet = /ipad|android(?!.*mobile)/i.test(ua);
  
  // Desktop if not mobile/tablet and screen width is reasonable
  return !isMobile && !isTablet && window.innerWidth >= 768;
};

// Detect browser name
const getBrowserName = (): string | null => {
  const ua = navigator.userAgent.toLowerCase();
  
  if (ua.includes('edg/')) return 'Microsoft Edge';
  if (ua.includes('chrome/') && !ua.includes('edg/')) return 'Google Chrome';
  if (ua.includes('safari/') && !ua.includes('chrome/')) return 'Safari';
  if (ua.includes('firefox/')) return 'Firefox';
  if (ua.includes('opera/') || ua.includes('opr/')) return 'Opera';
  if (ua.includes('samsungbrowser/')) return 'Samsung Internet';
  
  return null;
};

// Detect if running in standalone mode with improved detection
const isStandalone = (): boolean => {
  // Check for display-mode standalone (PWA standard)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // Check for iOS standalone mode
  if ((window.navigator as any).standalone === true) {
    return true;
  }
  
  // Check for Android TWA (Trusted Web Activity)
  if (document.referrer.includes('android-app://')) {
    return true;
  }
  
  // Check if launched from home screen (iOS Safari)
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return true;
  }
  
  // Additional check: if window controls overlay is available (desktop PWA)
  if ((window.navigator as any).windowControlsOverlay) {
    return true;
  }
  
  return false;
};

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [isAndroidDevice, setIsAndroidDevice] = useState(false);
  const [browserName, setBrowserName] = useState<string | null>(null);

  useEffect(() => {
    // Check if app is already installed
    if (isStandalone()) {
      setIsInstalled(true);
      setIsInstallable(false);
      return;
    }

    // Detect device types
    const ios = isIOS();
    const android = isAndroid();
    const desktop = isDesktop();
    const browser = getBrowserName();
    
    setIsIOSDevice(ios);
    setIsAndroidDevice(android);
    setIsDesktopDevice(desktop);
    setBrowserName(browser);

    // iOS doesn't support beforeinstallprompt, but we can show install instructions
    if (ios) {
      // On iOS, we can show install prompt (user needs to manually add to home screen)
      // Only show if not already installed
      setIsInstallable(true);
      return;
    }

    // For Android/Chrome/Desktop, listen for beforeinstallprompt event
    // This works on desktop Chrome, Edge, and Android Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also check if PWA criteria are met (for browsers that support it)
    // Some browsers may not fire beforeinstallprompt but still support installation
    if (desktop && (browser === 'Google Chrome' || browser === 'Microsoft Edge')) {
      // Chrome/Edge on desktop may support installation even without the event
      // We'll show the prompt if criteria are met
      const checkInstallability = () => {
        // Check if manifest exists and is valid
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (manifestLink) {
          // Small delay to allow browser to evaluate installability
          setTimeout(() => {
            // If we still don't have deferredPrompt after a moment,
            // we can still show install instructions for manual installation
            if (!deferredPrompt && !isInstalled) {
              // Don't auto-show, but allow manual trigger
            }
          }, 1000);
        }
      };
      checkInstallability();
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [deferredPrompt, isInstalled]);

  const install = async (): Promise<boolean> => {
    // iOS doesn't support programmatic installation
    if (isIOSDevice) {
      // Return false to let the component handle showing instructions
      return false;
    }

    if (!deferredPrompt) {
      // If no deferred prompt, installation might still be possible manually
      // Return false to indicate manual installation is needed
      return false;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
        setIsInstalled(true);
        return true;
      } else {
        // User dismissed the prompt
        setDeferredPrompt(null);
        return false;
      }
    } catch (error) {
      console.error('Error during installation:', error);
      // Clear the deferred prompt on error
      setDeferredPrompt(null);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    isIOSDevice,
    isAndroidDevice,
    isDesktopDevice,
    browserName,
    install,
  };
};





