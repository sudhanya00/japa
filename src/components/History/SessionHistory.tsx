/**
 * SessionHistory Component
 * GitHub-style contribution graph for meditation sessions
 * Shows past sessions with daily activity visualization
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../constants/colors';
import { SessionRecord } from '../../types';

interface SessionHistoryProps {
  visible: boolean;
  onClose: () => void;
}

interface DayData {
  date: string; // YYYY-MM-DD
  count: number;
  sessions: SessionRecord[];
  intensity: number; // 0-4 for color intensity
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({ visible, onClose }) => {
  const theme = useAppStore(state => state.theme);
  const sessionHistory = useAppStore(state => state.sessionHistory);
  const themeColors = COLORS[theme];

  // Generate last 30 days of data
  const calendarData = useMemo(() => {
    const days: DayData[] = [];
    const today = new Date();
    
    // Create map of date -> sessions
    const sessionsByDate = new Map<string, SessionRecord[]>();
    sessionHistory.forEach(session => {
      const dateKey = session.date.split('T')[0]; // Get YYYY-MM-DD
      if (!sessionsByDate.has(dateKey)) {
        sessionsByDate.set(dateKey, []);
      }
      sessionsByDate.get(dateKey)!.push(session);
    });

    // Generate last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      const sessions = sessionsByDate.get(dateKey) || [];
      const totalCount = sessions.reduce((sum, s) => sum + s.count, 0);
      
      // Calculate intensity (0-4) based on count
      let intensity = 0;
      if (totalCount > 0) intensity = 1;
      if (totalCount >= 108) intensity = 2;
      if (totalCount >= 216) intensity = 3;
      if (totalCount >= 432) intensity = 4;

      days.push({
        date: dateKey,
        count: totalCount,
        sessions,
        intensity,
      });
    }

    return days;
  }, [sessionHistory]);

  // Get intensity color
  const getIntensityColor = (intensity: number): string => {
    const baseColor = themeColors.primary;
    switch (intensity) {
      case 0: return theme === 'dark' ? '#2D2D44' : '#E8E8E8'; // Empty
      case 1: return `${baseColor}40`; // 25%
      case 2: return `${baseColor}80`; // 50%
      case 3: return `${baseColor}B3`; // 70%
      case 4: return `${baseColor}FF`; // 100%
      default: return theme === 'dark' ? '#2D2D44' : '#E8E8E8';
    }
  };

  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Format time for display
  const formatTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  // Calculate stats
  const stats = useMemo(() => {
    const totalSessions = sessionHistory.length;
    const totalCount = sessionHistory.reduce((sum, s) => sum + s.count, 0);
    const totalDuration = sessionHistory.reduce((sum, s) => sum + s.duration, 0);
    const activeDays = calendarData.filter(d => d.count > 0).length;
    const currentStreak = calculateCurrentStreak(calendarData);
    
    return {
      totalSessions,
      totalCount,
      totalDuration,
      activeDays,
      currentStreak,
    };
  }, [sessionHistory, calendarData]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>Session History</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeText, { color: themeColors.textSecondary }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Stats Summary */}
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: themeColors.text }]}>{stats.totalSessions}</Text>
                <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Sessions</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: themeColors.text }]}>{stats.totalCount}</Text>
                <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Total Japa</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: themeColors.text }]}>{Math.round(stats.totalDuration / 60)}h</Text>
                <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Time</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: themeColors.text }]}>{stats.currentStreak}</Text>
                <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Day Streak</Text>
              </View>
            </View>

            {/* Contribution Graph */}
            <View style={styles.graphContainer}>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Last 30 Days</Text>
              <View style={styles.graph}>
                {calendarData.map((day, index) => (
                  <View
                    key={day.date}
                    style={[
                      styles.daySquare,
                      {
                        backgroundColor: getIntensityColor(day.intensity),
                        borderColor: themeColors.textSecondary + '20',
                      },
                    ]}
                  >
                    {day.count > 0 && (
                      <Text style={[styles.dayCount, { color: day.intensity >= 3 ? '#FFF' : themeColors.text }]}>
                        {day.count >= 108 ? Math.floor(day.count / 108) : '·'}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.legend}>
                <Text style={[styles.legendText, { color: themeColors.textSecondary }]}>Less</Text>
                {[0, 1, 2, 3, 4].map(i => (
                  <View
                    key={i}
                    style={[
                      styles.legendSquare,
                      { backgroundColor: getIntensityColor(i), borderColor: themeColors.textSecondary + '20' },
                    ]}
                  />
                ))}
                <Text style={[styles.legendText, { color: themeColors.textSecondary }]}>More</Text>
              </View>
            </View>

            {/* Session List */}
            <View style={styles.listContainer}>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Recent Sessions</Text>
              {sessionHistory.length === 0 ? (
                <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
                  No sessions yet. Complete your first session to see it here!
                </Text>
              ) : (
                sessionHistory.slice(0, 10).map((session, index) => (
                  <View
                    key={`${session.date}-${index}`}
                    style={[styles.sessionCard, { backgroundColor: themeColors.background }]}
                  >
                    <View style={styles.sessionHeader}>
                      <Text style={[styles.sessionDate, { color: themeColors.text }]}>
                        {formatDate(session.date)}
                      </Text>
                      <Text style={[styles.sessionTime, { color: themeColors.textSecondary }]}>
                        {formatTime(session.date)}
                      </Text>
                    </View>
                    <View style={styles.sessionStats}>
                      <View style={styles.sessionStat}>
                        <Text style={[styles.sessionStatValue, { color: themeColors.primary }]}>
                          {session.count}
                        </Text>
                        <Text style={[styles.sessionStatLabel, { color: themeColors.textSecondary }]}>
                          japa
                        </Text>
                      </View>
                      <View style={styles.sessionStat}>
                        <Text style={[styles.sessionStatValue, { color: themeColors.primary }]}>
                          {session.duration}m
                        </Text>
                        <Text style={[styles.sessionStatLabel, { color: themeColors.textSecondary }]}>
                          duration
                        </Text>
                      </View>
                      <View style={styles.sessionStat}>
                        <Text style={[styles.sessionStatValue, { color: themeColors.primary }]}>
                          {session.rosaryType}
                        </Text>
                        <Text style={[styles.sessionStatLabel, { color: themeColors.textSecondary }]}>
                          type
                        </Text>
                      </View>
                    </View>
                    {session.notes && (
                      <View style={[styles.notesContainer, { borderColor: themeColors.textSecondary + '30' }]}>
                        <Text style={[styles.notesText, { color: themeColors.textSecondary }]}>
                          {session.notes}
                        </Text>
                      </View>
                    )}
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Helper function to calculate current streak
function calculateCurrentStreak(calendarData: DayData[]): number {
  let streak = 0;
  // Count backwards from today
  for (let i = calendarData.length - 1; i >= 0; i--) {
    if (calendarData[i].count > 0) {
      streak++;
    } else {
      break; // Streak broken
    }
  }
  return streak;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 24,
    fontWeight: '300',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    gap: 8,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  graphContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  graph: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  daySquare: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCount: {
    fontSize: 10,
    fontWeight: '700',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  legendText: {
    fontSize: 11,
    marginHorizontal: 4,
  },
  legendSquare: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
  },
  listContainer: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 24,
  },
  sessionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '600',
  },
  sessionTime: {
    fontSize: 14,
  },
  sessionStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  sessionStat: {
    flex: 1,
  },
  sessionStatValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  sessionStatLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notesContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  notesText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
