/**
 * ResetButton Component
 * Appears when user long-presses screen
 * Confirms before resetting count
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../constants/colors';

interface ResetButtonProps {
  visible: boolean;
  onClose: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ visible, onClose }) => {
  const theme = useAppStore(state => state.theme);
  const count = useAppStore(state => state.count);
  const resetCount = useAppStore(state => state.resetCount);
  const themeColors = COLORS[theme];

  const handleReset = () => {
    resetCount();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Reset Counter?
          </Text>
          
          <Text style={[styles.message, { color: themeColors.textSecondary }]}>
            Current count: {count}
          </Text>
          
          <Text style={[styles.warning, { color: themeColors.textSecondary }]}>
            This will reset your count to 0
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: themeColors.textSecondary }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: themeColors.text }]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.resetButton, { backgroundColor: themeColors.accent }]}
              onPress={handleReset}
            >
              <Text style={[styles.buttonText, styles.resetButtonText]}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    maxWidth: 320,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  warning: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 2,
  },
  resetButton: {
    // Background color set dynamically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#FFFFFF',
  },
});
