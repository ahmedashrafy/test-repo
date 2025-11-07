# A/B Test: navigation-cta-visibility

## Overview

This A/B test evaluates the impact of adding a prominent "Contribute" call-to-action (CTA) button in the navigation header on GitHub engagement metrics.

## Test Details

**Test Name:** `navigation-cta-visibility`

**Branch:** `ab-test/navigation-cta-visibility`

**Hypothesis:** Making the contribution CTA more prominent in the navigation header will increase GitHub engagement (stars, forks, pull requests) compared to the existing subtle GitHub repository link.

**Rationale:** The documentation site discusses crosschain security and explicitly mentions community contribution as a goal in the introduction, but lacks a clear, prominent call-to-action for users to contribute.

## Implementation

### Changes Made

1. **Added Contribute Button** (`g0.html:737-749`)
   - Location: Header navigation, next to the GitHub source link
   - Styling: Material Design `md-button md-button--primary` classes
   - Target: Links to the GitHub repository
   - Behavior: Opens in new tab with `rel="noopener"`

2. **Feature Flag System** (`g0.html:697-719`)
   - Configuration object: `window.abTestConfig`
   - Variants: `'control'` (hide button) or `'treatment'` (show button)
   - Easy toggle for switching between variants

3. **Event Tracking** (`g0.html:719-739`)
   - Tracks button impressions
   - Tracks clicks on Contribute button
   - Tracks clicks on existing GitHub link (for comparison)
   - Events stored in browser localStorage
   - Events logged to browser console

4. **Responsive Design** (`g0.html:612-649`)
   - Button visible on desktop (screen width ≥ 60em)
   - Hidden on mobile/tablet to prevent header crowding
   - Uses existing Material Design styling for consistency

## Configuration

### Switching Between Variants

Edit the feature flag in `g0.html` (around line 704):

```javascript
window.abTestConfig = {
  'navigation-cta-visibility': {
    enabled: true,
    variant: 'treatment', // Change to 'control' to hide button
    trackingEnabled: true
  }
};
```

**Variants:**
- `'control'`: Baseline - Contribute button is hidden
- `'treatment'`: Test variant - Contribute button is visible

### Disabling the Test

Set `enabled: false` in the configuration:

```javascript
window.abTestConfig = {
  'navigation-cta-visibility': {
    enabled: false, // Disables the test
    variant: 'treatment',
    trackingEnabled: true
  }
};
```

## Tracking & Analytics

### What's Being Tracked

1. **Impressions**
   - Event fires when Contribute button is shown to user
   - Tracked on page load (DOMContentLoaded)

2. **Contribute Button Clicks**
   - Event fires when user clicks the Contribute button
   - Target: `'contribute-cta-button'`

3. **GitHub Link Clicks**
   - Event fires when user clicks existing GitHub source link
   - Target: `'github-source-link'`

### Accessing Tracking Data

**Browser Console:**
All events are logged to the console with `[A/B Test Event]` prefix.

**LocalStorage:**
Events are stored in localStorage under the key `ab_test_events_navigation-cta-visibility`.

To view in browser console:
```javascript
// Get all tracked events
const events = JSON.parse(localStorage.getItem('ab_test_events_navigation-cta-visibility') || '[]');
console.table(events);

// Clear tracking data
localStorage.removeItem('ab_test_events_navigation-cta-visibility');
```

### Event Schema

```javascript
{
  test: "navigation-cta-visibility",
  variant: "treatment",
  eventType: "impression" | "click",
  target: "contribute-cta-button" | "github-source-link",
  timestamp: "2025-11-07T12:34:56.789Z"
}
```

## Metrics to Analyze

### Primary Metrics

1. **Click-Through Rate (CTR)**
   - Calculate: (Contribute button clicks) / (Button impressions)
   - Compare treatment CTR vs control GitHub link CTR

2. **GitHub Engagement**
   - Stars: Track repository star count over test period
   - Forks: Track repository fork count
   - Pull Requests: Track number of new PRs opened
   - Compare treatment vs control periods

### Secondary Metrics

1. **User Engagement Time**
   - Time from page visit to GitHub interaction
   - Bounce rate changes

