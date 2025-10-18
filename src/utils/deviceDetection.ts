/**
 * Device Detection Utility
 * Detects if user is on mobile or desktop
 */

export const isMobileDevice = (): boolean => {
  // Check screen width (primary method for web)
  const isMobileWidth = window.innerWidth <= 768;
  
  // Check user agent as secondary method
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Return true if width is mobile OR (user agent is mobile AND has touch)
  return isMobileWidth || (isMobileUserAgent && hasTouch);
};

export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  
  if (width < 768) {
    return 'mobile';
  } else if (width >= 768 && width < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

export const isPortrait = (): boolean => {
  return window.innerHeight > window.innerWidth;
};

export const getScreenSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
  };
};
