# A/B Test: Call-to-Action Button

## Overview

This A/B test evaluates the impact of adding a prominent "Contribute to Framework" call-to-action (CTA) button in the header on community engagement and contributions to the risk framework documentation.

**Test Name:** `call-to-action-button-test`

**Hypothesis:** Adding a visible CTA button in the header will increase community engagement and contributions by making the contribution path more discoverable.

## Test Variants

### Variant A (Control)
- **Description:** Existing header without the CTA button
- **User Experience:** Standard header with GitHub source link

### Variant B (Treatment)
- **Description:** Header with a prominent "Contribute to Framework" CTA button
- **User Experience:** Standard header plus a styled CTA button that links to the GitHub issues page
- **Button Location:** After the GitHub source section in the header (line 690-699)
- **Button Style:** Primary accent color, prominent but not intrusive

## Implementation Details

### File Modified
- `g0.html` - Main HTML file for the Crosschain Risk Framework documentation

### Changes Made

#### 1. HTML Structure (Lines 690-699)
Added a CTA button container with:
- Hidden by default (`display: none`)
- Shown only for Variant B users
- Links to: `https://github.com/crosschain-risk-framework/crosschain-risk-framework/issues`
- Opens in new tab with security attributes

```html
<div id="cta-button-container" class="md-header__cta" style="display: none;">
  <a href="https://github.com/crosschain-risk-framework/crosschain-risk-framework/issues"
     id="contribute-cta-button"
     class="md-button md-button--primary"
     target="_blank"
     rel="noopener">
    Contribute to Framework
  </a>
</div>
```

#### 2. CSS Styling (Lines 612-648)
Added responsive styling for the CTA button:
- Flexbox layout for proper alignment
- Uppercase text with letter spacing
- Smooth transitions for hover effects
- Elevated appearance with box shadows
- Hidden on mobile devices (< 76.234375em)

#### 3. JavaScript A/B Test Logic (Lines 1040-1193)
Implemented comprehensive A/B test functionality:

**Key Features:**
- **Variant Assignment:** 50/50 random split using `Math.random()`
- **Persistence:** Uses `localStorage` to maintain consistent experience
- **Event Tracking:** Logs all interactions and impressions
- **Debugging Tools:** Console utilities for testing and analysis

**Tracked Events:**
1. `variant_assigned` - When user is assigned to a variant
2. `button_impression` - When CTA button is shown (Variant B)
3. `control_impression` - When control version is shown (Variant A)
4. `button_click` - When CTA button is clicked (SUCCESS METRIC)
5. `page_view` - Every page view with variant info

## Success Metrics

### Primary Metric
- **Button Click-Through Rate (CTR):** Number of button clicks / Number of button impressions
- This measures direct engagement with the CTA

### Secondary Metrics (for future implementation)
- Actual contributions to GitHub (issues created, PRs submitted)
- Time spent on GitHub issues page
- Bounce rate from the site

## Usage & Testing

### For Developers

#### View Current Variant
Open browser console and run:
```javascript
localStorage.getItem('cta_button_ab_test_variant')
// Returns: 'A' or 'B'
```

#### View Test Results
```javascript
getABTestResults()
// Displays formatted table of all tracked events
```

#### Reset Test (Get New Variant)
```javascript
resetABTest()
// Then reload the page
```

#### Force Specific Variant (for testing)
```javascript
// Force Variant A (Control)
localStorage.setItem('cta_button_ab_test_variant', 'A');
location.reload();

// Force Variant B (Treatment)
localStorage.setItem('cta_button_ab_test_variant', 'B');
location.reload();
```

### For Data Analysis

All events are stored in `localStorage` under the key `ab_test_events`. Each event contains:
- `testName`: The name of the test
- `eventType`: Type of event (variant_assigned, button_click, etc.)
- `timestamp`: ISO 8601 timestamp
- `data`: Event-specific data (variant, URL, etc.)

Example event structure:
```json
{
  "testName": "call-to-action-button-test",
  "eventType": "button_click",
  "timestamp": "2025-10-24T10:30:45.123Z",
  "data": {
    "variant": "B",
    "targetUrl": "https://github.com/crosschain-risk-framework/crosschain-risk-framework/issues"
  }
}
```

## Design Considerations

### Why This Approach?

1. **Non-Invasive:** The button is placed logically in the header without disrupting existing layout
2. **Persistent Assignment:** Users see the same variant across sessions for consistent UX
3. **Privacy-Friendly:** All tracking happens in localStorage, no external analytics required
4. **Easy to Extend:** Event tracking system can easily integrate with analytics platforms
5. **Mobile-Friendly:** Button hidden on smaller screens to avoid clutter

### Code Style
- Uses ES5 JavaScript for maximum browser compatibility
- IIFE pattern to avoid global scope pollution
- Comprehensive inline documentation
- Defensive coding (checks for element existence)
- Clean, readable structure following existing codebase patterns

## Analytics Integration

The current implementation stores events in `localStorage`. For production, you can easily integrate with analytics services:

```javascript
// Example: Send to Google Analytics
function trackEvent(eventType, eventData) {
  // ... existing code ...

  // Add analytics integration
  if (typeof gtag !== 'undefined') {
    gtag('event', eventType, {
      'test_name': AB_TEST_CONFIG.testName,
      'variant': eventData.variant,
      'event_category': 'ab_test'
    });
  }

  // Or use any other analytics service
}
```

## Rollout Plan

### Phase 1: Monitoring (Week 1-2)
- Deploy to production
- Monitor for JavaScript errors
- Verify tracking is working correctly
- Check both variants render properly

### Phase 2: Data Collection (Week 3-6)
- Collect sufficient data (aim for statistical significance)
- Minimum sample size: ~1000 users per variant
- Monitor CTR and other metrics

### Phase 3: Analysis (Week 7)
- Calculate statistical significance
- Analyze user behavior patterns
- Make decision: keep, remove, or iterate

### Phase 4: Implementation (Week 8)
- If successful: Make Variant B permanent and remove A/B test code
- If unsuccessful: Remove feature
- If inconclusive: Run extended test or iterate on design

## Expected Outcomes

### Success Scenario
- CTR > 2% on the CTA button
- Measurable increase in GitHub issues/contributions
- Positive or neutral impact on other site metrics

### Learning Opportunity
Even if the test doesn't show significant improvement, we'll learn:
- User behavior patterns regarding contribution
- Whether visibility is the issue or something else
- How to better design future engagement features

## Maintenance

### Code Location
- HTML: Lines 690-699 in `g0.html`
- CSS: Lines 612-648 in `g0.html`
- JavaScript: Lines 1040-1193 in `g0.html`

### Future Improvements
1. Integrate with backend analytics system
2. Add A/A test capability for calibration
3. Implement multi-variant testing (A/B/C)
4. Add time-based analysis (e.g., engagement by day of week)
5. Test different button copy and designs

## Questions & Support

For questions about this A/B test implementation, please contact the development team or review the inline code comments in `g0.html`.

---

**Last Updated:** 2025-10-24
**Implemented By:** Claude Code
**Status:** Ready for Deployment
