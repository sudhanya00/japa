# Session History Feature

## Overview
GitHub-style contribution graph for visualizing meditation practice over time. Track daily progress, view session details, and maintain motivation through visual feedback.

## Features

### 📊 Contribution Graph
- **30-day calendar view** with color-coded intensity
- **5 intensity levels**:
  - Empty (gray): No practice
  - Level 1 (25%): 1-107 japa
  - Level 2 (50%): 108+ japa (1 mala)
  - Level 3 (70%): 216+ japa (2 malas)
  - Level 4 (100%): 432+ japa (4 malas)
- **Visual indicators**: Number shows completed malas per day
- **GitHub-inspired design**: Familiar and motivating

### 📈 Statistics Dashboard
- **Total Sessions**: Lifetime session count
- **Total Japa**: Cumulative mantra count
- **Total Time**: Hours spent in meditation
- **Current Streak**: Consecutive days of practice

### 📝 Session Details
- **Recent sessions list** (up to 10 visible)
- **Per-session info**:
  - Date & time
  - Japa count
  - Duration (minutes)
  - Rosary type used
  - Personal notes (optional)

### 💾 Data Persistence
- **90 days of history** (rolling window)
- **Max 100 sessions** stored
- **AsyncStorage** for local persistence
- **No cloud sync** (privacy-first)

## User Flow

### Recording a Session
1. Practice meditation with the counter
2. Long-press screen → "Reset Counter" modal appears
3. (Optional) Add notes in text field
4. Tap **"End Session"** button
5. Session saved to history with timestamp

### Viewing History
1. Tap **📊 icon** (top-left corner)
2. View contribution graph and stats
3. Scroll down for detailed session list
4. Tap **✕** or swipe down to close

## Data Structure

### SessionRecord
```typescript
interface SessionRecord {
  date: string;        // ISO 8601 timestamp
  count: number;       // Total japa in session
  duration: number;    // Minutes (calculated from start)
  rosaryType: RosaryType; // Bead type used
  notes?: string;      // Optional reflection
}
```

### Storage Keys
- `@japa_session_history` - Session array
- `@japa_app_state` - Current count, settings, etc.

## Design Principles

### Minimalist Philosophy
- **No pressure**: History is opt-in, not required
- **Privacy-first**: All data stays local (no cloud)
- **Non-judgmental**: Focus on personal progress, not comparison
- **Motivating**: Visual feedback encourages consistency

### Visual Design
- **Theme-aware colors**: Matches light/dark/twilight themes
- **Intensity gradients**: Uses app's primary color palette
- **Clean typography**: Readable at all sizes
- **Smooth animations**: Slide-up modal with overlay

## Implementation Notes

### Performance Optimizations
1. **useMemo** for calendar data generation
2. **Slice to 10** recent sessions (avoid long lists)
3. **Lazy rendering** (only visible sessions render)
4. **Efficient date calculations** (no moment.js needed)

### Edge Cases Handled
- Empty history state (friendly message)
- Zero-count days (gray squares)
- Long notes (truncation with line-height)
- Theme switching (dynamic colors)
- Data cleanup (90-day auto-purge)

## Future Enhancements (Optional)

### Phase 1
- [ ] Export to CSV/JSON
- [ ] Weekly/monthly view toggle
- [ ] Goal setting (e.g., "Meditate 5 days/week")
- [ ] Streak notifications

### Phase 2
- [ ] Session categories (morning/evening/specific mantras)
- [ ] Time-of-day heatmap
- [ ] Average duration per rosary type
- [ ] Milestone badges (e.g., "100 sessions")

### Phase 3
- [ ] Search/filter sessions by date range
- [ ] Edit/delete past sessions
- [ ] Backup/restore functionality
- [ ] Share anonymized stats (optional)

## Accessibility

### Current
- ✅ High contrast colors (WCAG AA)
- ✅ Large touch targets (36x36pt minimum)
- ✅ Readable font sizes (11pt+)

### Future
- [ ] VoiceOver/TalkBack descriptions
- [ ] Screen reader announcements
- [ ] Haptic feedback on graph interaction

## Privacy & Data

### What's Stored
- Session timestamps
- Japa counts
- Duration
- Rosary type
- Optional notes

### What's NOT Stored
- Location data
- Device identifiers
- User account info
- Any analytics/tracking

### Data Control
- All data stored locally in AsyncStorage
- Automatically deleted after 90 days
- No network requests
- User can reset via app data clear

## Testing Checklist

- [x] Empty state displays correctly
- [x] 30-day graph renders all squares
- [x] Intensity colors match theme
- [x] Stats calculate correctly
- [x] Session list scrolls smoothly
- [x] Notes display without overflow
- [x] Modal closes on backdrop tap
- [x] Theme switching updates colors
- [x] Data persists across app restarts
- [x] 90-day cleanup works

## Philosophy Check

**Does this feature align with japa's purpose?**

✅ **YES**:
- Encourages consistent practice
- Provides gentle accountability
- Celebrates progress without judgment
- Keeps user focused on their journey
- Respects privacy (local-only data)

**Potential concerns**:
- ⚠️ Could create attachment to streaks → Mitigated by minimalist design
- ⚠️ Might feel like "tracking" vs. meditation → Opt-in, not forced

**Verdict**: Feature enhances practice without compromising app's meditative essence.

---

**Status**: ✅ **Complete and Ready for Use**

**Location**: `src/components/History/SessionHistory.tsx`

**Access**: Tap 📊 icon in top-left corner
