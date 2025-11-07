# A/B Test: CTA Contribution Button

## Overview

This A/B test evaluates the impact of adding a prominent "Contribute to Framework" call-to-action (CTA) button in the header navigation on community engagement and contributions.

**Test Name:** `cta-contribution-button`

**Hypothesis:** Adding a visible CTA button in the header will increase community contributions by providing a clear, accessible action path for users who want to help improve the framework.

## Test Variants

### Control Group (50% of users)
- **Variant:** `control`
- **Experience:** No CTA button displayed
- **Description:** Users see the standard header with only the GitHub source link

### Treatment Group (50% of users)
- **Variant:** `treatment`
- **Experience:** CTA button displayed in header
- **Description:** Users see a prominent "Contribute to Framework" button positioned before the GitHub source link in the header navigation

## Implementation Details

### Location
- **File:** `g0.html`
- **Section:** Header navigation (lines 673-683)
- **Button Link:** Points to GitHub Issues page for the framework

### Technical Approach

#### 1. Random Assignment
- Users are randomly assigned to either control or treatment group (50/50 split)
- Assignment is stored in a cookie (`ab_test_cta_contribution`) for 30 days
- Ensures consistent experience across multiple visits

#### 2. Button Placement
- Located in header navigation, between search and GitHub source
- Uses Material Design button styling (`md-button md-button--primary`)
- Responsive design: Hidden on mobile devices (< 76.25em width)

#### 3. Tracking Events

The A/B test tracks the following events:

| Event | Description | When Triggered |
|-------|-------------|----------------|
| `variant_assigned` | User assigned to variant | First visit (no existing cookie) |
| `page_view` | Page viewed with variant | Every page load |
| `button_shown` | Button displayed (treatment only) | Page load for treatment group |
| `button_hovered` | User hovered over button | First hover on button |
| `button_clicked` | Button clicked | User clicks CTA button |

#### 4. Data Storage
- Events logged to browser console for debugging
- Events stored in localStorage (`ab_test_events`, max 100 events)
- Ready for integration with analytics services (Google Analytics, Mixpanel, etc.)

## Success Metrics

### Primary Metrics
1. **Click-Through Rate (CTR)**
   - Formula: `(Button Clicks / Button Impressions) × 100`
   - Target: Establish baseline and measure engagement

2. **GitHub Contribution Rate**
   - Track subsequent GitHub contributions (issues, PRs, comments)
   - Measure within 7 days of button click
   - Compare treatment vs control group

### Secondary Metrics
1. **Button Hover Rate:** Indicates user interest
2. **Time to First Contribution:** Measure efficiency of CTA path
3. **Repeat Contributions:** Long-term engagement impact

## Testing & Debugging

### Manual Testing Commands

Open browser console and use these commands:

```javascript
// Check current variant
ABTest.getVariant()
// Returns: "control" or "treatment"

// View all tracked events
ABTest.getEvents()
// Returns: Array of event objects

// Clear stored events
ABTest.clearEvents()

// Force specific variant (requires page reload)
ABTest.forceVariant('treatment')  // Show button
ABTest.forceVariant('control')    // Hide button

// Check variant in HTML
document.documentElement.getAttribute('data-ab-test-variant')
```

### Testing Checklist

- [ ] Control group: Button is hidden
- [ ] Treatment group: Button is visible and properly styled
- [ ] Button links to correct GitHub Issues page
- [ ] Button opens in new tab (`target="_blank"`)
- [ ] Click event is tracked
- [ ] Hover event is tracked
- [ ] Events stored in localStorage
- [ ] Variant persists across page reloads
- [ ] Responsive: Button hidden on mobile devices
- [ ] No JavaScript errors in console

## Integration with Analytics

To integrate with your analytics platform, update line 1067 in `g0.html`:

### Google Analytics (GA4)
```javascript
// Replace TODO comment with:
if (window.gtag) {
  window.gtag('event', eventName, {
    'event_category': 'ab_test',
    'event_label': AB_TEST_CONFIG.name,
    'variant': eventData.variant,
    'value': eventData
  });
}
```

### Mixpanel
```javascript
// Replace TODO comment with:
if (window.mixpanel) {
  window.mixpanel.track(eventName, {
    test_name: AB_TEST_CONFIG.name,
    variant: eventData.variant,
    ...eventData
  });
}
```

### Custom Analytics Endpoint
```javascript
// Replace TODO comment with:
fetch('/api/analytics/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(event)
});
```

## Analysis Guide

### Data Collection Period
- **Minimum:** 2 weeks (recommended)
- **Target:** 4-6 weeks for statistical significance
- **Sample Size:** Aim for at least 100 conversions per variant

### Statistical Significance
Use a statistical significance calculator with:
- Confidence Level: 95%
- Statistical Power: 80%
- Minimum Detectable Effect: 10-20%

### Key Questions to Answer
1. Did the button increase CTR significantly?
2. Did treatment group have higher GitHub contribution rate?
3. What was the conversion rate from click to contribution?
4. Did the button affect page engagement metrics?
5. Any difference in contribution quality between groups?

## Code Style & Standards

### Follows Best Practices
- ✅ Clean, well-commented code
- ✅ Consistent with existing Material Design theme
- ✅ No external dependencies required
- ✅ Vanilla JavaScript (ES6+)
- ✅ Responsive design principles
- ✅ Privacy-friendly (uses first-party cookies)
- ✅ IIFE pattern to avoid global namespace pollution
- ✅ Graceful degradation if JavaScript disabled

### Accessibility
- Button has descriptive text ("Contribute to Framework")
- Includes `title` attribute for tooltip
- Proper ARIA semantics via Material Design classes
- Keyboard navigable (standard link behavior)

## Rollout Plan

### Phase 1: Testing (Week 1)
- Deploy to staging environment
- Manual QA testing
- Verify tracking functionality

### Phase 2: Soft Launch (Week 2)
- Deploy to production
- Monitor for errors
- Verify data collection

### Phase 3: Data Collection (Weeks 3-8)
- Let test run for 4-6 weeks
- Monitor metrics weekly
- Check for any anomalies

### Phase 4: Analysis (Week 9)
- Analyze results
- Determine statistical significance
- Make decision: keep, modify, or remove

### Phase 5: Implementation (Week 10+)
- If successful: Remove A/B test code, keep button for all users
- If unsuccessful: Remove button and test code
- Document learnings for future tests

## Rollback Plan

If issues arise, rollback is simple:

1. **Remove button HTML** (lines 673-683 in g0.html)
2. **Remove CSS styles** (lines 612-636 in g0.html)
3. **Remove JavaScript** (lines 1002-1180 in g0.html)

Or simply comment out the entire button section:
```html
<!-- DISABLED: A/B Test
<div id="cta-contribution-button" ...>
...
</div>
-->
```

## Future Enhancements

Potential improvements for future iterations:

1. **A/B/C Testing:** Test multiple button variations (text, color, placement)
2. **Personalization:** Show different CTAs based on user behavior
3. **Smart Timing:** Display button after user scrolls or spends time on page
4. **Context-Aware:** Show different CTAs based on page content
5. **Animation:** Add subtle animation to draw attention
6. **Server-Side Analytics:** Send events to backend for better tracking

## Contact & Support

For questions or issues with this A/B test:
- Review implementation in `g0.html` (lines 612-636, 673-683, 1002-1180)
- Check browser console for `[A/B Test]` logs
- Use debugging utilities via `window.ABTest` object

---

**Last Updated:** 2025-11-07
**Test Status:** Active
**Version:** 1.0
