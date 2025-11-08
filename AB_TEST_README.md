# A/B Test: Hero CTA Variation

## Overview

This A/B test evaluates different call-to-action (CTA) button variations in the documentation header to optimize user engagement and click-through rates.

## Test Details

- **Test Name:** hero-cta-variation
- **Status:** Active
- **Implementation Date:** 2025-11-08
- **File Modified:** g0.html

## Hypothesis

Changing the button text from "View on GitHub" to "Explore Framework" with a more prominent primary blue color scheme will increase user engagement and click-through rates by:
1. Making the CTA more action-oriented
2. Creating better visual distinction from surrounding elements
3. Better communicating the value proposition to users

## Variants

### Variant A (Control)
- **Button Text:** "GitHub" (with repository stats)
- **Styling:** Default styling with transparent background
- **Traffic Allocation:** 50%

### Variant B (Treatment)
- **Button Text:** "Explore Framework"
- **Styling:** Primary blue background color with enhanced hover effects
- **Visual Changes:**
  - Solid background color using `--md-primary-fg-color`
  - White text color for contrast
  - Hover effect with accent color and slight lift animation
  - Repository stats hidden for cleaner appearance
- **Traffic Allocation:** 50%

## Implementation Details

### Technical Approach

1. **Random Assignment:** Users are randomly assigned to variant A or B on first visit (50/50 split)
2. **Persistence:** Variant assignment is stored in localStorage to ensure consistent experience across sessions
3. **DOM Manipulation:** JavaScript dynamically modifies the button text and applies CSS styling based on variant
4. **Analytics Integration:** Compatible with Google Analytics (gtag), Mixpanel, and custom analytics solutions

### Code Structure

```javascript
// Variant assignment and persistence
var variant = localStorage.getItem('ab_test_hero-cta-variation') || (Math.random() < 0.5 ? 'A' : 'B');

// Dynamic styling for variant B
- Primary blue background with white text
- Enhanced hover effects
- Hidden repository stats for cleaner UI

// Event tracking
- ab_test_view: Tracked on page load
- ab_test_cta_click: Tracked on button click
```

### CSS Changes (Variant B)

```css
.md-header__source .md-source[data-ab-variant="B"] {
  background-color: var(--md-primary-fg-color);
  border-radius: 0.2rem;
  padding: 0.3rem 0.6rem;
  transition: background-color 0.25s, transform 0.25s;
}

.md-header__source .md-source[data-ab-variant="B"]:hover {
  background-color: var(--md-accent-fg-color);
  transform: translateY(-2px);
}
```

## Analytics & Tracking

### Events Tracked

1. **ab_test_view**
   - Fired on page load
   - Properties: test_name, variant, timestamp

2. **ab_test_cta_click**
   - Fired on button click
   - Properties: test_name, variant, button_text, timestamp

### Metrics

#### Primary Metric
- **Click-Through Rate (CTR):** Percentage of users who click the CTA button
  - Formula: (Total Clicks / Total Views) × 100

#### Secondary Metrics
- Time to click
- Bounce rate
- Session duration
- Conversion rate (if applicable downstream metrics exist)

### Success Criteria

- **Minimum Sample Size:** 1,000 users per variant
- **Confidence Level:** 95%
- **Minimum Detectable Effect:** 5% improvement in CTR
- **Test Duration:** Run until statistical significance is achieved (typically 2-4 weeks)

## Accessing Test Data

### Browser Console

Check the current variant assignment:
```javascript
console.log(window.ABTest['hero-cta-variation'].getVariant());
```

### Analytics Platform

Query events by filtering on:
- Event Name: `ab_test_view` or `ab_test_cta_click`
- Properties: `test_name: "hero-cta-variation"`

## Testing & QA

### Manual Testing

1. **Test Variant A:**
   ```javascript
   localStorage.setItem('ab_test_hero-cta-variation', 'A');
   location.reload();
   ```

2. **Test Variant B:**
   ```javascript
   localStorage.setItem('ab_test_hero-cta-variation', 'B');
   location.reload();
   ```

3. **Reset Assignment:**
   ```javascript
   localStorage.removeItem('ab_test_hero-cta-variation');
   location.reload();
   ```

### Verification Checklist

- [ ] Both variants render correctly on desktop
- [ ] Both variants render correctly on mobile
- [ ] Button text updates correctly for variant B
- [ ] Styling applies correctly for variant B
- [ ] Click events fire correctly for both variants
- [ ] View events fire on page load
- [ ] Variant assignment persists across page reloads
- [ ] No console errors or warnings

## Integration with Analytics Platforms

### Google Analytics (gtag.js)

The implementation automatically integrates with Google Analytics if `gtag` is available:

```javascript
gtag('event', 'ab_test_cta_click', {
  test_name: 'hero-cta-variation',
  variant: 'A',
  button_text: 'View on GitHub'
});
```

### Mixpanel

Automatically integrates if Mixpanel is loaded:

```javascript
mixpanel.track('ab_test_cta_click', {
  test_name: 'hero-cta-variation',
  variant: 'B',
  button_text: 'Explore Framework'
});
```

### Custom Analytics

Add your analytics code to the `trackEvent` function in g0.html:

```javascript
function trackEvent(eventName, properties) {
  // Add your custom analytics here
  if (typeof YourAnalytics !== 'undefined') {
    YourAnalytics.track(eventName, properties);
  }
}
```

## Results Analysis

After collecting sufficient data:

1. Calculate CTR for each variant:
   - CTR_A = (Clicks_A / Views_A) × 100
   - CTR_B = (Clicks_B / Views_B) × 100

2. Run statistical significance test (Chi-square or Z-test)

3. Determine winner based on:
   - Statistical significance (p < 0.05)
   - Practical significance (improvement > 5%)
   - Confidence in results

4. Implement winning variant permanently or iterate with new test

## Rollback Plan

If issues arise:

1. Remove the A/B test script block from g0.html
2. Ensure the original button remains with variant A styling
3. Clear localStorage keys for affected users (if possible)

## Future Iterations

Potential follow-up tests:
- Different button colors (green, orange, etc.)
- Alternative button text ("Get Started", "Learn More", etc.)
- Button position variations
- Icon additions or modifications
- Multiple CTA buttons

## Notes

- The test uses localStorage for persistence; users clearing browser data will be reassigned
- Mobile and desktop users are tested together; consider separate tests if behavior differs significantly
- The test is implemented in a self-contained IIFE to avoid global namespace pollution
- Compatible with existing Material for MkDocs theme without conflicts

## Contact

For questions or issues with this A/B test implementation, please contact the development team.
