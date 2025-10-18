import { registerRootComponent } from 'expo';
import App from './App';

// Fix viewport for web on mobile devices
if (typeof document !== 'undefined') {
  // Update viewport meta tag to prevent zoom
  const viewport = document.querySelector('meta[name=viewport]');
  if (viewport) {
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
    );
  }
  
  // Add mobile-specific styles
  const style = document.createElement('style');
  style.innerHTML = `
    html, body {
      position: fixed;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      -webkit-text-size-adjust: 100%;
      overscroll-behavior: none;
    }
    
    #root {
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
    }
  `;
  document.head.appendChild(style);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
