# Navigation Structure A/B Test Documentation

## Overview

This A/B test compares two different navigation structures to determine which design improves user engagement and time-on-page metrics:

- **Variant A (Control)**: Flat navigation list - all items visible at once
- **Variant B (Treatment)**: Nested expandable navigation with collapsible sections - organized hierarchy with expandable/collapsible sections

## Implementation Details

### Test Name
`navigation-structure-test`

### Test ID
`nav-structure-v1`

### Modified Files
- `g0.html` (lines 721-810 for navigation structure, lines 612-654 for CSS, lines 1095-1372 for JavaScript)

## Features

### 1. Automatic Variant Assignment
- Users are automatically assigned to either the control or treatment variant with a 50/50 split
- Assignment is stored in `localStorage` to ensure consistent experience across sessions
- Assignment persists until the user clears their browser storage

### 2. Feature Flags & Testing

#### URL Parameter Override
Force a specific variant by adding a URL parameter:
- Flat navigation: `?nav_variant=flat`
- Nested navigation: `?nav_variant=nested`

Example: `https://yoursite.com/g0.html?nav_variant=nested`

#### Configuration Override
Edit the `AB_TEST_CONFIG.forceVariant` value in the JavaScript (line 1111):
```javascript
forceVariant: 'flat'   // Force flat navigation
forceVariant: 'nested' // Force nested navigation
forceVariant: null     // Automatic assignment (default)
```

### 3. Comprehensive Metrics Tracking

The test automatically tracks the following metrics:

#### Primary Metrics
- **Average Time on Page**: Measured in milliseconds and seconds
- **Number of Sections Explored**: Count of unique sections users interact with (nested variant only)
- **Scroll Depth**: Maximum scroll depth as percentage (0-100%)
- **Navigation Clicks**: Total number of navigation item clicks

#### Secondary Metrics
- Page view events
- Section toggle events (nested variant)
- Scroll depth milestones (25%, 50%, 75%, 90%, 100%)
- Time to reach scroll milestones

#### Tracked Events
1. **ab_test_assigned**: When a user is first assigned to a variant
2. **page_view**: When the page loads
3. **navigation_click**: When any navigation link is clicked
4. **section_toggle**: When a collapsible section is expanded/collapsed (nested variant only)
5. **scroll_depth**: When scroll depth milestones are reached
6. **time_on_page**: Periodic tracking of time spent on page (10s, 30s, 1m, 2m)

### 4. Data Collection

Metrics are collected and can be sent to your analytics provider:

#### Google Analytics Integration
If Google Analytics (gtag.js) is present, events are automatically sent with:
- Event category: `ab_test_navigation-structure-test`
- Event label: variant name (`flat` or `nested`)
- Event metadata: all tracked metrics

#### Custom Analytics Endpoint
Uncomment and configure the fetch call in `sendToAnalytics()` function (line 1193-1197):
```javascript
fetch('/api/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(event)
});
```

#### Beacon API (Page Unload)
Final metrics are sent via `navigator.sendBeacon` to `/api/ab-test-metrics` when the user leaves the page (line 1320-1323).

### 5. Browser Console Debugging

For development and debugging, access metrics in the browser console:

```javascript
// View current metrics
console.log(window.abTestMetrics);

// View test configuration
console.log(window.abTestConfig);

// View all tracked events
console.log(window.abTestMetrics.events);
```

## Navigation Structure Details

### Variant A (Control): Flat Navigation
```html
- Introduction
- Categories of Risk
- Network Consensus Risk
- Protocol Architecture Risk
```

All items are visible and clickable immediately. Simple, traditional structure.

### Variant B (Treatment): Nested Navigation
```html
▸ Getting Started
  - Introduction
▸ Risk Framework
  - Categories of Risk
  - Network Consensus Risk
  - Protocol Architecture Risk
```

Items are organized into expandable sections. Users click section headers to reveal/hide nested items.

## CSS Implementation

### Key CSS Classes
- `.md-nav__item--nested`: Marks nested navigation sections
- `.nav-control-item`: Items shown in flat (control) variant
- `.nav-variant-item`: Items shown in nested (treatment) variant
- `[data-nav-variant="flat"]`: Applied when flat variant is active
- `[data-nav-variant="nested"]`: Applied when nested variant is active

### Animation & Transitions
- Section expand/collapse: 0.3s ease-out / 0.5s ease-in
- Icon rotation: 0.25s (90° rotation when expanded)
- Smooth max-height transitions for collapsible content

## JavaScript Implementation

### Architecture
- Self-contained IIFE (Immediately Invoked Function Expression)
- No external dependencies
- Event-driven metric collection
- Debounced scroll tracking for performance

### Key Functions
- `assignVariant()`: Determines which variant to show
- `trackEvent()`: Records events with timestamp and metadata
- `sendToAnalytics()`: Sends data to analytics providers
- `calculateScrollDepth()`: Computes scroll depth percentage
- `trackNavigationClicks()`: Monitors all navigation interactions
- `trackTimeOnPage()`: Records session duration

