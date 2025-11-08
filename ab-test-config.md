# A/B Test Configuration: cta-button-visibility

## Overview
This A/B test evaluates the impact of adding a prominent call-to-action (CTA) button in the header versus the current minimal header design.

## Test Details

### Test Name
`cta-button-visibility`

### Hypothesis
Adding a prominent "Get Started" button in the header will improve user engagement by making the primary action more obvious to visitors arriving at the documentation site.

### Implementation Date
2025-11-08

### Test Variants

#### Variant A (Control)
- Current minimal header with no CTA button
- Users see only: logo, navigation menu, search, and GitHub link

#### Variant B (Treatment)
- Header with prominent "Get Started" CTA button
- Button appears after the GitHub source link on desktop
- Button is styled with accent color (--md-accent-fg-color)
- Button includes hover effects and smooth transitions
- Hidden on mobile/tablet to prevent header crowding (< 76.25em)

## Implementation Details

### Files Modified
- `g0.html` (lines 690-697, 612-654)

### HTML Structure
```html
<div class="md-header__cta" data-ab-test="cta-button-visibility">
  <a class="md-header__cta-button" href="#introduction" title="Get Started with Crosschain Risk Framework">
    Get Started
  </a>
</div>
```

### CSS Classes
- `.md-header__cta` - Container for the CTA button
- `.md-header__cta-button` - The actual button styling
- `[data-ab-test="cta-button-visibility"]` - Tracking attribute

### Button Target
- Links to `#introduction` section
- Can be easily updated to point to a different section or page

## Metrics to Track

### Primary Metrics
1. **Click-Through Rate (CTR)**: Percentage of visitors who click the CTA button
2. **Time on Page**: Average time users spend on the site
3. **Section Navigation**: Number of users who navigate to different framework sections

### Secondary Metrics
1. **Bounce Rate**: Percentage of single-page sessions
2. **Pages per Session**: Average number of pages viewed per session
3. **Scroll Depth**: How far users scroll down the page
4. **Return Visits**: Percentage of users who return to the site

## Tracking Implementation

### Option 1: Google Analytics
Add event tracking to the CTA button:

```javascript
document.querySelector('.md-header__cta-button').addEventListener('click', function() {
  gtag('event', 'click', {
    'event_category': 'CTA',
    'event_label': 'Header Get Started',
    'value': 1
  });
});
```

### Option 2: Custom Analytics
Add data attributes to track engagement:

```javascript
// Track CTA impressions
window.addEventListener('load', function() {
  if (document.querySelector('[data-ab-test="cta-button-visibility"]')) {
    // Log impression of variant B
    trackEvent('ab_test', 'impression', 'cta-button-visibility');
  }
});

// Track CTA clicks
document.querySelector('.md-header__cta-button')?.addEventListener('click', function(e) {
  trackEvent('ab_test', 'click', 'cta-button-visibility');
});
```

### Option 3: A/B Testing Platform Integration
If using platforms like Optimizely, VWO, or Google Optimize:
- Use the data attribute `data-ab-test="cta-button-visibility"` as a selector
- Configure variant distribution (typically 50/50 split)
- Set up conversion goals based on the metrics above

## Feature Flag Configuration

### Example: LaunchDarkly
```json
{
  "key": "cta-button-visibility",
  "name": "Header CTA Button",
  "description": "Show prominent CTA button in header",
  "kind": "boolean",
  "variations": [
    {
      "value": false,
      "name": "Control (No Button)",
      "description": "Original minimal header"
    },
    {
      "value": true,
      "name": "Treatment (With Button)",
      "description": "Header with Get Started CTA button"
    }
  ]
}
```

### Example: Custom Feature Flag
```javascript
// Simple cookie-based feature flag
function getABTestVariant() {
  let variant = getCookie('ab_test_cta_button');
  if (!variant) {
    // Assign random variant (50/50 split)
    variant = Math.random() < 0.5 ? 'control' : 'treatment';
    setCookie('ab_test_cta_button', variant, 30); // 30 days
  }
  return variant;
}

// Show/hide CTA based on variant
if (getABTestVariant() === 'control') {
  document.querySelector('.md-header__cta').style.display = 'none';
}
```

## Success Criteria

### Minimum Detectable Effect
- **CTR**: At least 5% of visitors click the CTA button
- **Time on Page**: Increase of 20% or more compared to control
- **Section Navigation**: Increase of 15% in navigation to framework sections

### Statistical Significance
- Confidence level: 95%
- Minimum sample size: 1,000 visitors per variant
- Recommended test duration: 2-4 weeks

### Decision Rules
- **Ship Treatment**: If treatment shows statistically significant improvement in primary metrics
- **Ship Control**: If treatment shows no improvement or negative impact
- **Continue Testing**: If results are inconclusive, run test for additional time

## Alternative CTA Options

If the current "Get Started" button doesn't perform well, consider testing:

1. **"Read the Framework"** - More descriptive of the content
2. **"Explore Risks"** - Focuses on the core value proposition
3. **"View Documentation"** - Standard documentation site language
4. **"Learn More"** - Generic but effective CTA

## Responsive Behavior

### Desktop (> 76.25em)
- Button is visible and prominent
- Positioned after GitHub source link
- Full padding and sizing

### Tablet/Mobile (≤ 76.25em)
- Button is hidden to prevent header crowding
- Consider adding CTA button in different location for mobile (e.g., hero section)

## Rollback Plan

If issues arise, rollback is simple:
1. Remove the HTML div with class `md-header__cta` (lines 690-697)
2. Remove the CSS styles (lines 612-654)
3. Commit and push changes

Or use feature flag to disable without code changes.

## Next Steps

1. **Implement tracking**: Add analytics code to measure metrics
2. **Configure A/B test platform**: Set up variant distribution
3. **Monitor results**: Check dashboard daily for first week
4. **Analyze data**: After 2 weeks, review metrics for statistical significance
5. **Make decision**: Ship winning variant or iterate with new test

## Notes

- The CTA button uses existing CSS variables for consistency
- Button styling follows Material Design principles
- Accessible with proper title attribute and semantic HTML
- Can be easily customized without affecting other header elements

## Contact

For questions about this A/B test, contact the growth team or refer to the main A/B testing documentation.
