# A/B Test: CTA Button Navigation

## Overview

This A/B test evaluates the impact of adding a prominent "Contribute to Framework" call-to-action (CTA) button in the header on community engagement and contributions to the Crosschain Risk Framework.

## Test Details

- **Test Name:** `cta-button-navigation`
- **Location:** Header navigation (lines 690-698 in g0.html)
- **Implementation Date:** 2025-11-07
- **Status:** Active

## Hypothesis

Adding a prominent CTA button in the header will increase community engagement and contributions by:
1. Making it easier for users to find the contribution pathway
2. Increasing visibility of the call-to-action
3. Reducing friction in the contribution journey

Since the document is marked as work-in-progress and explicitly encourages community feedback, we hypothesize that making contribution more discoverable will lead to measurable increases in:
- Click-through rates to the GitHub issues page
- Number of GitHub contributions (issues, PRs, comments)
- Overall community engagement metrics

## Variants

### Variant A (Treatment)
- Shows a prominent "Contribute to Framework" button in the header
- Button styled with accent colors to stand out
- Links directly to GitHub issues page
- Includes hover effects and responsive design
- Hidden on screens smaller than 76.234375em (tablet/mobile) to avoid header crowding

### Control (Baseline)
- No CTA button in header
- Users must find contribution pathways through normal navigation
- Maintains current header layout unchanged

## Traffic Allocation

- **Control:** 50% of users
- **Variant A:** 50% of users

Users are randomly assigned to a variant on first visit and remain in that variant for consistency.

## Implementation Details

### 1. HTML Structure (Lines 690-698)

```html
<!-- A/B Test: CTA Button Navigation (Variant A) -->
<div id="ab-test-cta-button" class="md-header__cta" style="display: none;">
 <a href="https://github.com/crosschainriskframework/crosschainriskframework.github.io/issues"
    class="md-button md-button--primary"
    id="contribute-cta-button"
    title="Help improve the Crosschain Risk Framework">
  Contribute to Framework
 </a>
</div>
```

### 2. CSS Styling (Lines 612-647)

Custom styles added to match the Material for MkDocs theme:
- Uses CSS variables for consistent theming
- Responsive design that hides button on smaller screens
- Smooth transitions and hover effects
- Proper alignment with existing header elements

### 3. JavaScript Logic (Lines 1037-1160)

**Key Features:**
- Random variant assignment (50/50 split)
- Persistent variant storage using localStorage
- Comprehensive event tracking
- No external dependencies

**Tracked Events:**
1. `ab_test_assigned` - When a user is first assigned a variant
2. `page_view` - Every page view with variant information
3. `cta_button_click` - When the CTA button is clicked (Variant A only)

## Analytics & Tracking

### Metrics to Monitor

**Primary Metrics:**
- CTA button click-through rate (Variant A)
- GitHub contributions from referred traffic
- Time to first contribution after CTA click

**Secondary Metrics:**
- Page engagement time
- Bounce rate
- Return visitor rate
- Overall GitHub repository activity

### Accessing Analytics Data

During development/testing, events are logged to:
1. **Browser Console:** All events logged with `[A/B Test Analytics]` prefix
2. **localStorage:** Events stored in `ab_test_events` key

For production, integrate with your analytics platform by modifying the `trackEvent()` function (line 1084):

```javascript
// Google Analytics example
gtag('event', eventName, eventData);

// Mixpanel example
mixpanel.track(eventName, eventData);

// Segment example
analytics.track(eventName, eventData);
```

## Developer Tools

Two utility functions are exposed on the `window` object for debugging:

### Check Current Variant
```javascript
console.log(window.getABTestVariant());
// Output: "control" or "variant_a"
```

### Reset A/B Test
```javascript
window.resetABTest();
// Clears variant assignment and events, reload page for new assignment
```

## Testing the Implementation

### Manual Testing

1. **Test Control Variant:**
   ```javascript
   window.resetABTest();
   localStorage.setItem('ab_test_cta-button-navigation', 'control');
   location.reload();
   ```
   Expected: No CTA button visible in header

2. **Test Variant A:**
   ```javascript
   window.resetABTest();
   localStorage.setItem('ab_test_cta-button-navigation', 'variant_a');
   location.reload();
   ```
   Expected: CTA button visible in header

3. **Test Button Click Tracking:**
   - Open browser console
   - Click the CTA button (in Variant A)
   - Verify `cta_button_click` event logged to console

4. **Test Responsive Design:**
   - Resize browser window to tablet/mobile size
   - CTA button should hide on screens < 76.234375em

### Automated Testing

Open the HTML file in a browser and check:
```javascript
// Verify variant assignment
console.assert(['control', 'variant_a'].includes(window.getABTestVariant()), 'Invalid variant');

// Check localStorage
console.log(localStorage.getItem('ab_test_cta-button-navigation'));
console.log(JSON.parse(localStorage.getItem('ab_test_events')));
```

## Success Criteria

The test should run for a minimum of 2-4 weeks or until statistical significance is reached. Consider the test successful if:

1. **Statistical Significance:** p-value < 0.05 with minimum sample size of 1,000 users per variant
2. **Positive Metrics:** Variant A shows:
   - At least 2% CTR on the CTA button
   - 15-25% increase in GitHub contribution rate
   - No negative impact on bounce rate or engagement time

## Rollout Plan

### Phase 1: Testing (Current)
- Implement A/B test with 50/50 split
- Monitor for technical issues
- Collect baseline data

### Phase 2: Analysis (After 2-4 weeks)
- Analyze metrics for statistical significance
- Review qualitative feedback
- Make decision to adopt, iterate, or abandon

### Phase 3: Rollout (If successful)
- Gradually increase traffic to Variant A (70%, 90%, 100%)
- Monitor for any unexpected issues
- Make permanent if successful

### Phase 4: Optimization (Ongoing)
- Test different button text variations
- Test different button placements
- Test different color schemes

## Maintenance Notes

### Updating the Test

To modify the test configuration, edit the `AB_TEST_CONFIG` object (line 1043):

```javascript
const AB_TEST_CONFIG = {
  name: 'cta-button-navigation',
  variants: {
    CONTROL: 'control',
    VARIANT_A: 'variant_a'
  },
  variantWeights: {
    control: 0.5,    // Adjust split as needed
    variant_a: 0.5
  }
};
```

### Removing the Test

When the test concludes:

1. If adopting Variant A:
   - Remove the A/B test JavaScript
   - Remove `style="display: none;"` from the CTA button div
   - Keep the button visible permanently

2. If keeping Control:
   - Remove all A/B test code (HTML, CSS, JavaScript)
   - Clean up any test-related comments

## Browser Compatibility

- Modern browsers with localStorage support
- ES6 JavaScript features (arrow functions, const/let, template literals)
- Tested on: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Code Style Notes

- Follows existing Material for MkDocs theme patterns
- Uses CSS variables for consistent theming
- Implements IIFE pattern for JavaScript encapsulation
- Comprehensive inline documentation
- No external dependencies

## Questions or Issues?

For questions about this A/B test implementation, please contact the development team or create an issue in the repository.
