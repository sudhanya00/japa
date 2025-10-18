/**
 * Mobile Only Guard Component
 * Shows a message to desktop users that the app is mobile-only
 */

import React from 'react';

export const MobileOnlyMessage: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Phone Icon */}
        <div style={styles.iconContainer}>
          <div style={styles.phoneIcon}>
            <div style={styles.phoneScreen} />
          </div>
        </div>

        <h1 style={styles.title}>📱 Mobile Only App</h1>
        
        <p style={styles.message}>
          Japa Meditation Counter is designed exclusively for mobile devices.
        </p>

        <div style={styles.instructionsContainer}>
          <h3 style={styles.instructionsTitle}>To use this app:</h3>
          <p style={styles.instruction}>• Open on your smartphone</p>
          <p style={styles.instruction}>• Tap "Add to Home Screen" for app-like experience</p>
          <p style={styles.instruction}>• Enjoy your meditation practice 🙏</p>
        </div>

        <div style={styles.qrContainer}>
          <p style={styles.qrText}>
            Scan with your phone or visit this URL on mobile
          </p>
          <code style={styles.url}>{window.location.href}</code>
        </div>

        <p style={styles.namaste}>Namaste 🙏</p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#FFF5F0', // Twilight background
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  card: {
    maxWidth: '500px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
  iconContainer: {
    marginBottom: '24px',
  },
  phoneIcon: {
    width: '80px',
    height: '120px',
    border: '4px solid #FF6B45',
    borderRadius: '12px',
    padding: '6px',
    backgroundColor: '#FFF',
    display: 'flex',
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FF6B45',
    borderRadius: '6px',
    opacity: 0.2,
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2D1810',
    marginBottom: '16px',
    textAlign: 'center',
    margin: 0,
  },
  message: {
    fontSize: '18px',
    color: '#6B4423',
    textAlign: 'center',
    marginBottom: '32px',
    lineHeight: '28px',
  },
  instructionsContainer: {
    width: '100%',
    backgroundColor: '#FFF5F0',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '32px',
  },
  instructionsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2D1810',
    marginBottom: '16px',
    marginTop: 0,
  },
  instruction: {
    fontSize: '15px',
    color: '#6B4423',
    marginBottom: '8px',
    lineHeight: '24px',
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px',
  },
  qrText: {
    fontSize: '14px',
    color: '#8B6B47',
    marginBottom: '12px',
    textAlign: 'center',
  },
  url: {
    fontSize: '12px',
    color: '#FF6B45',
    fontWeight: '600',
    backgroundColor: '#FFF5F0',
    padding: '8px 16px',
    borderRadius: '8px',
  },
  namaste: {
    fontSize: '20px',
    color: '#FF6B45',
    fontWeight: '600',
  },
};

