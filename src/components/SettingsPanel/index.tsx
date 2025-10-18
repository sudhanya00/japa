import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../constants/colors';

interface SettingsPanelProps {
  visible: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ visible, onClose }) => {
  const theme = useAppStore(s => s.theme);
  const setTheme = useAppStore(s => s.setTheme);
  const rosaryType = useAppStore(s => s.rosaryType);
  const setRosaryType = useAppStore(s => s.setRosaryType);
  const hapticIntensity = useAppStore(s => s.hapticIntensity);
  const setHapticIntensity = useAppStore(s => s.setHapticIntensity);

  const themeColors = COLORS[theme];

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: themeColors.surface }]}> 
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>Settings</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, { color: themeColors.textSecondary }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Theme */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: themeColors.text }]}>Theme</Text>
            <View style={styles.pillRow}>
              {(['light','dark','twilight'] as const).map(t => (
                <TouchableOpacity key={t} style={[styles.pill, { borderColor: themeColors.textSecondary, backgroundColor: theme === t ? themeColors.accent : 'transparent' }]} onPress={() => setTheme(t)}>
                  <Text style={[styles.pillText, { color: theme === t ? '#fff' : themeColors.text }]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rosary Type */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: themeColors.text }]}>Mala Type</Text>
            <View style={styles.pillRow}>
              {(['rudraksh','sphatik','tulsi','kamal-gatta','chandan','moonga','amethyst','hakik-red','hakik-black','hakik-green'] as const).map(r => (
                <TouchableOpacity key={r} style={[styles.pill, { borderColor: themeColors.textSecondary, backgroundColor: rosaryType === r ? themeColors.accent : 'transparent' }]} onPress={() => setRosaryType(r)}>
                  <Text style={[styles.pillText, { color: rosaryType === r ? '#fff' : themeColors.text }]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Haptics */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: themeColors.text }]}>Haptics</Text>
            <View style={styles.pillRow}>
              {(['off','gentle','strong'] as const).map(h => (
                <TouchableOpacity key={h} style={[styles.pill, { borderColor: themeColors.textSecondary, backgroundColor: hapticIntensity === h ? themeColors.accent : 'transparent' }]} onPress={() => setHapticIntensity(h)}>
                  <Text style={[styles.pillText, { color: hapticIntensity === h ? '#fff' : themeColors.text }]}>{h}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: '300',
  },
  row: {
    marginBottom: 12,
  },
  rowSpace: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
});