2. **Conversion Funnel**
   - Page views → Button impressions → Clicks → GitHub actions
   - Identify drop-off points

## Testing the Implementation

### Manual Testing Steps

1. **Open the page** in a desktop browser (width ≥ 960px)
2. **Check the header** - Contribute button should appear next to GitHub link
3. **Open browser console** - Should see impression event logged
4. **Click Contribute button** - Should open GitHub in new tab and log click event
5. **Click GitHub link** - Should also log click event for comparison
6. **Check localStorage** - Events should be stored
7. **Resize to mobile** - Button should disappear on small screens
8. **Toggle variant to 'control'** - Button should not appear

### Validation

```javascript
// Check if test is active
isABTestActive('navigation-cta-visibility'); // Should return true in treatment

// Verify button exists
document.getElementById('contribute-cta-button'); // Should return element

// Check tracking is working
localStorage.getItem('ab_test_events_navigation-cta-visibility'); // Should contain events
```

## Production Deployment

### Before Going Live

- [ ] Verify button styling matches design system
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive behavior on various screen sizes
- [ ] Confirm tracking events are firing correctly
- [ ] Set up production analytics integration (replace console.log)
- [ ] Document baseline metrics (current GitHub stats)

### Recommended Test Duration

- **Minimum:** 2 weeks (to account for weekly patterns)
- **Optimal:** 4-6 weeks (for statistical significance)
- **Sample size:** Ensure adequate traffic for meaningful results

### Statistical Significance

Calculate required sample size based on:
- Expected effect size (e.g., 20% increase in CTR)
- Desired confidence level (typically 95%)
- Statistical power (typically 80%)

Use an A/B test calculator to determine when to stop the test.

## Integration with Production Analytics

To integrate with production analytics services (e.g., Google Analytics, Mixpanel, Segment):

```javascript
function trackABTestEvent(testName, eventType, target) {
  if (!window.abTestConfig[testName] || !window.abTestConfig[testName].trackingEnabled) {
    return;
  }

  const event = {
    test: testName,
    variant: window.abTestConfig[testName].variant,
    eventType: eventType,
    target: target,
    timestamp: new Date().toISOString()
  };

  // Google Analytics 4 example
  if (typeof gtag !== 'undefined') {
    gtag('event', 'ab_test_event', {
      test_name: event.test,
      test_variant: event.variant,
      event_type: event.eventType,
      event_target: event.target
    });
  }

  // Mixpanel example
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track('A/B Test Event', event);
  }

  // Keep localStorage for backup
  const storageKey = 'ab_test_events_' + testName;
  const events = JSON.parse(localStorage.getItem(storageKey) || '[]');
  events.push(event);
  localStorage.setItem(storageKey, JSON.stringify(events));
}
```

## Rollback Plan

If issues are detected:

1. **Immediate:** Set `variant: 'control'` to hide button
2. **Quick:** Set `enabled: false` to disable test entirely
3. **Full:** Revert to main branch if critical issues occur

## Success Criteria

The test will be considered successful if:

1. **CTR increases by ≥20%** compared to control
2. **GitHub stars increase by ≥15%** during test period
3. **No negative impact** on other metrics (bounce rate, time on site)
4. **Statistical significance** is achieved (p-value < 0.05)

## Next Steps After Test

### If Test Succeeds
1. Merge changes to main branch
2. Make Contribute button permanent
3. Document learnings
4. Consider additional CTAs on other pages

### If Test Fails
1. Analyze why (styling, placement, messaging, etc.)
2. Iterate on design/copy
3. Consider alternative approaches
4. Document learnings

## Files Modified

- `g0.html` - Main HTML file with all changes
  - Lines 612-649: CSS styles for button
  - Lines 653-694: Test documentation
  - Lines 697-739: Feature flag and tracking configuration
  - Lines 771-803: Button HTML and variant control logic

## Questions or Issues?

For questions about this A/B test implementation, please refer to:
- The inline documentation in `g0.html`
- Browser console logs during testing
- This README file

## Version History

- **v1.0** (2025-11-07): Initial implementation on branch `ab-test/navigation-cta-visibility`
