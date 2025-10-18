/**
 * ResetButton Component
 * Appears when user long-presses screen
 * Confirms before resetting count
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
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
  const endSession = useAppStore(state => state.endSession);
  const themeColors = COLORS[theme];
  const [notes, setNotes] = useState('');

  const handleReset = () => {
    resetCount();
    onClose();
  };

  const handleEndSession = async () => {
    await endSession(notes.trim() || undefined);
    setNotes('');
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

          <Text style={[styles.subTitle, { color: themeColors.text, marginTop: 16 }]}>Save Session (optional)</Text>
          <Text style={[styles.message, { color: themeColors.textSecondary }]}>Add notes for this session</Text>
          <ScrollView style={[styles.notesBox, { borderColor: themeColors.textSecondary }]}
            keyboardShouldPersistTaps="handled">
            <TextInput
              placeholder="Reflections, mantras, feelings..."
              placeholderTextColor={themeColors.textSecondary}
              value={notes}
              onChangeText={setNotes}
              multiline
              style={[styles.notesInput, { color: themeColors.text }]}
            />
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: themeColors.textSecondary }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: themeColors.text }]} numberOfLines={1}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.resetButton, { backgroundColor: themeColors.accent }]}
              onPress={handleReset}
            >
              <Text style={[styles.buttonText, styles.resetButtonText]} numberOfLines={1}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Full-width Save Session button on its own row to avoid wrapping */}
          <View style={styles.buttonRowSingle}>
            <TouchableOpacity
              style={[styles.buttonFull, styles.endButton, { backgroundColor: themeColors.primary }]}
              onPress={handleEndSession}
            >
              <Text style={[styles.buttonText, styles.resetButtonText]} numberOfLines={1}>Save Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
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
    marginTop: 12,
  },
  buttonRowSingle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFull: {
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
  endButton: {
    // Background color set dynamically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#FFFFFF',
  },
  notesBox: {
    maxHeight: 120,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  notesInput: {
    minHeight: 80,
    fontSize: 14,
    textAlignVertical: 'top',
  },
});
