# A/B Test: Navigation Sidebar Layout

## Overview

This A/B test evaluates whether a collapsible accordion-style navigation sidebar improves user engagement compared to the current always-expanded navigation.

**Test Name:** `navigation-sidebar-layout`
**File Modified:** `g0.html`
**Implementation Date:** 2025-11-07

## Hypothesis

The current fixed navigation may overwhelm users with information. We hypothesize that a collapsible accordion-style navigation will:
- Reduce cognitive load
- Improve content discoverability
- Increase engagement with deeper content sections
- Increase time-on-page

## Variants

### Variant A: Control (50% of users)
- **Description:** Always-expanded navigation (current behavior)
- **User Experience:** All navigation items remain visible at all times
- **Visual Indicators:** No toggle icons shown

### Variant B: Treatment (50% of users)
- **Description:** Collapsible accordion-style navigation
- **User Experience:** Navigation items can be expanded/collapsed by clicking
- **Visual Indicators:** Toggle icons (▼) shown next to each nav item
- **Behavior:**
  - Items start in expanded state by default
  - Click to toggle expansion
  - Smooth animations for state changes
  - Visual feedback on hover

## Metrics Tracked

The implementation automatically tracks the following metrics:

### Primary Metrics
1. **Time on Page:** Total duration users spend on the page (in seconds)
2. **Scroll Depth:** Maximum scroll depth reached (as percentage)
3. **Section Clicks:** Number of clicks on each navigation section

### Secondary Metrics
1. **Toggle Interactions:** Number of times users expand/collapse navigation items (treatment only)
2. **Page Visibility:** Tracks when users switch tabs or minimize window
3. **Interaction Timeline:** Timestamps of all user interactions

## Implementation Details

### Technical Changes

1. **HTML Modifications:**
   - Added `data-ab-test="navigation-sidebar-layout"` to sidebar container
   - Added `data-ab-variant=""` attribute (populated by JavaScript)
   - Added `data-nav-section` attributes to each navigation item
   - Added `data-nav-expanded` attributes (default: "true")
   - Added toggle icons (`<span class="md-nav__toggle-icon">▼</span>`)

2. **CSS Additions:**
   - Variant-specific styles using attribute selectors
   - Smooth transitions for toggle animations
   - Visual feedback for hover states
   - Collapsible item opacity changes

3. **JavaScript Implementation:**
   - Automatic variant assignment (50/50 split)
   - Persistent variant storage (localStorage)
   - Click handlers for collapsible navigation
   - Comprehensive metrics tracking
   - Console logging for debugging
   - Public API for testing (`window.ABTest`)

### Data Storage

- **Variant Assignment:** Stored in `localStorage` as `ab_test_navigation-sidebar-layout_variant`
- **Metrics Data:** Stored in `localStorage` as `ab_test_navigation-sidebar-layout_metrics`
- **Persistence:** Variant remains consistent across sessions for each user
- **History:** Last 10 sessions retained in localStorage

## Testing & Debugging

### View Current Variant
Open browser console and run:
```javascript
ABTest.getVariant()
```

### View Metrics
```javascript
ABTest.getMetrics()
```

### Reset Variant (Force Re-assignment)
```javascript
ABTest.resetVariant()
```

### Manual Variant Assignment
To test a specific variant, set localStorage before page load:
```javascript
localStorage.setItem('ab_test_navigation-sidebar-layout_variant', 'collapsible');
// or
localStorage.setItem('ab_test_navigation-sidebar-layout_variant', 'control');
```
Then refresh the page.

### View Stored Metrics
```javascript
JSON.parse(localStorage.getItem('ab_test_navigation-sidebar-layout_metrics'))
```

## Expected Results

### Success Criteria

The treatment (collapsible) variant will be considered successful if it shows:

1. **Higher engagement:**
   - ≥10% increase in average time-on-page
   - ≥15% increase in scroll depth
   - ≥20% increase in section clicks

2. **Positive user behavior:**
   - Users actively engage with the collapse/expand functionality
   - No significant increase in bounce rate
   - Increased interaction with deeper navigation sections

### Analysis Period

- **Minimum Sample Size:** 1,000 users per variant
- **Recommended Duration:** 14-21 days
- **Statistical Significance:** p-value < 0.05

## Production Considerations

### Before Production Deployment

1. **Analytics Integration:**
   - Replace console logging with actual analytics service
   - Uncomment and configure the `fetch()` call in `sendMetrics()`
   - Set up analytics dashboard for real-time monitoring

2. **Performance:**
   - Metrics are collected in-memory and sent only on page unload
   - LocalStorage usage is minimal (~5KB per user)
   - No external API calls during browsing

3. **Privacy:**
   - No personally identifiable information (PII) is collected
   - All data stored locally in user's browser
   - Consider adding privacy policy update if sending to analytics service

4. **Accessibility:**
   - Collapsible navigation maintains keyboard navigation
   - ARIA attributes could be enhanced for screen readers
   - Consider adding `aria-expanded` attributes

### Monitoring

Monitor these potential issues:

1. **JavaScript Errors:** Check console for any runtime errors
2. **Performance Impact:** Monitor page load times
3. **Browser Compatibility:** Test on major browsers (Chrome, Firefox, Safari, Edge)
4. **Mobile Experience:** Test on mobile devices (responsive behavior)

## Rollback Plan

If issues are detected:

1. **Quick Rollback:** Set all users to control variant:
   ```javascript
   // Add this script temporarily to force control variant
   localStorage.setItem('ab_test_navigation-sidebar-layout_variant', 'control');
   ```

2. **Full Rollback:** Remove the A/B test code:
   - Remove `data-ab-*` attributes from HTML
   - Remove the `<style>` block with A/B test styles
   - Remove the `<script>` block with A/B test JavaScript
   - Remove toggle icons from navigation items

## Next Steps

1. **Deploy to production** environment
2. **Monitor** metrics daily for the first week
3. **Analyze** results after sufficient sample size
4. **Decide** whether to:
   - Make collapsible navigation the default (if successful)
   - Keep current navigation (if control performs better)
   - Iterate on the design based on findings

## Contact & Support

For questions about this A/B test implementation:
- Review the inline code comments in `g0.html`
- Check browser console for debug logs
- Examine localStorage data for metrics

---

**Note:** This is a client-side A/B test implementation. For production use, consider using a dedicated A/B testing platform (Optimizely, VWO, Google Optimize, etc.) for more robust features like:
- Server-side variant assignment
- Advanced statistical analysis
- Multi-variate testing
- Better analytics integration
- Audience segmentation