## Analytics Integration

### Required Backend Endpoints

#### 1. Analytics Event Endpoint (Optional)
**Endpoint**: `/api/analytics`
**Method**: POST
**Content-Type**: application/json

**Payload Example**:
```json
{
  "timestamp": 1699999999999,
  "event": "navigation_click",
  "variant": "nested",
  "link_text": "Introduction",
  "total_clicks": 3,
  "time_on_page": 15432
}
```

#### 2. Final Metrics Endpoint
**Endpoint**: `/api/ab-test-metrics`
**Method**: POST (via Beacon API)
**Content-Type**: application/json

**Payload Example**:
```json
{
  "test_name": "navigation-structure-test",
  "variant": "nested",
  "time_on_page_ms": 45678,
  "max_scroll_depth": 85,
  "navigation_clicks": 5,
  "section_toggles": 3,
  "sections_explored": 2
}
```

## Testing Guide

### Manual Testing

1. **Test Variant A (Flat Navigation)**:
   - Open: `g0.html?nav_variant=flat`
   - Verify all navigation items are visible
   - Click navigation items and check console for events

2. **Test Variant B (Nested Navigation)**:
   - Open: `g0.html?nav_variant=nested`
   - Verify sections are collapsible
   - Click section headers to expand/collapse
   - Verify nested items appear/hide with animation

3. **Test Random Assignment**:
   - Clear localStorage: `localStorage.clear()`
   - Open page without URL parameters
   - Check console for assigned variant
   - Reload page and verify same variant persists

4. **Test Metrics Tracking**:
   - Open console: `F12` or `Cmd+Option+I`
   - Monitor `[A/B Test]` logs
   - Scroll the page to trigger scroll depth events
   - Click navigation items to trigger click events
   - Check: `window.abTestMetrics`

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires: localStorage, ES6 features, Beacon API (gracefully degrades)

## Key Metrics to Analyze

### Primary Success Metrics
1. **Average Time on Page**: Higher = better engagement
2. **Sections Explored**: More exploration = clearer hierarchy
3. **Scroll Depth**: Deeper scrolling = more content consumption
4. **Navigation Clicks**: More clicks may indicate discovery or confusion

### Analysis Recommendations

Compare metrics between variants:
- Is average time on page significantly higher in one variant?
- Do users explore more sections with nested navigation?
- Is scroll depth greater with one variant?
- Are navigation patterns more efficient in one variant?

### Sample Size Recommendations
- Minimum: 100 users per variant
- Recommended: 500+ users per variant for statistical significance
- Run test for at least 1-2 weeks to account for weekly patterns

## Troubleshooting

### Issue: Variant not changing
- Check localStorage: `localStorage.getItem('ab_test_nav-structure-v1')`
- Clear localStorage: `localStorage.clear()`
- Try URL parameter: `?nav_variant=nested`

### Issue: Metrics not tracking
- Check console for errors
- Verify navigation element has `id="primary-navigation"`
- Check that JavaScript loaded properly (view source)

### Issue: Both variants visible
- Check CSS is loaded properly
- Verify `data-nav-variant` attribute is set
- Check browser console for CSS conflicts

### Issue: Analytics not receiving data
- Verify analytics provider is loaded (`typeof gtag`)
- Check network tab for API calls
- Verify endpoint URLs are correct
- Check CORS headers for custom endpoints

## Best Practices

1. **Don't modify test during run**: Changes invalidate results
2. **Monitor both variants**: Check for technical issues in both
3. **Set clear success criteria**: Define what "better" means before starting
4. **Run to completion**: Don't stop early due to preliminary results
5. **Document learnings**: Record insights for future tests

## Production Checklist

Before deploying to production:

- [ ] Remove or comment out console.log statements (lines 1175, 1354-1356)
- [ ] Configure analytics endpoints (lines 1193-1197, 1321)
- [ ] Set appropriate backend endpoints
- [ ] Test on staging environment
- [ ] Verify localStorage cleanup policy
- [ ] Set up analytics dashboard for metric visualization
- [ ] Document rollout plan (50/50 split or gradual rollout)
- [ ] Remove debug exposure if desired (lines 1369-1370)

## Next Steps

After collecting sufficient data:

1. Analyze results in your analytics platform
2. Determine winning variant based on key metrics
3. If nested navigation wins: Deploy to 100% of users
4. If flat navigation wins: Keep current implementation
5. Document findings and share with team
6. Plan follow-up tests based on learnings

## Support

For questions or issues:
- Check browser console for errors and debug information
- Review this documentation
- Test with URL parameters to verify both variants work
- Check metrics collection in browser console

---

**Test Created**: 2025-11-07
**Test Version**: 1.0
**Framework**: Custom JavaScript A/B Test Implementation
